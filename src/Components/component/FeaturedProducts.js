import React from 'react'
import '../Pages/MainPage.css'
import { useSidebarContext } from '../context/SidebarContext'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'
// import { useInView } from 'react-intersection-observer'

const FeaturedProducts = () => {
    const {products_Loading:loading, products_error:error, featured_products:featured} = useSidebarContext();
    if(loading) {
        return <Loading />
    }
    if (error) {
        return <Error />
    }
    return <Wrapper className='section'>
        <div className='text-center'>
            <h2>Featured Products</h2>
            <div className='underline'></div>
        </div>
        <div className='section-center featured'>
            {featured.slice(0, 3).map((product) => {
                // console.log(product);
                return <Product key={product._id} {...product}></Product>
            })}
        </div>
    </Wrapper>
}

const Wrapper = styled.section`
  background: #EDDCD2;
  .featured {
    margin: 1rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      // width:300px;
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
