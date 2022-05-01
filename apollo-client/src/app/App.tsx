import styled from 'styled-components'
import { FC, MouseEvent } from 'react'

import { CartProducts } from '../components/Cart/Cart'

import { cartProductsVar } from '../client'
import { useProducts } from '../api/useProducts.hook'

const Container = styled.div`
  display: flex;
  width: 50vw;
  flex-direction: column;
  margin: auto;
  padding: 2rem 0;
`

const Shop = styled.div`
  display: flex;
  gap: 1rem;
`

const Products = styled.div`
  flex: 1;
  border: 1px solid lightgrey;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #bdbcbc;
`

type ProductProps = {
  $color?: string
}

const Product = styled.div<ProductProps>`
  cursor: pointer;
  user-select: none;
  border: 2px solid rgb(${({ $color }): string => $color || 'transparent'});
  padding: 0.8rem 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(
    ${({ $color }): string => $color || 'transparent'},
    0.2
  );

  & + & {
    margin-top: 0.5rem;
  }
`

export const App: FC = () => {
  const { loading, error, products } = useProducts()

  const handleAddToCart = (event: MouseEvent) => {
    const { id } = event.currentTarget
    const product = products?.find((product) => product?.id === id)
    if (product) {
      cartProductsVar([...cartProductsVar(), product])
    }
  }

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error!</div>

  return (
    <Container>
      <Shop>
        <Products>
          {products?.map((product) => (
            <Product
              key={product.id}
              id={product.id.toString()}
              onClick={handleAddToCart}
              $color={product.color}
            >
              {product.name}
            </Product>
          ))}
        </Products>
        <CartProducts />
      </Shop>
    </Container>
  )
}
