/* Persistence for the secure social "token" object */
package models

import org.squeryl.KeyedEntity
import org.joda.time.DateTime
import org.squeryl.annotations._

case class SecureSocialToken( uuid: String,
                              email: String,
                              @Column("creation_time")
                              creationTime: DateTime,
                              @Column("expiration_time")
                              expirationTime: DateTime,
                              @Column("is_signup")
                              isSignup: Boolean
) extends KeyedEntity[String] {
  def id: String = uuid
}