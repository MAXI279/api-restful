const minimist = require('minimist')

const args = minimist(process.argv.splice(2), {
  alias: {
    p: 'puerto',
    m: 'modo'
  },
  default: {
    puerto: 8080,
    modo: 'FORK'
  }
})

module.exports = args
