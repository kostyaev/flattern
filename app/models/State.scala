package models

import org.squeryl.KeyedEntity

case class State( id         : Int,
                  country_id : Int,
                  //names      : Map[String, String],
                  code       : Option[String] = None
) extends KeyedEntity[Int]