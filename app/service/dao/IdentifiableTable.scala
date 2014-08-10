package service.dao

import scala.slick.lifted.Column

trait IdentifiableTable[I] {
  def id: Column[I]
}
