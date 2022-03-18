const calculo = (cant) => {
  const myObject = {}
  for (let i = 0; i < cant; i++) {
    const numero = Math.floor(Math.random() * 1000) + 1
    if (!(numero in myObject)) {
      myObject[numero] = 1
    } else {
      myObject[numero]++
    }
  }
  return myObject
}

process.on('message', (cant) => {
  const objeto = calculo(cant)
  process.send(objeto)
})
