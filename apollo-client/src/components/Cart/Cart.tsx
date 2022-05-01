import styled from 'styled-components'
import { FC, useMemo } from 'react'

import { cartProductsVar } from '../../client'
import { useGetCartProducts } from '../../state/useCartProducts.hook'

const Container = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  padding: 1rem;
  border-radius: 1rem;
  gap: 1rem;
`

const Title = styled.div`
  font-size: 1.5rem;
`

const Products = styled.div`
  flex: 1;
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
`

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 32px;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:active {
    box-shadow: none;
  }
`

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

  const total = useMemo(() => {
    return products.reduce((acc, current) => {
      return acc + current.quantity
    }, 0)
  }, [products])

  const handleClear = () => {
    cartProductsVar([])
  }

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error!</div>

  return (
    <Container>
      <Title>Cart</Title>
      <Products>
        {products.map((cartProduct) => (
          <div>
            {cartProduct.name} ({cartProduct.quantity})
          </div>
        ))}
      </Products>
      <Total>
        <div>Total: {total}</div>
        <Button onClick={handleClear}>Clear</Button>
      </Total>
    </Container>
  )
}
