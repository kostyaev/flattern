package beans

import java.io.File

import com.sksamuel.scrimage.{Format, Image, ScaleMethod}
import dto.HouseThumbnail
import global.Paths
import models._
import play.api.libs.Files.TemporaryFile
import play.api.mvc.{AnyContent, MultipartFormData}
import provider.{AddressProvider, HouseProvider}
import securesocial.core.SecuredRequest
import service.WithDefaultSession
import service.dao._
import service.filters.HouseFilter
import utils.DgDriver.simple._

import scala.language.reflectiveCalls

object HouseBean extends WithDefaultSession {

  val houseDAO = HouseDao
  val housePhotoDAO = HousePhotoDao
  val countryDAO = CountryDao
  val cityDAO = CityDao
  val addressDao = AddressDao


  def getHousePage(page: Int, pageSize: Int): Page[HouseThumbnail] = withTransaction { implicit session =>
    houseDAO.getHouseThumbnails(HouseFilter(), page, pageSize)
  }

  def saveAddress(addressProvider: AddressProvider) = withTransaction { implicit session =>
    addressDao.save(addressProvider.getModel)
  }

  def saveHouse(houseProvider: HouseProvider)(implicit request: SecuredRequest[AnyContent]) = withTransaction { implicit session =>
    val addressId = houseProvider.address match {
      case Some(addressProvider) => addressDao.save(addressProvider.getModel).id
      case _ => None
    }
    val userId = AccountDao.findByIdentityId(request.user.identityId).get.uid.get
    val house = houseProvider.getModel(userId, addressId)
    houseDAO.save(house)

  }

  def getHousesByFilter(filter: HouseFilter, limit: Int, offset: Int) = withTransaction { implicit session =>
    houseDAO.findByFilterWithLimit(filter, limit, offset).list
  }

  def getHouse(id: Long)(implicit request: SecuredRequest[AnyContent]): Option[House] = withTransaction { implicit session =>
    val userId = AccountDao.findByIdentityId(request.user.identityId).get.uid.get
    houseDAO.findByFilter(HouseFilter(id = Option(id), userId = Option(userId))).firstOption
  }

  def getHouseProvider(house: House): HouseProvider = withTransaction { implicit session =>
    HouseProvider(house)
  }

  def getHouseProviderById(houseId: Long): Option[HouseProvider] = withTransaction { implicit session =>
    houseDAO.findByFilter(HouseFilter(id = Option(houseId))).firstOption match {
      case Some(house) => Some(getHouseProvider(house))
      case _ => None
    }
  }

  def savePhoto(houseId: Long, picture: MultipartFormData.FilePart[TemporaryFile]): HousePhoto =
    withTransaction { implicit session =>
      val housePhoto = housePhotoDAO.save(HousePhoto(houseId = houseId))
      val thumbnail = new File(Paths.HOUSE_THUMBNAIL_DIR + Paths.THUMBNAIL_PREFIX + housePhoto.id.get + ".jpg")
      val photo = new File(Paths.HOUSE_PHOTO_DIR + Paths.PHOTO_PREFIX + housePhoto.id.get + ".jpg")
      Image(picture.ref.file)
        .cover(300, 200, ScaleMethod.FastScale)
        .writer(Format.JPEG)
        .write(thumbnail)

      Image(picture.ref.file)
        .bound(2000, 1500)
        .writer(Format.JPEG)
        .write(photo)

      val house = houseDAO.findOptionById(houseId).get

      house.photo match {
        case None => houseDAO.save(house.copy(photo = housePhoto.id))
        case _ =>
      }
     housePhoto
  }

  def getPhotos(houseId: Long): List[HousePhoto] = withTransaction { implicit session =>
    housePhotoDAO.getPhotosByHouse(houseId)
  }

  def getPhoto(houseId: Long): Option[HousePhoto] = withTransaction { implicit session =>
    housePhotoDAO.getPhotoByHouse(houseId)
  }

  def getAddress(addressId: Long) = withTransaction { implicit session =>
    addressDao.findOptionById(addressId)
  }

  def getAddress(addressId: Option[Long]) = withTransaction { implicit session =>
    addressId match {
      case Some(id) => addressDao.findOptionById(id)
      case _ => None
    }

  }

  def getPhotosAccount(account: Account) = withTransaction { implicit session =>
    housePhotoDAO.getPhotosByAccountId(account.uid.getOrElse(0)).list
  }

}
