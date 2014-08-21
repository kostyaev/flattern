package controllers

import beans.{HouseBean, UserBean}
import constants.HouseConstants
import dto._
import models.House
import play.api.Logger
import play.api.libs.json.{JsError, Json}
import play.api.mvc.Controller
import securesocial.core.SecureSocial
import service.WithDefaultSession
import utils.EnumUtils

object HouseCtrl extends Controller with SecureSocial with WithDefaultSession {
  implicit val houseTypeReads = EnumUtils.enumFormat(HouseType)

  implicit val houseGeneralReads = Json.format[HouseGeneral]
  implicit val houseAddressReads = Json.format[HouseAddress]
  implicit val houseDescReads = Json.format[HouseDesc]
  implicit val houseConstantsReads = Json.format[HouseConstants]
  implicit val houseAmenityReads = Json.format[HouseAmenity]
  implicit val houseAmenitiesReads = Json.format[HouseAmenities]

  def getConstants = SecuredAction(ajaxCall = true) {
    Ok(Json.toJson(HouseConstants()))
  }

  def getGeneral(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction{ implicit session =>
      Logger.info("general")
      HouseBean.getHouse(id) match {
        case Some(house) => Ok(Json.toJson(HouseHelper.getHouseGeneral(house)))
        case None => Ok("empty")
      }
    }
  }

  def saveGeneral(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request => {
    withTransaction { implicit session =>
      request.body.validate[HouseGeneral].fold(
        errors => {
          Logger.info(JsError.toFlatJson(errors).toString())
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
        },
        houseGeneral => {
          val userId = UserBean.getAccount(request.user).get.uid.get
          HouseBean.saveHouse(houseGeneral, userId)
          Ok("Данные успешно сохранены")
        }
      )
    }
  }
  }


  def getAddress(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction { implicit session =>
      HouseBean.getAddressByHouseId(id) match {
        case Some(address) =>
          HouseHelper.getHouseAddress(address)
        case None => "empty"
      }
      Ok(Json.toJson(HouseAddress("RU", "Москва", Option("Грина"))))
    }
  }

  def saveAddress(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
    withTransaction { implicit session =>
      request.body.validate[HouseGeneral].fold(
        errors => {
          Logger.info(JsError.toFlatJson(errors).toString())
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
        },
        address => {
          HouseBean.getHouse(id) match {
            case Some(house) =>
              HouseBean.updateHouse(address, house)
            case None =>
              HouseBean.updateHouse(address, House(userId = UserBean.getAccount(request.user).get.uid.get))
          }
          Ok("Данные успешно сохранены")
        }
      )
    }
  }

  def getAmenities(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
    HouseBean.getHouse(id) match {
      case Some(house) => Ok(Json.toJson(HouseHelper.getHouseAmenities(house)))
      case None => Ok(Json.toJson("empty"))
    }
  }


  def saveAmenities(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
    withTransaction { implicit session =>
      request.body.validate[HouseAmenities].fold(
        errors => {
          Logger.info(JsError.toFlatJson(errors).toString())
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
        },
        amenities => {
          HouseBean.getHouse(id) match {
            case Some(house) =>
              HouseBean.updateHouse(amenities, house)
            case None =>
              HouseBean.updateHouse(amenities, House(userId = UserBean.getAccount(request.user).get.uid.get))
          }
          Ok("Данные успешно сохранены")
        }
      )
    }
  }



  def uploadPhoto(id: Long) = SecuredAction(ajaxCall = true)(parse.multipartFormData) { implicit request =>
    Logger.info("picture")
    request.body.file("photo").map { picture =>
      val photo = HouseBean.savePhoto(id, picture)
      val json = Json.obj("id" -> photo.id,  "title" -> photo.title, "description" -> photo.description)
      //FIXME replace sleep, possibly with java.nio
      Thread.sleep(1500)
      Ok(json)
    }.getOrElse(Ok("Failed"))
  }


}
