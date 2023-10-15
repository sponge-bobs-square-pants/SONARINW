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
      </div>: <StripeCheckout />}
    </Wrapper>
    <Footer />
  </main>
}
const Wrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  .empty{
    text-align:center;
  }
`
export default CheckoutPage
