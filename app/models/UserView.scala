package models

/**
 * Пока как заглушка -- вюшка пользователей.
 * Квартиры буду браться из БД; чисто для корреткной шаблонизации.
 */
class UserView {
  val id = 1
  val img = "default.jpg"
  val isRenter = true // empty if not
  val houses = 5
  val name = "Владимир Ильич Ульянов"
  val connectionsNumber = 2
  val city = "Москва"
  val connections = "Троцкий Лев Давыдович, Сталин Иосиф Виссарионович"
}
