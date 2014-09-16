package service.dao

import service._
import models._

object LandingEmailDao extends SquerylDao[LandingEmail, Long] {

  def table = Database.landingEmailTable

  def queryByIp(ip: String)(implicit session: FlatternSession): List[LandingEmail] =
    query.filter(_.ip === ip).list

  def queryByEmail(email: String)(implicit session: FlatternSession): List[LandingEmail] =
    query.filter(_.email === email).list

}