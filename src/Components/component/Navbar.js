import React from 'react'
import '../Pages/MainPage.css'
import styled from 'styled-components'
// import logo from '../assets/sonari_logo.png'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { links } from './utils/constants'
import CartButtons from './CartButtons';
import { useSidebarContext } from '../context/SidebarContext'
import { useUserContext } from '../context/UserContext'

// import { useProductsContext } from '../context/products_context'
// import { useUserContext } from '../context/user_context'

const Nav = () => {
  const productListStyle = {
      margin: 0,
      padding: 0,
      overflowX: 'hidden', // Prevent horizontal scrolling
  };

  const {openSidebar} = useSidebarContext();
  const {myUser} = useUserContext();
    return (
  <NavContainer style={productListStyle}>
    <div className='nav-center'>
        <div className='nav-header'>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <div className='company_name'>
                    Sonari
                </div>
            </Link>
            <button type='button' className='nav-toggle' onClick={openSidebar}>
                <FaBars />
            </button>
         </div>
        <ul className='nav-links'>
            {links.map((link) =>{
                const {id, text, url} = link
                return (
                <li key={id}>
                    <Link to={url}>
                        {text}
                    </Link>
                </li>
                )
            })}
            {
              myUser && <li>
                <Link to='/Checkout'>Checkout</Link>
                
              </li>
            }
             {
              myUser && <li>
               <Link to='/OrderHistory'>Orders</Link>
                
              </li>
            }
            
        </ul>
        <CartButtons />
    </div>
    </NavContainer>
    )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: black;
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
    list-style: none; 
    padding: 0;
    text-decoration: none;
    letter-spacing:0.9px;
    li{
        // color:#5a5a4d;
        color:black;
    }
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      list-style: none;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        text-decoration: none;
        position:relative;
        &:hover {
        //   border-bottom: 3px solid #A5A58D;
        border-bottom: 3px solid lightgray;
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav;
