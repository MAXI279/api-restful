
const webAuth = (req, res, next) => {
  if (req.session?.nombre) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = webAuth
