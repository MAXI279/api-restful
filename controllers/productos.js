
const ProductoService = require('../services/ProductoService')
const ApiError = require('../error/ApiError')

class ProductoController {
  constructor () {
    this.ProductoServiceInstance = new ProductoService()
  }

  async getAllProductos (req, res, next) {
    try {
      return res.json({
        status: 200,
        body: await this.ProductoServiceInstance.listarTodos()
      })
    } catch (error) {
      next(error)
    }
  }

  async getProductoById (req, res, next) {
    try {
      const { id } = req.params
      const producto = await this.ProductoServiceInstance.listarPorId(id)
      if (producto.error) {
        throw ApiError.badRequest('Producto no encontrado')
      }
      return res.json({
        status: 200,
        body: producto
      })
    } catch (error) {
      next(error)
    }
  }

  async postProducto (req, res, next) {
    try {
      const producto = await this.ProductoServiceInstance.guardar(req.body)
      if (producto.error) {
        throw ApiError.badRequest(producto.error)
      }
      return res.json({
        status: 200,
        body: producto
      })
    } catch (error) {
      next(error)
    }
  }

  async putProductoById (req, res, next) {
    try {
      const { id } = req.params
      const producto = await this.ProductoServiceInstance.actualizar(req.body, id)
      if (producto.error) {
        throw ApiError.badRequest(producto.error)
      }
      return res.json({
        status: 200,
        body: producto
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteProductoById (req, res, next) {
    try {
      const { id } = req.params
      const producto = await this.ProductoServiceInstance.eliminar(id)
      if (producto.error) {
        throw ApiError.badRequest(producto.error)
      }
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductoController
