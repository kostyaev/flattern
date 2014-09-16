package models

import service.dao.Identifiable

case class Seat( id: Long,
                 room_id : Long,
                 user_id : Long
) extends Identifiable[Long]