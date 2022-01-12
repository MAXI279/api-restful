
const ProductosApi = require('../models/productos.api')

const productos = new ProductosApi()

const getAllProductos = (req, res) => {
  try {
    return res.json({
      status: 200,
      body: productos.listarTodos()
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const getProductoById = (req, res) => {
  try {
    const { id } = req.params
    const producto = productos.listarPorId(id)
    if (producto.error) {
      return res.json({
        status: 400,
        error: 'Producto no encontrado'
      })
    }
    return res.json({
      status: 200,
      body: producto
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const postProducto = (req, res) => {
  try {
    const producto = productos.guardar(req.body)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    return res.json({
      status: 200,
      body: producto
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const putProductoById = (req, res) => {
  try {
    const { id } = req.params
    const producto = productos.actualizar(req.body, id)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    return res.json({
      status: 200,
      body: producto
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteProductoById = (req, res) => {
  try {
    const { id } = req.params
    const producto = productos.eliminar(id)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
}

module.exports = {
  getAllProductos,
  getProductoById,
  postProducto,
  putProductoById,
  deleteProductoById
}
