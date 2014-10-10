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
    "org.squeryl" %% "squeryl" % "0.9.6-RC3",
    "postgresql" % "postgresql" % "9.1-901.jdbc4",
    "com.chuusai" % "shapeless" % "2.0.0" cross CrossVersion.full,
    "com.sksamuel.scrimage" %% "scrimage-core" % "1.4.1",
    "com.sksamuel.scrimage" %% "scrimage-canvas" % "1.4.1",
    "com.sksamuel.scrimage" %% "scrimage-filters" % "1.4.1",
    "com.github.tototoshi" %% "play-json4s-jackson" % "0.3.0",
    "org.json4s" % "json4s-ext_2.10" % "3.2.10"
  )
  //    "org.json4s" %% "json4s-jackson" % "3.2.10",
  //    "org.json4s" % "json4s-ext_2.10" % "3.2.10"

  val appSettings = Yeoman.yeomanSettings ++ Yeoman.withTemplates

  val main = play.Project(appName, appVersion, appDependencies).settings(
    appSettings: _*
  )

}
