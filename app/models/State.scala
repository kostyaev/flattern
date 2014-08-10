package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class State( names: Map[String, String],
                  code : Option[String] = None,
                  id   : Option[Int]    = None )


class States(tag: Tag) extends Table[State](tag, "state") with IdentifiableTable[Int] with WithDefaultSession {
  def id    = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def code  = column[Option[String]]("code")
  def names = column[Map[String, String]]("names")
  def countryId = column[Int]("country_id")

  val countries = new TableQuery[Countries](new Countries(_))
  def countryFK = withSession { implicit session =>
    foreignKey("fk_state_country", countryId, countries)(_.id)
  }
  def country = withSession { implicit session =>
    countries.filter(_.id === countryId)
  }

  def * = (names, code, id.?) <> (State.tupled, State.unapply)
}
