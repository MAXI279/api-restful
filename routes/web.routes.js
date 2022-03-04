const express = require('express')
const { postProducto, getProductos } = require('../controllers/productos.web')
const webAuth = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  const nombre = req.session?.nombre
  if (nombre) {
    req.session.destroy(err => {
      if (!err) {
        res.clearCookie('my-session')
        res.render('logout', { nombre: nombre })
      } else {
        res.clearCookie('my-session')
        res.redirect('/')
      }
    })
  } else {
    res.render('login')
  }
})

router.post('/login', (req, res) => {
  const { nombre } = req.body
  if (!nombre) {
    return res.render('login', { message: 'No ha ingresado un nombre' })
  }
  req.session.nombre = nombre
  res.render('index', { nombre: req.session.nombre })
})

router.get('/login', webAuth, (req, res) => {
  res.render('index', { nombre: req.session.nombre })
})

router.post('/productos', postProducto)

router.get('/productos', getProductos)

module.exports = router
