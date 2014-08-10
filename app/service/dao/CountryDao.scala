package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._

object CountryDao extends SlickDao[Country, Int] {

  def query = TableQuery[Countries]

  def extractId(country: Country): Option[Int] = country.id

  def withId(country: Country, id: Int): Country = country.copy(id = Option(id))

  def queryById(id: Int) = query.filter(_.id === id)

}