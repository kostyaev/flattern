package service.dao

import dto.house.{HouseHelper, HouseThumbnail}
import service._
import models._
import service.filters.HouseFilter

object HouseDao extends SquerylDao[House, Long] {
  def table = Database.houseTable
}