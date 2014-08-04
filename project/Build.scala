import com.tuplejump.sbt.yeoman.Yeoman
import play.Project._
import sbt._

object ApplicationBuild extends Build {

  val appName = "flattern"
  val appVersion = "1.0.0"

  val appDependencies = Seq(
    jdbc
  )

  val appSettings = Yeoman.yeomanSettings ++ Yeoman.withTemplates

  val main = play.Project(appName, appVersion, appDependencies).settings(
    appSettings: _*
  )

}
