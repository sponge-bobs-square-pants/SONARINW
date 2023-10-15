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
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 2,
    icon: <FaPlaneDeparture />,
    title: 'Delivery',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 3,
    icon: <FaPhoneAlt />,
    title: 'Contact',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates',
  },
]

export const products_url = process.env.REACT_APP_PRODUCT_URL

export const single_product_url = `${process.env.REACT_APP_PRODUCT_URL}?id=`
