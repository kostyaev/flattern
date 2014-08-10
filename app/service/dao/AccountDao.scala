package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._
import securesocial.core.Identity
import models.Account
import securesocial.core.IdentityId
import securesocial.core.SecuredRequest
import scala.Some

object AccountDao extends SlickDao[Account, Long] {

  def query = TableQuery[Accounts]

  def extractId(account: Account): Option[Long] = account.uid

  def withId(account: Account, uid: Long): Account = account.copy(uid = Option(uid))

  def queryById(uid: Long) = query.filter(_.uid === uid)

  def findById(id: Long) = withSession {
    implicit session =>
      val q = for {
        user <- query
        if user.uid is id
      } yield user

      q.firstOption
  }

  def findByEmailAndProvider(email:String, providerId:String) : Option[Account] = withSession {
    implicit session =>
      val q = for {
        user <- query
        if (user.email is email) && (user.providerId is providerId)
      } yield user

      q.firstOption
  }

  def findByIdentityId(identityId: IdentityId): Option[Account] = withSession {
    implicit session =>
      val q = for {
        user <- query
        if (user.userId is identityId.userId) && (user.providerId is identityId.providerId)
      } yield user

      q.firstOption
  }

  def findByIdentityId[T](implicit request: SecuredRequest[T]): Account = withSession { implicit session =>
    val q = for {
      user <- query
      if (user.userId is request.user.identityId.userId) && (user.providerId is request.user.identityId.providerId)
    } yield user

    q.firstOption.get
  }

  def findByEmail(email: String) : Option[Account] = withSession {
    implicit session =>
      val q = for {
        user <- query
        if user.email is email
      } yield user

      q.firstOption
  }


  def emailExists(email: String) : Boolean = withSession {
    implicit session =>
      findByEmail(email) match {
        case None => false
        case _    => true
      }
  }

  def all = withSession {
    implicit session =>
      val q = for {
        user <- query
      } yield user

      q.list
  }

  def save(i: Identity): Account = this.save(AccountFromIdentity(i))

  def update(i: Identity): Account = {
    findByIdentityId(i.identityId) match {
      case None    => save(i)
      case Some(u) => this.save(AccountFromIdentity(i, u))
    }
  }

  def save(account: Account): Account = withSession {
    implicit session =>
      findByIdentityId(account.identityId) match {
        case None => {
          val uid = this.add(account)
          account.copy(uid = Some(uid))
        }
        case Some(existingUser) => {
          val userRow = for {
            u <- query
            if u.uid is existingUser.uid
          } yield u

          val updatedUser = account.copy(uid = existingUser.uid)
          userRow.update(updatedUser)
          updatedUser
        }
      }
  }
}