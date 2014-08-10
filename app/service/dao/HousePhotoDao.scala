package service.dao

import models._
import utils.DgDriver.simple._

import scala.languageFeature.implicitConversions
import scala.slick.lifted.TableQuery

object HousePhotoDao extends SlickDao[HousePhoto, Long] {

  def query = TableQuery[HousePhotos]

  def getPhotosByHouse(id: Long)(implicit session: FlatternSession) = query.filter(_.houseId === id).list

  def getPhotoByHouse(id: Long)(implicit session: FlatternSession) = query.filter(_.houseId === id).firstOption

  def extractId(housePhoto: HousePhoto): Option[Long] = housePhoto.id

  def withId(housePhoto: HousePhoto, id: Long): HousePhoto = housePhoto.copy(id = Option(id))

  def queryById(id: Long) = query.filter(_.id === id)

  def getPhotosByAccountId(id: Long) = for {
    h <- HouseDao.query if h.userId === id
    hp <- query if hp.houseId === h.id
  } yield hp


}
