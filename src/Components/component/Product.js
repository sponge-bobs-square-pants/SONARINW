import React from 'react'
import '../Pages/MainPage.css'
import styled from 'styled-components'
import { formatPrice } from '../component/utils/helpers'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
const Product = ({ProductName , Price, _id, Image}) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once when element comes into view
    threshold: 0.2, // 20% of the element must be visible
  });
  const handleClick = async (_id) => {
    const url = `/products/${_id}`;
    window.location.href=url;
  }
  return <Wrapper onClick={() => handleClick(_id)}>
    <div ref={ref} className={`container ${inView ? 'animate-slide-in' : ''}`}>
      <div style={{opacity:'0'}}>'</div>
      
        <img src={Image} alt={ProductName} className='img'/>
        <Link to={`/products/${_id}`} className='link'>
            <FaSearch />
        </Link>
        <footer className='footer'>
            <h5 style={{fontWeight:'400', textTransform:'initial', letterSpacing:'0.08rem', fontSize:'0.9rem', 
          position:'relative', top:'-25px'}}>{ProductName}</h5>
          {/* <p style={{fontSize:'0.9rem'}}>{formatPrice(Price)}</p> */}
             <p style={{fontSize:'0.9rem'}}>{formatPrice(Price * 9 / 10)}</p>
        </footer>
    </div>
  </Wrapper>
}

const Wrapper = styled.article`
  .container {
    position: relative;
    // background: #222;
    border-radius: 1.25rem;
    overflow: hidden;
    position:relative;
    top:0px;
    margin-bottom:-40px;
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: 0.25rem;
    transition: all 0.3s linear;
    object-position: center top;
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #A5A58D;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: all 0.3s linear;
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: white;
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  .container:hover::before {
    content: '';
    position: absolute;
    top: 21.5px;
    left: 0;
    right: 0;
    bottom: 59px;
    border-radius: 0.25rem;
    background: rgba(0, 0, 0, 0.8); /* Adjust the background color and opacity as needed */
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    // margin-top:1;
    position:relative;
    top:-20px;
    font-weight: 400;
  }

  footer p {
    color: black;
    letter-spacing: 0.1rem;
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(100%); /* Start the image above the viewport */
      opacity: 0; /* Start with opacity 0 for a fade-in effect */
    }
    to {
      transform: translateY(0); /* Move the image to its final position */
      opacity: 1; /* Fade the image in */
    }
  }
  
  /* Apply the animation to the element */
  .animate-slide-in {
    animation: slideInFromTop 1s ease-in-out forwards; /* Use the animation with a duration of 0.5s */
  }
`
export default Product
