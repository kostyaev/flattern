package service.dao

import models.Page

import scala.languageFeature.implicitConversions
import service.WithDefaultSession
import utils.DgDriver.simple._

import scala.slick.driver.PostgresDriver

trait SlickDao[M, I] extends WithDefaultSession {

  type FlatternSession = PostgresDriver.simple.Session

  val TRUE_OPTION = Option(true).bind
  val TRUE = true.bind
  val FALSE_OPTION = Option(true).bind
  val FALSE = true.bind

  def reduce(options: Seq[Column[Option[Boolean]]], nonOptions: Seq[Column[Boolean]]) =
    if(nonOptions.nonEmpty && options.nonEmpty)
      nonOptions.reduce(_ && _) && options.reduce(_ && _)
    else if (nonOptions.nonEmpty)
      nonOptions.reduce(_ && _) && TRUE_OPTION
    else if (options.nonEmpty)
      TRUE && options.reduce(_ && _)
    else
      TRUE && TRUE_OPTION

  /**
   * Extracts the model Id of a arbitrary model.
   * @param model a mapped model
   * @return an Some[I] if Id is filled, None otherwise
   */
  def query: TableQuery[_ <: Table[M] with IdentifiableTable[I]]

  def extractId(model: M): Option[I]

  /**
   *
   * @param model a mapped model (usually without an assigned id).
   * @param id an id, usually generate by the database
   * @return a model M with an assigned Id.
   */
  def withId(model: M, id: I): M


  /**
   * Defined the base query to find object by id.
   *
   * @param id
   * @return
   */
  def queryById(id: I): Query[Table[M], M]

  def autoInc(implicit session: FlatternSession) = query.returning(query.map(_.id))

  /**
   * Define an insert query that returns the database generated identifier.
   * @param model a mapped model
   * @return the database generated identifier.
   */
  def add(model: M)(implicit session: FlatternSession): I = autoInc.insert(model)


  def save(model: M)(implicit session: FlatternSession): M =
    extractId(model) match {
      case Some(id) => queryById(id).update(model); model
      case None => withId(model, add(model))
  }

  def delete(model: M)(implicit session: FlatternSession) : Boolean =
    extractId(model) match {
      case Some(id) => deleteById(id)
      case None => false
  }

  def deleteById(id: I)(implicit session: FlatternSession): Boolean =
    queryById(id).delete == 1

  def findOptionById(id: I)(implicit session: FlatternSession): Option[M] = queryById(id).firstOption

  def list(implicit session: FlatternSession): List[M] = query.list

  def pagedList(pageIndex: Int, limit: Int)(implicit session: FlatternSession): List[M] =
    query.drop(pageIndex).take(limit).list

  def getPageByQuery(query: TableQuery[_ <: Table[M] with IdentifiableTable[I]],
                     page: Int, pageSize: Int)(implicit session: FlatternSession): Page[M] =
    Page(
      items = query.drop(Page.getOffset(page, pageSize)).take(pageSize).list,
      page = page,
      pageSize = pageSize,
      total = query.length.run
    )

}
