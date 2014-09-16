package models

import org.squeryl.KeyedEntity

case class LandingEmail( id   : Long,
                         email: String,
                         ip   : String
) extends KeyedEntity[Long] {
  def this(email: String, ip: String) = this(0, email, ip)
}
