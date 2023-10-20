import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
  LinkAuthenticationElement,
  EmailElement
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import {formatPrice} from '../component/utils/helpers'
import axios from "axios";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
export default function CheckoutForm({totalAmount, clientSecret}) {
    // const {totalAmount} = options;
    // const {totalAmount} = data;
  const stripe = useStripe();
  const elements = useElements();
  const {cart, total_amount, shipping_fee, clearCart} = useCartContext();
//   const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stripVisibility, setStripVisibility] = useState(false);
  const [divVisibility, setDivVisibility] = useState(false);
  const {myUser} = useUserContext();
//   const [email, setEmail] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [showForm, setShowForm] = useState(false);
//   const fetchCustomerIP = async () => {
//     // console.log('hello');
//     try {
//         const response = await axios.get('/get-customer-ip');
//         console.log(response);
//         const customerIP = response.data.customerIP;
//         // console.log(`Customer's IP address is: ${customerIP}`);
//     } 
//     catch (error) {
//        console.log(error.response);
//     }
//   }
//   useEffect(() => {
//     fetchCustomerIP();
//     // eslint-disable-next-line
//   },[])



  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          clearCart();
        //   clearCart();s
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);
//   const {clearCart} = useCartContext();
const handleChange = async (event) => {
        setMessage(event.error ? event.error.message : '')
      }
  const handleSubmit = async (e) => {
    // clearCart()
    e.preventDefault();

    // if (!stripe || !elements) {
    //   // Stripe.js hasn't yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //   return;
    // }

    setIsLoading(true);
    // clearCart()
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:8888",
        // cart:clearCart(),
        
        // receipt_email: 'email',
      },
      
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    
    setIsLoading(false);
  };
 

  const paymentElementOptions = {
    layout: "tabs"
  }
//   console.log(clearCart);
//   console.log(cart);

  return (
    <Wrapper>
        <button className='stripe-button' style={{textDecoration:'none', background:'none', color:'black'}}
        onClick={() => {setStripVisibility(!stripVisibility)}}>STRIPE</button>
        <h3 style={{position:'absolute', top:'140px', left:'184px'}}>Hello, {myUser && myUser.name}</h3>
        <p style={{color:'black', position:'absolute', top:'180px', left:'184px'}}>Total : <b>{formatPrice(totalAmount)}</b></p>
    {stripVisibility ?
    <div style={{}}>
    <form id='payment-form' onSubmit={handleSubmit}>
        {/* <LinkAuthenticationElement /> */}
        <AddressElement options={{mode: 'shipping'}}></AddressElement>
      <PaymentElement id="payment-element" options={paymentElementOptions} onChange={handleChange}/>
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form></div> : <button className='payment-button' style={{textDecoration:'none', background:'none', color:'black'}}
        onClick={() => {setDivVisibility(!divVisibility)}}>UPI</button>
    }
    
    {divVisibility && (!stripVisibility) ? <div
    style={{paddingTop:'0.3rem', paddingBottom:'0.3rem',
     background:'red', position:'relative', width:'570px', left:'600px', top:'-330px'}}>Hellow</div> : null}
    </Wrapper>
  );
}

const Wrapper = styled.section`
.stripe-button{
    height:3rem;
    text-align:center;
    item-align:center;
    min-width:580px;
    border:solid 1px black
}
.payment-button{
    height:3rem;
    text-align:center;
    item-align:center;
    max-width:580px;
    border:solid 1px black;
    position:absolute;
    top:300px;
    left:765px;
}
#none {
    display:none;
}
#payment-form {
color:white !important;
 display:grid;
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
  position: absolute; /* Set the form's position to absolute */
    top: 290px;
    left:765px;
    background-color:white;
    border:solid 2px black;
    border-radius:0.25rem;
    // margin-bottom:200px;
}


#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
}

button:hover {
  filter: contrast(115%);
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}

.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.spinner:before,
.spinner:after {
  position: absolute;
  content: '';
}

.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}
.cart-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two columns: one for products, one for form */
    gap: 20px; /* Add spacing between columns */
  }
  
  .products {
    // display: grid;
    // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Responsive grid for products */
    // gap: 20px; /* Add spacing between products */
    max-height:400px;
    overflow-y:auto;
  }
  
  .product {
    display: flex;
    align-items: center;
    padding:10px;
  }
  
  .product img {
    max-width: 100px;
  }
  
  .product-details {
    margin-left: 20px;
  }
  
//   /* Styles for the form on the right (adjust as needed) */
//   #payment-form {
//     /* Your form styles here */
//   }
@media(max-width:992px){
    .stripe-button{
        position:absolute;
        top:10px;

    }
}

  
`