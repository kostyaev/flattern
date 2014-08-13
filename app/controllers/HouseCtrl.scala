package controllers

import dto.{HouseGeneral, HouseDesc, HouseAmenities, HouseAddress}
import org.joda.time.LocalDate
import play.api.Logger
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{Action, Controller}

object HouseCtrl extends Controller {

  case class HouseNew(id          : Option[Long]      = None,
                      house_type  : Option[String],
                      rentType    : Option[String],
                      addressId   : Option[Long]      = None,
                      allSlots    : Option[Int]       = None,
                      freeSlots   : Option[Int]       = None,
                      busySlots   : Option[Int]       = None,
                      numOfRooms  : Option[Int]       = None,
                      area        : Option[Double]    = None,
                      title       : Option[String]    = None,
                      description : Option[String]    = None,
                      conditions  : Option[Map[String, String]],
                      photo       : Option[Long]      = None,
                      date        : Option[LocalDate] = Option(LocalDate.now()),
                      isPublished : Option[Boolean]   = None
                    )

  implicit val houseReads = Json.reads[HouseNew]
  implicit val houseGeneralReads = Json.reads[HouseGeneral]
  implicit val houseAddressReads = Json.reads[HouseAddress]
  implicit val houseAmenitiesReads = Json.reads[HouseAmenities]
  implicit val houseDescReads = Json.reads[HouseDesc]


  def saveGeneral = Action(parse.json) { request =>
    request.body.validate[HouseGeneral].fold(
      errors => {
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
      },
      houseGeneral =>  {
        Ok(houseGeneral.toString)
      }
    )
  }



  def save = Action(parse.json) { request =>
    request.body.validate[HouseNew].fold(
      errors => {
        Logger.info(JsError.toFlatJson(errors).toString())
        BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(errors)))
      },
      house =>  {
        Logger.info(house.toString)
        Ok(house.toString)
      }
    )
  }


}
