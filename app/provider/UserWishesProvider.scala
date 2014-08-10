package provider

import models.{Account, User}

case class UserWishesProvider(
  wishes    : Option[String] = None,
  wsex      : Option[Int]    = None,
  wage      : Option[Int]    = None,
  wprice    : Option[Double] = None,
  wcountry  : Option[String] = None,
  wdistrict : Option[String] = None,
  privacy   : Option[List[String]]
) {
  def getPrivacy = {
    val p = privacy match {
      case Some(list) if list.length > 0 => {
        val m = list.zip(List("true", "true")).toMap
        if(!m.contains("h")) m + ("h" -> "false")
        else if(!m.contains("u")) m + ("u" -> "false")
        else m
      }
      case _ => Map("h" -> "false", "u" -> "false")
    }

    Some(p)
  }

  def privacyList =
    (List("h" -> "Ищу жилье", "u" -> "Ищу сожителя") zip privacy.getOrElse(List("false", "false"))).toMap
}

object UserWishesProvider {
  def fill(user: (Account, User)) =
    UserWishesProvider(
      wishes    = user._2.wishes,
      wsex      = user._2.wsex,
      wage      = user._2.wage,
      wprice    = user._2.wprice,
      wcountry  = user._2.wcountry,
      wdistrict = user._2.wdistrict,
      privacy   = Some(user._2.privacy.getOrElse(Map("h" -> "false", "u" -> "false")).map { case (k, v) => v }.toList)
    )

  def default = Map(("h" -> "Ищу жилье") -> "false", ("u" -> "Ищу сожителя") -> "false")
}
