import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/CartContext'
import { formatPrice } from '../component/utils/helpers'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
const CartTotals = () => {
  const { total_amount, shipping_fee } = useCartContext()
  const { myUser, loginWithRedirect } = useUserContext()
  return (
    <Wrapper>
     <div>
        <article>
            <h4>Subtotal : <span>{formatPrice(total_amount)}</span></h4>
            <p>Shopping fee : <span>{formatPrice(shipping_fee)}</span></p>
            <hr />
            <h4>Order Total : <span>{formatPrice(total_amount + shipping_fee)}</span></h4>
        </article>
        {myUser ? (<Link to='/Checkout' className='btn' style={{textDecoration:'none'}}>Proceed to Checkout
        </Link>) : <button type='button' className='btn' onClick={loginWithRedirect}>Login</button> }
        
     </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid lightgrey;
    border-radius: 0.25rem;
    padding: 1.5rem 3rem;
    color:white;
    background:#A5A58D
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
    font-size:0.9rem;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 60%;
    position:relative;
    left:55px;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    background:#57574a;
  }
  .btn:hover{
    color:black;
    // background:black;
  }
`

export default CartTotals