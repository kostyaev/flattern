package models

import service._
import SquerylEntryPoint._
import org.squeryl.Query
import org.squeryl.dsl._
import securesocial.core.{Identity, AuthenticationMethod, IdentityId}
import securesocial.core.{OAuth1Info, OAuth2Info, PasswordInfo}
import play.Logger


case class Account( id: Long,
                    user_id: String,
                    auth_method: String,
                    provider_id: String,
                    avatar_url: Option[String],
                    firstname: String,
                    lastname: String,
                    fullname: String,
                    email_address: Option[String]) extends securesocial.core.Identity {

  lazy val oauth1CredentialSets: OneToMany[OAuth1CredentialSet] =
    Database.accountToOAuth1Info.left(this)
  lazy val oauth2CredentialSets: OneToMany[OAuth2CredentialSet] =
    Database.accountToOAuth2Info.left(this)
  lazy val passwordCredentialSets: OneToMany[PasswordCredentialSet] =
    Database.accountToPasswordInfo.left(this)

  /*
   * SecureSocial Identity trait implementation
   */

  def authMethod: AuthenticationMethod = AuthenticationMethod(auth_method)
  def avatarUrl: Option[String] = avatar_url
  def email: Option[String] = email_address
  def firstName: String = firstname
  def fullName: String = fullname
  def lastName: String = lastname
  def userId: String = user_id

  def oAuth1Info: Option[OAuth1Info] = inTransaction {
    oauth1CredentialSets headOption match {
      case Some(cs) => Some(OAuth1Info(cs.token, cs.secret))
      case None => None
    }
  }

  def oAuth2Info: Option[OAuth2Info] = inTransaction {
    oauth2CredentialSets headOption match {
      case Some(cs) => Some(OAuth2Info(cs.access_token, cs.token_type, cs.expires_in, cs.refresh_token))
      case None => None
    }
  }

  def passwordInfo: Option[PasswordInfo] = inTransaction {
    passwordCredentialSets headOption match {
      case Some(pw) => {
        Some(PasswordInfo(pw.hasher, pw.password, pw.salt))
      }
      case None => None
    }
  }

  def identityId: securesocial.core.IdentityId = securesocial.core.IdentityId(user_id, provider_id)
}

object Account {
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
    Account.insert(a)  	// Get id to associate OAuth objects

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
