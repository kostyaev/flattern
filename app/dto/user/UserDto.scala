package dto.user

import UserEnums.Privacy.Privacy
import UserEnums.SexType.SexType
import models.{Account, User, House}
import org.joda.time.LocalDate

case class AccountDto(id: Long,
                      userId: String,
                      avatarUrl: Option[String],
                      firstName: String,
                      lastName: String,
                      fullName: String,
                      email: Option[String]
)

object AccountDto {
  def apply(account: Option[Account]) = {
    account.map(account =>
      new AccountDto(
        id          = account.id,
        userId      = account.userId,
        avatarUrl   = account.avatarUrl,
        firstName   = account.firstName,
        lastName    = account.lastName,
        fullName    = account.fullName,
        email       = account.email
      )
    )
  }
}

case class AccountUser(account: Option[AccountDto] = None, user: Option[User] = None, houses: Option[List[House]] = None)

trait UserInfo

case class UserGeneral(firstName: String,
                       lastName: String,
                       sex: Option[SexType],
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
      birthDate = None,
      email     = user._1.email.getOrElse(""),
      timezone  = user._2.timezone.getOrElse(0),
      password1 = Option(""),
      password2 = Option("")
    )

  def fill(a: Account, u: User): UserGeneral = fill((a, u))
}

case class UserAbout(wishes    : Option[String]  = None,
                     wsex      : Option[SexType] = None,
                     wage      : Option[Int]     = None,
                     wprice    : Option[Double]  = None,
                     wcountry  : Option[String]  = None,
                     wdistrict : Option[String]  = None,
                     privacy   : Option[List[Privacy]] = None)

object UserAbout {
  def fill(user: (Account, User)): UserAbout =
    UserAbout(
      wishes    = user._2.wishes,
      wsex      = user._2.wsex,
      wage      = user._2.wage,
      wprice    = user._2.wprice,
      wcountry  = user._2.wcountry,
      wdistrict = user._2.wdistrict,
      privacy   = None
    )

  def fill(a: Account, u: User): UserAbout = fill((a, u))
}


case class UserConstants(sexTypes: List[SexType] = UserEnums.sexTypes,
                         privacy: List[Privacy] = UserEnums.privacy)
