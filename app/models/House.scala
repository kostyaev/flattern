package models

import org.joda.time.DateTime
import org.squeryl.KeyedEntity
import org.squeryl.annotations.Column
import org.squeryl.dsl.OneToMany
import service.Database

case class House( id: Long,
                  @Column("account_id")
                  accountId: Long,
                  title       : Option[String] = None,
                  description : Option[String] = None,
                  price       : Option[Long] = None,
                  @Column("house_type")
                  houseType: Option[String],
                  @Column("rent_type")
                  rentType: Option[String],
                  area: Option[Double] = None,
                  @Column("address_id")
                  addressId: Option[Long] = None,
                  @Column("num_of_rooms")
                  numOfRooms: Option[Int] = None,
                  amenities: Option[Array[String]] = Some(Array()),
                  views: Option[Int] = Some(0),
                  date: Option[DateTime]  = Option(DateTime.now),
                  @Column("published")
                  isPublished: Option[Boolean]   = None
                  ) extends KeyedEntity[Long] {

  lazy val photos: OneToMany[HousePhoto] = Database.houseToPhoto.left(this)



}
