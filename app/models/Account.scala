package models

import service._
import SquerylEntryPoint._
import org.squeryl.dsl._
import securesocial.core.{AuthenticationMethod}
import securesocial.core.{OAuth1Info, OAuth2Info, PasswordInfo}

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
