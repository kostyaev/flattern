package controllers

import dto.{HouseAmenity, HouseAddress, HouseDesc, HouseGeneral}
import constants.HouseConstants
import play.api.Logger
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{Action, Controller}

object HouseCtrl extends Controller {

  implicit val houseGeneralReads = Json.reads[HouseGeneral]
  implicit val houseAddressReads = Json.reads[HouseAddress]
  implicit val houseDescReads = Json.reads[HouseDesc]
  implicit val houseEnumsReads = Json.reads[HouseConstants]
  implicit val houseAmenityReads = Json.reads[HouseAmenity]

  implicit val houseGeneralWrites = Json.writes[HouseGeneral]
  implicit val houseAddressWrites = Json.writes[HouseAddress]
  implicit val houseDescWrites = Json.writes[HouseDesc]
  implicit val houseEnumsWrites = Json.writes[HouseConstants]
  implicit val houseAmenityWrites = Json.writes[HouseAmenity]



  def getGeneral = Action {
    Ok(Json.toJson(HouseGeneral("Квартира", "Отдельная комната", 31000)))
  }

  def saveGeneral = Action(parse.json) { request =>
    Logger.info(request.body.toString())
    request.body.validate[HouseGeneral].fold(
      errors => {
        Logger.info(JsError.toFlatJson(errors).toString())
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
      },
      houseGeneral =>  {
        Ok("Данные успешно сохранены")
      }
    )
  }

  def getConstants = Action {
    Ok(Json.toJson(HouseConstants()))

  }

  def getAmenities = Action {
    val amenities = for((k,v) <- HouseConstants.Amenities)
      yield { HouseAmenity(k, v, value = true)}
    Ok(Json.toJson(amenities.toList.sortBy(_.id)))
  }


}
