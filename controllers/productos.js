
const { productos } = require('../data/productos')
const existeRegistroEnArray = require('../utils/valido-existencia-registro')

const getAllProductos = (req, res) => {
  try {
    return res.json({
      status: 200,
      body: productos
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const getProductoById = (req, res) => {
  try {
    const { id } = req.params
    const producto = productos.find(prod => prod.id === +id)
    if (!producto) {
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
    const { title, price, thumbnail } = req.body
    const ultimoId = Math.max(...productos.map(prod => prod.id)) + 1
    const producto = {
      id: ultimoId,
      title,
      price,
      thumbnail
    }
    productos.push(producto)
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
    const { title, price, thumbnail } = req.body
    const producto = productos.find(prod => prod.id === +id)
    if (!producto) {
      return res.json({
        status: 400,
        error: 'Producto no encontrado'
      })
    }
    const nuevoProducto = {
      id: producto.id,
      title,
      price,
      thumbnail
    }
    productos.splice(productos.findIndex(prod => prod.id === +id), 1, nuevoProducto)
    return res.json({
      status: 200,
      body: nuevoProducto
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteProductoById = (req, res) => {
  try {
    const { id } = req.params
    if (!existeRegistroEnArray(productos, id)) {
      return res.json({
        status: 400,
        error: 'Producto no encontrado'
      })
    }
    productos.splice(productos.findIndex(prod => prod.id === +id), 1)
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
