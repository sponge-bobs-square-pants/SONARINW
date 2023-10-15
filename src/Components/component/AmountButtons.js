import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({ increase, decrease, amount }) => {
  return (
    <Wrapper className='amountbtns'>
        <button type='button' className='amount-btn' onClick={decrease}>
            <FaMinus />
        </button>
        <h2 className='amount'>{amount}</h2>
        <button type='button' className='amount-btn' onClick={increase}>
            <FaPlus />
        </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  .amount{
    position:relative;
    top:-80px;
  }
  h2 {
    margin-bottom: 0;
    // padding:10px;
    // border-top: solid 2px black;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position:relative;
    top:-69px
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons