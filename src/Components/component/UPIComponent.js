    import axios from 'axios';
    import React, { useState, useEffect } from 'react'
    import '../Pages/MainPage.css'
    import { useCartContext } from '../context/CartContext';
    import '../Pages/MainPage.css'
    import styled from 'styled-components';
    import { formatPrice } from './utils/helpers';
    import { useUserContext } from '../context/UserContext';
    import Loading from './Loading';
    // import { useAuth0 } from '@auth0/auth0-react';
    
    function razorpayScript(src) {
        return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
        });
    }

    const UPIComponent = () => {
        // const {user} = useAuth0();
        const {myUser, userId} = useUserContext();
        const name = myUser ? myUser.name : 'User Name Not Available';
        // console.log(name);
        // console.log(userId);
        const [amount, setAmount] = useState(0);
        // const [currency, setCurrency] = useState('INR');
        const [orderID, setOrderID] = useState('');
        const [email, setEmail] = useState('');
        const [address, setAddress] = useState('');
        const [pincode, setPincode] = useState(''); 
        const [state, setState] = useState(''); 
        const [city, setCity] = useState(''); 
        const [isFormComplete, setFormComplete] = useState(false);
        const [isButtonDisabled, setButtonDisabled] = useState(true);
        const [phone, setPhone] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const key = process.env.REACT_APP_RAZOR_PAY_KEY
        const secureKey = process.env.REACT_APP_SECURE_KEY
        // console.log(key);
        const {cart, shipping_fee, totalAmount, clearCart} = useCartContext();
        // console.log(cart);
        // console.log(typeof(cart[0].Price), 'This is cart');
        // console.log(cart, 'This is cart');
        const checkFormCompleteness = () => {
            // You can define your own logic to check form completeness here.
            // For example, check if all required fields are filled.
            const isComplete = !!email && !!address && !!pincode && !!state && !!city;
            setFormComplete(isComplete);
            setButtonDisabled(!isComplete);
          };

        const getAmount = async() => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_GENERAL_ROUTE}/razorpaydata`, cart)
                // const response = await axios.post(`http://localhost:5000/api/v1/razorpaydata`, cart)
                
                // console.log(response.data.amount, response.data.order_id);
                const amount1 = response.data.amount
                setOrderID(response.data.order_id);
                setAmount(amount1);
            } catch (error) {
                console.log('Get amount error');
            }
        }
        useEffect(() => {
            getAmount();
        }, [])
        const handleFormSubmit = async () => {
            
            // console.log(orderID, 'formsubmit');
            // console.log(cart, 'This is the cart value');
            try {
                const amountFormated = formatPrice(amount)
                const headers = {
                    'x-api-key': secureKey,
                }
            // Create an object with the form data

            const formData = {
                name,
                email,
                address,
                pincode,
                state,
                city,
                // Add other form fields as needed
                amount: amountFormated, // Payment amount
                orderID, // Order ID
                cart,
                isPaymentSuccessful:false,
                userId,
                phoneNumber:phone,
            };
            
            // Send the form data to your server's API endpoint
            await axios.post(`${process.env.REACT_APP_GENERAL_ROUTE}/submitForm`, formData, {headers});

            // await axios.post(`http://localhost:5000/api/v1/submitForm`, formData, {headers});
        
            // Optionally, you can display a success message to the user
            // alert('Form submitted successfully.');
        
            // Reset the form fields
            setEmail('');
            // console.log('before clear cart');
            
            // console.log('after clear cart');
            setAddress('');
            setPincode('');
            setState('');
            setCity('');
            setPhone('');
            setAmount('');
            
            // Reset other form fields as needed
        
            } catch (error) {
            console.log(error.response);
            }
        };

        const handlePayment = async () => {
            function generateTransactionID() {
                
                const timestamp= Date.now();
                const RandomNum = Math.floor(Math.random() * 1000000)
                const MerchantPrefix = 'K';
                const transactionID = `SONARIONLINE${MerchantPrefix}${timestamp}${RandomNum}`
                return transactionID
            }
            const transactionID = generateTransactionID();
            // console.log(typeof transactionID);
            // console.log(phone, orderID,email,address,pincode,state,city,amount, name, userId, transactionID);

            const data = {
                phone,
                orderID,
                email,
                address,
                pincode,
                state,
                city,
                amount,
                name,
                userId,
                transactionID,
                cart,
            }
            try {
                const response = await axios.post(`${process.env.REACT_APP_GENERAL_ROUTE}/razorpay`, data)
                // const response = await axios.post(`http://localhost:5000/api/v1/razorpay`, data)
                window.location.href = response.data
                
                // console.log(response.data);
            } catch (error) {
               console.log(error, 'Payment error'); 
            }
            
            // handleFormSubmit();
            // console.log(phone, orderID,email,address,pincode,state,city,amount, name);

        };

        const handleEmailChange = (e) => {
            setEmail(e.target.value);
        };
        
        const handleAddressChange = (e) => {
            setAddress(e.target.value);
        };
        
        const handlePincodeChange = (e) => {
            setPincode(e.target.value);
        };
        
        const handleStateChange = (e) => {
            setState(e.target.value);
        };
        
        const handleCityChange = (e) => {
            setCity(e.target.value);
        };
        const handlePhoneChange = (e) => {
            setPhone(e.target.value);
        };
        //   console.log(address, state, city, pincode, email);
        return (
            <FormWrapper>
                {isLoading && <Loading />}
                {!isLoading && (
                    <div>
                                <form>
                                <div className="form-group">
                                    <label>Total Price</label>
                                    <input type="text" value={formatPrice(amount)} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" value={name} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="Enter your email address" value={email} onChange={handleEmailChange}  onBlur={checkFormCompleteness}/>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" placeholder="Enter your address" value={address} onChange={handleAddressChange}  onBlur={checkFormCompleteness}/>
                                </div>
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input type="Integer" placeholder="Enter your pincode" value={pincode} onChange={handlePincodeChange}  onBlur={checkFormCompleteness}/>
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input type="text" placeholder="Enter your state" value={state} onChange={handleStateChange} onBlur={checkFormCompleteness} />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" placeholder="Enter your city" value={city} onChange={handleCityChange}  onBlur={checkFormCompleteness}/>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder="Enter your Phone Number" value={phone} onChange={handlePhoneChange}  onBlur={checkFormCompleteness} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                                </div>
                                </form>
                                
                                <button onClick={async () =>{
                                    try {
                                        setIsLoading(true);
                                        await handleFormSubmit();
                                        setIsLoading(false);
                                        await handlePayment();
                                      } catch (error) {
                                        // Handle errors if needed
                                        console.error(error);
                                      }
                                }}disabled={isButtonDisabled} className='PayButton'>
                                    PAY NOW
                                </button>
                    </div>
                )}
            {/* <h2>Checkout Form</h2> */}

        </FormWrapper>
        
        )
    }
    const FormWrapper = styled.div`
    width:100%;
    position:relative;
    left:700px;
    top:60px;
    .PayButton{
        position:relative;
        width:480px;
        padding:20px;
        background:#57574a;
        color:white;
        letter-spacing:0.1rem;
        height:70px;
    }
    h2 {
        text-align: center;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        max-width: 600px;
        margin: 0 auto;
        padding-bottom:20px;
        // margin-bottom:50px; 
        
    }

    .form-group {
        display: flex;
        flex-direction: column;
        
    }

    label {
        margin-bottom: 5px;
    }

    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width:80%;
    }

    input[readonly] {
        background-color: #f7f7f7;
    }

    button {
        grid-column: span 2;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    @media(max-width: 480px){
        form {
            grid-template-columns: 1fr;
          }
          position:absolute;
          left:-82px;
          top:250px;
        //   overflow-y:hidden;
          width:90vw;
        //   overflow:hidden;
        // padding-right:0px;
        // margin-right:0px;
          .PayButton{
                  position:relative;
                  top:100px;
                  // padding-top:50px;
                  left:73%;
                  width:80vw;
                  padding:20px;
                  background:#57574a;
                  color:white;
                  letter-spacing:0.1rem;
                  height:70px;
              }
              form {
                // background:red;
                  overflow:hidden;
                box-sizing: border-box;
                  display: grid;
                  position:relative;
                  top:100px;
                  left:70%;
                  grid-template-columns: 1fr 1fr;
                  gap: 10px;
                  padding-bottom:20px;
                max-width: 800px;
                margin: 0 auto;
              }
              .form-group{
                  width:45vw;
              }
      }
    // @media (max-width:320px) {
    //     form {
    //       grid-template-columns: 1fr;
    //     }
    //     position:relative;
    //     left:100px;
    //     top:250px;
    //     // overflow:hidden;
    //     .PayButton{
    //             position:relative;
    //             top:100px;
    //             // padding-top:50px;
    //             left:23%;
    //             width:80vw;
    //             padding:20px;
    //             background:#57574a;
    //             color:white;
    //             letter-spacing:0.1rem;
    //             height:70px;
    //         }
    //         form {
    //             // overflow:hidden;
    //             display: grid;
    //             position:relative;
    //             top:100px;
    //             left:66%;
    //             grid-template-columns: 1fr 1fr;
    //             gap: 10px;
    //             margin: 0;
    //             padding-bottom:20px;
    //             width:100vw;
    //         }
    //         .form-group{
    //             width:45vw;
    //         }
    //   }
    // @media (min-width:320px) {
    //     position:relative;
    //     left:100px;
    //     top:250px;
    //     // overflow:hidden;
    //     .PayButton{
    //             position:relative;
    //             top:100px;
    //             // padding-top:50px;
    //             left:75%;
    //             width:80vw;
    //             padding:20px;
    //             background:#57574a;
    //             color:white;
    //             letter-spacing:0.1rem;
    //             height:70px;
    //         }
    //         form {
    //             // overflow:hidden;
    //             display: grid;
    //             position:relative;
    //             top:100px;
    //             left:70%;
    //             grid-template-columns: 1fr 1fr;
    //             gap: 10px;
    //             margin: 0;
    //             padding-bottom:20px;
    //             width:100vw;
    //         }
    //         .form-group{
    //             width:45vw;
    //         }
    //   }
    //   @media (min-width:428px) {
    //     position:relative;
    //     left:100px;
    //     top:250px;
    //     overflowX:hidden;
    //     .PayButton{
    //             position:relative;
    //             top:100px;
    //             // padding-top:50px;
    //             left:83%;
    //             width:80vw;
    //             padding:20px;
    //             background:#57574a;
    //             color:white;
    //             letter-spacing:0.1rem;
    //             height:70px;
    //         }
    //         form {
    //             // overflow:hidden;
    //             display: grid;
    //             position:relative;
    //             top:100px;
    //             left:80%;
    //             grid-template-columns: 1fr 1fr;
    //             gap: 10px;
    //             margin: 0;
    //             padding-bottom:20px;
    //             width:100vw;
    //         }
    //         .form-group{
    //             width:45vw;
    //         }
    //   }

    //   button {
    //     width:100px;
    // }

    `;

    export default UPIComponent
