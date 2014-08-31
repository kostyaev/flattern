package controllers

import service.dao.AccountDao
import service.filters.HouseFilter
import securesocial.core._
import models._
import play.api._
import mvc._
import dto.user._
import dto.house.HouseEnums._
import dto.user.UserEnums._
import beans.{HouseBean, UserBean}
import scala.language.reflectiveCalls
import play.api.libs.json._
import service.WithDefaultSession
import utils.EnumUtils

object UserCtrl extends Controller with SecureSocial with WithDefaultSession {

  // enums
  implicit val sexTypeFormat = EnumUtils.enumFormat(SexType)
  implicit val privacyFormat = EnumUtils.enumFormat(Privacy)
  implicit val houseTypeFormat = EnumUtils.enumFormat(HouseType)
  implicit val rentTypeFormat = EnumUtils.enumFormat(RentType)
  implicit val amenityFormat = EnumUtils.enumFormat(Amenity)

  // case classes
  implicit val userConstantsFormat = Json.format[UserConstants]
  implicit val userGeneralFormat = Json.format[UserGeneral]
  implicit val userAboutFormat = Json.format[UserAbout]
  implicit val hosesFormat = Json.format[House]

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

  def getHouses = SecuredAction(ajaxCall = true) { implicit request =>
    val user = AccountDao.findByIdentityId
    val houseList = HouseBean.getHousesByFilter(HouseFilter(None, user.uid), 100, 0)

    Ok(Json.toJson(houseList))
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
