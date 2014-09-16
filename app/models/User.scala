package models

import service.dao.Identifiable
import org.joda.time.LocalDate
import dto.user.UserEnums.Privacy.Privacy
import dto.user.UserEnums.SexType.SexType

case class User( id         : Long,
                 account_id : Option[Long]          = None,
                 privacy    : Option[List[Privacy]] = None,
                 birthday   : Option[LocalDate]     = None,
                 timezone   : Option[Int]           = None,
                 sex        : Option[SexType]       = None,
                 wishes     : Option[String]        = None,
                 wsex       : Option[SexType]       = None,
                 wage       : Option[Int]           = None,
                 wprice     : Option[Double]        = None,
                 wcountry   : Option[String]        = None,
                 wdistrict  : Option[String]        = None
) extends Identifiable[Long]