package service.dao

import service._
import models._


object AddressDao extends SquerylDao[Address, Long] {
  def table = Database.addressTable
}