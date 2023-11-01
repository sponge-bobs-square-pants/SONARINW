import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import image1 from '../assets/hero-bcg.jpeg'
import image2 from '../assets/photo1.jpg'
// import image1 from '../assets/photo2.jpg'
import image1 from '../assets/photo3.jpg'
// import image2 from '../assets/hero-bcg-2.jpeg'
// import heroBcg from '../assets/hero-bcg.jpeg'
// import heroBcg2 from '../assets/hero-bcg-2.jpeg'

const Hero = () => {
  return <Wrapper className='section-center homestyle'>
    <article className='content' style={{fontSize:'3rem'}}>
        <h1>Endless Posiblities<br />
            With Every Click</h1>
        <p>
        Explore handpicked nightwear, panties, and bras for your comfort and style. Luxurious fabrics, perfect fit, and unbeatable quality. Your confidence, your choice.
        </p>
        <Link to='/products' className='btn1 hero-btn' style={{textDecoration:'none', color:'black'}}>Shop Now</Link>
    </article>
    <article className='img-container'>
        <img src={image1} alt='Dress 1' className='main-img' />
        <img src={image2} alt='Dress 2' className='accent-img' />
    </article>
    </Wrapper>
}

const Wrapper = styled.section`
  min-height: 90vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media(max-width: 992px){
    .hero-btn{
      margin-bottom:20px;
      // padding-bottom:50px;
    }
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      // padding-bottom:30px;
      // margin-bottom:300px;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: #A5A58D;
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Hero
