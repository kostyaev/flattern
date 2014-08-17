package constants

case class HouseConstants(houseTypes: List[String] = Constants.HouseTypes, rentTypes: List[String] = Constants.RentTypes)

object Constants {

  val HouseTypes = List("Квартира", "Дом", "Общежитие", "Дворец", "Вилла")

  val RentTypes = List("Жилье целиком", "Отдельная комната", "Общая комната")


}
