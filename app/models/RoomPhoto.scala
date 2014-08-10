package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class RoomPhoto( roomId : Long,
                      id      : Option[Long] = None )

class RoomPhotos(tag: Tag) extends Table[RoomPhoto](tag, "room_photo") with IdentifiableTable[Long] with WithDefaultSession {
  def id     = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def roomId = column[Long]("room_id")

  val rooms = new TableQuery[Rooms](new Rooms(_))
  def roomFK = withSession { implicit session =>
    foreignKey("fk_photo_room", roomId, rooms)(_.id)
  }
  def room = withSession { implicit session =>
    rooms.filter(_.id === roomId)
  }

  def * = (roomId, id.?) <> (RoomPhoto.tupled, RoomPhoto.unapply)
}
