package models

case class City( id      : Int,
                 names   : Map[String, String],
                 code    : Option[String] = None,
                 state_id: Int)
