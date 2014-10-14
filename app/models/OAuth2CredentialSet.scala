/* Stores OAuth2 credentials for Securesocial */
package models

import org.squeryl.dsl._
import service._
import SquerylEntryPoint._
import org.squeryl.KeyedEntity
import org.squeryl.annotations._
import service.dao.SquerylDao

case class OAuth2CredentialSet( id: Long,
                                @Column("account_id")
                                accountId: Long,
                                @Column("access_token")
                                accessToken: String,
                                @Column("token_type")
                                tokenType: Option[String] = None,
                                @Column("expires_in")
                                expiresIn: Option[Int] = None,
                                @Column("refresh_token")
                                refreshToken: Option[String] = None
) extends KeyedEntity[Long] {
  lazy val account: ManyToOne[Account] = Database.accountToOAuth2Info.right(this)
}

object OAuth2CredentialSet extends SquerylDao[OAuth2CredentialSet, Long] {
  def table = Database.oauth2InfoTable

  def insert(oa2cs: OAuth2CredentialSet): OAuth2CredentialSet = inTransaction {
    table.insert(oa2cs)
  }

  def getByAccountId(id: Long) = inTransaction {
    from(table) {
      c => where(c.accountId === id).select(c)
    }.toList.headOption
  }
}
