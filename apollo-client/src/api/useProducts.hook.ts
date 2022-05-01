import { ApolloError, gql, useQuery } from '@apollo/client'

import { Product } from '../types/product'

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      color
    }
  }
`

type ProductsData = {
  products: Product[]
}

type Response = {
  loading: boolean
  error?: ApolloError
  products?: Product[]
}

export const useProducts = (): Response => {
  const { loading, error, data } = useQuery<ProductsData>(GET_PRODUCTS, {
    fetchPolicy: 'cache-first',
  })
  return { loading, error, products: data?.products }
}
