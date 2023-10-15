import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import CartColumn from './CartColumn'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
const CartComponent = () => {
//   const { cart, clearCart } = useCartContext()
const {cart, clearCart} = useCartContext();
// console.log(cart)
  return (
    
    <Wrapper className='section section-center'>
    <CartColumn/>
    {
        cart.map((item) => {
            return <CartItem  key={item.id} {...item}/>
        })
    }
    <hr />
    <div className='link-container'>
        <Link to='/Products' className='link-btn'>Continue Shopping</Link>
         <button type='button' className='link-btn clear-btn' onClick={clearCart}>Clear Cart</button>
    </div>
    <CartTotals />
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: #57574a ;
    color: white;
    border-radius: 0.25rem;
    letter-spacing: 0.1rem;
    font-weight: 400;
    text-decoration:none;
    cursor: pointer;
  }
  .clear-btn {
    background: black;
  }
`
export default CartComponent
