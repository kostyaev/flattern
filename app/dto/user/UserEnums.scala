package dto.user

import utils.DBEnum

object UserEnums {

  val sexTypes = SexType.values.toList
  val privacy = Privacy.values.toList

  object SexType extends DBEnum {
    type SexType = Value
    val MALE, FEMALE = Value
  }

  object Privacy extends DBEnum {
    type Privacy = Value
    val HOUSE_SEARCH,
    USER_SEARCH,
    NOTHING_SEARCH = Value
  }

}
