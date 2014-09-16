package service.dao

import models._
import service._

object UserDao extends SquerylDao[User, Long] {
  def table = Database.userTable
}