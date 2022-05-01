import { FC, useMemo } from 'react'

import { useGetCartProducts } from '../../state/useCartProducts.hook'

type CartProductsItem = {
  name: string
  quantity: number
}

export const CartProducts: FC = () => {
  const { loading, error, cartProducts } = useGetCartProducts()

  const products = useMemo<CartProductsItem[]>(
    () =>
      cartProducts
        ? cartProducts.reduce((acc, current) => {
            const index = acc.findIndex(
              (cartProduct) => cartProduct.name === current.name
            )
            if (index !== undefined && index > -1) {
              acc[index].quantity += 1
            } else {
              acc.push({
                name: current.name,
                quantity: 1,
              })
            }
            return acc
          }, [] as CartProductsItem[])
        : [],
    [cartProducts]
  )

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error!</div>

  return (
    <>
      Cart Products:
      {products.map((cartProduct) => (
        <div>
          {cartProduct.name} - {cartProduct.quantity}
        </div>
      ))}
    </>
  )
}
