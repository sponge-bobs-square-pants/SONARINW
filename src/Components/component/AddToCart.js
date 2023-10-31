import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/CartContext'
import AmountButtons from './AmountButtons'
const AddToCart = ({ Product }) => {
    // console.log(Product[0].Price);
    let Products1 = Product[0];
    
    const {addToCart} = useCartContext()
    const {_id, Size, Description} = Product[0];
    // console.log(Description);
    const [amount, setAmount] = useState(1);
    // const [mainSize, setMainSize] = useState(Object.keys(Size)[0])
    const [sizeSelected, setSizeSelected] = useState(false);
    const [mainSize, setMainSize] = useState('None')
    // const maxAmount = Size[mainSize] || 0;
    // console.log(mainSize);
    
    // const increase = () => {
    //     setAmount((oldAmount) => {
    //         let tempAmount = oldAmount + 1;
    //         if(tempAmount > Stock) {
    //             tempAmount = Stock
    //         }
    //         return tempAmount
    //     })
    // }
    const increase = () => {
      setAmount((oldAmount) => {
        const sizeStock = Size[mainSize];
          let tempAmount = oldAmount + 1;
          if(tempAmount > sizeStock) {
              tempAmount = sizeStock
          }
          return tempAmount
      })
  }
    const decrease = () => {
        setAmount((oldAmount) => {
            let tempAmount = oldAmount - 1;
            if(tempAmount < 1) {
                tempAmount = 1
            }
            return tempAmount
        })

    }
    // console.log(Size);
  return(<Wrapper>
    <div className='colors'>
      <span>SIZE : </span>
      <div>
{Object.entries(Size).map(([size, value], index) => (
  <button key={index} disabled={value <= 0} className={mainSize === size ? 'color-btn active' : value > 0 ? 'color-btn' : 'disabled-btn'} 
  onClick={() => {
    if(value > 0){
      setMainSize(size);
      setSizeSelected(true);
      setAmount(1);
    }
  }}>
    {size}
  </button>
))}
      </div>
    </div>
    {sizeSelected &&
    <div className='btn-container'>
        <AmountButtons amount={amount} increase={increase} decrease={decrease}/>
        <Link to='/cart' className='btn' style={{textDecoration:'none', textAlign:'center', position:'relative', top:'-67px'}}
        onClick={() => addToCart(_id, amount, Products1, mainSize, Description)}>Add to Cart</Link>
    </div>}
  </Wrapper>)
  
}
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 7rem;
    margin-top:-3rem;
    // margin-bottom:100px;

    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      // display:grid;
      // grid-template-columns: repeat(auto-fill, minmax(1.5rem, 1fr));
      // grid-gap: 0.5rem;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    // border-radius: 50%;
    border:1px solid #d0d0d0;
    padding:0.9rem;
    padding-left:2rem;
    padding-right:2rem;
    padding-bottom:1.2rem;
    padding-top:1.2rem;
    font-size:0.7rem;
    background: lightgray;
    color:black;
    margin-right: 0.5rem;
    // margin-bottom: 1rem;
    border: none;
    cursor: pointer;
    // opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: white;
    }
  }
  .disabled-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    // border-radius: 50%;
    border:1px solid #d0d0d0;
    background: rgb(228, 228, 228);
    // color:white;
    padding:0.9rem;
    padding:0.9rem;
    padding-left:2rem;
    padding-right:2rem;
    padding-bottom:1.2rem;
    padding-top:1.2rem;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    // opacity: 1;
    padding:0.6rem;
    padding-left:2rem;
    padding-right:2rem;
    padding-bottom:1.2rem;
    padding-top:1.2rem;
    // border:solid 1px #57574a;
    border:1px solid #d0d0d0;
    background:black;
    color:white;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    position:relative;
    
    width: 140px;
    border-radius:0.2rem;
  }
  .btn:hover{
    background:#57574a;
    color:white;
  }
  @media(max-width: 992px){
    .color-btn{
      margin-bottom: 1rem;
    }
  }
`
export default AddToCart