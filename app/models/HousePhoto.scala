package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class HousePhoto( id         : Option[Long] = None,
                       houseId    : Long,
                       title      : Option[String] = None,
                       description: Option[String] = None)

class HousePhotos(tag: Tag) extends Table[HousePhoto](tag, "house_photo") with IdentifiableTable[Long] with WithDefaultSession {
  def id          = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def houseId     = column[Long]("house_id")
  def title       = column[Option[String]]("title")
  def description = column[Option[String]]("description")

  val houses = new TableQuery[Houses](new Houses(_))
  def houseFK = withSession { implicit session =>
    foreignKey("fk_photo_house", houseId, houses)(_.id)
  }
  def house = withSession { implicit session =>
    houses.filter(_.id === houseId)
  }

  def * = (id.?, houseId, title, description) <> (HousePhoto.tupled, HousePhoto.unapply)
}
