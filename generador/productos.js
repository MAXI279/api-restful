const faker = require('faker')

const get = () => ({
  title: faker.internet.userName(),
  price: faker.datatype.float({ max: 100 }),
  thumbnail: faker.internet.url()
})

module.exports = {
  get
}
