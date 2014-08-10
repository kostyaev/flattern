package service.dao

import scala.slick.lifted.TableQuery
import scala.languageFeature.implicitConversions
import utils.DgDriver.simple._
import securesocial.core.providers.Token
import models.Tokens
import scala.Some
import org.joda.time.DateTime

object TokenDao extends SlickDao[Token, String] {

  def query = TableQuery[Tokens]

  def extractId(token: Token): Option[String] = Some(token.uuid)

  def withId(token: Token, uuid: String): Token = token.copy(uuid = uuid)

  def queryById(uuid: String) = query.filter(_.uuid === uuid)

  def findById(tokenId: String): Option[Token] = withSession {
    implicit session =>
      val q = for {
        token <- query
        if token.uuid is tokenId
      } yield token

      q.firstOption
  }

  def save(token: Token): Token = withSession {
    implicit session =>
      findById(token.uuid) match {
        case None => {
          this.add(token)
          token
        }
        case Some(existingToken) => {
          val tokenRow = for {
            t <- query
            if t.uuid is existingToken.uuid
          } yield t

          val updatedToken = token.copy(uuid = existingToken.uuid)
          tokenRow.update(updatedToken)
          updatedToken
        }
      }
  }

  def delete(uuid:String) = withSession {
    implicit session =>
      val q = for {
        t <- query
        if t.uuid is uuid
      } yield t

      q.delete
  }

  def deleteExpiredTokens(currentDate:DateTime) = withSession {
    implicit session =>
      val q = for {
        t <- query
        if t.expirationTime < currentDate
      } yield t
      q.delete
  }
}