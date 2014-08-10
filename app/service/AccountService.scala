package service

import play.api.{Logger, Application}
import securesocial.core.{Identity, IdentityId, UserServicePlugin}
import securesocial.core.providers.Token
import service.dao._
import org.joda.time.DateTime
import scala.language.reflectiveCalls


class AccountService(application: Application) extends UserServicePlugin(application) {

  def find(id: IdentityId) = AccountDao.findByIdentityId(id)

  def save(user: Identity) = AccountDao.update(user)

  def findByEmailAndProvider(email: String, providerId: String) = {
    AccountDao.findByEmailAndProvider(email, providerId)
  }

  def save(token: Token) {
    TokenDao.save(token)
  }

  def findToken(tokenId: String) = {
    TokenDao.findById(tokenId)
  }

  def deleteToken(uuid: String) {
    TokenDao.delete(uuid)
  }

  def deleteExpiredTokens() {
    TokenDao.deleteExpiredTokens(DateTime.now())
  }

  def link(current: Identity, to: Identity) = ???
}