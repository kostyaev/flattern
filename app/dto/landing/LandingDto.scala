package dto.landing

case class LandingForm(email: String) {
  val emailPattern = "\\b[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)\\b".r

  def isValid = email.matches(emailPattern.toString)
}
