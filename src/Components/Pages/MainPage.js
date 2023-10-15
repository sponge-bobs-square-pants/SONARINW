import React from 'react';
import './MainPage.css';
// import Products from './Products';
import Nav from '../component/Navbar';
import Footer from '../component/Footer';
import Sidebar from '../component/Sidebar';
const MainPage = () => {
  return (
    
    <div className='MainPage'>
      {/* <p>"Hello world how are you??"</p> */}
      <Nav />
      <Sidebar />
      <Footer />
    </div>
  )
}

export default MainPage
