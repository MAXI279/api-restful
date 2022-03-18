const express = require('express')
const morgan = require('morgan')
const rutasProductos = require('./productos/productos.routes')
const rutasRandoms = require('./randoms/randoms.routes')
const router = express.Router()

router.use(morgan('tiny'))
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.use('/productos', rutasProductos)

router.use('/randoms', rutasRandoms)

module.exports = router
