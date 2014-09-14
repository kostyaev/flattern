package service

import org.squeryl.PrimitiveTypeMode._
import org.squeryl.Schema
import models._

object Database extends Schema {

  val accountTable  = table[Account]("account")
  val oauth1InfoTable = table[OAuth1CredentialSet]("oauth1_credential_sets")
  val oauth2InfoTable = table[OAuth2CredentialSet]("oauth2_credential_sets")
  val passwordInfoTable = table[PasswordCredentialSet]("password_credential_sets")
  val secureSocialTokenTable = table[SecureSocialToken]("secure_social_tokens")

  val accountToOAuth1Info = oneToManyRelation(accountTable, oauth1InfoTable).
    via((account, oauth1info) => account.id === oauth1info.account_id)
  val accountToOAuth2Info = oneToManyRelation(accountTable, oauth2InfoTable).
    via((account, oauth2Info) => account.id === oauth2Info.account_id)
  val accountToPasswordInfo = oneToManyRelation(accountTable, passwordInfoTable).
    via((account, passwordInfo) => account.id === passwordInfo.account_id)

  // Tables
  on(accountTable) { x => declare {
    x.id is(autoIncremented("user_id_seq"), primaryKey)
  }}

  on(oauth1InfoTable) { x => declare {
    x.id is(autoIncremented("oauth1_credential_sets_id_seq"), primaryKey)
  }}

  on(oauth2InfoTable) { x => declare {
    x.id is(autoIncremented("oauth2_credential_sets_id_seq"), primaryKey)
  }}

  on(passwordInfoTable) { x => declare {
    x.id is(autoIncremented("password_credential_sets_id_seq"), primaryKey)
  }}

  on(secureSocialTokenTable) { x => declare {
    x.uuid is(primaryKey)
  }}

}
