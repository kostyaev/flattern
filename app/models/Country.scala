package models

import org.squeryl.KeyedEntity

case class Country( id   : Int,
                    //names: Map[String, String],
                    code : Option[String] = None
) extends KeyedEntity[Int]
