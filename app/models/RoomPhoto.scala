package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class RoomPhoto( id      : Long,
                      room_id : Long
)