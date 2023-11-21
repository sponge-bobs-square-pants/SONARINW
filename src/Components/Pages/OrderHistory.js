import React, { useEffect, useState } from 'react'
import Nav from '../component/Navbar'
import Footer from '../component/Footer'
import { useUserContext } from '../context/UserContext'
import axios from 'axios'
import { formatPrice } from '../component/utils/helpers'
import ListView from '../component/ListView'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSidebarContext } from '../context/SidebarContext'
import Loading from '../component/Loading'
import Error from '../component/Error'
import { FaTimes } from 'react-icons/fa'
import TrackingDiagram from '../component/TrackingDiagram'

const OrderHistory = () => {
    const {userId} = useUserContext();
    const [orderItems, setOrderItems] = useState([]);
    // const [selectedWaybill, setSelectedWaybill] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const secureKey = process.env.REACT_APP_SECURE_KEY
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
    const [trackingStatus, setTrackingStatus] = useState(null);
    const mockStatus = {
      Status: "Manifested",
      StatusLocation: "Mock Location",
      StatusDateTime: "2023-11-17T12:34:56.789",
      RecievedBy: "Mock User",
      StatusCode: "MOCK-123",
      StatusType: "UD",
      Instructions: "Mock instructions for In Transit"
    };
    // const [itemID, setItemID] = useState([]);
  let isMounted = true;
    // console.log(userId);
    useEffect(() => {
     
      const loadProducts = async () => {
        // console.log(userId);
        // const url=`${process.env.REACT_APP_GENERAL_ROUTE}/Order?id=${userId}`;
        const url=`http://localhost:5000/api/v1/Order?id=${userId}`;
        try {
          const headers = {
            'x-api-key': secureKey,
        }
          const response = await axios.get(url, {headers})
          // console.log(response);
          if(response.status === 200){
            
            const {data} = response
            const orders = data.orders
            // console.log(orders);
            // const waybill =data.waybill
            // const array = data.cartArray
            // console.log(data);
            if(isMounted){
              setOrderItems(orders);
              setIsLoading(false);
            }
            // setIsLoading(false);
          }
          else{
            <Error />
            throw new Error('Network response was not ok');
          }

        } catch (error) {
          <Error />
          console.log('error connecting to the database');
        }
      }
      loadProducts();
      return () => {
        // Cleanup function to set isMounted to false when the component unmounts
        isMounted = false;
      };
    }, [userId])
    function truncateText(text, maxLength) {
      if (text && text.length <= maxLength) {
        return text;
      }
      return text ? text.slice(0, maxLength) + '...' : '';
    }
    
    // const toggleModal = () => {
    //   setModalOpen(!isModalOpen);
    // };
    const delhivery = async (orderIndex) => {
      setSelectedOrderIndex(orderIndex);
      setModalOpen(true);
      const order = orderItems[orderIndex];
      const waybills = order.waybill
      const URL = `http://localhost:5000/api/v1/packages?waybills=${waybills}`
      
      try {
        const response = await axios.get(URL);
        const status = response.data.Status;
        // console.log(status);
        setTrackingStatus(status);
        console.log(response.data.Status);
      } catch (error) {
        console.error('Error fetching shipment tracking data:', error);
      }
      // console.log(order.waybill);
      
    }
    if(isloading){
      return <Loading />
    }
    else if(orderItems.length === 0 && !isloading){
      return(// <div style={{display:'grid', placeItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <p>No orders found</p>
      {/* <button onClick='/Products'></button> */}
      <Link to='/Products' style={{background:'black', padding:'15px',paddingLeft:'30px',paddingRight:'30px',
      textDecoration:'none', color:'white'}}>Buy</Link>
      <div></div>
   </div>)
           
    }
    else {
      return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
         <div style={{flex: 1,background:'white', paddingLeft:'5vw', paddingTop:'50px',paddingRight:'5vw', paddingBottom:'50px'}}>
         <div style={{background:'white', padding:'10px'}}>
                {orderItems.map((order, orderIndex) => (
                  <div key={orderIndex}>
                   {/* {console.log(order)} */}
                    <h2>Order #{orderIndex + 1}</h2>
                    {/* <p>Waybill: {order.waybill}</p> */}
                    <ul>
                      {order.order.map((item, index) => (
                        
                        <Wrapper key={index}>
                          {/* {console.log(item.waybill)} */}
                          <article className='container'>
                            <Link to={`/Products/${item.id.replace(/\D/g, '')}`}>
                              <img src={item.image} alt={item.name} className='img'></img>
                            </Link>
                            <div className='upthediv'>
                              <h4>{item.name}</h4>
                              <h5 className='price'>{formatPrice(item.Price)}</h5>
                              <p className='Description'>{truncateText(item.Description, 100)}</p>
                              <Link className='btn' style={{ textDecoration: 'none', padding: '10px', fontWeight: '700' }}>
                                Amount: {item.amount}
                              </Link>
                               <div className='StatusButtonDiv show-on-mobile'>
                            <button className='StatusButtonMobile' >Order Status</button>
                            <button className='StatusButtonMobile' onClick={() => delhivery(orderIndex)}>Delivery</button>
                            <button className='StatusButtonMobile'>Return</button>
                            <button className='StatusButtonMobile'>Cancel Order</button>
                            </div>
                            </div>
                               <div className='StatusButtonDiv hide-on-mobile'>
                               <button className='StatusButton' >Order Status</button>
                               <button className='StatusButton' onClick={() => delhivery(orderIndex)}>Delivery</button>
                               <button className='StatusButton'>Return</button>
                               <button className='StatusButton'>Cancel Order</button>
                               </div>
                              
                          </article>
                          
                        </Wrapper>
                      ))}
                    </ul>
                  </div>
                ))
              
              }
            
          </div>
          </div>
          <Footer />
          {isModalOpen && selectedOrderIndex !== null && (
            <Modal>
                <ModalContent>
                <button className='close-btn DelhiveryButton' type='button' onClick={() => setModalOpen(false)}  style={{}}>
                      <FaTimes size={19}/>
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}} className='ModelContentDiv'>

                    <div style={{marginLeft:'-6vw'}}>
                      <h2>Delivery Status</h2>
                    </div>

                    <div>
                      {/* <p>Waybill: {orderItems[selectedOrderIndex].waybill}</p> */}
                      <TrackingDiagram status={mockStatus} />
                    </div>

                  </div>
                </ModalContent>
              </Modal>
            )}
        </div>
      )
    }
  
}
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  display:flex;
  // background:red;
  // color:white;
  padding: 20px;
  width:50vw;
  height:70vh;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  
  .ModelContentDiv{
    column-gap: 160px;
  }

  .DelhiveryButton{
    background:transparent;
    border:none;
    position: relative;
    // top:-34vh;
    // left:30vw;
    align-self:flex-start;
    top:-1.5%;
    left:86%;
    cursor: pointer;
  }
  
  @media(max-width: 992px){
    width:78vw;
    height:30vh;
    .ModelContentDiv{
      column-gap: 20px;
    }
    .DelhiveryButton{
      top:-35vh;
      left:46vw;
    }
    .DelhiveryButton{
      align-self:flex-start;
      top:-3.9%;
      left:96%;
      cursor: pointer;
    }
  }
