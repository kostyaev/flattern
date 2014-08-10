package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._

object AddressDao extends SlickDao[Address, Long] {

  def query = TableQuery[Addresses]

  def extractId(address: Address): Option[Long] = address.id

  def withId(address: Address, id: Long): Address = address.copy(id = Option(id))

  def queryById(id: Long) = query.filter(_.id === id)

}