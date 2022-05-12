const { knexMariaDB, prodTable } = require('../../data/config')
const SQLContainer = require('../containers/SQL.container')

class ProductosSQLDAO extends SQLContainer {
  constructor () {
    if (!ProductosSQLDAO.instance) {
      super(prodTable, knexMariaDB)
      ProductosSQLDAO.instance = this
      return this
    } else {
      return ProductosSQLDAO.instance
    }
  }

  async listarTodos () {
    return await this.getAll()
  }

  async listarPorId (id) {
    const producto = await this.getById(id)
    return producto || { error: `Producto con id ${id} no encontrado!` }
  }

  async guardar (prod) {
    const { title, price, thumbnail } = prod
    if (!title || !price || !thumbnail) return { error: 'titulo, precio y url son campos obligatorios' }
    if (price < 0 || isNaN(price)) return { error: 'El precio debe ser un número positivo' }

    const idNuevoProducto = await this.save(prod)
    if (idNuevoProducto === -1) return { error: 'Error al crear producto' }
    const nuevoProducto = await this.getById(idNuevoProducto)
    return nuevoProducto
  }

  async actualizar (prod, id) {
    const producto = await this.update(prod, id)
    if (!producto) return { error: `Producto con id ${id} no encontrado!` }
    if (producto === -1) return { error: `Error al actualizar producto con id: ${id} !` }
    const productoActualizado = await this.getById(id)
    return productoActualizado
  }

  async eliminar (id) {
    const idEliminado = await this.deleteById(id)
    if (!idEliminado) return { error: `Producto con id ${id} no encontrado!` }
    return idEliminado
  }
}

module.exports = ProductosSQLDAO
