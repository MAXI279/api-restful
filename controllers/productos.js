
const ProductoService = require('../services/ProductoService')
const ApiError = require('../error/ApiError')

class ProductoController {
  constructor () {
    this.ProductoServiceInstance = new ProductoService()
  }

  async getAllProductos (ctx, next) {
    try {
      ctx.body = {
        status: 200,
        body: await this.ProductoServiceInstance.listarTodos()
      }
    } catch (error) {
      await next(error)
    }
  }

  async getProductoById (ctx, next) {
    try {
      const { id } = ctx.params
      const producto = await this.ProductoServiceInstance.listarPorId(id)
      if (producto.error) {
        throw ApiError.badRequest('Producto no encontrado')
      }
      ctx.body = {
        status: 200,
        body: producto
      }
    } catch (error) {
      await next(error)
    }
  }

  async postProducto (ctx, next) {
    try {
      const producto = await this.ProductoServiceInstance.guardar(ctx.request.body)
      if (producto.error) {
        throw ApiError.badRequest(producto.error)
      }
      ctx.body = {
        status: 200,
        body: producto
      }
    } catch (error) {
      await next(error)
    }
  }

  async putProductoById (ctx, next) {
    try {
      const { id } = ctx.params
      const producto = await this.ProductoServiceInstance.actualizar(ctx.request.body, id)
      if (producto.error) {
        throw ApiError.badRequest(producto.error)
      }
      ctx.body = {
        status: 200,
        body: producto
      }
    } catch (error) {
      await next(error)
    }
  }

  async deleteProductoById (ctx, next) {
    try {
      const { id } = ctx.params
      const producto = await this.ProductoServiceInstance.eliminar(id)
      if (producto.error) {
        throw ApiError.badRequest(producto.error)
      }
      ctx.body = {
        status: 200
      }
    } catch (error) {
      await next(error)
    }
  }
}

module.exports = ProductoController
