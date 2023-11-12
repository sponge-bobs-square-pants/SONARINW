import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/CartContext'
import AmountButtons from './AmountButtons'
import {GrCircleAlert} from 'react-icons/gr'
import { IconContext } from "react-icons";
import {IoAlertCircleOutline} from 'react-icons/io5'
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
    const [buttonClicked, setButtonClicked] = useState(false);
    
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
        {sizeSelected ?console.log('size is selected'): console.log('size not selected')}
        {buttonClicked ? console.log('button clicked') : console.log('button not clicked')}
{Object.entries(Size).map(([size, value], index) => (
  <button key={index} disabled={value <= 0} className={mainSize === size ? 'color-btn active' : value > 0 ? 'color-btn' : 'disabled-btn'} 
  style={{
    border:
                  (buttonClicked && !sizeSelected && value >= 0 )
                    ? 'red'
                    : 'transparent',
    // borderWidth:'300%',
    boxShadow:
                  buttonClicked && !sizeSelected && value >= 0
                    ? '0 0 5px rgba(255, 0, 0, 0.5)'
                    : 'none',
    
  }} onClick={() => {
    if(value > 0){
      setMainSize(size);
      setSizeSelected(true);
      setAmount(1);
    }
  }}>
    {size}
  </button>
))}
{(buttonClicked && !sizeSelected) ? 
<div className='alert-class'>
        <p style={{}} className='alert-icon'>
        <IconContext.Provider value={{color:'red', size:'1em'}}>
          <IoAlertCircleOutline />
        </IconContext.Provider>
        </p>

         <p style={{}} className='alert-text'>
          Please select a size
        </p>

  </div> 
  : 
  null}
  

  </div>
  </div>
    
    <div className='btn-container'>
        {/* <AmountButtons amount={amount} increase={increase} decrease={decrease}/> */}
        <Link to='/cart' className='btn' style={{textDecoration:'none', textAlign:'center', position:'relative', top:'-67px',
          alignItems:'center'}}
        onClick={(e) => {
          setButtonClicked(true);
          if(sizeSelected){
            addToCart(_id, amount, Products1, mainSize, Description)
          }else{
            e.preventDefault();
            // alert('Please select a size before adding to cart.');
          }
        }}>Add to Cart</Link>
    </div>
    {/* } */}
  </Wrapper>)
  
}
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: grid-start;
    margin-bottom: 7rem;
    margin-top:-3rem;
    // margin-bottom:100px;
    .alert-class {
      margin-Top:10px;
      margin-Bottom:-31px;
      width:18.5vw; 
      backgroundColor:white; 
      padding:0px;
    }
    .alert-icon {
      padding:0px;
      margin:0px;
      padding-Left:0px;
      padding-Top:0px;
    }
    .alert-text{
      padding:0px;
      margin:0px; 
      padding-Left:5px; 
      color:red; 
      // width:250px;
      font-Size:0.7rem;
      padding-Top:2px;
    }

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
    // left:1%;
    width: 15vw;
    border-radius:0.2rem;
  }
  .btn:hover{
    background:#57574a;
    color:white;
  }
  
 
  @media(max-width: 992px){
    .colors {
      flex-direction: column; /* Make the child elements stack vertically */
    }
    .color-btn{
      margin-bottom: 1rem;
    }
    .alert-icon {
      display:block;
      // grid-direction:column;
      position:relative;
      top:50px;
      left:-75px;
      // background-color:blue;
      padding-left: 0px;
    }
    .btn {
      margin-top: 1rem;
      position: relative;
      width: 80vw;
      border-radius: 0.2rem;
      padding:10px;
    }
    .alert-text{
      padding:0px;
      margin:0px; 
      color:red; 
      display:flex;
      position:relative;
      left:-58px;
      top:10px;
      font-Size:0.7rem;
      white-space: nowrap;
    }
 
  }
`
export default AddToCart