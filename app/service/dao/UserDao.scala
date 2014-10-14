package service.dao

import models._
import service._

object UserDao extends SquerylDao[User, String] {
  def table = Database.userTable
}