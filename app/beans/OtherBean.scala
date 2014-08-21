package beans

import models.LandingEmail
import service.WithDefaultSession
import service.dao.LandingEmailDao

import scala.language.reflectiveCalls

object OtherBean extends WithDefaultSession {

  type FlatternSession = scala.slick.driver.PostgresDriver.simple.Session

  def saveEmail(ip: String, email: String) = withTransaction { implicit session =>
    if(LandingEmailDao.queryByIp(ip).length == 0 && LandingEmailDao.queryByEmail(email).length == 0)
      LandingEmailDao.add(LandingEmail(email, ip))

  }


}
