package service.dao

import service._
import SquerylEntryPoint._
import org.squeryl.Query
import securesocial.core.{Identity, IdentityId}
import play.Logger
import models._


object AccountDao {
  import Database.accountTable

  def insert(account: Account): Account = inTransaction {
    accountTable.insert(account)
  }

  def findByEmailSocialProvider(email: String, socialProvider: String): Option[Account] =
    inTransaction { findByEmailSocialProviderQ(email, socialProvider).toList.headOption }

  def findByUserId(id: Long): Option[Account] = inTransaction {
    findByAccountIdQ(id).toList.headOption
  }

  def findByIdentityId(uid: IdentityId): Option[Account] = inTransaction {
    findByIdentityIdQ(uid).toList.headOption
  }

  def fromIdentity(i: Identity): Account = {
    val a = Account(0, i.identityId.userId, i.authMethod.method, i.identityId.providerId, i.avatarUrl, i.firstName,
      i.lastName, i.fullName, i.email)
    AccountDao.insert(a)  	// Get id to associate OAuth objects

    // Save the three associated elements of Identity trait (oauth info, passwords)
    i.oAuth1Info match {
      case Some(ssoa1i) => {
        val oa1 = OAuth1CredentialSet(0, a.id, ssoa1i.token, ssoa1i.secret)
        OAuth1CredentialSet.insert(oa1)
      }
      case None => {}
    }

    i.oAuth2Info match {
      case Some(ssoa2i) => {
        val oa2 = OAuth2CredentialSet(0, a.id, ssoa2i.accessToken, ssoa2i.tokenType,
          ssoa2i.expiresIn, ssoa2i.refreshToken)
        OAuth2CredentialSet.insert(oa2)
      }
      case None => {}
    }

    i.passwordInfo match {
      case Some(sspwi) => {
        Logger.info("Saving password info.")
        Logger.info("Data: " + a.user_id + ", " + sspwi.hasher + ", " + sspwi.password + ", " +
          sspwi.salt + ", ")
        val pwi = PasswordCredentialSet(0, a.id, sspwi.hasher, sspwi.password, sspwi.salt)
        PasswordCredentialSet.insert(pwi)
      }
      case None => {}
    }

    a
  }

  def remove(account: Account) = inTransaction {
    removeQ(account)
  }

  private def findByEmailSocialProviderQ(email: String, sp: String): Query[Account] = from(accountTable) {
    Logger.info("Constructing query for email " + email + ", social provider: " + sp)
    a => where(a.email_address === email and a.auth_method === sp).select(a)
  }

  private def findByAccountIdQ(id: Long): Query[Account] = from(accountTable) {
    account => where(account.id === id).select(account)
  }

  private def findByIdentityIdQ(uid: IdentityId): Query[Account] = from(accountTable) {
    account => where(account.user_id === uid.userId and
      account.provider_id === uid.providerId).select(account)
  }

  private def removeQ(account: Account) = {
    accountTable.deleteWhere(a => account.user_id === a.user_id)
  }
}