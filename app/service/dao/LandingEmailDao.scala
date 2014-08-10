package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._

object LandingEmailDao extends SlickDao[LandingEmail, Long] {

  def query = TableQuery[LandingEmails]

  def extractId(le: LandingEmail): Option[Long] = le.id

  def withId(le: LandingEmail, id: Long): LandingEmail = le.copy(id = Option(id))

  def queryById(id: Long) = query.filter(_.id === id)

  def queryByIp(ip: String)(implicit session: FlatternSession): List[LandingEmail] =
    query.filter(_.ip === ip).list

  def queryByEmail(email: String)(implicit session: FlatternSession): List[LandingEmail] =
    query.filter(_.email === email).list

}