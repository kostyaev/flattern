package dto.house

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
      address.id,
      address.country,
      address.city,
      address.street,
      address.building,
      address.housing,
      address.apt)

  def getHouseDesc(house: House): HouseDesc=
    HouseDesc(
      house.title,
      house.description)

  import utils.Conversions.dateToDays

  def getHouseThumbnail(house: House, address: Address): HouseThumbnail =
    HouseThumbnail(
      house.id.get,
      house.title,
      getHouseAddress(address),
      house.price,
      house.photoId,
      house.views,
      house.date.get)




}

