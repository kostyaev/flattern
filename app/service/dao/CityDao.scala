package service.dao

import service._
import models._

object CityDao extends SquerylDao[City, Int] {
  def table = Database.cityTable
}