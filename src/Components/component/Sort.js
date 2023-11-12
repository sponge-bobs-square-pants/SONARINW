import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import {IoGrid} from 'react-icons/io5'
import {IoMdList} from 'react-icons/io'
import styled from 'styled-components'
const Sort = () => {
  const {grid_view, setGridView, setListView, sort, updateSort, all_products} = useFilterContext();
  return (
    <Wrapper>
      <div className='btn-container' style={{display:'flex'}} >
        <div className={grid_view ? 'active' : null} onClick={setGridView}
        style={{borderRadius:'0.5rem', border:'solid 1px black', alignItems:'center', alignContent:'center', display:'flex',
        paddingLeft:'5px', paddingRight:'5px', paddingTop:'3px', paddingBottom:'3px'}}>
        <IoGrid size={11} style={{ color: grid_view ? 'active' : null}} />
        </div>
        <div className={!grid_view ? 'active' : null} onClick={setListView}
        style={{borderRadius:'0.5rem', border:'solid 1px black', alignItems:'center', alignContent:'center', display:'flex',
        paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px'}}>
        <IoMdList size={11} style={{ color: grid_view ? 'active' : null}} />
        </div>
      </div>
      <p className='productinfo'>{all_products.length} Products Found</p>
        <hr  className='hrline'/>
        <form className='formhaha'style={{}}> 
          {/* <label htmlFor='sort'>Sort by</label> */} 
          <select name='sort' id='sort' className='sort-input'
            value={sort} onChange={updateSort}>
            <option value='Price'>Price (low-high)</option>
            <option value='-Price'>Price (high-low)</option>
            <option value='Name'>Name (a-z)</option>
            <option value='-Name'>Name (z-a)</option>
          </select>
        </form>
      
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 0rem;
  column-gap: 2rem;

  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
    position:relative;
    top:-10px;
    left:0px;
  }
  .hrline{
    position:relative;
    left:0px;
    top:0px;
    width:520px;
    marginLeft:0px;
    marginRight:0px
  }
  // .formhaha{
  //   position:relative;
  //   top:-41px;
  //   left:600px;
  // }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid #57574a;
      color: black;
      width: 1.5rem;
      border-radius: 0.6rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: #A5A58D;
      color: rgba(255, 255, 255, 1);
    }
  }
  .hr{
    background:red;
  }
  .sort-input {
    border-color: transparent;
    // font-size: 1rem;
    font-size: 0.7rem;
    text-transform: capitalize;
    // padding: 0.25rem 0.5rem;
    padding: 0.15rem 0.35rem;
    border: 1px solid #57574a;
    border-radius: 0.6rem;
    // font-size: 1rem;
    width: auto;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background-color: transparent;
  }
  .sort-input Option {
    font-size:0.7rem;
    padding:0px;
    // color:red;
    margin:0px;
    border:1px solid black;
    background:#A5A58D;
    color:white;
  }
  .sort-input{
    background:#57574a;
    color:white;
  }
  .Option:hover{
    background:#57574a;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }

  @media(max-width:992px) {
    p {
      text-transform: capitalize;
      margin-bottom: 0;
      position:relative;
      top:0px;
      left:0px;
      font-size:0.9rem;
    }
    .hrline{
      position:relative;
      left:-5%;
      top:-150%;
      width:0%;
      marginLeft:auto;
      marginRight:auto
    }
    .formhaha{
      position:relative;
      top:-260%;
      left:63vw;
    }
    .active {
      background: #A5A58D;
      color: rgba(255, 255, 255, 1);
    }
    
  }
  // ipad air and large tables

  @media (min-width: 769px) and (max-width: 1024px) {
    .formhaha{
      position:relative;
      top:0;
      left :0vw;
    }
  }

  // @media (max-width: 768px) and (max-height: 1024px){
  //   .formhaha{
  //     position:relative;
  //     top:100px;
  //     // left :100px;
  //   }
`

export default Sort
