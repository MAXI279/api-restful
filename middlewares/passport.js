const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const TwitterStrategy = require('passport-twitter').Strategy
const bCrypt = require('bcrypt')

const UsersDao = require('../models/daos/Users.dao')

// const {
//   TWITTER_API_KEY,
//   TWITTER_API_SECRET
// } = require('../env.config')

const User = new UsersDao()

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
  User.createUser(newUser)
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
  User.getByEmail(username)
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

// passport.use(new TwitterStrategy({
//   consumerKey: TWITTER_API_KEY,
//   consumerSecret: TWITTER_API_SECRET,
//   callbackURL: 'http://localhost:8080/api/auth/twitter/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     console.log(JSON.stringify(profile, null, 2))
//     const federatedUser = await User.getByTwitterId(profile.id)
//     if (!federatedUser) {
//       const userItem = { // 'Jorge Malo'
//         firstname: profile.displayName.split(' ')[0],
//         lastname: profile.displayName.split(' ')[1],
//         email: `${profile.username}@gmail.com`,
//         twitterId: profile.id
//       }
//       const newUser = formatUserForDB(userItem)
//       const user = await User.createUser(newUser)
//       console.log('User registration successful!')
//       return done(null, user)
//     }
//     return done(null, federatedUser)
//   } catch (error) {
//     console.log('Error signing in with twitter')
//     return done(error)
//   }
// }))

passport.serializeUser((user, done) => {
  console.log('Inside serializer')
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log('Inside deserializer')
  User.getById(id)
    .then(user => {
      done(null, user)
    })
})

module.exports = passport
