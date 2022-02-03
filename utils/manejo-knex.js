const fs = require('fs')

class Contenedor {
  constructor (tabla, knex) {
    this.tabla = tabla
    this.knex = knex
  }

  async getAll () {
    try {
      const data = await this.knex.from(this.tabla).select('*')
      return data // JSON.parse(data)
    } catch (error) {
      throw console.log(`Hubo un error: ${error}`)
    }
  }

  async getById (id) {
    try {
      const element = await this.knex.from(this.tabla).select('*').where('id', id)
      if (!element) {
        return null
      } else {
        return element
      }
    } catch (error) {
      console.log('No se encontro el elemento', error)
    }
  }

  async deleteAll () {
    const empty = ''
    await fs.promises.writeFile(this.url, empty, 'utf-8')
  }

  async deleteById (id) {
    try {
      return await this.knex(this.tabla).where('id', id).del()
    } catch (error) {
      console.log(`No se pudo eliminar el elemento con id ${id}`, error)
    }
  }

  async save (obj) {
    try {
      return await this.knex(this.tabla).insert(obj)
    } catch (error) {
      console.log('No se pudo insertar el elemento', error)
      return -1
    }
  }

  async update (obj, id) {
    try {
      return await this.knex(this.tabla).where({ id: id }).update(obj)
    } catch (error) {
      console.log('No se pudo actualizar el elemento', error)
      return -1
    }
  }
}

module.exports = Contenedor
