const express = require('express')
const morgan = require('morgan')
const rutasProductos = require('./productos/productos.routes')
const rutasRandoms = require('./randoms/randoms.routes')
const router = express.Router()
const { getMockedProductos } = require('../generador/productos')

router.use(morgan('tiny'))
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use('/productos', rutasProductos)

router.use('/randoms', rutasRandoms)

router.get('/productos-test', async (req, res, next) => {
  try {
    const productos = getMockedProductos(5)
    res.json(productos)
  } catch (error) {
    next(error)
  }
})

module.exports = router
