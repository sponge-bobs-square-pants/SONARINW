import React from 'react'
import './MainPage.css';
import Nav from '../component/Navbar';
import Footer from '../component/Footer';
import Hero from '../component/Hero';
import Services from '../component/Services';
import FeaturedProducts from '../component/FeaturedProducts';
import Contact from '../component/Contact';
const HomePage = () => {
  return (
    <div className='homestyle'>
      <Nav/>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
      {/* <div style={{minHeight:'calc(100vh - 10rem)'}}>
        hello. this is the home page
      </div> */}
      <Footer />
    </div>
  )
}

export default HomePage
