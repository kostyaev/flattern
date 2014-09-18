package service


import models._
import org.squeryl.Schema
import service.SquerylEntryPoint._

object Database extends Schema {

  val accountTable  = table[Account]("account")
  val oauth1InfoTable = table[OAuth1CredentialSet]("oauth1_credential_sets")
  val oauth2InfoTable = table[OAuth2CredentialSet]("oauth2_credential_sets")
  val passwordInfoTable = table[PasswordCredentialSet]("password_credential_sets")
  val secureSocialTokenTable = table[SecureSocialToken]("token")
  val addressTable = table[Address]("address")
  val cityTable = table[City]("city")
  val countryTable = table[Country]("country")
  val houseTable = table[House]("house")
  val housePhotoTable = table[HousePhoto]("house_photo")
  val landingEmailTable = table[LandingEmail]("landing_email")
  val roomTable = table[Room]("room")
  val roomPhotoTable = table[RoomPhoto]("room_photo")
  val stateTable = table[State]("state")
  val userTable = table[User]("user")

  val accountToOAuth1Info = oneToManyRelation(accountTable, oauth1InfoTable).
    via((account, oauth1info) => account.id === oauth1info.account_id)
  val accountToOAuth2Info = oneToManyRelation(accountTable, oauth2InfoTable).
    via((account, oauth2Info) => account.id === oauth2Info.account_id)
  val accountToPasswordInfo = oneToManyRelation(accountTable, passwordInfoTable).
    via((account, passwordInfo) => account.id === passwordInfo.account_id)

  val houseToPhoto = oneToManyRelation(houseTable, housePhotoTable).via((house, photo) => house.id === photo.houseId)


}
