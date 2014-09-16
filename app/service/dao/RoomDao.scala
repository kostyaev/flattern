package service.dao

import service._
import models._

object RoomDao extends SquerylDao[Room, Long] {
  def table = Database.roomTable
}