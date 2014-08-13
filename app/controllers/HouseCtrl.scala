package controllers

import dto.{HouseAddress, HouseAmenities, HouseDesc, HouseGeneral}
import play.api.Logger
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{Action, Controller}

object HouseCtrl extends Controller {

  implicit val houseGeneralReads = Json.reads[HouseGeneral]
  implicit val houseAddressReads = Json.reads[HouseAddress]
  implicit val houseAmenitiesReads = Json.reads[HouseAmenities]
  implicit val houseDescReads = Json.reads[HouseDesc]


  def saveGeneral = Action(parse.json) { request =>
    Logger.info(request.body.toString())
    request.body.validate[HouseGeneral].fold(
      errors => {
        Logger.info(JsError.toFlatJson(errors).toString())
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
      },
      houseGeneral =>  {
        Ok(houseGeneral.toString)
      }
    )
  }


}
