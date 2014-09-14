/* Stores OAuth2 credentials for Securesocial */
package models

import org.squeryl.dsl._
import service._
import SquerylEntryPoint._

case class OAuth2CredentialSet( id: Long,
                                account_id: Long,
                                access_token: String,
                                token_type: Option[String] = None,
                                expires_in: Option[Int] = None,
                                refresh_token: Option[String] = None) {

  lazy val account: ManyToOne[Account] = Database.accountToOAuth2Info.right(this)
}
    
object OAuth2CredentialSet {
  import Database.oauth2InfoTable
  
  def insert(oa2cs: OAuth2CredentialSet): OAuth2CredentialSet = inTransaction {
    oauth2InfoTable.insert(oa2cs)
  }
}
