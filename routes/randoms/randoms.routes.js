const express = require('express')
const { DEFAULT_RANDOM_NUM_CANT } = require('../../constants/api.constants')
const router = express.Router()
const { fork } = require('child_process')

router.get('/', (req, res) => {
  const { cant = DEFAULT_RANDOM_NUM_CANT } = req.query
  const computo = fork('./utils/calculo-fork-process.js')
  computo.send(cant)
  computo.on('message', (myObject) => {
    return res.json({
      msj: 'api/randoms',
      data: myObject
    })
  })

  console.log('no me bloqueo')
})

module.exports = router
