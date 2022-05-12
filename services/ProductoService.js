const ProductosFactoryDAO = require('../models/daos/ProductosFactoryDAO') // Data Access Layer
const env = require('../env.config')
class ProductoService {
  constructor () {
    this.productosDao = ProductosFactoryDAO.get(env.PERSISTENCIA_PRODUCTOS)
  }

  async listarTodos () {
    return await this.productosDao.listarTodos()
  }

  async listarPorId (id) {
    return await this.productosDao.listarPorId(id)
  }

  async guardar (product) {
    return await this.productosDao.guardar(product)
  }

  async actualizar (product, id) {
    return await this.productosDao.actualizar(product, id)
  }

  async eliminar (id) {
    return await this.productosDao.eliminar(id)
  }
}

module.exports = ProductoService
