package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class Seat( roomId : Long,
                 userId : Long,
                 id     : Option[Long] = None )

class Seats(tag: Tag) extends Table[Seat](tag, "seat") with IdentifiableTable[Long] with WithDefaultSession {
  def id     = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def roomId = column[Long]("roomId")
  def userId = column[Long]("accountId")

  val rooms = new TableQuery[Rooms](new Rooms(_))
  def roomFK = withSession { implicit session =>
    foreignKey("fk_seat_room", roomId, rooms)(_.id)
  }
  def room = withSession { implicit session =>
    rooms.filter(_.id === roomId)
  }

  val accounts = new TableQuery[Accounts](new Accounts(_))
  def accountFK  = withSession { implicit session =>
    foreignKey("fk_seat_account", userId, accounts)(_.uid)
  }
  def account = withSession { implicit session =>
    accounts.filter(_.uid === id)
  }

  def * = (roomId, userId, id.?) <> (Seat.tupled, Seat.unapply)
}
