package provider

import models.Address

case class AddressProvider(
                          id          : Option[Long],
                          country     : String,
                          city        : String,
                          street      : Option[String],
                          building    : Option[String],
                          housing     : Option[String],
                          floor       : Option[Int],
                          apt         : Option[Int]
                          ) {
  def getModel = Address(
    id = id,
    city = city,
    country = country,
    street = street,
    building = building,
    housing = housing,
    floor = floor,
    apt = apt
  )

}
