// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { loadStripe } from '@stripe/stripe-js'
// import { CardElement, useStripe, Elements, useElements } from '@stripe/react-stripe-js'
// import axios from 'axios'
// import {useCartContext} from '../context/CartContext'
// import {useUserContext} from '../context/UserContext'
// import {formatPrice} from '../component/utils/helpers'
// // import {useHistory} from 'react-router-dom'

// const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

// const CheckOutForm = () => {
//   const {cart, total_amount, shipping_fee, clearCart} = useCartContext();
//   const {myUser} = useUserContext();
//   // const history = useHistory();
//   //STRIPE
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState('');
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState('');
//   const [totalAmount, setTotalAmount] = useState(null);
//   const stripe = useStripe();
//   // stripe.elements({clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY})
//   const elements = useElements();

//   const cardStyle = {
//     style: {
//       base: {
//         color: '#32325d',
//         fontFamily: 'Arial, sans-serif',
//         fontSmoothing: 'antialiased',
//         fontSize: '16px',
//         '::placeholder': {
//           color: '#32325d',
//         },
//       },
//       invalid: {
//         color: '#fa755a',
//         iconColor: '#fa755a',
//       },
//     },
//   };

//   const createPaymentIntent = async () => {
//     // console.log('hello');
//     try {
//       const {data} = await axios.post('/.netlify/functions/create-payment-intent',JSON.stringify({cart, shipping_fee, total_amount}))
//       // console.log(data.clientSecret);
//       // console.log(data.totalAmount);
//       const totalAmount = parseFloat(data.totalAmount);
//       setClientSecret(data.clientSecret)
//       setTotalAmount(totalAmount)
//     } 
//     catch (error) {
//       //  console.log(error.response);
//     }
//   }
//   useEffect(() => {
//     createPaymentIntent();
    
//     // eslint-disable-next-line
//   },[])

//   const handleChange = async (event) => {
//     setDisabled(event.empty)
//     setError(event.error ? event.error.message : '')
//   }
//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     setProcessing(true);
//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method:{
//         card:elements.getElement(CardElement)
//       }
//     })
//     if(payload.error){
//       setError(`Payment failed ${payload.error.message}`)
//       setProcessing(false);
//     }
//     else{
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//       setTimeout(() => {
//         clearCart();
//         // history.push('/')
//       }, 10000)
//     }
//   }
//   // const paymentElementOptions = {
//   //   layout: "tabs"
//   // }
//     return <div>
//       <form id='payment-form' onSubmit={handleSubmit}>
//         {
//           succeeded ? <article>
//             <h4>Thank You</h4>
//             <h4>Your payment was successful!</h4>
//           </article> : <article>
//             <h4>Hello, {myUser && myUser.name}</h4>
//             <p>Your total is {formatPrice(shipping_fee + totalAmount)}</p>
//             <p>Test Card Number : 4242 4242 4242 4242</p>
//           </article>
//         }
//       {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
//         <CardElement id='card-element' options={cardStyle} onChange={handleChange}></CardElement>
//         <button disabled={processing || disabled || succeeded} id='submit'>
//           <span id='button-text'>
//             {processing ?  <div className='spinner' id='spinner'></div> : 'PAY'}
//           </span>
//         </button>
//         {error && <div className='card-error' role='alert'>{error}</div>}
//         <p className={succeeded ? 'result-message' : 'result-message hidden'}>
//           Payment succeeded
//         </p>
//       </form>
//     </div>
// }

// const StripeCheckout = () => {
//   return (
//     <Wrapper>
//       <Elements stripe={promise}>
//         <CheckOutForm />
//       </Elements>
//     </Wrapper>
//   )
// }

// const Wrapper = styled.section`
// form {
//   width: 30vw;
//   min-width: 500px;
//   align-self: center;
//   box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
//     0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
//   border-radius: 7px;
//   padding: 40px;
// }
// #submit {
//   margin-top:2rem;
// }

