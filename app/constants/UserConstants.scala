package constants

case class UserConstants(sexTypes: Map[String, String] = UserConstants.sexTypes)

object UserConstants {

  val sexTypes = Map(
    "1" -> "MALE",
    "2" -> "FEMALE"
  )

}
