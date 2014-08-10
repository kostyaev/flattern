package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class Room( houseId : Long,
                 area    : Double,
                 price   : Option[Double] = None,
                 seats   : Option[Int]     = None,
                 id      : Option[Long]    = None )

class Rooms(tag: Tag) extends Table[Room](tag, "room") with IdentifiableTable[Long] with WithDefaultSession {
  def id      = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def houseId = column[Long]("house_id")
  def area    = column[Double]("area")
  def price   = column[Option[Double]]("price")
  def seats   = column[Option[Int]]("seats")

  val houses = new TableQuery[Houses](new Houses(_))
  def houseFK = withSession { implicit session =>
    foreignKey("fk_room_house", houseId, houses)(_.id)
  }
  def house = withSession { implicit session =>
    houses.filter(_.id === houseId)
  }

  def * = (houseId, area, price, seats, id.?) <> (Room.tupled, Room.unapply)
}
