package models

import service.dao.Identifiable
case class LandingEmail( id   : Long,
                         email: String,
                         ip   : String
) extends Identifiable[Long]
