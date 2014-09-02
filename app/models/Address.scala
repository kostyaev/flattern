package models

import service.WithDefaultSession
import service.dao.IdentifiableTable
import utils.DgDriver.simple._

case class Address( id          : Option[Long]   = None,
                    city        : Option[String] = None,
                    country     : Option[String] = None,
                    street      : Option[String] = None,
                    building    : Option[String] = None,
                    housing     : Option[String] = None,
                    floor       : Option[Int]    = None,
                    apt         : Option[Int]    = None) {

}


class Addresses(tag: Tag) extends Table[Address](tag, "address") with IdentifiableTable[Long] with WithDefaultSession {
  def id          = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def city        = column[Option[String]]("city")
  def country     = column[Option[String]]("country")
  def street      = column[Option[String]]("street")
  def building    = column[Option[String]]("building")
  def housing     = column[Option[String]]("housing")
  def floor       = column[Option[Int]]("floor")
  def aptNumber   = column[Option[Int]]("apt")

//  val cities = new TableQuery[Cities](new Cities(_))
//  def cityFK = withSession { implicit session =>
//    foreignKey("fk_house_city", cityId, cities)(_.id)
//  }
//  def city   = withSession { implicit session =>
//    cities.filter(_.id === cityId)
//  }
//
//  val countries = new TableQuery[Countries](new Countries(_))
//  def countryFK = withSession { implicit session =>
//    foreignKey("fk_house_country", countryId, countries)(_.id)
//  }
//  def country   = withSession { implicit session =>
//    countries.filter(_.id === cityId)
//  }

  def * = (
    id.?, city, country, street, building, housing, floor, aptNumber) <> (Address.tupled, Address.unapply)
}


