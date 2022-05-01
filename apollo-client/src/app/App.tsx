import styled from 'styled-components'
import { FC, MouseEvent } from 'react'

import { CartProducts } from '../components/Cart/Cart'
import { UserDetail } from '../components/UserDetail/UserDetail'

import { useUsers } from '../api/useUsers.hook'
import { useProducts } from '../api/useProducts.hook'
import { cartProductsVar } from '../client'

const Product = styled.div`
  cursor: pointer;
`

export const App: FC = () => {
  const { loading, error, users } = useUsers()
  // const { addCartProduct } = useAddCartProduct()
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = useProducts()

  const handleAddToCart = (event: MouseEvent) => {
    const { id } = event.currentTarget
    const product = products?.find((product) => product?.id === id)
    if (product) {
      // addCartProduct(product)
      cartProductsVar([...cartProductsVar(), product])
    }
  }

  if (loading || loadingProducts) return <div>Loading...</div>

  if (error || errorProducts) return <div>Error!</div>

  return (
    <>
      {users?.map((user) => (
        <div key={user.id}>
          User Id: {user.id}
          <UserDetail id={user.id} />
        </div>
      ))}
      {products?.map((product) => (
        <Product
          key={product.id}
          id={product.id.toString()}
          onClick={handleAddToCart}
        >
          Name: {product.name}
        </Product>
      ))}
      <CartProducts />
    </>
  )
}
