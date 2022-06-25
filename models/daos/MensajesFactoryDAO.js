const MensajesSQLDAO = require('./MensajesSQLDAO')
const MensajesFirebaseDAO = require('./MensajesFirebaseDAO')
const db = require('../../data/configFirebase')

class MensajesFactoryDAO {
  static get (tipo) {
    const tipos = {
      SQL: new MensajesSQLDAO(),
      FIREBASE: new MensajesFirebaseDAO(db())
    }
    return tipos[tipo]
  }
}

module.exports = MensajesFactoryDAO