`;
const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  border: 1px solid darkgrey;
  border-radius:1rem;
  padding:10px;
  padding-top:10px;
  margin-bottom:20px;
  .container{
    display:flex;
    height:200px;
    align-items: flex-start;
    // margin-left: -50px;
    // justify-content: flex-end;
    
  }
  .StatusButtonDiv{
    display:grid; 
    gap:10px;
  }
  .show-on-mobile {
    display: block;
  }
  .StatusButton{
    // display:grid;
    padding-left:70px;
    padding-right:70px;
    padding-bottom:10px;
    padding-top:10px;
    align-self: flex-start;
    border-Radius:0.25rem;
    background:white;
    color:black;
    border:solid 2px gray;
  }
  .description{
    display:block;
  }
  
  .hide-on-mobile {
    display: none;
  }
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    object-position: center top;
    transition: all 0.3s linear;
  }
 
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: #A5A58D;
    margin-bottom: 0.75rem;
  }
  .articl{
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
    background:white;
    color:black;

  }
  .btn:hover{
  }
  .show-on-mobile {
    display: none !important; /* Hide on larger screens */
  }
  .hide-on-mobile {
    display: grid !important; /* Show on larger screens */
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
    .price{
      // border:1px solid black;
    }
    .upthediv{
        position:relative;
        top:-20px;
    }
   
  }
  @media (max-width: 992px) {
    padding-top:30px;
    .Description {
      display: none; /* Hide the description for mobile screens */
    }
  

    .container{
      display:flex;
      height:200px;
      margin-left:-50px;
      padding-left:0px;
      
    }
    .StatusButton{
      padding-left:0px;
      padding-right:0px;
      padding-bottom:0px;
      padding-top:0px;
      align-self:start
    }
    .StatusButtonDiv{
      display:grid; 
      gap:5px;
    }
  
  .show-on-mobile {
    display: grid !important; 
    // background:red;
    margin-bottom:14px;
    border-top:solid 1px black;
    background:#A5A58D;
  }
  .StatusButtonMobile{
    border:none;
    color:black;
    border-bottom:solid 1px black;
    font-family: 'Montserrat';
    font-weight:600;
    padding:3px;
    // background:rgba(10, 10, 10, 0.1)
    background:none;
  }
  .hide-on-mobile {
    display: none !important; /* Show on larger screens */
  }
  }
  @media (max-width: 992px) {
    .fasearch{
        opacity:1;
        zIndex:1;
        position:relative;
        top:-13.8x  vh;
        left:37vw
      }
      .container.hide-on-mobile{
        display:none
      }
      .container.show-on-mobile{
        display:flex;
        flex-direction:column;
      }
      .container{
        display:flex;
        // border: 1px solid red;
        align-items:center;
          .img{
            width:auto;
            margin-right:15px;
          }
      }
      h4 {
        margin-bottom: 0.1rem;
        // border:1px solid black;
        position:relative;
        top:-8px;
      }

      .price {
        color: #A5A58D;
        margin-top:0rem;
        margin-bottom: 0.2rem;
      }

      .articl{
      }
      p {
        max-width: 45em;
        margin-bottom: 1rem;
      }
      .btn {
        font-size: 0.5rem;
        padding: 0.25rem 0.5rem;
        margin-bottom:0.5rem;
        background:white;
        color:black;
    
      }
  }
`

export default OrderHistory
