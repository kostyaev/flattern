package models

import org.squeryl.KeyedEntity

case class Address( id          : Long,
                    city        : Option[String] = None,
                    country     : Option[String] = None,
                    street      : Option[String] = None,
                    building    : Option[String] = None,
                    housing     : Option[String] = None,
                    floor       : Option[Int]    = None,
                    apt         : Option[Int]    = None
) extends KeyedEntity[Long]

