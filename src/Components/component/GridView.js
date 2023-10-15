import React from 'react'
import styled from 'styled-components'
import Product from './Product'
import Pagination from './Pagination'

const GridView = ({products, totalPages, updatePage}) => {
  // const buttonNumbers = Array.from({ length: totalPages}, (_, index) => index + 1);
  return (
    <Wrapper>
      <div style={{opacity:'0'}}>'</div>
      <div className='products-container'>
        {products.map((product) => {
            return <Product key={product._id} {...product}></Product>
        })}
      </div>
      <Pagination products={products} totalPages={totalPages} updatePage={updatePage} />
      {/* <div style={{paddingTop:'5%', display:'flex', justifyContent:'center'}}className='product-container1'>
        {buttonNumbers.map((page, index) => {
          // console.log(page)
          return(<button style={{padding:'0.3%', margin:'2px', 
          background:'#A5A58D', border:'transparent', paddingLeft:'0.8%', paddingRight:'0.8%',
          color:'whitesmoke'}} 
          onClick={updatePage} 
          name='page'
          data-page={page}
          key={index} 
          className='product-container1'>
          {page}</button>)
        })}
      </div> */}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }
  .products-container1 {
    position:relative;
    top:100px;
    padding:10px;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView
