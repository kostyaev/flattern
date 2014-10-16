package service

import models._
import org.squeryl.PrimitiveTypeMode
import play.api.Application
import securesocial.core.providers.Token
import securesocial.core.{Identity, IdentityId, UserServicePlugin}
import service.dao._

import scala.language.reflectiveCalls


class AccountService(application: Application) extends UserServicePlugin(application) with PrimitiveTypeMode{

  def find(id: IdentityId) = {
    AccountDao.findByIdentityId(id)
  }

  def save(ssUser: Identity): Identity = {
    AccountDao.fromIdentity(ssUser)
  }

  def findByEmailAndProvider(email: String, providerId: String) = {
    AccountDao.findByEmailSocialProvider(email, providerId)
  }

  def save(t: Token) {
    val sst = SecureSocialToken(t.uuid, t.email, t.creationTime, t.expirationTime, t.isSignUp)
    TokenDao.insert(sst)
  }

  def findToken(uuid: String): Option[Token] = {
    TokenDao.findByUUID(uuid) match {
      case Some(t) => Some(Token(t.uuid, t.email, t.creationTime, t.expirationTime, t.isSignup))
      case None => None
    }
  }

  def deleteToken(uuid: String) = TokenDao.deleteByUUID(uuid)

  def deleteTokens() = TokenDao.deleteAll

  def deleteExpiredTokens() = TokenDao.deleteExpired

  def link(current: Identity, to: Identity) = ???
}