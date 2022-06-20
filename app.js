const Koa = require('koa')
const koaBody = require('koa-body')

const infoLog = require('./middlewares/log.middleware')
const apiErrorHandler = require('./error/api-error-handler')

const app = new Koa()
app.use(koaBody())

app.use(infoLog)

const router = require('koa-router')()

router.get('/test', async (ctx) => {
  ctx.body = {
    status: 200
  }
})

app.use(router.routes())

const rutasProductos = require('./routes/productos/productos.routes')
app.use(rutasProductos.routes())

app.use(apiErrorHandler)

module.exports = app
