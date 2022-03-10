
const getLogin = (req, res) => {
  const user = req.user
  res.render('index', { nombre: user.nombre, email: user.email })
}

const postLogin = (req, res) => {
  const user = req.user
  res.render('index', { nombre: user.nombre, email: user.email })
}

const getFaillogin = async (req, res) => {
  res.render('faillogin')
}

const getLogout = (req, res) => {
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
}

const getSignUp = (req, res) => {
  res.render('register')
}

const postSignUp = async (req, res) => {
  console.log(req.user)
  res.redirect('/')
}

const getFailsignup = async (req, res) => {
  res.render('failsignup')
}

module.exports = {
  getLogin,
  postLogin,
  getFaillogin,
  getLogout,
  getSignUp,
  postSignUp,
  getFailsignup
}
