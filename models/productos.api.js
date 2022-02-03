const { knexMariaDB, prodTable } = require('../data/config')
const Contenedor = require('../utils/manejo-knex')
const contenedor = new Contenedor(prodTable, knexMariaDB)
class ProductosApi {
  constructor () {
    this.repositorio = contenedor
  }

  async listarTodos () {
    return await this.repositorio.getAll()
  }

  async listarPorId (id) {
    const producto = await this.repositorio.getById(id)
    return producto || { error: `Producto con id ${id} no encontrado!` }
  }

  async guardar (prod) {
    const { title, price, thumbnail } = prod
    if (!title || !price || !thumbnail) return { error: 'titulo, precio y url son campos obligatorios' }
    if (price < 0 || isNaN(price)) return { error: 'El precio debe ser un número positivo' }

    const idNuevoProducto = await this.repositorio.save(prod)
    if (idNuevoProducto === -1) return { error: 'Error al crear producto' }
    const nuevoProducto = await this.repositorio.getById(idNuevoProducto)
    return nuevoProducto
  }

  async actualizar (prod, id) {
    const producto = await this.repositorio.update(prod, id)
    if (!producto) return { error: `Producto con id ${id} no encontrado!` }
    if (producto === -1) return { error: `Error al actualizar producto con id: ${id} !` }
    const productoActualizado = await this.repositorio.getById(id)
    return productoActualizado
  }

  async eliminar (id) {
    const idEliminado = await this.repositorio.deleteById(id)
    if (!idEliminado) return { error: `Producto con id ${id} no encontrado!` }
    return idEliminado
  }
}

module.exports = ProductosApi
