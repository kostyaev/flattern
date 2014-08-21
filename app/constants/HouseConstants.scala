package constants

case class HouseConstants(houseTypes: List[String] = HouseConstants.HouseTypes, rentTypes: List[String] = HouseConstants.RentTypes)

object HouseConstants {

  val HouseTypes = List("APT", "HOUSE", "DORM", "VILLA")

  val RentTypes = List("ENTIRE_HOUSE", "ENTIRE_ROOM", "ROOM_PLACE")

  val Amenities = Map(
    1 -> "LIVING_FURNITURE",
    2 -> "KITCHEN_FURNITURE",
    3 -> "BALCONY",
    4 -> "HEATING",
    5 -> "FRIDGE",
    6 -> "WASHER",
    7 -> "TUB",
    8 -> "SHOWER",
    9 -> "TV",
    10 -> "CONDITIONER",
    11 -> "INTERNET",
    //Extra
    30 -> "PETS_ALLOWED",
    31 -> "FAMILY_ALLOWED",
    32 -> "SMOKING_ALLOWED"
  )
}
