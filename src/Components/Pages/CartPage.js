import React from 'react'
import Nav from '../component/Navbar'
import Footer from '../component/Footer'
import styled from 'styled-components'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import PageHero from '../component/PageHero'
import CartComponent from '../component/CartComponent'
// import {CartContent} from '../component/AddToCart'

const CartPage = () => {
    const {cart} = useCartContext();
    if(cart.length < 1){
        return <div style={{height:'100vh'}}>
            <Nav />
            <Wrapper className='page'>
            <div className='empty'>
                <h2 className='margintop'>Your cart is empty</h2>
                <Link to='/Products' className='btn' style={{textDecoration:'none'}}> Products</Link>
                <div  className='spacebtw'>
                </div>
            </div>
            <Footer/>
        </Wrapper>
        </div>
    }
  return (
    <main>
      <Nav />
      <PageHero title="products" />
      <Wrapper className='page'>
        <CartComponent />
      </Wrapper>
      <Footer />
    </main>
  )
}
const Wrapper = styled.main`
display: flex;
  flex-direction: column;
  min-height: 89.2vh;  
.empty {
    flex: 1;
    text-align: center;
    // margin-bottom:10rem;
    
  }
//   .spacebtw{
//   margin-bottom:23.6%;

// }
  .margintop {
    margin-bottom: 1rem;
    text-transform: none;
    margin-Top:14%;
    // margin-bottom:6.3%;
  }
  @media (max-width: 992px) {
    min-height: 90.5vh;  
    .margintop {
        margin-bottom: 1rem;
        text-transform: none;
        margin-Top:60%;
      }
    //   .spacebtw{
    //     margin-bottom:113.6%;
      
    //   }
    }
`

export default CartPage
