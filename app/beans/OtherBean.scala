package beans

import models.LandingEmail
import service.dao.LandingEmailDao
import play.api.mvc.Request
import play.api.libs.json.JsValue
import dto.landing.LandingForm
import service._
import SquerylEntryPoint._

import scala.language.reflectiveCalls

object OtherBean {

  def saveEmail(ip: String, email: String): Unit = inTransaction {
    if(LandingEmailDao.queryByIp(ip).length == 0 && LandingEmailDao.queryByEmail(email).length == 0)
      LandingEmailDao.create(LandingEmail(0, email, ip))
  }

  def saveEmail(request: Request[JsValue], landingForm: LandingForm): Unit = {
    saveEmail(request.remoteAddress, landingForm.email)
  }

}
