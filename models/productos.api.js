const { productos } = require('../data/productos')

class ProductosApi {
  constructor () {
    this.productos = productos
  }

  listarTodos () {
    return [...this.productos]
  }

  listarPorId (id) {
    const producto = this.productos.find(prod => prod.id === +id)
    return producto || { error: `Producto con id ${id} no encontrado!` }
  }

  guardar (prod) {
    const { title, price, thumbnail } = prod
    if (!title || !price || !thumbnail) return { error: 'titulo, precio y url son campos obligatorios' }
    if (price < 0 || isNaN(price)) return { error: 'El precio debe ser un número positivo' }

    const ultimoId = Math.max(...this.productos.map(prod => prod.id)) + 1

    const nuevoProducto = { ...prod, id: ultimoId }
    this.productos.push(nuevoProducto)
    return nuevoProducto
  }

  actualizar (prod, id) {
    const indice = this.productos.findIndex(prod => prod.id === +id)
    if (indice < 0) return { error: `Producto con id ${id} no encontrado!` }
    this.productos[indice] = { id: +id, ...prod }
    return this.productos[indice]
  }

  eliminar (id) {
    const indice = this.productos.findIndex(prod => prod.id === +id)
    if (indice < 0) return { error: `Producto con id ${id} no encontrado!` }
    return this.productos.splice(indice, 1)
  }
}

module.exports = ProductosApi
