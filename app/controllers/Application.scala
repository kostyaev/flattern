package controllers

import play.api._
import play.api.mvc._
import securesocial.core._
import play.api.libs.json.Json
import service.dao.AccountDao


object Application extends Controller with SecureSocial {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def jsRoutes(varName: String = "jsRoutes") = Action { implicit request =>
    Ok(
      Routes.javascriptRouter(varName)(
        routes.javascript.Test.test,
        routes.javascript.HouseCtrl.saveGeneral,
        routes.javascript.HouseCtrl.getGeneral,
        routes.javascript.HouseCtrl.getConstants,
        routes.javascript.HouseCtrl.getAmenities,
        routes.javascript.HouseCtrl.saveAmenities,
        routes.javascript.HouseCtrl.getAddress
        // TODO Add your routes here
      )
    ).as(JAVASCRIPT)
  }

  def checkAuth = SecuredAction(ajaxCall = true) { implicit request =>
    val user = AccountDao.findByIdentityId
    Ok(Json.toJson(Map(
      "success" -> "true",
      "id"       -> user.uid.toString,
      "fullName" -> user.fullName.toString
    )))
  }

}