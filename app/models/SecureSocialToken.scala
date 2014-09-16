/* Persistence for the secure social "token" object */
package models

import service.dao.Identifiable
import org.joda.time.DateTime

case class SecureSocialToken( uuid: String,
                              email: String,
                              creation_time: DateTime,
                              expiration_time: DateTime,
                              is_signup: Boolean
) extends Identifiable[String] {
  def id: String = uuid
}