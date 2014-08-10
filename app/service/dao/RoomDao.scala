package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._

object RoomDao extends SlickDao[Room, Long] {

  def query = TableQuery[Rooms]

  def extractId(room: Room): Option[Long] = room.id

  def withId(room: Room, id: Long): Room = room.copy(id = Option(id))

  def queryById(id: Long) = query.filter(_.id === id)
}