const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')
const env = require('../env.config')

const UsersFactoryDAO = require('../models/daos/UsersFactoryDAO')
const userDao = UsersFactoryDAO.get(env.PERSISTENCIA_USERS)

const salt = () => bCrypt.genSaltSync(10)
const encrypt = (password) => bCrypt.hashSync(password, salt())
const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password)

// Passport Local Strategy
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
},
(req, username, password, done) => {
  const newUser = {
    nombre: req.body.nombre,
    email: username,
    password: encrypt(password)
  }
  userDao.createUser(newUser)
    .then((user) => {
      console.log('User registration successful!')
      return done(null, user)
    })
    .catch((error) => {
      console.log('Error siging up >>> ', error)
      return done(error)
    })
}
))

passport.use('signin', new LocalStrategy((username, password, done) => {
  userDao.getByEmail(username)
    .then((user) => {
      if (!isValidPassword(user, password)) {
        console.log('Invalid password')
        return done(null, false)
      };
      return done(null, user)
    })
    .catch((error) => {
      console.log(error)
      return done(error)
    })
}))

passport.serializeUser((user, done) => {
  console.log('Inside serializer')
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log('Inside deserializer')
  userDao.getById(id)
    .then(user => {
      done(null, user)
    })
})

module.exports = passport
