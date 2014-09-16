package service.dao

import service._
import models._

object HousePhotoDao extends SquerylDao[HousePhoto, Long] {

  def table = Database.housePhotoTable

  def getPhotosByHouse(id: Long)(implicit session: FlatternSession) = query.filter(_.houseId === id).list

  def getPhotoByHouse(id: Long)(implicit session: FlatternSession) = query.filter(_.houseId === id).firstOption

  def getPhotosByAccountId(id: Long) = for {
    h <- HouseDao.query if h.userId === id
    hp <- query if hp.houseId === h.id
  } yield hp


}
