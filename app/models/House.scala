package models

import dto.house.HouseEnums.Amenity.Amenity
import dto.house.HouseEnums.HouseType.HouseType
import dto.house.HouseEnums.RentType.RentType
import org.joda.time.LocalDate
import service.dao.Identifiable

case class House( id          : Long,
                  account_id  : Long,
                  house_type  : Option[HouseType] = None,
                  rent_type   : Option[RentType]  = None,
                  address_id  : Option[Long]      = None,
                  all_slots   : Option[Int]       = None,
                  free_slots  : Option[Int]       = None,
                  busy_slots  : Option[Int]       = None,
                  num_of_rooms: Option[Int]       = None,
                  area        : Option[Double]    = None,
                  price       : Option[Long]      = None,
                  title       : Option[String]    = None,
                  description : Option[String]    = None,
                  photo_id    : Option[Long]      = None,
                  amenities   : List[Amenity]     = List(),
                  views       : Int               = 0,
                  date        : Option[LocalDate] = Option(LocalDate.now()),
                  published : Option[Boolean]   = None
) extends Identifiable[Long]

