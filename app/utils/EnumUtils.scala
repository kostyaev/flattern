package utils

import play.api.libs.json._

object EnumUtils {
  def enumReads[E <: DBEnum](enum: E): Reads[E#Value] = new Reads[E#Value] {
    def reads(json: JsValue): JsResult[E#Value] = json match {
      case JsString(s) => {
        try {
          JsSuccess(enum.withName(s))
        } catch {
          case _: NoSuchElementException => JsError(s"Enumeration expected of type: '${enum.getClass}', but it does not appear to contain the value: '$s'")
        }
      }
      case _ => JsError("String value expected")
    }
  }

  implicit def enumWrites[E <: DBEnum]: Writes[E#Value] = new Writes[E#Value] {
    def writes(v: E#Value): JsValue = JsString(v.toString)
  }

  implicit def enumFormat[E <: DBEnum](enum: E): Format[E#Value] = {
    Format(EnumUtils.enumReads(enum), EnumUtils.enumWrites)
  }
}

abstract class DBEnum extends Enumeration {

  import utils.DgDriver.simple._
  implicit val enumMapper = MappedColumnType.base[Value, Int](_.id, this.apply)
}
