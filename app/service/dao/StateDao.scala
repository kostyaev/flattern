package service.dao

import service._
import models._

object StateDao extends SquerylDao[State, Int] {
  def table = Database.stateTable
}