// .hidden {
//   display: none;
// }
// #payment-message {
//   color: rgb(105, 115, 134);
//   font-size: 16px;
//   line-height: 20px;
//   padding-top: 12px;
//   text-align: center;
// }

// #payment-element {
//   margin-bottom: 24px;
// }

// /* Buttons and links */
// button {
//   background: #5469d4;
//   font-family: Arial, sans-serif;
//   color: #ffffff;
//   border-radius: 4px;
//   border: 0;
//   padding: 12px 16px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   display: block;
//   transition: all 0.2s ease;
//   box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//   width: 100%;
// }

// button:hover {
//   filter: contrast(115%);
// }

// button:disabled {
//   opacity: 0.5;
//   cursor: default;
// }

// /* spinner/processing state, errors */
// .spinner,
// .spinner:before,
// .spinner:after {
//   border-radius: 50%;
// }

// .spinner {
//   color: #ffffff;
//   font-size: 22px;
//   text-indent: -99999px;
//   margin: 0px auto;
//   position: relative;
//   width: 20px;
//   height: 20px;
//   box-shadow: inset 0 0 0 2px;
//   -webkit-transform: translateZ(0);
//   -ms-transform: translateZ(0);
//   transform: translateZ(0);
// }

// .spinner:before,
// .spinner:after {
//   position: absolute;
//   content: '';
// }

// .spinner:before {
//   width: 10.4px;
//   height: 20.4px;
//   background: #5469d4;
//   border-radius: 20.4px 0 0 20.4px;
//   top: -0.2px;
//   left: -0.2px;
//   -webkit-transform-origin: 10.4px 10.2px;
//   transform-origin: 10.4px 10.2px;
//   -webkit-animation: loading 2s infinite ease 1.5s;
//   animation: loading 2s infinite ease 1.5s;
// }

// .spinner:after {
//   width: 10.4px;
//   height: 10.2px;
//   background: #5469d4;
//   border-radius: 0 10.2px 10.2px 0;
//   top: -0.1px;
//   left: 10.2px;
//   -webkit-transform-origin: 0px 10.2px;
//   transform-origin: 0px 10.2px;
//   -webkit-animation: loading 2s infinite ease;
//   animation: loading 2s infinite ease;
// }

// @keyframes loading {
//   0% {
//     -webkit-transform: rotate(0deg);
//     transform: rotate(0deg);
//   }
//   100% {
//     -webkit-transform: rotate(360deg);
//     transform: rotate(360deg);
//   }
// }

// @media only screen and (max-width: 600px) {
//   form {
//     width: 80vw;
//     min-width: initial;
//   }
// }
// `

// export default StripeCheckout




import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartContext } from "../context/CartContext";
import CheckoutForm from "./CheckoutForm";
import { formatPrice } from "./utils/helpers";
// import styled from "styled-components";
// import "./App.css";
import axios from "axios";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const {cart, total_amount, shipping_fee} = useCartContext();
  const [totalAmount, setTotalAmount] = useState(null);
  const createPaymentIntent = async () => {
        // console.log('hello');
        try {
          const {data} = await axios.post('/.netlify/functions/create-payment-intent',JSON.stringify({cart, shipping_fee, total_amount}))
          // console.log(data.clientSecret);
          // console.log(data.totalAmount);
          const totalAmount = parseFloat(data.totalAmount);
          setClientSecret(data.clientSecret)
          setTotalAmount(totalAmount)
        } 
        catch (error) {
           console.log(error.response);
        }
      }
      useEffect(() => {
        createPaymentIntent();
        // eslint-disable-next-line
      },[])

  const appearance = {
    theme: 'stripe',
    variables:{
      colorText:'black',
      colorBackground:'white ',
      colorPrimary:'black'
    },
    // variables: { colorPrimaryText: 'white' }
  };
  const loader = 'auto';
  const options = {
    clientSecret,
    appearance,
    loader,
  };


  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options}  stripe={stripePromise}>
          {/* {formatPrice(totalAmount)} */}
          <CheckoutForm  totalAmount={totalAmount} clientSecret={clientSecret}/>
        </Elements>
      )}
    </div>
  );
}

