const ProductosApi = require('../models/productos.api')

const productos = new ProductosApi()

const postProducto = async (req, res) => {
  try {
    const producto = await productos.guardar(req.body)
    if (producto.error) {
      return res.render('index', { message: producto.error })
    }
    return res.render('index', { message: `Exito creando el producto ${producto[0].title}` })
  } catch (error) {
    return res.render('index', { message: 'Ha ocurrido un error, reintente' })
  }
}

const getProductos = async (req, res) => {
  try {
    const productosList = await productos.listarTodos()
    if (productosList.length <= 0) {
      return res.render('listado-productos', { error: 'No hay productos' })
    }
    return res.render('listado-productos', { productos: productosList })
  } catch (error) {
    return res.render('listado-productos', { error: 'Ha ocurrido un error, reintente' })
  }
}

module.exports = {
  postProducto,
  getProductos
}
