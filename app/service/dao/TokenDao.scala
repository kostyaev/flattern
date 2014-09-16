package service.dao

import models._
import service._
import SquerylEntryPoint._
import org.joda.time.DateTime
import org.squeryl.Query

object TokenDao extends SquerylDao[SecureSocialToken, String] {

  def table = Database.secureSocialTokenTable

  def insert(t: SecureSocialToken): SecureSocialToken = inTransaction {
    table.insert(t)
  }

  def deleteAll: Int = inTransaction {
    table.deleteWhere(t => 1 === 1)
  }

  def deleteExpired: Int = inTransaction {
    table.deleteWhere(t => t.expiration_time < DateTime.now())
  }

  def deleteByUUID(uuid: String): Int = inTransaction {
    table.deleteWhere(t => t.uuid === uuid)
  }

  private def findByUUIDQ(uuid: String): Query[SecureSocialToken] = from(table) {
    t => where(t.uuid === uuid).select(t)
  }

  def findByUUID(uuid: String): Option[SecureSocialToken] = inTransaction {
    TokenDao.findByUUIDQ(uuid).headOption
  }
}