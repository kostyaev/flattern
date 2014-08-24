package dto.user

import models.{Account, User}
import org.joda.time.LocalDate

trait UserInfo

case class UserGeneral(firstName: String,
                       lastName: String,
                       sex: Option[Int],
                       birthDate: Option[LocalDate],
                       email: String,
                       timezone: Int,
                       password1: Option[String],
                       password2: Option[String]) extends UserInfo {
  def getFullName = "%s %s".format(firstName, lastName)
  def getEmail = Option(email)
  def getTimeZone = Option(timezone)
}

object UserGeneral {
  def fill(user: (Account, User)): UserGeneral =
    UserGeneral(
      firstName = user._1.firstName,
      lastName  = user._1.lastName,
      sex       = user._2.sex,
      birthDate = user._2.birthday,
      email     = user._1.email.getOrElse(""),
      timezone  = user._2.timezone.getOrElse(0),
      password1 = Option(""),
      password2 = Option("")
    )

  def fill(a: Account, u: User): UserGeneral = fill((a, u))
}

case class UserAbout(wishes    : Option[String] = None,
                     wsex      : Option[Int]    = None,
                     wage      : Option[Int]    = None,
                     wprice    : Option[Double] = None,
                     wcountry  : Option[String] = None,
                     wdistrict : Option[String] = None,
                     privacy   : Option[List[String]]) {
  def getPrivacy = {
    val p = privacy match {
      case Some(list) if list.length > 0 => {
        val m = list.zip(List("true", "true")).toMap
        if(!m.contains("h")) m + ("h" -> "false")
        else if(!m.contains("u")) m + ("u" -> "false")
        else m
      }
      case _ => Map("h" -> "false", "u" -> "false")
    }

    Some(p)
  }

  def privacyList =
    (List("h" -> "Ищу жилье", "u" -> "Ищу сожителя") zip privacy.getOrElse(List("false", "false"))).toMap
}

object UserAbout {
  def fill(user: (Account, User)): UserAbout =
    UserAbout(
      wishes    = user._2.wishes,
      wsex      = user._2.wsex,
      wage      = user._2.wage,
      wprice    = user._2.wprice,
      wcountry  = user._2.wcountry,
      wdistrict = user._2.wdistrict,
      privacy   = Some(user._2.privacy.getOrElse(Map("h" -> "false", "u" -> "false")).map { case (k, v) => v }.toList)
    )

  def fill(a: Account, u: User): UserAbout = fill((a, u))

  def default = Map(("h" -> "Ищу жилье") -> "false", ("u" -> "Ищу сожителя") -> "false")
}
