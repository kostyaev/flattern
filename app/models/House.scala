package models

import dto.house.HouseEnums.Amenity.Amenity
import dto.house.HouseEnums.HouseType.HouseType
import dto.house.HouseEnums.RentType.RentType
import org.joda.time.DateTime
import org.squeryl.KeyedEntity
import org.squeryl.annotations.Column

case class House( id: Long,
                  @Column("account_id")
                  accountId: Long,
                  @Column("house_type")
                  houseType: Option[HouseType] = None,
                  @Column("rent_type")
                  rentType: Option[RentType]  = None,
                  @Column("address_id")
                  addressId: Option[Long] = None,
                  @Column("all_slots")
                  allSlots: Option[Int] = None,
                  @Column("free_slots")
                  freeSlots: Option[Int] = None,
                  @Column("busy_slots")
                  busySlots: Option[Int] = None,
                  @Column("num_of_rooms")
                  numOfRooms: Option[Int] = None,
                  area        : Option[Double] = None,
                  price       : Option[Long] = None,
                  title       : Option[String] = None,
                  description : Option[String] = None,
                  @Column("photo_id")
                  photoId    : Option[Long] = None,
                  amenities   : List[Amenity] = List(),
                  views       : Int = 0,
                  date        : Option[DateTime]  = Option(DateTime.now),
                  @Column("published")
                  isPublished   : Option[Boolean]   = None,
                  lat         : Option[Double] = None,
                  lon         : Option[Double] = None
                  ) extends KeyedEntity[Long] {

}
