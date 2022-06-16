const app = require('../app')
const ProductosFactoryDAO = require('../models/daos/ProductosFactoryDAO') // Data Access Layer
const env = require('../env.config')
const request = require('supertest')(app)
const expect = require('chai').expect
const { describe, it, beforeEach } = require('mocha')
const generador = require('../generador/productos')
const productosDao = ProductosFactoryDAO.get(env.PERSISTENCIA_PRODUCTOS)

describe('test api productos', () => {
  let productos
  beforeEach(async () => {
    try {
      await productosDao.deleteAll()
      const registros = await Promise.all([
        productosDao.guardar(generador.get()),
        productosDao.guardar(generador.get()),
        productosDao.guardar(generador.get())
      ])

      productos = registros.map(reg => reg[0])
    } catch (err) {
      console.log(err)
    }
  })
  describe('GET', () => {
    it('Deberia retornar un status 200', async () => {
      const response = await request.get('/api/productos')
      expect(response.status).to.eql(200)
    })

    it('Deberia retornar un status 200 y producto por ID', async () => {
      const producto = productos[0]
      const response = await request.get(`/api/productos/${producto.id}`)

      expect(response.status).to.eql(200)
      expect(response.body.body[0].id).to.eql(producto.id)
    })
  })

  describe('POST', () => {
    it('Deberia retornar un status 200 y crear producto', async () => {
      const producto = generador.get()
      const response = await request.post('/api/productos').send(producto)

      expect(response.status).to.eql(200)
      const productoCreado = response.body.body[0] // resultado debe estar en la posicion 0 de propiedad body
      expect(productoCreado).to.include.keys('id', 'title', 'price', 'thumbnail')
      expect(productoCreado.title).to.eql(producto.title)
      expect(productoCreado.price).to.eql(producto.price)
    })
  })

  describe('PUT', () => {
    it('Deberia actualizar producto por id ', async () => {
      const productoAActualizar = productos[0]
      const producto = generador.get()
      const response = await request.put(`/api/productos/${productoAActualizar.id}`).send(producto)

      expect(response.status).to.eql(200)
      expect(response.body.body[0].id).to.eql(productoAActualizar.id)
      expect(response.body.body[0].title).to.eql(producto.title)
    })

    it('Deberia deberia devolver error 400 si el id de producto es inexistente', async () => {
      const IdProductoAActualizarIncorrecto = productos[0].id + 1000

      // const producto = {
      //   title: 'Regla actualizada test1',
      //   price: 152,
      //   thumbnail: 'http://url.test.com'
      // }
      const producto = generador.get()
      const response = await request.put(`/api/productos/${IdProductoAActualizarIncorrecto}`).send(producto)
      expect(response.status).to.eql(400)
    })
  })

  describe('DELETE', () => {
    it('Deberia eliminar producto por Id', async () => {
      const productoAEliminar = productos[0]
      const response = await request.delete(`/api/productos/${productoAEliminar.id}`)

      expect(response.status).to.eql(200)
    })

    it('Deberia arrojar error al eliminar producto con Id inexistente', async () => {
      const IdproductoAEliminarIncorrecto = productos[0].id + 1000
      const response = await request.delete(`/api/productos/${IdproductoAEliminarIncorrecto}`)

      expect(response.status).to.eql(400)
    })
  })
})
