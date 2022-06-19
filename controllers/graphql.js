// GraphQL
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const ProductoService = require('../services/ProductoService')
const productoService = new ProductoService()

const schema = buildSchema(`
    type Producto {
        id: ID!,
        title: String,
        price: Float,
        thumbnail: String
    }
    input ProductoInput {
        title: String,
        price: Float,
        thumbnail: String
    }
    type Query {
        listarTodos: [Producto],
        listarPorId(id: ID!): [Producto]
    }
    type Mutation {
        guardar(productData: ProductoInput): Producto,
        actualizar(id: ID!, productData: ProductoInput): Producto,
        eliminar(id: ID!): Float
    }
`)

// async function listarPorId ({ id }) {
//   const [producto] = await productoService.listarPorId(id)
//   return producto
// }

async function guardar ({ productData }) {
  const [addedProduct] = await productoService.guardar(productData)
  return addedProduct
}

async function actualizar ({ id, productData }) {
  const [updatedProduct] = await productoService.actualizar(productData, id)
  return updatedProduct
}

async function eliminar ({ id }) {
  const deletedProduct = await productoService.eliminar(id)
  return deletedProduct
}

class GraphQLController {
  constructor () {
    return graphqlHTTP({
      schema: schema,
      rootValue: {
        listarTodos: productoService.listarTodos(),
        listarPorId: ({ id }) => productoService.listarPorId(id),
        guardar,
        actualizar,
        eliminar
      },
      graphiql: true
    })
  }
}

module.exports = GraphQLController
