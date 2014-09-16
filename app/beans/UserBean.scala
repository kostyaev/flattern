/*
package beans

import java.io.File

import com.sksamuel.scrimage.{Format, Image, ScaleMethod}
import dto.UserThumbnail
import global.Paths
import models.{Account, Page, User}
import play.api.libs.Files.TemporaryFile
import play.api.mvc.MultipartFormData
import dto.user.{UserGeneral, UserAbout}
import securesocial.core.{Identity, Registry}
import service.WithDefaultSession
import service.dao._
import service.filters.UserFilter
import utils.DgDriver.simple._

import scala.language.reflectiveCalls

object UserBean extends WithDefaultSession {

  type FlatternSession = scala.slick.driver.PostgresDriver.simple.Session

  def getAccount(user: Identity)(implicit session: FlatternSession): Option[Account] = {
    AccountDao.findByIdentityId(user.identityId)
  }

  def getUserPage(page: Int, pageSize: Int): Page[UserThumbnail] = withTransaction { implicit session =>
    UserDao.getUserThumbnails(UserFilter(), page, pageSize)
  }

  def findUser(id: Long) = withTransaction { implicit session =>
    UserDao.findByAccountId(id).firstOption.getOrElse(User())
  }

  def findUser(account: Account) = withTransaction { implicit session =>
    UserDao.findByAccount(account).firstOption.getOrElse(User())
  }

  def findUser(filter: UserFilter) = withTransaction { implicit session =>
    UserDao.findByFilter(filter).list
  }

  def avatarUpdate(account: Account, picture: MultipartFormData.FilePart[TemporaryFile]) = withTransaction { implicit session =>
    val uid: Long = account.uid.getOrElse(0: Long)
    val thumbnail = new File(Paths.USER_THUMBNAIL_DIR + Paths.THUMBNAIL_PREFIX + uid.toString + ".jpg")
    val photo = new File(Paths.USER_PHOTO_DIR + Paths.PHOTO_PREFIX + uid.toString + ".jpg")
    val a = account.copy(avatarUrl = Option(uid.toString + ".jpg"))

    Image(picture.ref.file)
      .cover(200, 300, ScaleMethod.FastScale)
      .writer(Format.JPEG)
      .write(thumbnail)

    Image(picture.ref.file)
      .bound(2000, 1500)
      .writer(Format.JPEG)
      .write(photo)

    AccountDao.save(a)

    a
  }

  def userUpdate(account: Account, userGeneral: UserGeneral) = withTransaction { implicit session =>
    val pwd = userGeneral.password1.getOrElse("")
    val passwordInfo = if(pwd.length > 0) Some(Registry.hashers.currentHasher.hash(pwd)) else account.passwordInfo
    val a = account.copy(
      firstName    = userGeneral.firstName,
      lastName     = userGeneral.lastName,
      fullName     = userGeneral.getFullName,
      email        = userGeneral.getEmail,
      passwordInfo = passwordInfo
    )
    val u = findUserByAccount(account).copy(
      accountId = a.uid,
      sex       = userGeneral.sex,
      birthday  = userGeneral.birthDate,
      timezone  = userGeneral.getTimeZone
    )
    AccountDao.save(a)
    UserDao.save(u)

    (a, u)
  }

  def userUpdate(account: Account, userAbout: UserAbout) = withTransaction { implicit session =>
    val u = findUserByAccount(account).copy(
      accountId = account.uid,
      wishes    = userAbout.wishes,
      wsex      = userAbout.wsex,
      wage      = userAbout.wage,
      wprice    = userAbout.wprice,
      wcountry  = userAbout.wcountry,
      wdistrict = userAbout.wdistrict,
      privacy   = userAbout.privacy
    )
    u.update

    (account, u)
  }

  def findUserByAccount(account: Account)(implicit session: Session): User =
    UserDao.findByAccount(account).firstOption.getOrElse(User())

}
*/
