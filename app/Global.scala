import org.squeryl.adapters.{MySQLInnoDBAdapter, H2Adapter, PostgreSqlAdapter}
import org.squeryl.internals.DatabaseAdapter
import org.squeryl.{Session, SessionFactory}
import play.api.db.DB
import play.api.mvc.WithFilters
import play.api.{Application, GlobalSettings}

object Global extends GlobalSettings {
  def getSession(adapter:DatabaseAdapter, app: Application) =
    Session.create(DB.getConnection()(app), adapter)

  def initSqueryl(app: Application) = SessionFactory.concreteFactory =
    app.configuration.getString("db.default.driver") match {
      case Some("org.h2.Driver") => Some(() => getSession(new H2Adapter, app))
      case Some("org.postgresql.Driver") =>
        Some(() => getSession(new PostgreSqlAdapter, app))
      case Some("com.mysql.jdbc.Driver") =>
        Some(() => getSession(new MySQLInnoDBAdapter, app))
      case _ =>
        sys.error("Database driver must be either org.h2.Driver or " +
          "org.postgresql.Driver or com.mysql.jdbc.Driver")
    }

  override def onStart(app: Application) {
    initSqueryl(app)
  }
}