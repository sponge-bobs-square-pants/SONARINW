import React from 'react'
import styled from 'styled-components'
import Nav from '../component/Navbar';
import Footer from '../component/Footer';
import PageHero from '../component/PageHero';
import sonari from '../../sonari.jpeg';
// import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
  <div>
    <Nav />
    <PageHero title='About' className='abouthero'/>
  <div className='homestyle ' style={{maxHeight:'100%'}}>
    <Wrapper className='section-center' style={{paddingBottom:'15px', paddingTop:'50px'}} >
        <img src={sonari} alt='sonari shop' style={{maxHeight: '50vh', maxWidth:'50vw', position:'relative', top:'-70px'}}/>
        <article>
            <div>
                <h2 className='title imgtry'>Our Story</h2>
                <div className='underline'></div>
                <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
            </div>
        </article>
    </Wrapper>
    <div>
    <Footer />
    </div>
    </div>
    </div>
    
    );
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
//   align-items: center;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
 
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    
    
  }
`
export default AboutPage
