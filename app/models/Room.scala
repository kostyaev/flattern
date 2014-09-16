package models

import service.dao.Identifiable

case class Room( id       : Long,
                 house_id : Long,
                 area     : Double,
                 price    : Option[Double] = None,
                 seats    : Option[Int]     = None
) extends Identifiable[Long]
