/* Stores OAuth1 credentials for securesocial */

package models

import org.squeryl.dsl._
import service._
import SquerylEntryPoint._
import org.squeryl.KeyedEntity
import org.squeryl.annotations._
import models.Account

case class OAuth1CredentialSet( id: Long,
                                @Column("account_id")
                                accountId: Long,
                                token: String,
                                secret: String
) extends KeyedEntity[Long] {
  lazy val account: ManyToOne[Account] = Database.accountToOAuth1Info.right(this)
}

object OAuth1CredentialSet {
  import Database.oauth1InfoTable
  
  def insert(oa1cs: OAuth1CredentialSet): OAuth1CredentialSet = inTransaction {
    oauth1InfoTable.insert(oa1cs)
  }
}
