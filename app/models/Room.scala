package models

import org.squeryl.KeyedEntity

case class Room( id       : Long,
                 house_id : Long,
                 area     : Double,
                 price    : Option[Double] = None,
                 seats    : Option[Int]     = None
) extends KeyedEntity[Long]
