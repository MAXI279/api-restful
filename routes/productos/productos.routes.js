const Router = require('koa-router')
const { productoController } = require('../../controllers/index')

const router = new Router({
  prefix: '/api/productos'
})

router.get('/', (ctx, next) => productoController.getAllProductos(ctx, next))
router.get('/', (ctx, next) => productoController.getAllProductos(ctx, next))
router.get('/:id', (ctx, next) => productoController.getProductoById(ctx, next))
router.post('/', (ctx, next) => productoController.postProducto(ctx, next))
router.put('/:id', (ctx, next) => productoController.putProductoById(ctx, next))
router.delete('/:id', (ctx, next) => productoController.deleteProductoById(ctx, next))

module.exports = router
