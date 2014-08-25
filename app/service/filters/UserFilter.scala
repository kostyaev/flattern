package service.filters
import org.joda.time.LocalDate
import provider.UserSearchProvider
import dto.user.UserEnums.SexType.SexType
import dto.user.UserEnums.Privacy.Privacy

case class UserFilter( id        : Option[Long]          = None,
                       privacy   : Option[List[Privacy]] = None,
                       fullName  : Option[String]    = None,
                       email     : Option[String]    = None,
                       birthday  : Option[LocalDate] = None,
                       timezone  : Option[Int]       = None,
                       sex       : Option[SexType]   = None,
                       wsex      : Option[SexType]   = None,
                       wage      : Option[Int]       = None,
                       wprice    : Option[Double]    = None,
                       wcountry  : Option[String]    = None,
                       wdistrict : Option[String]    = None
                       )

object UserFilter {
  def apply(userSearchProvider: UserSearchProvider): UserFilter = {
    UserFilter(
      privacy = userSearchProvider.privacy,
      fullName = userSearchProvider.fullName,
      sex = userSearchProvider.sex
    )
  }
}