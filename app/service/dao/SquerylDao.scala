package service.dao

import org.squeryl.Table
import service.SquerylEntryPoint._
import org.squeryl.KeyedEntity
import org.squeryl.KeyedEntityDef

abstract class SquerylDao[M <: KeyedEntity[I], I] {

  def table: Table[M]

  def create(entity: M)(implicit k: KeyedEntityDef[M, I]) = table.insert(entity)

  def update(entity: M)(implicit k: KeyedEntityDef[M, I]) = table.update(entity)

  def findAll(offset: Int = 0, results: Int = Integer.MAX_VALUE) = from(table)(a => select(a)).page(offset, results).toList

  def delete(entity: M)(implicit k: KeyedEntityDef[M, I]) = table.delete(entity.id)
}
