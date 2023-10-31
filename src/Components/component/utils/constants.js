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
    text:
      'Affordable clothes with good quality material.',
  },
  {
    id: 2,
    icon: <FaPlaneDeparture />,
    title: 'Delivery',
    text:
      'Free Delivery All across India',
  },
  {
    id: 3,
    icon: <FaPhoneAlt />,
    title: 'Contact',
    text:
      'Email: chawla1310@gmail.com Number: +919016528043', 
      
  },
]

export const products_url = process.env.REACT_APP_PRODUCT_URL

export const single_product_url = `${process.env.REACT_APP_PRODUCT_URL}?id=`
