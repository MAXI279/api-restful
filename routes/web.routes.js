const express = require('express')
const { postProducto, getProductos } = require('../controllers/productos.web')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/productos', postProducto)

router.get('/productos', getProductos)

module.exports = router
