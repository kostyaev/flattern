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

  //Enums
  implicit val houseTypeFormat = EnumUtils.enumFormat(HouseType)
  implicit val rentTypeFormat = EnumUtils.enumFormat(RentType)
  implicit val amenityFormat = EnumUtils.enumFormat(Amenity)

  //Case classes
  implicit val houseGeneralFormat = Json.format[HouseGeneral]
  implicit val houseGeneralEmptyFormat = Json.format[Empty]
  implicit val houseAddressFormat = Json.format[HouseAddress]
  implicit val houseDescFormat = Json.format[HouseDesc]
  implicit val houseConstantsFormat = Json.format[HouseConstants]
  implicit val houseAmenitiesFormat = Json.format[HouseAmenities]

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
          Ok(Json.toJson(HouseHelper.getHouseAddress(address)))
        case None => Ok(Json.toJson(Empty()))
      }
    }
  }

  def saveAddress(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
    withTransaction { implicit session =>
      request.body.validate[HouseAddress].fold(
        errors => {
          Logger.info(JsError.toFlatJson(errors).toString())
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
        },
        address => {
          Logger.info("saving address " + address.toString)
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

  def getDesc(id: Long) =  SecuredAction(ajaxCall = true) { implicit request =>
    withTransaction { implicit session =>
      Logger.info("get desc")
      val userId = UserBean.getAccount(request.user).get.uid.get
      HouseBean.getHouse(id, userId) match {
        case Some(house) => Ok(Json.toJson(HouseHelper.getHouseDesc(house)))
        case None => BadRequest(Json.toJson(Empty()))
      }
    }
  }


  def saveDesc(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
    withTransaction { implicit session =>
      Logger.info("save desc")
      request.body.validate[HouseDesc].fold(
        errors => {
          Logger.info(JsError.toFlatJson(errors).toString())
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
        },
        desc => {
          Logger.info("saving desc " + desc.toString)
          val userId = UserBean.getAccount(request.user).get.uid.get
          HouseBean.getHouse(id, userId) match {
            case Some(house) =>
              HouseBean.updateHouseInfo(desc, house)
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
        case Some(house) => Ok(Json.toJson(HouseAmenities(house.amenities)))
        case None => BadRequest(Json.toJson(Empty()))
      }
    }
  }


  def saveAmenities(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
    withTransaction { implicit session =>
      Logger.info(request.body.toString())
      request.body.validate[HouseAmenities].fold(
        errors => {
          Logger.info(JsError.toFlatJson(errors).toString())
          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
        },
        amenities => {
          val userId = UserBean.getAccount(request.user).get.uid.get
          Logger.info(amenities.toString)
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
