package models

import utils.DgDriver.simple._
import service.dao.IdentifiableTable
import service.WithDefaultSession

case class Room( id       : Long,
                 house_id : Long,
                 area     : Double,
                 price    : Option[Double] = None,
                 seats    : Option[Int]     = None
)
