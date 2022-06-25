
const ContenedorFirebase = require('../containers/Firebase.container')

class MensajesFirebaseDAO extends ContenedorFirebase {
  constructor (db) {
    super(db.collection('mensajes'))
  }
}

module.exports = MensajesFirebaseDAO
