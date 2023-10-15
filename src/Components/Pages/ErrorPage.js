import React from 'react'
import styled from 'styled-components'
import './MainPage.css';
import { Link } from 'react-router-dom'
import Footer from '../component/Footer';
const ErrorPage = () => {
  return( 
  <div className='homestyle'>
    <Wrapper className='page_error'>
      <section>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to='/HomePage' className='btn' style={{textDecoration:'none'}}>Back home</Link>
      </section>
  </Wrapper>
  <Footer />
  </div>
  )
}

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-top: -13rem;
  h1 {
    font-size: 10rem;
    margin-bottom: -1rem;
    color:#58584a;
  }
  h1:hover{
    color:white;
  }
  h3 {
    text-transform: none;
    margin-bottom: 3rem;
  }
  @media (max-width: 992px) {
    h1:hover{
      color:black;
    }
    .btn:hover{
      background:black;
      color:white;
    }
  }
`

export default ErrorPage
