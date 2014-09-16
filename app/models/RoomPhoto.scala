package models

import org.squeryl.KeyedEntity

case class RoomPhoto( id      : Long,
                      room_id : Long
) extends KeyedEntity[Long]