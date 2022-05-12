const UsersMongoDAO = require('./UsersMongoDAO')

class UsersFactoryDAO {
  static get (tipo) {
    const tipos = {
      MONGO: new UsersMongoDAO()
    }
    return tipos[tipo]
  }
}

module.exports = UsersFactoryDAO
