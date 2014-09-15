package models

case class Address( id          : Option[Long]   = None,
                    city        : Option[String] = None,
                    country     : Option[String] = None,
                    street      : Option[String] = None,
                    building    : Option[String] = None,
                    housing     : Option[String] = None,
                    floor       : Option[Int]    = None,
                    apt         : Option[Int]    = None) {

}

