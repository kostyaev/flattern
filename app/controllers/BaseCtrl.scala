package controllers

import org.squeryl.PrimitiveTypeMode
import play.api.mvc._


import scala.concurrent.Future

trait BaseCtrl extends Controller with PrimitiveTypeMode {
  object DBAction extends ActionBuilder[Request] {
    override def invokeBlock[A](request: Request[A],
                                block: (Request[A]) => Future[SimpleResult]): Future[SimpleResult] = transaction {
      block(request)
    }
  }

}
