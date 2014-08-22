package dto.house

import dto.house.HouseEnums.HouseType.HouseType
import models.Address


trait HouseInfo

case class HouseAmenity(id: Int, name: String, selected: Boolean)

case class HouseGeneral(houseType: Option[HouseType], rentType: Option[String], price: Option[Long]) extends HouseInfo

case class HouseAddress(countryCode: Option[String], city: Option[String], street: Option[String] = None,
                        building: Option[String] = None, housing: Option[String] = None,
                        apt: Option[Int] = None) extends HouseInfo {
  def getModel = Address(
    city = city,
    country = countryCode,
    street = street,
    building = building,
    housing = housing,
    apt = apt
  )
}

case class HouseDesc(title: Option[String], desc: Option[String]) extends HouseInfo

case class HouseAmenities(amenities: List[HouseAmenity]) extends HouseInfo
