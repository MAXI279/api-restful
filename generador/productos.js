const faker = require('faker')

const get = () => ({
  title: faker.commerce.product(),
  price: faker.commerce.price(),
  thumbnail: faker.image.image()
})

const getMockedProductos = (cantidad) => {
  const productosMocked = []
  for (let i = 0; i < cantidad; i++) {
    productosMocked.push({
      id: i,
      ...get()
    })
  }
  return productosMocked
}

module.exports = {
  get,
  getMockedProductos
}
