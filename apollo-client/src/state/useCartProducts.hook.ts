import { ApolloError, gql, useQuery } from '@apollo/client'
import { Product } from '../types/product'

const GET_CART_PRODUCTS = gql`
  query GetCartProducts {
    cartProducts @client {
      id
      name
      description
      color
    }
  }
`

type GetCartProductsHookData = {
  cartProducts: Product[]
}

type GetCartProductsHookResponse = {
  loading?: boolean
  error?: ApolloError
  cartProducts?: Product[]
}

export const useGetCartProducts = (): GetCartProductsHookResponse => {
  const { loading, error, data } = useQuery<GetCartProductsHookData>(
    GET_CART_PRODUCTS,
    {
      fetchPolicy: 'cache-first',
    }
  )
  return { loading, error, cartProducts: data?.cartProducts }
}
