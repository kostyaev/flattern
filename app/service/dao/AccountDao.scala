package service.dao

import service._
import SquerylEntryPoint._
import org.squeryl.Query
import securesocial.core.{Identity, IdentityId}
import play.Logger
import models._
import securesocial.core.SecuredRequest


object AccountDao extends SquerylDao[Account, Long] {
  def table =  Database.accountTable

  def insert(account: Account): Account = inTransaction {
    table.insert(account)
  }

  def findByEmailSocialProvider(email: String, socialProvider: String): Option[Account] =
    inTransaction { findByEmailSocialProviderQ(email, socialProvider).toList.headOption }

  def findByUserId(id: Long): Option[Account] = inTransaction {
    findByAccountIdQ(id).toList.headOption
  }

  def findByIdentityId(uid: IdentityId): Option[Account] = inTransaction {
    findByIdentityIdQ(uid).toList.headOption
  }

  def findByIdentityId[T](implicit request: SecuredRequest[T]): Account = findByIdentityId(request.user.identityId).get

  def fromIdentity(i: Identity): Account = {
    var a = Account(0, i.identityId.userId, i.authMethod.method, i.identityId.providerId, i.avatarUrl, i.firstName,
      i.lastName, i.fullName, i.email)

    findByIdentityId(i.identityId) match {
      case Some(pa) => AccountDao.update(pa); a = pa
      case None    => AccountDao.insert(a)
    }

    // Save the three associated elements of Identity trait (oauth info, passwords)
    i.oAuth1Info match {
      case Some(ssoa1i) => {
        OAuth1CredentialSet.getByAccountId(a.id) match {
          case Some(c) => OAuth1CredentialSet.update(c.copy(token = ssoa1i.token, secret = ssoa1i.secret))
          case None    => OAuth1CredentialSet.insert(OAuth1CredentialSet(0, a.id, ssoa1i.token, ssoa1i.secret))
        }
      }
      case None => {}
    }

    i.oAuth2Info match {
      case Some(ssoa2i) => {
        OAuth2CredentialSet.getByAccountId(a.id) match {
          case Some(c) => OAuth2CredentialSet.update(
            c.copy(
              accessToken = ssoa2i.accessToken,
              tokenType = ssoa2i.tokenType,
              expiresIn = ssoa2i.expiresIn,
              refreshToken = ssoa2i.refreshToken
            )
          )
          case None => OAuth2CredentialSet.save(OAuth2CredentialSet(0, a.id, ssoa2i.accessToken, ssoa2i.tokenType,
            ssoa2i.expiresIn, ssoa2i.refreshToken))
        }
      }
      case None => {}
    }

    i.passwordInfo match {
      case Some(sspwi) => {
        Logger.info("Saving password info.")
        Logger.info("Data: " + a.userId + ", " + sspwi.hasher + ", " + sspwi.password + ", " +
          sspwi.salt + ", ")

        PasswordCredentialSet.getByAccountId(a.id) match {
          case Some(c) => PasswordCredentialSet.update(
            c.copy(
              hasher = sspwi.hasher,
              password = sspwi.password,
              salt = sspwi.salt
            )
          )
          case None => PasswordCredentialSet.insert(
            PasswordCredentialSet(0, a.id, sspwi.hasher, sspwi.password, sspwi.salt)
          )
        }
      }
      case None => {}
    }

    a
  }

  def remove(account: Account) = inTransaction {
    removeQ(account)
  }

  private def findByEmailSocialProviderQ(email: String, sp: String): Query[Account] = from(table) {
    Logger.info("Constructing query for email " + email + ", social provider: " + sp)
    a => where(a.email === email and a.providerId === sp).select(a)
  }

  private def findByAccountIdQ(id: Long): Query[Account] = from(table) {
    account => where(account.id === id).select(account)
  }

  private def findByIdentityIdQ(uid: IdentityId): Query[Account] = from(table) {
    account => where(account.userId === uid.userId and
      account.providerId === uid.providerId).select(account)
  }

  private def removeQ(account: Account) = {
    table.deleteWhere(a => account.userId === a.userId)
  }
}