package models

import service.dao.Identifiable

case class City( id      : Int,
                 names   : Map[String, String],
                 code    : Option[String] = None,
                 state_id: Int
) extends Identifiable[Int]
