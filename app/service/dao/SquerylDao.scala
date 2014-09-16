package service.dao

import org.squeryl.Table
import service.SquerylEntryPoint._

trait SquerylDao[M <: Identifiable[I], I] {

  val table: Table[M]

  def create(entity: M) = table.insert(entity)

  def update(entity: M) = table.update(entity)

  def findAll(offset: Int = 0, results: Int = Integer.MAX_VALUE) = from(table)(a => select(a)).page(offset, results).toList

  def delete(entity: M) = table.delete(entity.id)
}
