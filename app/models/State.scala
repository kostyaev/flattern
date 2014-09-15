package models

case class State( id         : Int,
                  country_id : Int,
                  names      : Map[String, String],
                  code       : Option[String] = None
)