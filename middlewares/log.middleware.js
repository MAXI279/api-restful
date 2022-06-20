const logger = require('../logs')

const infoLog = async (ctx, next) => {
  const respuesta = `ruta ${ctx.url} método ${ctx.method} ejecutado`
  logger.info(respuesta)
  await next()
}

module.exports = infoLog
