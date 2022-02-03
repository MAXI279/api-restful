const { knexSqlite3, knexMariaDB } = require('./config')

const initDB = async (tableNameChat, tableNameProductos) => {
  const existeTablaMensajes = await knexSqlite3.schema.hasTable(tableNameChat)
  if (!existeTablaMensajes) {
    await knexSqlite3.schema.createTable(tableNameChat, table => {
      table.increments('id').primary()
      table.string('nombre')
      table.string('text')
    })
    console.log(`la tabla ${tableNameChat} fue creada con exito!`)
  } else {
    console.log(`la tabla ${tableNameChat} ya existia, se utilizará!`)
  }

  const existeTablaProductos = await knexMariaDB.schema.hasTable(tableNameProductos)
  if (!existeTablaProductos) {
    await knexMariaDB.schema.createTable(tableNameProductos, table => {
      table.increments('id').primary()
      table.string('title')
      table.float('price')
      table.string('thumbnail')
    })
    console.log(`la tabla ${tableNameProductos} fue creada con exito!`)
  } else {
    console.log(`la tabla ${tableNameProductos} ya existia, se utilizará!`)
  }
}

module.exports = initDB
