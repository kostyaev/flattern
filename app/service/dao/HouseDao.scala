package service.dao

import dto.house.{HouseHelper, HouseThumbnail}
import models._
import service.filters.HouseFilter
import utils.DgDriver.simple._
import utils.equal
import scala.languageFeature.implicitConversions
import scala.slick.lifted.TableQuery

object HouseDao extends SlickDao[House, Long] {

  def query = TableQuery[Houses]
  def photos = TableQuery[HousePhotos]
  def addresses = TableQuery[Addresses]

  def findOptionByFilter(filter: HouseFilter) = {
    findByFilter(filter)
  }

  def findByFilterWithLimit(filter: HouseFilter, limit: Int, offset: Int) = {
    findByFilter(filter).drop(offset).take(limit)
  }

  def findByFilter(filter: HouseFilter) = {
    query.filter(row => {
      val nonOptions = Seq(
        equal(row.id, filter.id),
        equal(row.userId, filter.userId)
      ).flatten
      val options = Seq(
        equal(row.addressId, filter.addressId),
        equal(row.houseType, filter.houseType),
        equal(row.rentType, filter.rentType),
        equal(row.numOfRooms, filter.numOfRooms),
        equal(row.price, filter.price),
        equal(row.allSlots, filter.allSlots),
        equal(row.freeSlots, filter.freeSlots),
        equal(row.busySlots, filter.busySlots),
        equal(row.area, filter.area),
        equal(row.title, filter.title),
        equal(row.description, filter.description)
      ).flatten
      reduce(options, nonOptions)
    })
  }

  def getHouseThumbnails(filter: HouseFilter, page: Int, pageSize: Int)(implicit session: FlatternSession): Page[HouseThumbnail] = {
    val tupleList= for {
      house <- findByFilter(filter)
      address <- addresses if address.id === house.addressId
    } yield {
      (house, address)
    }

    val result = tupleList
      .drop(Page.getOffset(page, pageSize))
      .take(pageSize)
      .list
      .map(x => HouseHelper.getHouseThumbnail(x._1, x._2))

    Page(
      items = result,
      page = page,
      pageSize = pageSize,
      total = tupleList.length.run
    )

  }

  def extractId(house: House): Option[Long] = house.id

  def withId(house: House, id: Long): House = house.copy(id = Option(id))

  def queryById(id: Long) = query.filter(_.id === id)
}