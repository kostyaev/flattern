package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._

object RoomPhotoDao extends SlickDao[RoomPhoto, Long] {

  def query = TableQuery[RoomPhotos]

  def extractId(roomPhoto: RoomPhoto): Option[Long] = roomPhoto.id

  def withId(roomPhoto: RoomPhoto, id: Long): RoomPhoto = roomPhoto.copy(id = Option(id))

  def queryById(id: Long) = query.filter(_.id === id)
}