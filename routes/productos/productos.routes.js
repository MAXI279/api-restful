const express = require('express')
const { productoController } = require('../../controllers/index')

const router = express.Router()

router.get('/', (req, res, next) => productoController.getAllProductos(req, res, next))
router.get('/:id', (req, res, next) => productoController.getProductoById(req, res, next))
router.post('/', (req, res, next) => productoController.postProducto(req, res, next))
router.put('/:id', (req, res, next) => productoController.putProductoById(req, res, next))
router.delete('/:id', (req, res, next) => productoController.deleteProductoById(req, res, next))

module.exports = router
