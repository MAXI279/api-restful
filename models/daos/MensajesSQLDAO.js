const { chatTable, knexSqlite3 } = require('../../data/config')
const SQLContainer = require('../containers/SQL.container')

class MensajesSQLDAO extends SQLContainer {
  constructor () {
    if (!MensajesSQLDAO.instance) {
      super(chatTable, knexSqlite3)
      MensajesSQLDAO.instance = this
      return this
    } else {
      return MensajesSQLDAO.instance
    }
  }
}

module.exports = MensajesSQLDAO
