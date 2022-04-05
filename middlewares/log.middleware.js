const logger = require('../logs')

const infoLog = (req, res, next) => {
  const respuesta = `ruta ${req.url} método ${req.method} ejecutado`
  logger.info(respuesta)
  next()
}

module.exports = infoLog
