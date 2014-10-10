package dto.user

object UserEnums {

  val sexTypes = SexType.values.toList
  val privacy = Privacy.values.toList

  object SexType extends Enumeration {
    type SexType = Value
    val MALE, FEMALE = Value
  }

  object Privacy extends Enumeration {
    type Privacy = Value
    val HOUSE_SEARCH,
    USER_SEARCH,
    NOTHING_SEARCH = Value
  }

}
