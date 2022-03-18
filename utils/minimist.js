const minimist = require('minimist')

const args = minimist(process.argv.splice(2), {
  alias: {
    p: 'puerto'
  },
  default: {
    puerto: 8080
  }
})

module.exports = args
