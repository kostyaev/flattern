package dto
import models.{User, Account}
import org.joda.time._
import org.joda.time.format._
import scala.util.{Try, Success, Failure}

case class UserThumbnail( id          : Long,
                          fullName    : String,
                          sex         : String,
                          avatarUrl   : String,
                          birthday    : String
                          )

object UserThumbnail {
  def fill(account: Account, user: User): UserThumbnail =
    UserThumbnail(
      id = user.accountId,
      fullName = account.fullName,
      sex = user.sex.getOrElse(0).toString,
      avatarUrl = account.avatarUrl.getOrElse(""),
      birthday = ""
      /*birthday = user.birthday match {
        case None     => ""
        case Some(bd) => Try {
          DateTimeFormat.forPattern("yyyy-MM-dd").print(bd)
        } match {
          case Failure(e) => ""
          case Success(e) => e
        }
      }*/
    )

  def fill(p: (Account, User)): UserThumbnail = fill(p._1, p._2)
}


