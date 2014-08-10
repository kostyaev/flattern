package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._

object CityDao extends SlickDao[City, Int] {

  def query = TableQuery[Cities]

  def extractId(city: City): Option[Int] = city.id

  def withId(city: City, id: Int): City = city.copy(id = Option(id))

  def queryById(id: Int) = query.filter(_.id === id)

}