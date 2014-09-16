/* Stores username/password combo for SecureSocial */
package models

import org.squeryl.dsl._
import service._
import SquerylEntryPoint._
import org.squeryl.KeyedEntity

case class PasswordCredentialSet( id: Long,
                                  account_id: Long,
                                  hasher: String,
                                  password: String,
                                  salt: Option[String] = None
) extends KeyedEntity[Long] {
  lazy val account: ManyToOne[Account] = Database.accountToPasswordInfo.right(this)
}

object PasswordCredentialSet {
  import Database.passwordInfoTable
  
  def insert(pwcs: PasswordCredentialSet): PasswordCredentialSet = inTransaction {
    passwordInfoTable.insert(pwcs)
  }
}
