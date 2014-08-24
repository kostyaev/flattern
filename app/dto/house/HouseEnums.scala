package dto.house

import utils.DBEnum

object HouseEnums {

  val houseTypes = HouseType.values.toList

  val rentTypes = RentType.values.toList

  val amenities = Amenity.values.toList

  object HouseType extends DBEnum {
    type HouseType = Value
    val APT, HOUSE, DORM, VILLA = Value
  }

  object Amenity extends DBEnum {
    type Amenity = Value
    val LIVING_FURNITURE,
    KITCHEN_FURNITURE,
    BALCONY,
    HEATING,
    FRIDGE,
    WASHER,
    TUB,
    SHOWER,
    TV,
    CONDITIONER,
    INTERNET,
    PETS_ALLOWED,
    FAMILY_ALLOWED,
    SMOKING_ALLOWED = Value
  }

  object RentType extends DBEnum {
    type RentType = Value
    val ENTIRE_HOUSE,
    ENTIRE_ROOM,
    ROOM_PLACE = Value
  }

}
