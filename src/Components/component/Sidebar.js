import React from 'react'
import '../Pages/MainPage.css'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { links } from './utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { useSidebarContext } from '../context/SidebarContext'
import { useUserContext } from '../context/UserContext'

const Sidebar = () => {
    const {isSidebarOpen, closeSidebar} = useSidebarContext();
    const {myUser} = useUserContext();
    return (
    <SidebarContainer>
        <aside className={`${isSidebarOpen? 'sidebar show-sidebar': 'sidebar' }`}>
            <div className='sidebar-header'>
                <div className='company_name'>
                    Sonari
                </div>
            <button className='close-btn' type='button' onClick={closeSidebar}>
                <FaTimes />
            </button>
            </div>
            <ul className='links'>
                {links.map(({id, text, url}) => {
                    return <li key={id}>
                        <Link to={url} style={{textDecoration: 'none'}} onClick={closeSidebar}>{text}</Link>
                    </li>
                })}
                {myUser && (<li>
                    <Link to='/checkout' style={{textDecoration: 'none'}} onClick={closeSidebar}>Checkout</Link>
                 </li>)}
                
            </ul>
            <CartButtons /> 
        </aside>
    </SidebarContainer>
    )
}

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color:#A5A58D ;
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
    list-style-type: none;
    padding: 1rem 1rem 1rem 0rem;
    
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: cubic-bezier(0.075, 0.82, 0.165, 1);
    letter-spacing: 0.1rem;
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 3rem;
    background: #A5A58D;
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: rgb(190, 172, 138);
    background: white;
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`

export default Sidebar
