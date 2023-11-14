import React, { useEffect, useState, useMemo } from 'react';
import  './Welcome.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useSidebarContext } from '../context/SidebarContext';
// import logo from '../../sonari_logo.png';
const Welcome = () => {

  const combinations = useMemo(
    () => [
      { configuration: 1, roundness: 1 },
      { configuration: 1, roundness: 2 },
      { configuration: 2, roundness: 2 },
      { configuration: 2, roundness: 5 },
      { configuration: 3, roundness: 3 },
      { configuration: 5, roundness: 5 }
    ],
    []
  );

  const [previousIndex, setPreviousIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCombination, setCurrentCombination] = useState(combinations[currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * combinations.length);
      // Ensure that the next combination is different from the previous one
      while (randomIndex === previousIndex) {
        randomIndex = Math.floor(Math.random() * combinations.length);
      }
      setPreviousIndex(currentIndex);
      setCurrentIndex(randomIndex);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [combinations.length, currentIndex, previousIndex]);

  useEffect(() => {
    setCurrentCombination(combinations[currentIndex]);
  }, [combinations, currentIndex]);

  useEffect(() => {
    const { configuration, roundness } = currentCombination;
    const wrapper = document.querySelector('.wrapper');
    wrapper.setAttribute('data-roundness', roundness.toString());
    wrapper.setAttribute('data-configuration', configuration.toString());
    
  }, [currentCombination]);
  
  const {openSidebar} = useSidebarContext();

  return (
    <div className='container green' >
      <div className='title-wrapper'>
        <div style={{position:'absolute', top:'0px', right:'0vw'}} className='navnav'>
        <button type='button' style={{background:'transparent',border:'transparent',fontSize:'1.5rem',padding:'1rem', color:'black'}} className='nav-toggles' onClick={openSidebar}>
                <FaBars />
            </button>
        </div>
        <div className='row-container'>
          <p className='title1'>Sonari</p>
          <p className='title2'>nightwear</p>
        </div>
        {/* <div className='row-container'>
          <img src={logo} alt='brand logo' className='logo' />
        </div> */}
        
      </div>
      <Link to='/HomePage'>
        <div className='wrapper'>
          <div className='shape'></div>
          <div className='shape'></div>
          <div className='shape'></div>
          <div className='shape'></div>
          <div className='shape'></div>
          <div className='shape'></div>
          <div className='shape'></div>
        </div>
      </Link>
    </div>
  )
}
export default Welcome
