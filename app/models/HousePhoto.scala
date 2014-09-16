package models

import service.dao.Identifiable
case class HousePhoto( id         : Long,
                       house_id   : Long,
                       title      : Option[String] = None,
                       description: Option[String] = None
) extends Identifiable[Long]
