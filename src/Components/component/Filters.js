import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/FilterContext'
import { getUniqueValues } from '../component/utils/helpers'
// import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters:{
      ProductName, Category 
      // Company, Color, min_price, max_price, shipping, Price
    },
    updateFilters,
    clearFilters,
    all_products,
    updateFiltersDebounced,
  } = useFilterContext();
  const categories = getUniqueValues(all_products, 'Category');
  // const companies = getUniqueValues(all_products, 'Company');
  // const colors = getUniqueValues(all_products, 'Colors');
  // console.log(categories, companies)

  return <Wrapper>
    <div className='content'>
      <form onSubmit={(e) => {e.preventDefault()}}>
        {/* <div className='form-control'>
          <input type='text' 
          name='ProductName' 
          placeholder='search here' 
          className='search-input' 
          value={ProductName} 
          onChange={updateFilters} />
        </div> */}
        <div className='form-control'>
          <h5>Category</h5>
          <div>
            {categories.map((c, index) => {
              return <button key={index}
              onClick={updateFilters}
              name='Category' 
              type='button' 
              className={`${Category === c ? 'active' : null}`}
              >{c}
              </button>
            })}
          </div>
        </div>
        {/* <div className='form-control'>
          <h5>Company</h5>
          <select name='Company' id='Company' value={Company} onChange={updateFilters} className='company'>
            {companies.map((c, index) => {
              return <option key={index} value={c}>{c}</option>
            })}
          </select>
        </div> */}
        {/* <div className='form-control'>
          <h5>Colors</h5>
          <div className='colors'>
            {
              colors.map((c, index) => {
                if(c === 'all'){
                  return <button  key={index} name='Color' onClick={updateFilters} data-color='all' 
                  className={`${Color === 'all' ? 'all-btn ative': 'all-btn'}`}>All</button>
                }
                return <button key={index} 
                name='Color' 
                style={{background:c}} 
                className={`${Color === c ? 'color-btn active' : 'color-btn'}`}
                data-color={c}
                onClick={updateFilters}
                >{Color === c ? <FaCheck /> : null}</button>
              })
            }
          </div>
        </div> */}
        {/* <div className='form-control'>
          <h5>Price</h5>
          <p className='price'>{formatPrice(Price)}</p>
          <input type='range' name='Price' id='Price' onChange={updateFilters} min={min_price} max={max_price} value={Price}>

          </input>
        </div> */}
        {/* <div className='form-control shipping'>
          <label htmlFor='shipping'>Free Shipping</label>
          <input type='checkbox' name='shipping' id='shipping' onChange={updateFilters} checked={shipping}></input>
        </div> */}
      </form>
      <button type='button' className='clear-btn' onClick={clearFilters}>Clear Filters</button>
    </div>
  </Wrapper>
}
  
const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing:0.05rem;
    color: #57574a;
    cursor: pointer;
  }
  .active {
    border-color: #A5A58D;
    // background:red;

  }
  .company {
    // background: #A5A58D;
    border-radius: 0.2rem;
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: #A5A58D;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.2rem;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters