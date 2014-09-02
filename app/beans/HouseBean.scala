package beans

import java.io.File

import com.sksamuel.scrimage.{Format, Image, ScaleMethod}
import dto.house._
import global.Paths
import models._
import play.api.Logger
import play.api.libs.Files.TemporaryFile
import play.api.mvc.MultipartFormData
import service.WithDefaultSession
import service.dao._
import service.filters.HouseFilter
import utils.DgDriver.simple._

import scala.language.reflectiveCalls

object HouseBean extends WithDefaultSession {

  type FlatternSession = scala.slick.driver.PostgresDriver.simple.Session

  val houseDAO = HouseDao
  val housePhotoDAO = HousePhotoDao
  val countryDAO = CountryDao
  val cityDAO = CityDao
  val addressDao = AddressDao


  def updateHouseInfo(houseInfo: HouseInfo, house: House)
                 (implicit session: FlatternSession): House = {
    val updatedModel = houseInfo match {
      case dto: HouseGeneral => house.copy(
        houseType = dto.houseType,
        rentType = dto.rentType,
        price = dto.price
      )

      case dto: HouseAddress => house.copy(
        addressId = HouseBean.saveAddress(dto.getModel).id
      )

      case dto: HouseDesc => house.copy(
        title = dto.title,
        description = dto.desc
      )

      case dto: HouseAmenities => house.copy(
        amenities = dto.selectedAmenities
      )
    }
    houseDAO.save(updatedModel)
  }


  def saveHouseInfo(houseInfo: HouseInfo, userId: Long)
               (implicit session: FlatternSession): House = {
    updateHouseInfo(houseInfo, House(userId = userId))
  }

  def saveHouse(house: House)(implicit  session: FlatternSession): House = {
    houseDAO.save(house)
  }

  def getHousePage(page: Int, pageSize: Int)
                  (implicit  session: FlatternSession): Page[HouseThumbnail] = {
    val result = houseDAO.getHouseThumbnails(HouseFilter(), page, pageSize)
    Logger.info(result.toString)
    result
  }

  def saveAddress(address: Address)
                 (implicit session: FlatternSession) =  {
    addressDao.save(address)
  }


  def getHousesByFilter(filter: HouseFilter, limit: Int, offset: Int) = withTransaction { implicit session =>
    houseDAO.findByFilterWithLimit(filter, limit, offset).list
  }

  def getHouse(id: Long, userId: Long): Option[House] = withTransaction { implicit session =>
    houseDAO.findByFilter(HouseFilter(id = Option(id), userId = Option(userId))).firstOption
  }

  def savePhoto(houseId: Long, picture: MultipartFormData.FilePart[TemporaryFile])
               (implicit session: FlatternSession): HousePhoto = {
      val housePhoto = housePhotoDAO.save(HousePhoto(houseId = houseId))
      val thumbnail = new File(Paths.HOUSE_THUMBNAILS + Paths.THUMBNAIL_PREFIX + housePhoto.id.get + ".jpg")
      val photo = new File(Paths.HOUSE_PHOTOS + Paths.PHOTO_PREFIX + housePhoto.id.get + ".jpg")
      Image(picture.ref.file)
        .cover(300, 200, ScaleMethod.FastScale)
        .writer(Format.JPEG)
        .write(thumbnail)

      Image(picture.ref.file)
        .bound(2000, 1500)
        .writer(Format.JPEG)
        .write(photo)

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

  def getAddressByHouseId(houseId: Long)
                       (implicit  session: FlatternSession): Option[Address] = {
    houseDAO.findOptionById(houseId) match {
      case Some(house) => house.addressId.flatMap(id => addressDao.findOptionById(id))
      case None => None
    }
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
