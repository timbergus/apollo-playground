import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'

import { Product } from './types/product'

export const cartProductsVar = makeVar<Product[]>([])

const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        name: {
          read(name) {
            return name.toUpperCase()
          },
        },
      },
    },
    Query: {
      fields: {
        cartProducts: {
          read() {
            return cartProductsVar()
          },
        },
      },
    },
  },
})

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache,
})
