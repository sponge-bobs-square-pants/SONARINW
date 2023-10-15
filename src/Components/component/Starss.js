import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const Starss = ({Stars, Reviews}) => {
  // console.log(Stars, Reviews);
  const tempStars = Array.from({length: 5}, (_, index) => {
    const number = index + 0.5;
    return(
      <span style={{fontSize:'0.8rem'}} key={index}>
           {Stars >= index + 1 ? (<BsStarFill />) : Stars >= number ? (<BsStarHalf />) : (<BsStar />)}
      </span>
    )
  })
  return (
  <Wrapper style={{ position:'relative', top:'-20px'}}>
    <div className='stars' >
      {tempStars}
      {/* <span style={{fontSize:'0.8rem'}}>
        {Stars >= 1 ? <BsStarFill /> : Stars >= 0.5 ? <BsStarHalf /> : <BsStar />}
        {Stars >= 2 ? <BsStarFill /> : Stars >= 1.5 ? <BsStarHalf /> : <BsStar />}
        {Stars >= 3 ? <BsStarFill /> : Stars >= 2.5 ? <BsStarHalf /> : <BsStar />}
        {Stars >= 4 ? <BsStarFill /> : Stars >= 3.5 ? <BsStarHalf /> : <BsStar />}
        {Stars >= 5 ? <BsStarFill /> : Stars >= 4.5 ? <BsStarHalf /> : <BsStar />}
      </span> */}
    </div>
    <p className='reviews'>({Reviews} Customer Reviews)</p>
    
  </Wrapper>)
}



const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  .reviews{
    // color:red;
    font-size:0.8rem;
    position:relative;
    top:-9px;
  }
  margin-bottom: 0.5rem;
`
export default Starss