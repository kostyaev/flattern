package controllers

import beans.OtherBean
import play.api.i18n._
import play.api.libs.json._
import play.api.mvc._
import dto.landing.LandingForm

object LandingCtrl extends Controller {
  implicit val landingFormFormat = Json.format[LandingForm]

  def send = Action(parse.json) { request =>
    request.body.validate[LandingForm].fold(
      errors => {
        BadRequest(Json.obj(
          "success" -> Json.toJson(false),
          "msg"     -> Json.toJson(Messages("landing.msg.error"))
        ))
      },
      landingForm => {
        if(landingForm.isValid) {
          OtherBean.saveEmail(request, landingForm)
          Ok(Json.obj(
            "success" -> Json.toJson(true),
            "msg"     -> Json.toJson(Messages("landing.msg.success"))
          ))
        } else {
          BadRequest(Json.obj(
            "success" -> Json.toJson(false),
            "msg"     -> Json.toJson(Messages("landing.msg.error"))
          ))
        }
      }
    )
  }
}
