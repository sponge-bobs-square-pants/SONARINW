import React from 'react'
import styled from 'styled-components'
import ShippingPolicies from '../Pages/ShippingPolicies';
const Footer = () => {
  const productListStyle = {
      margin: 0,
      padding: 0,
      overflowX: 'hidden', // Prevent horizontal scrolling
      // height:'inherit',
      // position:'inherit',

  };
  return (
    <Wrapper style={productListStyle}>
       <h5 className='heading'>
        &copy; {new Date().getFullYear()}
        <span style={{fontFamily:'Courier, monospace'}}> Krishna Services.</span>
       </h5>
       <h5 style={{fontFamily:'Courier New, Courier, monospace', marginLeft:'10px'}} >
            All rights reserved
        </h5>
        <div className='footerdiv'>
        <a href='/Shipping' style={{fontSize:'0.8rem', textDecoration:'none', color:'white',fontFamily:'Courier New, Courier, monospace',}}>Policies</a>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #A5A58D;
  text-align: center;
  span {
    color: black;
  }
  .footerdiv{
    padding:10px;
    display:flex;
    flex-direction:row;
  }
  .footerdiv:hover{
    background:black;
    text-decoration:line;
  }
  .heading{
    fontFamily:Courier New, Courier, monospace;
    padding-top:-25px;
  }
  div{
    display: flex;
    align-items: center;
  }
  @media (max-width:992px){
    .footerdiv{
      // padding:30px;
      display:flex;
      // margin-top:30px; 
    }
    .heading{
      // marginTop:30px
      fontFamily:Courier New, Courier, monospace 
    }
    span{
      marginTop:-100px
    }
  } 
  h5 {
    color: white;
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }

`

export default Footer
