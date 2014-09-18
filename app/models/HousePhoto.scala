package models

import org.squeryl.KeyedEntity
import org.squeryl.annotations._
import org.squeryl.dsl.ManyToOne
import service.Database

case class HousePhoto( id: Long,
                       @Column("house_id")
                       houseId: Long,
                       title: Option[String] = None,
                       description: Option[String] = None
) extends KeyedEntity[Long] {

  lazy val house: ManyToOne[House] = Database.houseToPhoto.right(this)

}
