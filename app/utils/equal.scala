package utils

import dto.house.HouseEnums.HouseType.HouseType
import dto.house.HouseEnums.RentType.RentType
import org.joda.time.LocalDate
import shapeless.Poly2
import utils.DgDriver.simple._


object equal extends Poly2 {

  implicit def long            = at[Column[Long], Option[Long]] ((col, field) => field.map(x => col === x))
  implicit def string          = at[Column[String], Option[String]] ((col, field) => field.map(x => col === x))
  implicit def double          = at[Column[Double], Option[Double]] ((col, field) => field.map(x => col === x))

  implicit def optionLong      = at[Column[Option[Long]], Option[Long]] ((col, field) => field.map(x => col === x))
  implicit def optionInt       = at[Column[Option[Int]],  Option[Int]] ((col, field) => field.map(x => col === x))
  implicit def optionString    = at[Column[Option[String]], Option[String]] ((col, field) => field.map(x => col === x))
  implicit def optionDouble    = at[Column[Option[Double]], Option[Double]] ((col, field) => field.map(x => col === x))
  implicit def optionLocalDate = at[Column[Option[LocalDate]], Option[LocalDate]] ((col, field) => field.map(x => col === x))
  implicit def optionHstore    = at[Column[Option[Map[String, String]]], Option[Map[String, String]]] ((col, field) => field.map(x => col === x))

  implicit def optionHouseType = at[Column[Option[HouseType]], Option[HouseType]] ((col, field) => field.map(x => col === x))
  implicit def optionRentType  = at[Column[Option[RentType]], Option[RentType]] ((col, field) => field.map(x => col === x))

}