import React from 'react'
import '../Pages/MainPage.css'
import styled from 'styled-components'
// import PageHero from '../component/PageHero'
import Nav from '../component/Navbar'
// import Sidebar from '../component/Sidebar'
import Footer from '../component/Footer'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import StripeCheckout from '../component/StripeCheckout'
import CartCheckout from '../component/CartCheckout'
import UPIComponent from '../component/UPIComponent'
import FormComponent from '../component/FormComponent'
const CheckoutPage = () => {
  const {cart} = useCartContext();
  return <main>
    <Nav/>
    {/* <PageHero title="Checkout" /> */}
    <Wrapper className='page section1 section-center'>
      {cart.length < 1 ? <div className='empty'>
        <h2>Your Cart Is empty</h2>
        <Link to='/products' className='btn' style={{textDecoration:'none'}}>
          Fill It
        </Link>
      </div>: 
      <div className='checkout-content'>
      <CartCheckout />
      
      {/* <StripeCheckout /> */}
      <UPIComponent />
      {/* <FormComponent /> */}
      {/* <div style={{paddingTop:'100px', paddingBottom:'100px'}}></div>S */}
      </div>
      }
    </Wrapper>
    <Footer />
  </main>
}
const Wrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  .empty{
    text-align:center;
  }
  .checkout-content {
    display: grid;
    // background:black;
    // width:auto;
    height:500px;    
    position:absolute;
    grid-template-columns: 1fr 1fr;
    gap: 300px;
  }
`
export default CheckoutPage
