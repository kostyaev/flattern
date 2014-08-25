package provider

import models.{Account, User}
import org.joda.time.LocalDate
import dto.user.UserEnums.Privacy.Privacy
import dto.user.UserEnums.SexType.SexType

case class UserSearchProvider(
  fullName   : Option[String]        = None,
  country    : Option[String]        = None,
  city       : Option[String]        = None,
  region     : Option[String]        = None,
  priceStart : Option[Double]        = None,
  priceFinish: Option[Double]        = None,
  ageStart   : Option[Int]           = None,
  ageFinish  : Option[Int]           = None,
  sex        : Option[SexType]       = None,
  privacy    : Option[List[Privacy]] = None
)
