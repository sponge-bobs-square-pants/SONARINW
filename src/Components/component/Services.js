import React from 'react'
import '../Pages/MainPage.css'
import styled from 'styled-components'
import { services } from '../component/utils/constants'

const Services = () => {
  return <Wrapper className='service_style'>
    <div className='section-center'>
        <article className='header'>
            <h3>Custom Clothes <br />
            Built Only For You</h3> 
            <p>Aliquip minim do irure dolor deserunt eiusmod culpa nulla. Velit dolor quis duis nostrud id.</p>   
        </article>
        <div className='services-center'>
            {services.map((service) => {
                const {id, icon, title, text} = service;
                return<article className='service' key={id}>
                    <span className='icon'>{icon}</span>
                    <h2 className='pservices ph4'>{title}</h2>
                    <p className='pservices'>{text}</p>
                </article>
            })}    
        </div>    
    </div> 
    </Wrapper>
}

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;

  background: #A5A58D;

  .header h3 {
    margin-bottom: 2rem;
  }
  .pservices{
    position:relative;
    top:-30px;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-primary-3);
  }
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: #58584a;
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    p {
      color: var(--clr-primary-2);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 5rem;
      position:relative;
      top:-80px;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`
export default Services
