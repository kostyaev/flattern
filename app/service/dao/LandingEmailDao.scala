package service.dao

import service._
import models._
import SquerylEntryPoint._

object LandingEmailDao extends SquerylDao[LandingEmail, Long] {

  def table = Database.landingEmailTable

  def queryByIp(ip: String): List[LandingEmail] = from(table)(s => where(s.ip === ip) select(s)).toList

  def queryByEmail(email: String): List[LandingEmail] =
    from(table)(s => where(s.email === email) select(s)).toList

}