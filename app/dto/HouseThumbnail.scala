package dto

import models.{Address, House}
import provider.AddressProvider

case class HouseThumbnail(  id          : Long,
                            title       : Option[String] = None,
                            address     : AddressProvider,
                            photo       : Option[Long]   = None,
                            price       : Option[Long]   = None,
                            views       : Int            = 0,
                            daysAgo     : Int            = 0
                          )


object HouseThumbnail {

  import utils.Conversions.dateToDays

  def apply(house: House, address: Address): HouseThumbnail =
    HouseThumbnail(
      house.id.get,
      house.title,
      address.getProvider,
      house.photo,
      house.price,
      house.views,
      house.date.get)

}