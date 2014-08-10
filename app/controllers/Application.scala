package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def jsRoutes(varName: String = "jsRoutes") = Action { implicit request =>
    Logger.info("invoked")
    val res = Routes.javascriptRouter(varName)(
      routes.javascript.Test.test)
    Logger.info(res)
    Ok(
      Routes.javascriptRouter(varName)(
        routes.javascript.Test.test
        // TODO Add your routes here
      )
    ).as(JAVASCRIPT)
  }

}