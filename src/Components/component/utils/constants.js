import React from 'react'
// import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
import {MdAttachMoney} from 'react-icons/md'
import {FaPlaneDeparture, FaPhoneAlt} from 'react-icons/fa'
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/HomePage',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
]

export const services = [
  {
    id: 1,
    icon: <MdAttachMoney />,
    title: 'Cost',
    text: (
      <p>
        <span  style={{fontWeight:'bolder', display:'inline'}}>Transparent Pricing: </span>No hidden costs or surprises. Our pricing is upfront and transparent, ensuring you know exactly what you're paying for.
      </p>
    ),
      // `${<p style={{fontWeight:'bolder'}}>Transparent Pricing:</p>} No hidden costs or surprises. Our pricing is upfront and transparent, ensuring you know exactly what you're paying for.`,
  },
  {
    id: 2,
    icon: <FaPlaneDeparture />,
    title: 'Delivery',
    text:(
      <p>
        <span style={{fontWeight:'bolder', display:'inline'}}>Worldwide Shipping:</span> No matter where you are, we'll reach you. We offer worldwide shipping, so you can enjoy our services from anywhere.Shipping across India is free of charge
      </p>
    ),
  },
  {
    id: 3,
    icon: <FaPhoneAlt />,
    title: 'Contact',
    text:(
      <p>
        <span style={{fontWeight:'bolder', display:'inline'}}>Visit Our Store: </span>We have a physical store where you can experience our services in person. Visit us, and our staff will be delighted to serve you.
        <span style={{fontWeight:'bolder', display:'inline'}}>Email: </span>chawla1310@gmail.com
        <span style={{fontWeight:'bolder', display:'inline'}}>Number: </span>+919016528043
      </p>
    ),
      // 'Email: chawla1310@gmail.com Number: +919016528043', 
      
  },
]

export const products_url = process.env.REACT_APP_PRODUCT_URL

export const single_product_url = `${process.env.REACT_APP_PRODUCT_URL}?id=`
