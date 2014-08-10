package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class City( names: Map[String, String],
                 code : Option[String] = None,
                 id   : Option[Int]    = None )

class Cities(tag: Tag) extends Table[City](tag, "city") with IdentifiableTable[Int] with WithDefaultSession {
  def id     = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def code   = column[Option[String]]("code")
  def names  = column[Map[String, String]]("names")
  def stateId  = column[Int]("state_id")

  val states = new TableQuery[States](new States(_))
  def stateFK = withSession { implicit session =>
    foreignKey("fk_city_state", stateId, states)(_.id)
  }
  def state = withSession { implicit session =>
    states.filter(_.id === stateId)
  }

  def * = (names, code, id.?) <> (City.tupled, City.unapply)
}
