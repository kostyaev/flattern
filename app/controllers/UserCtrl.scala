package controllers

import service.dao.AccountDao
import service.filters.HouseFilter
import securesocial.core._
import models._
import play.api._
import mvc._
import dto.user.{UserGeneral, UserAbout}
import constants.UserConstants
import beans.{HouseBean, UserBean}
import scala.language.reflectiveCalls
import play.api.libs.json._
import service.WithDefaultSession

object UserCtrl extends Controller with SecureSocial with WithDefaultSession {

  implicit val userConstantsFormat = Json.format[UserConstants]
  implicit val userGeneralFormat = Json.format[UserGeneral]
  implicit val userAboutFormat = Json.format[UserAbout]

  def getConstants = SecuredAction(ajaxCall = true) {
    Ok(Json.toJson(UserConstants()))
  }

  def getGeneral = SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction{ implicit session =>
      Logger.info("user.general")
      val account = AccountDao.findByIdentityId
      val user = UserBean.findUser(account)

      Ok(Json.toJson(UserGeneral.fill(account, user)))
    }
  }

  def saveGeneral = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
    val user = AccountDao.findByIdentityId
    Logger.info(request.body.toString())
    request.body.validate[UserGeneral].fold(
      errors => {
        Logger.info(JsError.toFlatJson(errors).toString())
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
      },
      userGeneral => {
        Logger.info(userGeneral.toString)
        UserBean.userUpdate(user, userGeneral)
        Ok(Json.toJson("Данные успешно сохранены"))
      }
    )
  }

  def getAbout = SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction{ implicit session =>
      Logger.info("user.general")
      val account = AccountDao.findByIdentityId
      val user = UserBean.findUser(account)

      Ok(Json.toJson(UserAbout.fill(account, user)))
    }
  }

  def saveAbout = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
    val user = AccountDao.findByIdentityId
    Logger.info(request.body.toString())
    request.body.validate[UserAbout].fold(
      errors => {
        Logger.info(JsError.toFlatJson(errors).toString())
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
      },
      userAbout => {
        Logger.info(userAbout.toString)
        UserBean.userUpdate(user, userAbout)
        Ok(Json.toJson("Данные успешно сохранены"))
      }
    )
  }

  def picUpload = SecuredAction(parse.multipartFormData) { implicit request =>
    val user = AccountDao.findByIdentityId
    request.body.file("user-pic").map { picture =>
      val src: String = UserBean.avatarUpdate(user, picture).avatarUrl.getOrElse("")
      val json = Json.obj("src" -> src)
      Thread.sleep(1500)
      Ok(json)
    }.getOrElse { BadRequest("Failed") }
  }
}
