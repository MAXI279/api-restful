const express = require('express')
const { DEFAULT_RANDOM_NUM_CANT } = require('../../constants/api.constants')
const router = express.Router()
const { fork } = require('child_process')

router.get('/', (req, res) => {
  const { cant = DEFAULT_RANDOM_NUM_CANT } = req.query
  /*
  const computo = fork('./utils/calculo-fork-process.js')
  computo.send(cant)
  computo.on('message', (myObject) => {
    return res.json({
      msj: 'api/randoms',
      data: myObject
    })
  })
*/
  const myObject = {}
  for (let i = 0; i < cant; i++) {
    const numero = Math.floor(Math.random() * 1000) + 1
    if (!(numero in myObject)) {
      myObject[numero] = 1
    } else {
      myObject[numero]++
    }
  }
  console.log('no me bloqueo')
  return res.json({
    msj: 'api/randoms',
    data: myObject
  })
})

module.exports = router
