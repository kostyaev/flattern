package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class Seat( id: Long,
                 room_id : Long,
                 user_id : Long
)