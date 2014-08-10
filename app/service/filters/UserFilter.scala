package service.filters
import org.joda.time.LocalDate
import provider.UserSearchProvider

case class UserFilter( id        : Option[Long]                = None,
                       privacy   : Option[Map[String, String]] = None,
                       fullName  : Option[String]    = None,
                       email     : Option[String]    = None,
                       birthday  : Option[LocalDate] = None,
                       timezone  : Option[Int]       = None,
                       sex       : Option[Int]       = None,
                       wsex      : Option[Int]       = None,
                       wage      : Option[Int]       = None,
                       wprice    : Option[Double]    = None,
                       wcountry  : Option[String]    = None,
                       wdistrict : Option[String]    = None
                       )

object UserFilter {
  def apply(userSearchProvider: UserSearchProvider): UserFilter = {
    UserFilter(
      privacy = {
        val p = userSearchProvider.privacy match {
          case Some(list) if list.length > 0 => {
            val m = list.zip(List("true", "true")).toMap
            if(!m.contains("h")) m + ("h" -> "false")
            else if(!m.contains("u")) m + ("u" -> "false")
            else m
          }
          case _ => Map("h" -> "false", "u" -> "false")
        }

        Some(p)
      },
     fullName = userSearchProvider.fullName,
     sex = userSearchProvider.sex
    )
  }
}