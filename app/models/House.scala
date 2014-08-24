package models

import dto.house.HouseEnums.Amenity.Amenity
import dto.house.HouseEnums.HouseType.HouseType
import dto.house.HouseEnums.RentType.RentType
import org.joda.time.LocalDate
import service.WithDefaultSession
import service.dao.IdentifiableTable
import utils.DgDriver.simple._

case class House( id          : Option[Long]      = None,
                  userId      : Long,
                  houseType   : Option[HouseType] = None,
                  rentType    : Option[RentType]  = None,
                  addressId   : Option[Long]      = None,
                  allSlots    : Option[Int]       = None,
                  freeSlots   : Option[Int]       = None,
                  busySlots   : Option[Int]       = None,
                  numOfRooms  : Option[Int]       = None,
                  area        : Option[Double]    = None,
                  price       : Option[Long]      = None,
                  title       : Option[String]    = None,
                  description : Option[String]    = None,
                  amenities   : List[Amenity]     = List(),
                  photo       : Option[Long]      = None,
                  views       : Int               = 0,
                  date        : Option[LocalDate] = Option(LocalDate.now()),
                  isPublished : Option[Boolean]   = None
                  )

class Houses(tag: Tag) extends Table[House](tag, "house") with IdentifiableTable[Long] with WithDefaultSession {
  def id          = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def userId      = column[Long]("account_id")
  def houseType   = column[Option[HouseType]]("house_type")
  def rentType    = column[Option[RentType]]("rent_type")
  def addressId   = column[Option[Long]]("address_id")
  def allSlots    = column[Option[Int]]("all_slots")
  def freeSlots   = column[Option[Int]]("free_slots")
  def busySlots   = column[Option[Int]]("busy_slots")
  def numOfRooms  = column[Option[Int]]("num_of_rooms")
  def area        = column[Option[Double]]("area")
  def title       = column[Option[String]]("title")
  def description = column[Option[String]]("description")
  def price       = column[Option[Long]]("price")
  def amenities   = column[List[Amenity]]("amenities")
  def photo       = column[Option[Long]]("photo")
  def views       = column[Int]("views")
  def date        = column[Option[LocalDate]]("date")
  def isPublished = column[Option[Boolean]]("published")

  val accounts = new TableQuery[Accounts](new Accounts(_))
  def accountFK = withSession { implicit session =>
    foreignKey("fk_house_account", userId, accounts)(_.uid)
  }
  def account = withSession { implicit session =>
    accounts.filter(_.uid === userId)
  }

  val addresses = new TableQuery[Addresses](new Addresses(_))
  def addressFK = withSession { implicit session =>
    foreignKey("fk_house_address", addressId, addresses)(_.id)
  }

  def * = (
    id.?, userId, houseType, rentType, addressId, allSlots, freeSlots,
    busySlots, numOfRooms, area, price, title, description, amenities, photo, views, date, isPublished
    ) <> (House.tupled, House.unapply)
}

