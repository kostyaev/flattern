package models

case class LandingEmail( email: String,
                         ip   : String,
                         id   : Option[Long] = None
)
