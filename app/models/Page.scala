package models


case class Page[T](items: List[T], page: Int, pageSize: Int, total: Int) {
  val from = Math.min((page - 1) * pageSize, total)
  val to = Math.min(page * pageSize, total)
  val totalPages = total / pageSize
}

object Page {
  val DEFAULT_PAGE_SIZE = 30

  def getOffset(page: Int, pageSize: Int) =
    if (page > 0 && pageSize > 0) (page - 1) * pageSize else 0
}

