import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useSidebarContext } from '../context/SidebarContext'
import { single_product_url as url } from '../component/utils/constants'
import { formatPrice } from '../component/utils/helpers'
import Nav from '../component/Navbar'
import Footer from '../component/Footer'
import Loading from '../component/Loading'
import Error from '../component/Error'
import PageHero from '../component/PageHero'
import Starss from '../component/Starss'
import '../Pages/MainPage.css'
// import img1 from '../assets/photo3.jpg'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
// import { MdDescription } from 'react-icons/md'
// import ProductImage from '../component/ProductImage'
import AddToCart from '../component/AddToCart'

const SingleProductPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {single_product_loading:loading, single_product_error:error,single_product:Product = [], SingleProduct} = useSidebarContext();
  useEffect(() => {
    SingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  },[id]);

  useEffect(()=> {
    if(error){
      setTimeout(() => {
        navigate('/products');
      },3000);
    }
    // eslint-disable-next-line
  },[error]);

  if(loading){
    // {console.log(Product)}
    return <Loading />
    
  }
  if(error){
    // {console.log(Product)}
    return <Error />
  }
    if (!Product || !Array.isArray(Product) || Product.length === 0) {
      return <Loading />; 
    }
    const { ProductName, Price, Description,_id:sku, Company, Image, Stock, Stars, Reviews } = Product[0];
    // console.log(Product[0]);
  return (<Wrapper> 
    
    <Nav />
    <PageHero title={ProductName} product />
    <div className='section section-center page' >
      {/* <Link to='/products' className='btn btnmy-style' >Back to Products</Link> */}
      <div className='product-center'>
        <img src={Image} className='image-styles' alt='Single Product'></img>
        <section className='content'>
          <h2 style={{paddingBottom:'0px'}}>{ProductName}</h2>
          <Starss Stars={Stars} Reviews={Reviews}/>
         
          <div style={{margin:' 30px 0px'}}>
          <h6 className='price' style={{textDecoration:'line-through', fontWeight:'normal'}}>{formatPrice(Price)}</h6>
          <p className='price' style={{backgroundColor:'#FF6347', 
          color:'white', padding:'5px 10px', borderRadius:'0.25rem',
          fontWeight:'bold', fontSize:'0.8rem'}}>10% off</p> 
          <h5 className='price' style={{}}>{formatPrice(Price * 9 /10)}</h5>
          </div>
    
          <p className='desc'>{Description}</p>
          <p className='info'>
            <span>AVAILABLE : </span>
            {Stock > 0 ? 'In Stock': 'Out of Stock'}
          </p>
          <p className='info'>
            <span>SKU : </span>
            {sku}
          </p>
          <p className='info'>
            <span>BRAND : </span>
            {Company}
          </p>
          <hr  className='hr'/>
          {Stock > 0 && <AddToCart Product={Product} />}
        </section>
      </div>
    </div>
    <Footer />
    
  </Wrapper>)
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
    position:relative;
  }
  .hr{
    position:relative;
    top:-45px;
  }
  .content {
    position:relative;
    left:40vw;
    top:-110px
  }
  .image-styles {
    max-Height:70vh; 
    alignSelf:center;
    position:absolute;
    top:-90px;
    border-radius:5%;
    width:100%
    display:block;
  }
  .btnmy-style{
    position:relative;
    top:-90px
  }
  .price {
    color: #A5A58D;
    position:relative;
     top:-30px;
     display:inline;
     margin-right:14px;
    
  }
  .desc {
    line-height: 2;
    // font-size:1rem;
    max-width: 45em;
    position:relative;
    top:-45px;
  }
  .info {
    text-transform: capitalize;
    // font-size:0.9rem;
    position:relative;
    top:-45px;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.15rem;
    } 
  }
  @media (max-width: 992px) {
    .content {
      position:relative;
      top:0px
    }
    .image-styles {
      max-Height:50vh; 
      alignSelf:center;
      position:relative;
      top:0px
    }

    .btnmy-style{
      position:relative;
      top:0px
    }
    .price {
      color: #A5A58D;
      position:relative;
       top:-30px
      
    }
    .content{
      left:0px;
    }

  }
`

export default SingleProductPage
