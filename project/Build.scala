import com.tuplejump.sbt.yeoman.Yeoman
import play.Project._
import sbt._

object ApplicationBuild extends Build {

  val appName = "flattern"
  val appVersion = "1.0.0"

  val appDependencies = Seq(
    jdbc,
    cache,
    "ws.securesocial" %% "securesocial" % "2.1.3",
    "com.typesafe.slick" %% "slick" % "2.0.0",
    "postgresql" % "postgresql" % "9.1-901.jdbc4",
    "com.github.tototoshi" %% "slick-joda-mapper" % "1.0.0",
    "com.github.tminglei" % "slick-pg_2.10" % "0.5.3",
    "com.github.tminglei" % "slick-pg_joda-time_2.10" % "0.5.3",
    "com.github.tminglei" % "slick-pg_play-json_2.10" % "0.5.3",
    "com.chuusai" % "shapeless" % "2.0.0" cross CrossVersion.full,
    "com.sksamuel.scrimage" %% "scrimage-core" % "1.4.1",
    "com.sksamuel.scrimage" %% "scrimage-canvas" % "1.4.1",
    "com.sksamuel.scrimage" %% "scrimage-filters" % "1.4.1"
  )

  val appSettings = Yeoman.yeomanSettings ++ Yeoman.withTemplates

  val main = play.Project(appName, appVersion, appDependencies).settings(
    appSettings: _*
  )

}
