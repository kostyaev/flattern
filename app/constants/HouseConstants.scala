package constants

case class HouseConstants(houseTypes: List[String] = HouseConstants.HouseTypes, rentTypes: List[String] = HouseConstants.RentTypes)

object HouseConstants {

  val HouseTypes = List("Квартира", "Дом", "Общежитие", "Дворец", "Вилла")

  val RentTypes = List("Жилье целиком", "Отдельная комната", "Общая комната")

  val Amenities = Map(
    1 -> "Жилая мебель",
    2 -> "Кухонная мебель",
    3 -> "Балкон",
    4 -> "Отопление",
    5 -> "Холодильник",
    6 -> "Стиральная машина",
    7 -> "Ванна",
    8 -> "Душ",
    9 -> "Телевизор",
    10 -> "Кондиционер",
    11 -> "Интернет",
    //Extra
    30 -> "Можно с питомцами",
    31 -> "Подходит для семей",
    32 -> "Можно курить"
  )


}
