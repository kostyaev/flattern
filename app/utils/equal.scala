package utils

import shapeless.Poly2
import utils.DgDriver.simple._
import org.joda.time.LocalDate

object equal extends Poly2 {
  implicit def long            = at[Column[Long], Option[Long]] ((col, field) => field.map(x => col === x))
  implicit def string          = at[Column[String], Option[String]] ((col, field) => field.map(x => col === x))
  implicit def double          = at[Column[Double], Option[Double]] ((col, field) => field.map(x => col === x))

  implicit def optionLong      = at[Column[Option[Long]], Option[Long]] ((col, field) => field.map(x => col === x))
  implicit def optionInt       = at[Column[Option[Int]],  Option[Int]] ((col, field) => field.map(x => col === x))
  implicit def optionString    = at[Column[Option[String]], Option[String]] ((col, field) => field.map(x => col === x))
  implicit def optionDouble    = at[Column[Option[Double]], Option[Double]] ((col, field) => field.map(x => col === x))
  implicit def optionLocalDate = at[Column[Option[LocalDate]], Option[LocalDate]] ((col, field) => field.map(x => col === x))
  implicit def optionHsotre    = at[Column[Option[Map[String, String]]], Option[Map[String, String]]] ((col, field) => field.map(x => col === x))
}