package provider

import beans.HouseBean
import models.{HouseInfo, House}

case class HouseProvider(
                          id          : Option[Long],
                          houseType   : Option[String] = None,
                          rentType    : Option[String] = None,
                          address     : Option[AddressProvider] = None,
                          allSlots    : Option[Int]    = None,
                          freeSlots   : Option[Int]    = None,
                          busySlots   : Option[Int]    = None,
                          numOfRooms  : Option[Int]    = None,
                          area        : Option[Double] = None,
                          price       : Option[Long]   = None,
                          title       : Option[String] = None,
                          description : Option[String] = None,
                          conditions  : List[String]   = Nil
                         ) {


  def getModel(userId: Long, addressId: Option[Long]): House = {
    val conditionsMap = HouseInfo.conditions.map(e =>
      if (conditions contains e._1)
        e._1 -> "true"
      else
        e._1 -> "false")
    House(
      id = id,
      userId = userId,
      houseType = houseType,
      rentType = rentType,
      addressId = addressId,
      allSlots = allSlots,
      freeSlots = freeSlots,
      busySlots = busySlots,
      numOfRooms = numOfRooms,
      area = area,
      price = price,
      title = title,
      description = description,
      conditions = Option(conditionsMap)
    )

  }
}
object HouseProvider {

  def apply(house: House): HouseProvider = {
    val conditions = for((key,value) <- house.conditions.get if value.equals("true")) yield key
    val addressProvider = HouseBean.getAddress(house.addressId) match {
      case Some(address) => Option(address.getProvider)
      case None => None
    }
    HouseProvider(
      house.id,
      house.houseType,
      house.rentType,
      addressProvider,
      house.allSlots,
      house.freeSlots,
      house.busySlots,
      house.numOfRooms,
      house.area,
      house.price,
      house.title,
      house.description,
      conditions.toList
    )
  }

}

