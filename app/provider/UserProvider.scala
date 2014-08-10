package provider

import models.{Account, User}
import org.joda.time.LocalDate

case class UserProvider(
  firstName: String,
  lastName: String,
  sex: Option[Int],
  birthDate: Option[LocalDate],
  email: String,
  timezone: Int,
  password1: Option[String],
  password2: Option[String]
) {
  def getFullName = "%s %s".format(firstName, lastName)
  def getEmail = Option(email)
  def getTimeZone = Option(timezone)
}

object UserProvider {
  def fill(user: (Account, User)) =
    UserProvider(
      firstName = user._1.firstName,
      lastName  = user._1.lastName,
      sex       = user._2.sex,
      birthDate = user._2.birthday,
      email     = user._1.email.getOrElse(""),
      timezone  = user._2.timezone.getOrElse(0),
      password1 = Option(""),
      password2 = Option("")
    )
}
