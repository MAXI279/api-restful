const constants = require('../constants/api.constants')
const {
  STATUS: {
    INTERNAL_ERROR,
    NOT_FOUND,
    BAD_REQUEST
  }
} = constants

class ApiError {
  constructor (code, message) {
    this.code = code
    this.message = message
  }

  static notFound (msg) {
    return new ApiError(NOT_FOUND.code, `${NOT_FOUND.tag} ${msg}`)
  }

  static badRequest (msg) {
    return new ApiError(BAD_REQUEST.code, `${BAD_REQUEST.tag} ${msg}`)
  }

  static internal (msg) {
    return new ApiError(INTERNAL_ERROR.code, `${INTERNAL_ERROR.tag} ${msg}`)
  }
}

module.exports = ApiError
