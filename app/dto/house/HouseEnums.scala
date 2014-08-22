package dto.house

import utils.DBEnum

object HouseEnums {

  object HouseType extends DBEnum {
    type HouseType = Value
    val APT, HOUSE, DORM, VILLA = Value
  }

}
