package global

import play.api.Play
import play.api.Play.current

object Paths {

  val IMAGE_PATH = Play.application.path +
    Play.application.configuration.getString("yeoman.imageDir").getOrElse("/ui/app/images")

  val HOUSE_PHOTOS = IMAGE_PATH + "/houses/photos/"

  val HOUSE_THUMBNAILS = IMAGE_PATH + "/houses/thumbnails/"

  val PHOTO_PREFIX = ""

  val THUMBNAIL_PREFIX = "th-"

  val TEMP_DIR = "public/images/temporary/"

  val USER_PHOTO_DIR = IMAGE_PATH  + "/users/photos/"

  val USER_THUMBNAIL_DIR = IMAGE_PATH + "/users/thumbnails/"

  val USER_PHOTO_URL = IMAGE_PATH  + "/users/"

}
