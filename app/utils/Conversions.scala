package utils

import org.joda.time.{Days, LocalDate}

import scala.language.implicitConversions

object Conversions {

  implicit def conditionsConversion(that: Map[String, String]): Map[String, Boolean] =
    that.map(e => e._1 -> (e._2 match {
      case "true" => true
      case _ => false
    })
    )

  implicit def dateToDays(date: LocalDate): Int =
  Days
    .daysBetween(date, LocalDate.now())
    .getDays


}

