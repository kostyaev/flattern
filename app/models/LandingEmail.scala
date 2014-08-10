package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class LandingEmail( email: String,
                         ip   : String,
                         id   : Option[Long] = None )

class LandingEmails(tag: Tag) extends Table[LandingEmail](tag, "landing_email")
  with IdentifiableTable[Long] with WithDefaultSession {
  def id    = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def email = column[String]("email")
  def ip    = column[String]("ip")


  def * = (email, ip, id.?) <> (LandingEmail.tupled, LandingEmail.unapply)
}
