package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

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

}