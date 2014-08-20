package controllers

import beans.HouseBean
import constants.HouseConstants
import dto.{HouseAddress, HouseAmenity, HouseDesc, HouseGeneral}
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


  def getConstants = Action {
    Ok(Json.toJson(HouseConstants()))

  }


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

  def getAmenities = Action {
    val amenities = for((k,v) <- HouseConstants.Amenities)
    yield { HouseAmenity(k, v, selected = false)}
    Ok(Json.toJson(amenities.toList.sortBy(_.id)))
  }

  def saveAmenities = Action(parse.json) { request =>
    request.body.validate[List[HouseAmenity]].fold(
      errors => {
        Logger.info(JsError.toFlatJson(errors).toString())
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
      },
      list => {
        Logger.info(list.toString())
        Ok("Данные успешно сохранены")
      }
    )
  }

  def getAddress = Action {
    Ok(Json.toJson(HouseAddress("RU", "Москва", Option("Грина"))))
  }

  def uploadPhoto(houseId: Long = 1L) = Action(parse.multipartFormData) { implicit request =>
    Logger.info("picture")
    request.body.file("photo").map { picture =>
      val photo = HouseBean.savePhoto(houseId, picture)
      val json = Json.obj("id" -> photo.id,  "title" -> photo.title, "description" -> photo.description)
      //FIXME replace sleep, possibly with java.nio
      Thread.sleep(1500)
      Ok(json)
    }.getOrElse(Ok("Failed"))
  }


}
