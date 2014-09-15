package service.dao

import models._
import service._
import SquerylEntryPoint._
import org.joda.time.DateTime
import org.squeryl.Query

object TokenDao {
  import Database.secureSocialTokenTable

  def insert(t: SecureSocialToken): SecureSocialToken = inTransaction {
    secureSocialTokenTable.insert(t)
  }

  def deleteAll: Int = inTransaction {
    secureSocialTokenTable.deleteWhere(t => 1 === 1)
  }

  def deleteExpired: Int = inTransaction {
    secureSocialTokenTable.deleteWhere(t => t.expiration_time < DateTime.now())
  }

  def deleteByUUID(uuid: String): Int = inTransaction {
    secureSocialTokenTable.deleteWhere(t => t.uuid === uuid)
  }

  private def findByUUIDQ(uuid: String): Query[SecureSocialToken] = from(secureSocialTokenTable) {
    t => where(t.uuid === uuid).select(t)
  }

  def findByUUID(uuid: String): Option[SecureSocialToken] = inTransaction {
    SecureSocialToken.findByUUIDQ(uuid).headOption
  }
}