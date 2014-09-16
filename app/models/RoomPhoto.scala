package models

import service.dao.Identifiable

case class RoomPhoto( id      : Long,
                      room_id : Long
) extends Identifiable[Long]