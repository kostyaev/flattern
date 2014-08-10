package models

import org.joda.time.LocalDateTime
import play.api.i18n.Messages
import service.WithDefaultSession
import service.dao.IdentifiableTable
import utils.DgDriver.simple._

case class House( id          : Option[Long]      = None,
                  userId      : Long,
                  houseType   : String,
                  rentType    : String,
                  addressId   : Long,
                  allSlots    : Option[Int]       = None,
                  freeSlots   : Option[Int]       = None,
                  busySlots   : Option[Int]       = None,
                  numOfRooms  : Option[Int]       = None,
                  area        : Option[Double]    = None,
                  price       : Option[Long]      = None,
                  title       : Option[String]    = None,
                  description : Option[String]    = None,
                  conditions  : Map[String, String],
                  photo       : Option[Long]      = None,
                  views       : Int               = 0,
                  date        : Option[LocalDateTime]  = Option(LocalDateTime.now()),
                  isPublished : Option[Boolean]   = None
                  )

class Houses(tag: Tag) extends Table[House](tag, "house") with IdentifiableTable[Long] with WithDefaultSession {
  def id          = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def userId      = column[Long]("account_id")
  def houseType   = column[String]("house_type")
  def rentType    = column[String]("rent_type")
  def addressId   = column[Long]("address_id")
  def allSlots    = column[Option[Int]]("all_slots")
  def freeSlots   = column[Option[Int]]("free_slots")
  def busySlots   = column[Option[Int]]("busy_slots")
  def numOfRooms  = column[Option[Int]]("num_of_rooms")
  def area        = column[Option[Double]]("area")
  def title       = column[Option[String]]("title")
  def description = column[Option[String]]("description")
  def price       = column[Option[Long]]("price")
  def conditions  = column[Map[String, String]]("conditions")
  def photo       = column[Option[Long]]("photo")
  def views       = column[Int]("views")
  def date        = column[Option[LocalDateTime]]("date")
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
    busySlots, numOfRooms, area, price, title, description, conditions, photo, views, date, isPublished
    ) <> (House.tupled, House.unapply)
}

object HouseInfo {
  val conditionsList = List(
    Messages("living_furniture"),
    Messages("kitchen_furniture"),
    Messages("balcony"),
    Messages("tv"),
    Messages("fridge"),
    Messages("washer"),
    Messages("phone"),
    Messages("conditioner"),
    Messages("heater"),
    Messages("internet"),
    Messages("family_and_children_allowed"),
    Messages("smoking_allowed"),
    Messages("pets_allowed")
  )

  lazy val conditions = conditionsList.map(x => x -> false).toMap

  lazy val conditionsDb = conditionsList.map(x => x -> "false").toMap


  val houseTypes = List(
    Messages("house.owner.type.house"),
    Messages("house.owner.type.apt"),
    Messages("house.owner.type.dorm")
  )

  val rentTypes = List(
    Messages("rent.entire_house"),
    Messages("rent.entire_room"),
    Messages("rent.shared_room")
  )
}

