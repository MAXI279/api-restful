const ProductosSQLDAO = require('./ProductosSQLDAO')

class ProductosFactoryDAO {
  static get (tipo) {
    const tipos = {
      SQL: new ProductosSQLDAO()
    }
    return tipos[tipo]
  }
}

module.exports = ProductosFactoryDAO
