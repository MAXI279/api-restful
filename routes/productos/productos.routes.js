const express = require('express')
const { getAllProductos, getProductoById, postProducto, putProductoById, deleteProductoById } = require('../../controllers/productos')

const router = express.Router()

router.get('/', getAllProductos)
router.get('/:id', getProductoById)
router.post('/', postProducto)
router.put('/:id', putProductoById)
router.delete('/:id', deleteProductoById)

module.exports = router
