import React from 'react'
import '../Pages/MainPage.css'
import styled from 'styled-components'
import Nav from '../component/Navbar'
import Footer from '../component/Footer'
import { useCartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
// import StripeCheckout from '../component/StripeCheckout'
import CartCheckout from '../component/CartCheckout'
import UPIComponent from '../component/UPIComponent'
import PageHero from '../component/PageHero'
// import FormComponent from '../component/FormComponent'
const CheckoutPage = () => {
  const {cart} = useCartContext();
  return <main>
    <Nav/>
    <PageHero title="Checkout" />
    <Wrapper className='page' style={{overflow:'hidden', width:'120px',}}>
      {cart.length < 1 ? <div className='empty'>
        <h2>Your Cart Is empty</h2>
        <Link to='/products' className='btn' style={{textDecoration:'none', fontWeight:'bolder'}}>
          Fill It
        </Link>
      </div>: 
      <div className='checkout-content'>
      <CartCheckout />
      <UPIComponent />
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
  width: 90vw;
  margin: 0 auto;
  max-width: 1170px;
  padding-bottom: 11.6rem;
  padding-top:5rem;

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
  @media(max-width: 992px){
    // width: 90vw;
    margin: 0;
    max-width: 0px;
    padding: 0rem;
    flex-grow: 1;
    justify-content: space-between;
    // padding:50%;
    overflow:hidden
  }
`
export default CheckoutPage
