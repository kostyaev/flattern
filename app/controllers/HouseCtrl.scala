package controllers

import beans.{HouseBean, UserBean}
import dto.Empty
import dto.house.HouseEnums.{RentType, Amenity, HouseType}
import dto.house._
import models.House
import play.api.Logger
import play.api.libs.json.{JsError, Json}
import play.api.mvc.Controller
import securesocial.core.SecureSocial
import service.WithDefaultSession
import utils.EnumUtils

object HouseCtrl extends Controller with SecureSocial with WithDefaultSession {
  implicit val houseTypeReads = EnumUtils.enumFormat(HouseType)
  implicit val rentTypeReads = EnumUtils.enumFormat(RentType)
  implicit val amenityReads = EnumUtils.enumFormat(Amenity)

  implicit val houseGeneralReads = Json.format[HouseGeneral]
  implicit val houseGeneralEmptyReads = Json.format[Empty]
  implicit val houseAddressReads = Json.format[HouseAddress]
  implicit val houseDescReads = Json.format[HouseDesc]
  implicit val houseConstantsReads = Json.format[HouseConstants]
  implicit val houseAmenityReads = Json.format[HouseAmenity]
  implicit val houseAmenitiesReads = Json.format[HouseAmenities]

  //def getUser()(implicit request: SecuredRequest[AnyContent]): Account = UserBean.getAccount(request.user).get

  def getConstants = SecuredAction(ajaxCall = true) {
    Ok(Json.toJson(HouseConstants()))
  }

  def createHouse = SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction { implicit session =>
      val userId = UserBean.getAccount(request.user).get.uid.get
      val house = HouseBean.saveHouse(House(userId = userId))
      Ok(Json.toJson(house.id.get))
    }
  }

  def getGeneral(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction{ implicit session =>
      Logger.info("general")
      val userId = UserBean.getAccount(request.user).get.uid.get
      HouseBean.getHouse(id, userId) match {
        case Some(house) => Ok(Json.toJson(HouseHelper.getHouseGeneral(house)))
        case None => BadRequest(Json.toJson(Empty()))
      }
    }
  }

  def saveGeneral(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request => {
    withTransaction { implicit session =>
      Logger.info(request.body.toString())
      request.body.validate[HouseGeneral].fold(
        errors => {
          Logger.info(JsError.toFlatJson(errors).toString())
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
        },
        houseGeneral => {
          Logger.info(houseGeneral.toString)
          val userId = UserBean.getAccount(request.user).get.uid.get
          HouseBean.getHouse(id, userId) match {
            case Some(house) =>
              HouseBean.updateHouseInfo(houseGeneral, house)
              Ok(Json.toJson("Данные успешно сохранены"))
            case None => BadRequest(Json.toJson(Empty()))
          }
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
      Ok(Json.toJson(HouseAddress(Option("RU"), Option("Москва"), Option("Грина"))))
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
          val userId = UserBean.getAccount(request.user).get.uid.get
          HouseBean.getHouse(id, userId) match {
            case Some(house) =>
              HouseBean.updateHouseInfo(address, house)
              Ok(Json.toJson("Данные успешно сохранены"))
            case None =>
              BadRequest(Json.toJson(Empty()))
          }
        }
      )
    }
  }

  def getAmenities(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction { implicit session =>
      val userId = UserBean.getAccount(request.user).get.uid.get
      HouseBean.getHouse(id, userId) match {
        case Some(house) => Ok(Json.toJson(HouseAmenities(
          selectedAmenities = house.amenities, allAmenities = Amenity.values.toList)
        ))
        case None => BadRequest(Json.toJson(Empty()))
      }
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
          val userId = UserBean.getAccount(request.user).get.uid.get
          HouseBean.getHouse(id, userId) match {
            case Some(house) =>
              HouseBean.updateHouseInfo(amenities, house)
              Ok(Json.toJson("Данные успешно сохранены"))
            case None =>
              BadRequest(Json.toJson(Empty()))
          }
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
