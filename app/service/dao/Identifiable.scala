package service.dao

trait Identifiable[I] {
  def id: I
}
