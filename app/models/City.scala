package models

import org.squeryl.KeyedEntity

case class City( id      : Int,
                 //names   : Map[String, String],
                 code    : Option[String] = None,
                 state_id: Int
) extends KeyedEntity[Int]
