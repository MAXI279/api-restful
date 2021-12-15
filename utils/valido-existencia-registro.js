const existeRegistroEnArray = (objectArray, id) => {
  return objectArray.findIndex(prod => prod.id === +id) !== -1
}

module.exports = existeRegistroEnArray
