import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const PageHero = ({title, product}) => {
  return <Wrapper>
    <div className='section-center'>
        <p>
            <Link to='/HomePage' className='links'>Home</Link> 
            {product && (
              <>
              <span style={{ marginLeft: '5px', marginRight: '5px' }}>&gt;</span>
              <Link to="/products" className='links'>Products</Link>
              {/* / {title} */}
              </>
             )}
            
        </p>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
//   background: #A5A58D;
  width: 100%;
  // min-height: 20vh;
  display: flex;
  align-items: center;

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  .links{
    text-decoration:none;
    // margin:10px
    
  }
  a:hover {
    // color:gray;
    text-decoration: underline;
    // text-decoration-skip-ink: 10px;
    
  }
  @media (max-width: 768px) {
    background:#A5A58D;
    // width:90%;
  }
`

export default PageHero
