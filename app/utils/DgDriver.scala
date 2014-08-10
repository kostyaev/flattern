package utils

import com.github.tminglei.slickpg._
import scala.slick.driver.PostgresDriver

trait WithDgDriver {
  val driver: DgDriver
}

trait DgDriver extends PostgresDriver
with PgArraySupport
with PgDateSupportJoda
with PgRangeSupport
with PgHStoreSupport
with PgPlayJsonSupport
with PgSearchSupport {

  override val Implicit = new ImplicitsPlus {}
  override val simple = new SimpleQLPlus {}

  trait ImplicitsPlus extends Implicits
  with ArrayImplicits
  with DateTimeImplicits
  with RangeImplicits
  with HStoreImplicits
  with JsonImplicits
  with SearchImplicits

  trait SimpleQLPlus extends SimpleQL
  with ImplicitsPlus
  with SearchAssistants
}

object DgDriver extends DgDriver