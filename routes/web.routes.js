const express = require('express')
const { postProducto, getProductos } = require('../controllers/productos.web')
const { getLogin, postLogin, getSignUp, postSignUp, getLogout, getFailsignup, getFaillogin } = require('../controllers/auth.web')
const checkAuthentication = require('../middlewares/auth.middleware')
const passport = require('../middlewares/passport')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.get('/', checkAuthentication, getLogin)

router.get('/register', getSignUp)

router.get('/logout', getLogout)

router.post('/login', passport.authenticate('signin', { failureRedirect: '/faillogin' }), postLogin)

router.get('/faillogin', getFaillogin)

router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), postSignUp)

router.get('/failsignup', getFailsignup)

router.get('/login', checkAuthentication, getLogin)

router.post('/productos', postProducto)

router.get('/productos', getProductos)

module.exports = router
