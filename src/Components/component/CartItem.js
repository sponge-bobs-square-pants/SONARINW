import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../component/utils/helpers'
import AmountButtonss from './AmountButtonss'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../context/CartContext'
import {AiFillDelete} from 'react-icons/ai'
const CartItem = ({ id, image, name, Price, amount, size }) => {
  const { removeItem, toggleAmount } = useCartContext()
  const increase = () => {
    toggleAmount(id, 'inc')
  }
  const decrease = () => {
    toggleAmount(id, 'dec')
  }
  // console.log(Price, 'cartitems');
  return (
    <Wrapper>
      <div className='title'>
        <img src={image} alt={name} className='img'></img>
        <div>
            <h5 className='name'>{name}</h5>
            <p className='color'>Size : {size}</p>
            <h5 className='price-small' style={{}}>{formatPrice(Price)}</h5>
        </div>
      </div>
      <h5 className='price'>{formatPrice(Price)}</h5>
      <AmountButtonss amount={amount} increase={increase} decrease={decrease}></AmountButtonss>
      <h5 className='subtotal'>{formatPrice(Price * amount)}</h5>
      <div type='button' className='remove-btn' onClick={() =>removeItem(id)}>
        <AiFillDelete  size={15}/>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
//   .amtbtn{
//     position:relative;
//     bottom: 20px;
//   }
//   img {
//     // width: 100%;
//     // display: block;
//     // object-fit: cover;
//     border-radius: 0.25rem;
//     // transition: all 0.3s linear;
//     transform: scale(1.4);
//     transform-origin: center top;
//     object-fit: cover;
//     object-position: center top;
//   }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 0.25rem;
    transform: scale(1.23);
    object-fit: cover;
    object-position:center top;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: #57574a;
    position:relative;
    top:20%;
    background: transparent;
    border: transparent;
    letter-spacing: 0.25rem;
    background: white;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
    
  }
  @media (max-width: 992px) {
    .remove-btn {
        color: #57574a;
        position:relative;
        top:15%;
        background: transparent;
        border: transparent;
        letter-spacing: 0.25rem;
        background: white;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        cursor: pointer;
      }
}
`

export default CartItem