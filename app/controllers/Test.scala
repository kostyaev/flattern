package controllers

import play.api.libs.json._
import play.api.mvc._


object Test extends Controller {

  case class Address(street: String, building: Int)

  case class Person(age: Int, name: String, address: Address)

  implicit val addressReads = Json.reads[Address]
  implicit val addressWrites = Json.format[Address]
  implicit val personReads = Json.reads[Person]
  implicit val personWrites = Json.format[Person]



  def test = Action {
    Ok(Json.toJson(Person(10, "Max", Address("Kashirskaya",31))))
  }
}