package dto

import models.{Address, House}
import provider.AddressProvider

trait HouseInfo

case class HouseGeneral(houseType: String, rentType: String, price: Int) extends HouseInfo

case class HouseAddress(country: String, city: String, street: Option[String],
                        building: Option[String], housing: Option[String], apt: Option[Int]) extends HouseInfo

case class HouseDesc(title: String, desc: String) extends HouseInfo

case class HouseAmenities(amenities: List[String]) extends HouseInfo

case class NewHouse()


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