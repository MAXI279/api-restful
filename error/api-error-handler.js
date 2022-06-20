// const ApiError = require('./ApiError')
const constants = require('../constants/api.constants')
const logger = require('../logs')

const {
  STATUS: {
    INTERNAL_ERROR
  }
} = constants

const apiErrorHandler = (ctx, next) => {
  // if (err instanceof ApiError) {
  //   logger.error(`${err.code} - ${err.message}`)
  //   ctx.body = {
  //     status: err.code,
  //     error: err.message
  //   }
  //   return
  // }
  logger.error(`${INTERNAL_ERROR.code} - ${INTERNAL_ERROR.tag}`)
  ctx.body = {
    status: INTERNAL_ERROR.code,
    error: `${INTERNAL_ERROR.tag} An error ocurred, please contact support`
  }
}

module.exports = apiErrorHandler
