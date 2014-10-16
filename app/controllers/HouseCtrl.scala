
package controllers

import beans.HouseBean
import com.github.tototoshi.play2.json4s.jackson._
import dto.house.HouseEnums.{Amenity, HouseType, RentType}
import dto.house._
import models.House
import org.json4s.ext.{EnumNameSerializer, JodaTimeSerializers}
import play.api.Logger
import play.api.mvc.Action

import scala.util.{Failure, Success, Try}

object HouseCtrl extends BaseCtrl with Json4s {

  import org.json4s._

  implicit val formats = DefaultFormats + FieldSerializer[House]() ++ JodaTimeSerializers.all +
    new EnumNameSerializer(HouseType) + new EnumNameSerializer(RentType) + new EnumNameSerializer(Amenity)

  def getConstants = Action {
    Ok(Extraction.decompose(HouseConstants())).as("application/json")
  }

  def getHouse(id: Long) = DBAction {
    HouseBean.getHouse(id) match {
      case Some(house) =>
        Logger.info("got house from db: " + house.toString)
        //val rentType = house.rentType.get
        //val houseType = house.houseType.get
        Ok(Extraction.decompose(house)).as("application/json")
      case None => BadRequest("NOT FOUND")
    }
  }

  def saveHouse = DBAction(json) { implicit request =>
    Logger.info("saving house")
    Logger.info(request.body.toString)
    Try {
      request.body.extract[House]
    } match {
      case Success(house) =>
        Logger.info(house.toString)
        Ok(HouseBean.saveHouse(house).id.toString)
      case Failure(msg) => BadRequest(msg.getMessage)
    }
  }

  def getProperties = DBAction {
    Ok(Extraction.decompose(HouseBean.getHouses)).as("application/json")
  }

  def uploadPhoto() = DBAction(parse.multipartFormData) { implicit request =>
      request.body.files.map { picture =>
        HouseBean.savePhoto(picture)
      }
    Ok("Image saved")
  }


  //  def createHouse = SecuredAction(ajaxCall = true) { implicit request =>
  //    withTransaction { implicit session =>
  //      val userId = UserBean.getAccount(request.user).get.uid.get
  //      val address = HouseBean.saveAddress(Address())
  //      val house = HouseBean.saveHouse(House(userId = userId, addressId = address.id))
  //      Ok(Json.toJson(house.id.get))
  //    }
  //  }
  //
  //  def getGeneral(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
  //    withTransaction{ implicit session =>
  //      Logger.info("general")
  //      val userId = UserBean.getAccount(request.user).get.uid.get
  //      HouseBean.getHouse(id, userId) match {
  //        case Some(house) => Ok(Json.toJson(HouseHelper.getHouseGeneral(house)))
  //        case None => BadRequest(Json.toJson(Empty()))
  //      }
  //    }
  //  }
  //
  //  def saveGeneral(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request => {
  //    withTransaction { implicit session =>
  //      Logger.info(request.body.toString())
  //      request.body.validate[HouseGeneral].fold(
  //        errors => {
  //          Logger.info(JsError.toFlatJson(errors).toString())
  //          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
  //        },
  //        houseGeneral => {
  //          Logger.info(houseGeneral.toString)
  //          val userId = UserBean.getAccount(request.user).get.uid.get
  //          HouseBean.getHouse(id, userId) match {
  //            case Some(house) =>
  //              HouseBean.updateHouseInfo(houseGeneral, house)
  //              Ok(Json.toJson("Данные успешно сохранены"))
  //            case None => BadRequest(Json.toJson(Empty()))
  //          }
  //        }
  //      )
  //    }
  //  }
  //  }
  //
  //
  //  def getAddress(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
  //    withTransaction { implicit session =>
  //      HouseBean.getAddressByHouseId(id) match {
  //        case Some(address) =>
  //          Ok(Json.toJson(HouseHelper.getHouseAddress(address)))
  //        case None => Ok(Json.toJson(Empty()))
  //      }
  //    }
  //  }
  //
  //  def saveAddress(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
  //    withTransaction { implicit session =>
  //      request.body.validate[HouseAddress].fold(
  //        errors => {
  //          Logger.info(JsError.toFlatJson(errors).toString())
  //          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
  //        },
  //        address => {
  //          Logger.info("saving address " + address.toString)
  //          val userId = UserBean.getAccount(request.user).get.uid.get
  //          HouseBean.getHouse(id, userId) match {
  //            case Some(house) =>
  //              HouseBean.updateHouseInfo(address, house)
  //              Ok(Json.toJson("Данные успешно сохранены"))
  //            case None =>
  //              BadRequest(Json.toJson(Empty()))
  //          }
  //        }
  //      )
  //    }
  //  }
  //
  //  def getDesc(id: Long) =  SecuredAction(ajaxCall = true) { implicit request =>
  //    withTransaction { implicit session =>
  //      Logger.info("get desc")
  //      val userId = UserBean.getAccount(request.user).get.uid.get
  //      HouseBean.getHouse(id, userId) match {
  //        case Some(house) => Ok(Json.toJson(HouseHelper.getHouseDesc(house)))
  //        case None => BadRequest(Json.toJson(Empty()))
  //      }
  //    }
  //  }
  //
  //
  //  def saveDesc(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
  //    withTransaction { implicit session =>
  //      Logger.info("save desc")
  //      request.body.validate[HouseDesc].fold(
  //        errors => {
  //          Logger.info(JsError.toFlatJson(errors).toString())
  //          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
  //        },
  //        desc => {
  //          Logger.info("saving desc " + desc.toString)
  //          val userId = UserBean.getAccount(request.user).get.uid.get
  //          HouseBean.getHouse(id, userId) match {
  //            case Some(house) =>
  //              HouseBean.updateHouseInfo(desc, house)
  //              Ok(Json.toJson("Данные успешно сохранены"))
  //            case None =>
  //              BadRequest(Json.toJson(Empty()))
  //          }
  //        }
  //      )
  //    }
  //  }
  //
  //  def getAmenities(id: Long) = SecuredAction(ajaxCall = true) { implicit request =>
  //    withTransaction { implicit session =>
  //      val userId = UserBean.getAccount(request.user).get.uid.get
  //      HouseBean.getHouse(id, userId) match {
  //        case Some(house) => Ok(Json.toJson(HouseAmenities(house.amenities)))
  //        case None => BadRequest(Json.toJson(Empty()))
  //      }
  //    }
  //  }
  //
  //
  //  def saveAmenities(id: Long) = SecuredAction(ajaxCall = true)(parse.json) { implicit request =>
  //    withTransaction { implicit session =>
  //      Logger.info(request.body.toString())
  //      request.body.validate[HouseAmenities].fold(
  //        errors => {
  //          Logger.info(JsError.toFlatJson(errors).toString())
  //          BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
  //        },
  //        amenities => {
  //          val userId = UserBean.getAccount(request.user).get.uid.get
  //          Logger.info(amenities.toString)
  //          HouseBean.getHouse(id, userId) match {
  //            case Some(house) =>
  //              HouseBean.updateHouseInfo(amenities, house)
  //              Ok(Json.toJson("Данные успешно сохранены"))
  //            case None =>
  //              BadRequest(Json.toJson(Empty()))
  //          }
  //        }
  //      )
  //    }
  //  }
  //

  //
  //  def getHouses = SecuredAction(ajaxCall = true) { implicit request =>
  //    withTransaction { implicit session =>
  //      val housesPage = HouseBean.getHousePage(pageSize = Page.DEFAULT_PAGE_SIZE, page = 1)
  //      Ok(Json.toJson(housesPage))
  //    }
  //  }


}
