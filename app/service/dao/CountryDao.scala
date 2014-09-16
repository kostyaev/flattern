package service.dao

import service._
import models._

object CountryDao extends SquerylDao[Country, Int] {
  def table = Database.countryTable
}