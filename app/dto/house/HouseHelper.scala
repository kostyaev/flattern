package dto.house

import constants.HouseConstants
import models.{Address, House}

object HouseHelper {

  def getHouseGeneral(house: House): HouseGeneral =
  //FIXME replace
    HouseGeneral(
      house.houseType,
      house.rentType,
      house.price
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
      house.title,
      house.description)

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

