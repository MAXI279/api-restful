const MensajesSQLDAO = require('./MensajesSQLDAO')

class MensajesFactoryDAO {
  static get (tipo) {
    const tipos = {
      SQL: new MensajesSQLDAO()
    }
    return tipos[tipo]
  }
}

module.exports = MensajesFactoryDAO
