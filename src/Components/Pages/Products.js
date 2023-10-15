import React from 'react'
import Nav from '../component/Navbar';
import './MainPage.css';
import Sidebar from '../component/Sidebar';
import Footer from '../component/Footer';
import PageHero from '../component/PageHero'
import styled from 'styled-components'
import '../Pages/MainPage.css'
import ProductList from '../component/ProductList';
import Sort from '../component/Sort';
import Filters from '../component/Filters'
const Products = () => {
  return (
    <main>
      <Nav />
      <PageHero title='products' />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </main>
  )
}
const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default Products
