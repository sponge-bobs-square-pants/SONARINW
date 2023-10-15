import React from 'react'
import styled from 'styled-components'
const Footer = () => {
  const productListStyle = {
      margin: 0,
      padding: 0,
      overflowX: 'hidden', // Prevent horizontal scrolling
      // position:'inherit',

  };
  return (
    <Wrapper style={productListStyle}>
       <h5 style={{fontFamily:'Courier New, Courier, monospace'}}>
        &copy; {new Date().getFullYear()}
        <span style={{fontFamily:'Courier, monospace'}}>  SONARI NW</span>
       </h5>
       <h5 style={{fontFamily:'Courier New, Courier, monospace'}} >
             All rights reserved
        </h5>
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
  div{
    display: flex;
    align-items: center;
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
