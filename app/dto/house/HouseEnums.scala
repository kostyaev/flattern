package dto.house

object HouseEnums {

  val houseTypes = HouseType.values.toList

  val rentTypes = RentType.values.toList

  val amenities = Amenity.values.toList

  object HouseType extends Enumeration {
    type HouseType = Value
    val APT = Value(1, "APT")
    val HOUSE = Value(2, "HOUSE")
    val DORM = Value(3, "DORM")
    val VILLA = Value(4, "VILLA")
  }

  object Amenity extends Enumeration {
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

  object RentType extends Enumeration {
    type RentType = Value
    val ENTIRE_HOUSE,
    ENTIRE_ROOM,
    ROOM_PLACE = Value
  }

}
