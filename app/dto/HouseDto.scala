package dto

import constants.HouseConstants
import dto.HouseType.HouseType
import models.{Address, House}
import provider.AddressProvider


trait HouseInfo

import utils.DBEnum

object HouseType extends DBEnum {
  type HouseType = Value
  val APT, HOUSE, DORM, VILLA = Value
}

case class HouseGeneral(houseType: HouseType, rentType: String, price: Long) extends HouseInfo {
}

case class HouseAddress(countryCode: String, city: String, street: Option[String] = None,
                        building: Option[String] = None, housing: Option[String] = None,
                        apt: Option[Int] = None) extends HouseInfo {
  def getModel = Address(
    city = city,
    country = countryCode,
    street = street,
    building = building,
    housing = housing,
    apt = apt
  )
}

case class HouseAmenity(id: Int, name: String, selected: Boolean)

case class HouseDesc(title: String, desc: String) extends HouseInfo

case class HouseAmenities(amenities: List[HouseAmenity]) extends HouseInfo

case class HouseThumbnail(  id          : Long,
                            title       : Option[String] = None,
                            address     : AddressProvider,
                            photo       : Option[Long]   = None,
                            price       : Option[Long]   = None,
                            views       : Int            = 0,
                            daysAgo     : Int            = 0
                           )


object HouseHelper {

  def getHouseGeneral(house: House): HouseGeneral =
  //FIXME replace
    HouseGeneral(
      house.houseType.get,
      house.rentType.get,
      house.price.get
    )

  def getHouseAddress(address: Address): HouseAddress =
    HouseAddress(
      address.country,
      address.city,
      address.street,
      address.building,
      address.housing,
      address.apt)

  def getHouseDesc(house: House): HouseAddress =
    HouseAddress(
      house.title.get,
      house.description.get)

  def getHouseAmenities(house: House): List[HouseAmenity] = {
    val conditions = house.conditions.get
    val amenities = for ((k, v) <- HouseConstants.Amenities)
    yield {
      val selected = if (conditions.contains(k.toString)) true else false
      HouseAmenity(k, v, selected = selected)
    }
    amenities.toList.sortBy(_.id)
  }

}


object HouseThumbnail {

  import utils.Conversions.dateToDays

  def apply(house: House, address: Address): HouseThumbnail =
    HouseThumbnail(
      house.id.get,
      house.title,
      address.getProvider,
      house.photo,
      house.price,
      house.views,
      house.date.get)

}