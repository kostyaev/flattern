/* Stores username/password combo for SecureSocial */
package models

import org.squeryl.dsl._
import service._
import SquerylEntryPoint._
import org.squeryl.KeyedEntity
import org.squeryl.annotations._
import service.dao.SquerylDao

case class PasswordCredentialSet( id: Long,
                                  @Column("account_id")
                                  accountId: Long,
                                  hasher: String,
                                  password: String,
                                  salt: Option[String] = None
) extends KeyedEntity[Long] {
  lazy val account: ManyToOne[Account] = Database.accountToPasswordInfo.right(this)
}

object PasswordCredentialSet extends SquerylDao[PasswordCredentialSet, Long] {
  def table = Database.passwordInfoTable

  def insert(pwcs: PasswordCredentialSet): PasswordCredentialSet = inTransaction {
    table.insert(pwcs)
  }

  def getByAccountId(id: Long) = inTransaction {
    from(table) {
      c => where(c.accountId === id).select(c)
    }.toList.headOption
  }
}
