package service.dao

import scala.slick.lifted.TableQuery
import models._
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._

object StateDao extends SlickDao[State, Int] {

  def query = TableQuery[States]

  def extractId(state: State): Option[Int] = state.id

  def withId(state: State, id: Int): State = state.copy(id = Option(id))

  def queryById(id: Int) = query.filter(_.id === id)

}