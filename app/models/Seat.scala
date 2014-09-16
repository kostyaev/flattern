package models

import org.squeryl.KeyedEntity

case class Seat( id: Long,
                 room_id : Long,
                 user_id : Long
) extends KeyedEntity[Long]