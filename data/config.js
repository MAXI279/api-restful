const knex = require('knex')

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/ecommerce.sqlite'
  },
  useNullAsDefault: true
}

const configMariaDB = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'api'
  },
  useNullAsDefault: true
}

module.exports = {
  knexSqlite3: knex(config),
  knexMariaDB: knex(configMariaDB),
  chatTable: 'mensajes',
  prodTable: 'productos'
}
