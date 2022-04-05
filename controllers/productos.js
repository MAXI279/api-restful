
const ProductosApi = require('../models/productos.api')
const ApiError = require('../error/ApiError')
const productos = new ProductosApi()

const getAllProductos = async (req, res, next) => {
  try {
    return res.json({
      status: 200,
      body: await productos.listarTodos()
    })
  } catch (error) {
    next(error)
  }
}

const getProductoById = async (req, res, next) => {
  try {
    const { id } = req.params
    const producto = await productos.listarPorId(id)
    if (producto.error) {
      throw ApiError.badRequest('Producto no encontrado')
      // return res.json({
      //   status: 400,
      //   error: 'Producto no encontrado'
      // })
    }
    return res.json({
      status: 200,
      body: producto
    })
  } catch (error) {
    next(error)
  }
}

const postProducto = async (req, res, next) => {
  try {
    const producto = await productos.guardar(req.body)
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

const putProductoById = async (req, res, next) => {
  try {
    const { id } = req.params
    const producto = await productos.actualizar(req.body, id)
    if (producto.error) {
      // return res.json({
      //   status: 400,
      //   error: producto.error
      // })
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

const deleteProductoById = async (req, res, next) => {
  try {
    const { id } = req.params
    const producto = await productos.eliminar(id)
    if (producto.error) {
      throw ApiError.badRequest(producto.error)
    }
    return res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllProductos,
  getProductoById,
  postProducto,
  putProductoById,
  deleteProductoById
}
