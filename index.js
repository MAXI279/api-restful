
const app = require('./app')

const mongoose = require('mongoose')
const http = require('http')

const { chatTable, prodTable } = require('./data/config')

const initDB = require('./data/initDB')
const env = require('./env.config')
const process = require('process')
const cluster = require('cluster')
const os = require('os')
const { /* puerto  , */ modo } = require('./utils/minimist')

const MensajesFactoryDAO = require('./models/daos/MensajesFactoryDAO')

const modoCluster = modo === 'CLUSTER'
// console.log(`${modoCluster} Y ${modo} y ${cluster.isPrimary}`)

if (modoCluster && cluster.isPrimary) {
  const NUM_WORKERS = os.cpus().length

  console.log(` PRIMARY PID => ${process.pid}`)
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(` Worker ${worker.process.pid} exitted`)
    cluster.fork()
  })
} else {
  const PORT = env.PORT || 8080

  const server = http.createServer(app)
  const io = require('socket.io')(server)
  const { chatSocket } = require('./socket/index')

  initDB(chatTable, prodTable)
  const contenedor = MensajesFactoryDAO.get(env.PERSISTENCIA_MENSAJES)

  const chat = []
  chatSocket(contenedor, io, chat)

  server.listen(PORT, async () => {
    mongoose.connect(env.MONGO_URL)
      .then(() => {
        console.log('Connected to DB!')
        console.log('Server is up and running on port: ', +PORT)
      })
  })
}
