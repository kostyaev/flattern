package dto.house

import dto.house.HouseEnums.Amenity.Amenity
import dto.house.HouseEnums.HouseType.HouseType
import dto.house.HouseEnums.RentType.RentType
import models.Address


trait HouseInfo

case class HouseConstants(houseTypes: List[HouseType] = HouseEnums.houseTypes,
                          rentTypes: List[RentType] = HouseEnums.rentTypes,
                          amenities: List[Amenity] = HouseEnums.amenities)

case class HouseGeneral(houseType: Option[HouseType], rentType: Option[RentType], price: Option[Long]) extends HouseInfo

case class HouseAddress(id: Option[Long], countryCode: Option[String], city: Option[String], street: Option[String] = None,
                        building: Option[String] = None, housing: Option[String] = None,
                        apt: Option[Int] = None) extends HouseInfo {
  def getModel = Address(
    id = id,
    city = city,
    country = countryCode,
    street = street,
    building = building,
    housing = housing,
    apt = apt
  )
}

case class HouseDesc(title: Option[String], desc: Option[String]) extends HouseInfo

case class HouseAmenities(selectedAmenities: List[Amenity]) extends HouseInfo

case class HouseThumbnail(  id          : Long,
                            title       : Option[String] = None,
                            address     : HouseAddress,
                            photo       : Option[Long]   = None,
                            price       : Option[Long]   = None,
                            views       : Int            = 0,
                            daysAgo     : Int            = 0
                           )
