import org.squeryl.adapters.{H2Adapter, MySQLInnoDBAdapter, PostgreSqlAdapter}
import org.squeryl.internals.DatabaseAdapter
import org.squeryl.{Session, SessionFactory}
import play.api.db.DB
import play.api.{Application, GlobalSettings, Logger}
import service.Database
import service.SquerylEntryPoint._
import models.{House, Account, PasswordCredentialSet}
import service.dao.{HouseDao, AccountDao}

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

  def insertTestData() {
    createTestUser()
    createTestHouse()
  }

  def createTestUser() {
    val a = Account(
      id = 1,
      userId = "daunnc@gmail.com",
      auth_method = "userPassword",
      providerId = "userpass",
      avatarUrl = Some("http://www.gravatar.com/avatar/b255090c11cffb6bd48810e03502d487?d=404"),
      firstName = "Лев",
      lastName = "Троцкий",
      fullName = "Лев Троцкий",
      email = Some("daunnc@gmail.com")
    )

    val pcs = PasswordCredentialSet(
      id = 1,
      accountId = 1,
      hasher = "bcrypt",
      password = "$2a$10$J82QwmZKNfyxsn3Pwi3GV.7D72bBeh5Yu9e20E7NMCiFHBhwjurqK", // 12345678
      salt = None
    )

    AccountDao.insert(a)
    PasswordCredentialSet.insert(pcs)

  }

  def createTestHouse() {
    val house = House(id = 0, accountId = 1, title = Some("Квартира в центре"), description = Some("Сдаю недорого"), houseType = Some("APT"), rentType=Some("ENTIRE_HOUSE"))
    HouseDao.create(house)
  }

  override def onStart(app: Application) {
    initSqueryl(app)
    Logger.info("refreshing schema")
    inTransaction {
      Database.drop
      Database.create
      insertTestData()
    }
  }
}