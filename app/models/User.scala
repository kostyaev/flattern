package models

import org.squeryl.KeyedEntity
import org.joda.time.DateTime
import dto.user.UserEnums.Privacy.Privacy
import dto.user.UserEnums.SexType.SexType
import org.squeryl.annotations._

case class User( id         : String,
                 @Column("account_id")
                 accountId : Option[Long]          = None,
                 //privacy    : Option[List[Privacy]] = None,
                 birthday   : Option[DateTime]      = None,
                 timezone   : Option[Int]           = None,
                 sex        : Option[SexType]       = None,
                 wishes     : Option[String]        = None,
                 wsex       : Option[SexType]       = None,
                 wage       : Option[Int]           = None,
                 wprice     : Option[Double]        = None,
                 wcountry   : Option[String]        = None,
                 wdistrict  : Option[String]        = None
) extends KeyedEntity[String]