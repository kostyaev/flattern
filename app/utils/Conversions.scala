package utils

import org.joda.time.{Days, LocalDateTime}

import scala.language.implicitConversions

object Conversions {

  implicit def conditionsConversion(that: Map[String, String]): Map[String, Boolean] =
    that.map(e => e._1 -> (e._2 match {
      case "true" => true
      case _ => false
    })
    )

  implicit def dateToDays(date: LocalDateTime): Int =
  Days
    .daysBetween(date, LocalDateTime.now())
    .getDays


}

