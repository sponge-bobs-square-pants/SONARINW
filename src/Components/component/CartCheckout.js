import React from 'react'
import { useCartContext } from '../context/CartContext'
import { formatPrice } from './utils/helpers';
import styled from 'styled-components';


const CartCheckout = () => {
    const {cart} = useCartContext();
  return (
    <Wrapper>
     {/* <div className="cart-container"> */}
      <div className="products">
        {cart.map((item, index) => {
          const { name, amount, image, Price, size } = item;
          return (
            <div key={index} className="product">
                <div className='product-image'>
              <img src={image} alt="products" />
              </div>
              <div className="product-details">
                <h3>{`${name}(${size})`}</h3>
                {/* <p>Size: {size}</p> */}
                <p>Amount: {amount}</p>
                <p>Price: {formatPrice(Price)}</p>
              </div>
            </div>
          );
        })}
        </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
position:absolute;
left:110px;
top:30px;
// background:black;
// color:white;
// border:solid 1px black;
padding-right:20px;
padding-left:20px;
padding-top:20px;
padding-bottom:20px;
.products {
    max-height:400px;
    overflow-y:auto;
    padding-left:10px;
    // &::-webkit-scrollbar {
    //   width: 10px; 
    //   // display:none;
    // }

    // &::-webkit-scrollbar-thumb {
    //   background: gray; /* Set the color of the scrollbar thumb */
    //   border-radius: 4px; /* Round the edges of the thumb */
    //   margin-right: 20px; /* Move the scrollbar thumb to the left */
    // }

    // &::-webkit-scrollbar-track {
    //   background: white; /* Set the color of the scrollbar track */
    //   border:solid 1px black;
    //   // width:17px;
    //   margin-right: 20px; /* Move the scrollbar track to the left */
    // }
  }
  
  .product {
    display: flex;
    align-items: center;
    padding:10px;
    margin-right:80px;
    // border:solid 1px black;
  }
  .product-image{
    max-height: 200px;
    // margin-bottom:20px;
    // padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border:solid 2px black;
  }
  
  .product img {
    max-height: 100%;
    max-width: 100px;
    object-fit: cover;
  }
  
  .product-details {
    margin-left: 20px;
  }

  @media(max-width: 992px){
    background:red;
  }
`
export default CartCheckout
