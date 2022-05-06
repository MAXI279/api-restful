const ProductosApi = require('../models/daos/productos.api') // Data Access Layer

class ProductoService {
  constructor () {
    // Aqui crearia una instancia de mi DAL la cual estaria buena que sea generica y pasarle mi modelo a futuro
    this.ProductosApiInstance = new ProductosApi()
  }

  async listarTodos () {
    return await this.ProductosApiInstance.listarTodos()
  }

  async listarPorId (id) {
    return await this.ProductosApiInstance.listarPorId(id)
  }

  async guardar (product) {
    return await this.ProductosApiInstance.guardar(product)
  }

  async actualizar (product, id) {
    return await this.ProductosApiInstance.actualizar(product, id)
  }

  async eliminar (id) {
    return await this.ProductosApiInstance.eliminar(id)
  }
}

module.exports = ProductoService
