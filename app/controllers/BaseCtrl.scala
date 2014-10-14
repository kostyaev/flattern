package controllers

import org.squeryl.PrimitiveTypeMode
import play.api.Logger
import play.api.i18n.Messages
import play.api.libs.json.Json
import play.api.mvc._
import securesocial.core._
import securesocial.core.providers.utils.RoutesHelper
import scala.concurrent.Future

trait BaseCtrl extends Controller with PrimitiveTypeMode with SecureSocial {
  private def ajaxCallNotAuthenticated[A](implicit request: Request[A]): SimpleResult = {
    Unauthorized(Json.toJson(Map("error"->"Credentials required"))).as(JSON)
  }

  private def ajaxCallNotAuthorized[A](implicit request: Request[A]): SimpleResult = {
    Forbidden( Json.toJson(Map("error" -> "Not authorized"))).as(JSON)
  }

  object DBAction extends ActionBuilder[Request] {
    override def invokeBlock[A](request: Request[A],
                                block: (Request[A]) => Future[SimpleResult]): Future[SimpleResult] = transaction {
      block(request)
    }
  }

  object SecuredDBAction extends SecuredDBActionBuilder[SecuredRequest[_]] {
    def apply[A]() = new SecuredDBActionBuilder[A](false, None)
    def apply[A](ajaxCall: Boolean) = new SecuredDBActionBuilder[A](ajaxCall, None)
    def apply[A](authorize: Authorization) = new SecuredDBActionBuilder[A](false, Some(authorize))
    def apply[A](ajaxCall: Boolean, authorize: Authorization) = new SecuredDBActionBuilder[A](ajaxCall, Some(authorize))
  }

  class SecuredDBActionBuilder[A](ajaxCall: Boolean = false, authorize: Option[Authorization] = None)
    extends ActionBuilder[({ type R[A] = SecuredRequest[A] })#R] {

    def invokeSecuredBlock[A](ajaxCall: Boolean, authorize: Option[Authorization], request: Request[A],
                              block: SecuredRequest[A] => Future[SimpleResult]): Future[SimpleResult] =
      transaction {
        implicit val req = request
        val result = for (
          authenticator <- SecureSocial.authenticatorFromRequest;
          user <- UserService.find(authenticator.identityId)
        ) yield {
          touch(authenticator)
          if ( authorize.isEmpty || authorize.get.isAuthorized(user)) {
            block(SecuredRequest(user, request))
          } else {
            Future.successful {
              if ( ajaxCall ) {
                ajaxCallNotAuthorized(request)
              } else {
                Redirect(RoutesHelper.notAuthorized.absoluteURL(IdentityProvider.sslEnabled))
              }
            }
          }
        }

        result.getOrElse({
          if ( Logger.isDebugEnabled ) {
            Logger.debug("[securesocial] anonymous user trying to access : '%s'".format(request.uri))
          }
          val response = if ( ajaxCall ) {
            ajaxCallNotAuthenticated(request)
          } else {
            Redirect(RoutesHelper.login().absoluteURL(IdentityProvider.sslEnabled))
              .flashing("error" -> Messages("securesocial.loginRequired"))
              .withSession(session + (SecureSocial.OriginalUrlKey -> request.uri)
            )
          }
          Future.successful(response.discardingCookies(Authenticator.discardingCookie))
        })
      }

    def invokeBlock[A](request: Request[A], block: SecuredRequest[A] => Future[SimpleResult]) =
      invokeSecuredBlock(ajaxCall, authorize, request, block)
  }

}
