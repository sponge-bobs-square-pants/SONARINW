import React from 'react'
import styled from 'styled-components'

const Contact = () => {
  return <Wrapper className='section-center'>
    <h2>Join our newsletter and get 10% off</h2>
    <div className='content'>
      <p>Qui do aliquip ut deserunt occaecat dolor magna qui ut reprehenderit in dolor laborum commodo. Eiusmod veniam nisi veniam ut.</p>
    <form className='contact-form'>
      <input type='email' className='form-input' placeholder='Enter Your Email'>
      </input>
      <button type='submit' className='submit-btn'>Subscribe</button>
    </form>
    </div>
  </Wrapper>
}
const Wrapper = styled.section`
  padding: 5rem 0;
  h2 {
    text-transform: none;
    letter-spacing:0.15rem;
  }
  p {
    line-height: 2;
    max-width: 30rem;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid black;
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: 3%;
    border-bottom-left-radius: 3%;
  }
  .submit-btn {
    border-top-right-radius: 3%;
    border-bottom-right-radius: 3%;
  }
  .form-input::placeholder {
    color: black;
    text-transform: capitalize;
  }
  .submit-btn {
    background: #A5A58D;
    text-transform: capitalize;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    h2 {
      text-transform: none;
      letter-spacing:0rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`

export default Contact
