import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../component/utils/helpers'
import { Link } from 'react-router-dom'
// import { FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Pagination from './Pagination'
const ListView = ({products, totalPages, updatePage}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = async (_id) => {
    const url = `/products/${_id}`;
    window.location.href=url;
  }
    

  return <Wrapper>
    <div style={{opacity:'0'}}>'</div>
    {products.map((product) => {
        const {_id, Image, ProductName, Price, Description} = product;
        return <article key={_id} className='container' onClick={() => handleClick(_id)}>
            <img src={Image} alt={ProductName} className='img'></img>
            <div className='upthediv' >
                <h4>{ProductName}</h4>
                <h5 className='price'>{formatPrice(Price * 9 /10)}</h5>
                {/* <p className={`${window.innerWidth <  992 ? 'hide-on-mobile' : 'description'}`}>{Description.substring(0, 120)}...</p> */}
                <p className={`${isMobile ? 'hide-on-mobile' : 'description'}`}>{Description.substring(0, 120)}...</p>
                <Link to={`/products/${_id}`} className='btn' style={{textDecoration:'none', padding:'10px'}}>Details</Link>
            </div>
            
        </article>
    })}
    <Pagination totalPages={totalPages} updatePage={updatePage}/>
  </Wrapper>
}

// const ResponsiveLink = styled(Link)`
//   display: none; /* Hide the link by default */
  
//   /* Show the link for screens larger than 992px */
//   @media (min-width: 992px) {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: #A5A58D;
//     width: 2.5rem;
//     height: 2.5rem;
//     border-radius: 50%;
//     transition: all 0.3s linear;
//     opacity: 0;
//     cursor: pointer;
//     z-index: 1;
    
//     svg {
//       font-size: 1.25rem;
//       color: red;
//     }
//   }
// `;

// const ResponsiveButton = styled(Link)`
//   display: flex; /* Show the button by default */
  
//   /* Hide the button for screens larger than 992px */
//   @media (min-width: 992px) {
//     display: none;
//   }
// `;
const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  // border: 1px solid black;
  .container{
    height:200px;
  }
  .show-on-mobile {
    display: block;
  }
  .description{
    display:block;
  }
  
  .hide-on-mobile {
    display: none;
  }
  .container:hover .link {
    opacity: 1;
  }
  .container:hover {
    opacity:0.92;
    background: rgba(0, 0, 0, 0.6);
    position: relative;
    // bottom:-30px;
    border-radius: 0.25rem;
    
  }
  .container:hover::before {
    opacity:0.75;
    content: '';
    position: absolute;
    top: 292px;
    left: 399px;
    right: 170px;
    border-radius: 0.25rem;
    background: rgba(0, 0, 0, 0.8); /* Adjust the background color and opacity as needed */
  }



















  // .fasearch{
  //   opacity:0;
  //   zIndex:1;
  //   position:relative;
  //   top:-16vh;
  //   left:9.5vw;
  //   color:white;
  //   font-size:1.2rem;
  //   background:red;
  //   padding:5px;
  //   border-radius:1rem;
  // }
  
  // .img:hover + .fasearch {
  //   opacity:1;
  //   background: rgba(0, 0, 0, 0.8); 
  //   // transition: all 0.3s linear;
  // }
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    // padding-bottom:-15px;
    object-fit: cover;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    object-position: center top;
    transition: all 0.3s linear;
  }
 
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: #A5A58D;
    margin-bottom: 0.75rem;
  }
  .articl{
    // border: solid 2px black;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  .btn:hover{
    background:#57574a;
    color:white
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
    .price{
      // border:1px solid black;
    }
    .upthediv{
        position:relative;
        top:-20px;
    }
  }
  @media (max-width: 992px) {
    .fasearch{
        opacity:1;
        zIndex:1;
        position:relative;
        top:-13.8x  vh;
        left:37vw
      }
      .container.hide-on-mobile{
        display:none
      }
      .container.show-on-mobile{
        display:flex;
        flex-direction:column;
      }
      .container{
        display:flex;
        // border: 1px solid red;
        align-items:center;
          .img{
            width:auto;
            margin-right:15px;
          }
      }
      // .price{
      //   // border:1px solid black;
      //   position:relative;
      //   top:-50px;
      //   text-align:right;
      //   padding-right:30px;
      // }



      h4 {
        margin-bottom: 0.5rem;
        // border:1px solid black;
        position:relative;
        top:-8px;
      }
      // .out-max{
      //   border: 2px solid black;
      //   // padding-right:0px;
      //   // margin-right:0px;
      // }
  }
`


export default ListView
