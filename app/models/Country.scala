package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class Country( names: Map[String, String],
                    code : Option[String] = None,
                    id   : Option[Int]    = None)


class Countries(tag: Tag) extends Table[Country](tag, "country") with IdentifiableTable[Int] with WithDefaultSession {
  def id    = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def code  = column[Option[String]]("code")
  def names = column[Map[String, String]]("names")

  def * = (names, code, id.?) <> (Country.tupled, Country.unapply)
}
