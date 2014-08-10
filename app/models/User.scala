package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession
import org.joda.time.LocalDate

case class User( id        : Option[Long] = None,
                 accountId : Option[Long] = None,
                 privacy   : Option[Map[String, String]] = None,
                 birthday  : Option[LocalDate] = None,
                 timezone  : Option[Int] = None,
                 sex       : Option[Int] = None,
                 wishes    : Option[String] = None,
                 wsex      : Option[Int] = None,
                 wage      : Option[Int] = None,
                 wprice    : Option[Double] = None,
                 wcountry  : Option[String] = None,
                 wdistrict : Option[String] = None
                 )

class Users(tag: Tag) extends Table[User](tag, "users") with IdentifiableTable[Long] with WithDefaultSession {
  def id        = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def accountId = column[Option[Long]]("account_id")
  def privacy   = column[Option[Map[String, String]]]("privacy")
  def birthday  = column[Option[LocalDate]]("birthday")
  def timezone  = column[Option[Int]]("timezone")
  def sex       = column[Option[Int]]("sex")
  def wishes    = column[Option[String]]("wishes")
  def wsex      = column[Option[Int]]("wsex")
  def wage      = column[Option[Int]]("wage")
  def wprice    = column[Option[Double]]("wprice")
  def wcountry  = column[Option[String]]("wcountry")
  def wdistrict = column[Option[String]]("wdistrict")

  val accounts = new TableQuery[Accounts](new Accounts(_))
  def accountFK  = withSession { implicit session =>
    foreignKey("fk_user_account", id, accounts)(_.uid)
  }
  def account = withSession { implicit session =>
    accounts.filter(_.uid === id)
  }

  def * = (id.?, accountId, privacy, birthday, timezone, sex, wishes, wsex, wage, wprice, wcountry, wdistrict) <>
    (User.tupled, User.unapply)
}
