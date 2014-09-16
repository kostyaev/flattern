package service.dao

import service._
import models._

object HousePhotoDao extends SquerylDao[HousePhoto, Long] {
  def table = Database.housePhotoTable
}
