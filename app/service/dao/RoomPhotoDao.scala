package service.dao

import service._
import models._

object RoomPhotoDao extends SquerylDao[RoomPhoto, Long] {
  def table = Database.roomPhotoTable
}