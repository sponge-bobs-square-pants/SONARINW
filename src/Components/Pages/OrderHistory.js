import React, { useEffect, useState } from 'react'
import Nav from '../component/Navbar'
import Footer from '../component/Footer'
import { useUserContext } from '../context/UserContext'
import axios from 'axios'
import { formatPrice } from '../component/utils/helpers'
import ListView from '../component/ListView'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const OrderHistory = () => {
    const {userId} = useUserContext();
    const [orderItems, setOrderItems] = useState([]);
    // const [itemID, setItemID] = useState([]);
  
    // console.log(userId);
    useEffect(() => {
      const loadProducts = async () => {
        // console.log(userId);
        const url=`${process.env.REACT_APP_GENERAL_ROUTE}/Order?id=${userId}`;
        try {
          const response = await axios.get(url)
          // console.log(response);
          if(response.status === 200){
            const {data} = response
            const array = data.cartArray
            setOrderItems(array)
          }
          else{
            throw new Error('Network response was not ok');
          }

        } catch (error) {
          console.log('error connecting to the database');
        }
      }
      loadProducts();
    }, [userId])
    function truncateText(text, maxLength) {
      if (text && text.length <= maxLength) {
        return text;
      }
      return text ? text.slice(0, maxLength) + '...' : '';
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
     <div style={{flex: 1,background:'white', paddingLeft:'5vw', paddingTop:'50px',paddingRight:'5vw', paddingBottom:'50px'}}>
     <div style={{background:'white', padding:'10px'}}>
     {orderItems.length === 0 ? (
            // <div style={{display:'grid', placeItems: 'center', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
               <p>No orders found</p>
               {/* <button onClick='/Products'></button> */}
               <Link to='/Products' style={{background:'black', padding:'15px',paddingLeft:'30px',paddingRight:'30px',
               textDecoration:'none', color:'white'}}>Buy</Link>
               <div></div>
            </div>
          ) : (
            orderItems.map((order, orderIndex) => (
              <div key={orderIndex}>
                <h2>Order #{orderIndex + 1}</h2>
                <ul>
                  {order.map((item, index) => (
                    <Wrapper key={index}>
                      <article className='container'>
                        <Link to={`/Products/${item.id.replace(/\D/g, '')}`}>
                          <img src={item.image} alt={item.name} className='img'></img>
                        </Link>
                        <div className='upthediv'>
                          <h4>{item.name}</h4>
                          <h5 className='price'>{formatPrice(item.Price)}</h5>
                          <p className='Description'>{truncateText(item.Description, 100)}</p>
                          <Link className='btn' style={{ textDecoration: 'none', padding: '10px', fontWeight: '700' }}>
                            Amount: {item.amount}
                          </Link>
                           <div className='StatusButtonDiv show-on-mobile'>
                        <button className='StatusButtonMobile' >Order Status</button>
                        <button className='StatusButtonMobile'>Delivery</button>
                        <button className='StatusButtonMobile'>Return</button>
                        <button className='StatusButtonMobile'>Cancel Order</button>
                        </div>
                        </div>
                           <div className='StatusButtonDiv hide-on-mobile'>
                           <button className='StatusButton' >Order Status</button>
                           <button className='StatusButton'>Delivery</button>
                           <button className='StatusButton'>Return</button>
                           <button className='StatusButton'>Cancel Order</button>
                           </div>
                      </article>
                    </Wrapper>
                  ))}
                </ul>
              </div>
            ))
          )
          }
        
      </div>
      </div>
      <Footer />
    </div>
  )
}
const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  border: 1px solid darkgrey;
  border-radius:1rem;
  padding:10px;
  padding-top:30px;
  margin-bottom:20px;
  .container{
    display:flex;
    height:200px;
    align-items: flex-start;
    // margin-left: -50px;
    // justify-content: flex-end;
    
  }
  .StatusButtonDiv{
    display:grid; 
    gap:10px;
  }
  .show-on-mobile {
    display: block;
  }
  .StatusButton{
    // display:grid;
    padding-left:70px;
    padding-right:70px;
    padding-bottom:10px;
    padding-top:10px;
    align-self: flex-start;
    border-Radius:0.25rem;
    background:white;
    color:black;
    border:solid 2px gray;
  }
  .description{
    display:block;
  }
  
  .hide-on-mobile {
    display: none;
  }
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
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
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
    background:white;
    color:black;

  }
  .btn:hover{
  }
  .show-on-mobile {
    display: none !important; /* Hide on larger screens */
  }
  .hide-on-mobile {
    display: grid !important; /* Show on larger screens */
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
    .Description {
      display: none; /* Hide the description for mobile screens */
    }
    .container{
      display:flex;
      height:200px;
      margin-left:-50px;
      padding-left:0px;
      
    }
    .StatusButton{
      padding-left:0px;
      padding-right:0px;
      padding-bottom:0px;
      padding-top:0px;
      align-self:start
    }
    .StatusButtonDiv{
      display:grid; 
      gap:5px;
    }
  
  .show-on-mobile {
    display: grid !important; 
    // background:red;
    margin-bottom:50px;
    border:solid 1px black;
  }
  .StatusButtonMobile{
    border:none;
    background:rgba(10, 10, 10, 0.1)
    
  }
  .hide-on-mobile {
    display: none !important; /* Show on larger screens */
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
      h4 {
        margin-bottom: 0.5rem;
        // border:1px solid black;
        position:relative;
        top:-8px;
      }
  }
`

export default OrderHistory
