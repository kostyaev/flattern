package service.filters

import dto.house.HouseEnums.HouseType.HouseType


case class HouseFilter(id          : Option[Long]   = None,
                       userId      : Option[Long]   = None,
                       houseType   : Option[HouseType] = None,
                       rentType    : Option[String] = None,
                       addressId   : Option[Long]   = None,
                       allSlots    : Option[Int]    = None,
                       freeSlots   : Option[Int]    = None,
                       busySlots   : Option[Int]    = None,
                       numOfRooms  : Option[Int]    = None,
                       area        : Option[Double] = None,
                       price       : Option[Long] = None,
                       title       : Option[String] = None,
                       description : Option[String] = None,
                       conditions  : Option[Map[String, String]] = None)