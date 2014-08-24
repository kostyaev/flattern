package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._
import utils.equal
import service.filters.UserFilter
import dto.UserThumbnail

object UserDao extends SlickDao[User, Long] {

  def query = TableQuery[Users]

  def queryAccounts = TableQuery[Accounts]

  def extractId(user: User): Option[Long] = user.id

  def withId(user: User, id: Long): User = user.copy(id = Option(id))

  def queryById(id: Long) = query.filter(_.id === id)

  def findByAccountId(id: Long)(implicit session: FlatternSession) =
    query.filter(_.accountId === id)

  def findByAccount(account: Account)(implicit session: FlatternSession) =
    findByAccountId(account.uid.getOrElse(0))

  def findByFilter(filter: UserFilter) = {
    val q = for {
      account <- queryAccounts
      user    <- query if user.accountId === account.uid
    } yield (account, user)

    q.filter {
      case (a, u) => {
        val nonOptions = Seq(
          equal(a.fullName, filter.fullName),
          equal(a.uid, filter.id)
        ).flatten
        val options = Seq(
          equal(a.email, filter.email),
          equal(u.privacy, filter.privacy),
          equal(u.birthday, filter.birthday),
          equal(u.timezone, filter.timezone),
          equal(u.sex, filter.sex),
          equal(u.wsex, filter.wsex),
          equal(u.wage, filter.wage),
          equal(u.wprice, filter.wprice),
          equal(u.wcountry, filter.wcountry),
          equal(u.wdistrict, filter.wdistrict)
        ).flatten

        reduce(options, nonOptions)
      }
    }
  }

  def getUserThumbnails(filter: UserFilter, page: Int, pageSize: Int)(implicit session: FlatternSession): Page[UserThumbnail] = {
    val list = findByFilter(filter)

    val result = list
      .drop(Page.getOffset(page, pageSize))
      .take(pageSize)
      .list
      .map(p => UserThumbnail.fill(p))

    Page(
      items = result,
      page = page,
      pageSize = pageSize,
      total = list.length.run
    )

  }
}