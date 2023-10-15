import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/sidebar_reducer'
import { products_url as url } from '../component/utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_FEATURED_PRODUCT_BEGIN,
  GET_FEATURED_PRODUCT_SUCCESS,
  GET_FEATURED_PRODUCT_ERROR
} from '../actions'
// import { type } from '@testing-library/user-event/dist/type'

const initialState = {
    isSidebarOpen: false,
    products_Loading: false,
    products_error: false,
    products:[],
    featured_products:[],
    single_product_loading:false,
    single_product_error:false,
    single_product:{},

}

const SidebarContext = React.createContext()

export const SidebarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const openSidebar = () => {
        dispatch({type: SIDEBAR_OPEN})
    }
    const closeSidebar = () => {
        dispatch({type: SIDEBAR_CLOSE})
    }
    const fetchProducts = async(url) => {
      dispatch({type: GET_PRODUCTS_BEGIN})
      try {
        const response = await axios.get(url)
        const {data:products} = response.data
        dispatch({type:GET_PRODUCTS_SUCCESS, payload:products})
      } catch (error) {
        dispatch({type: GET_PRODUCTS_ERROR})
      }
    }
    useEffect(() => {
      fetchProducts(url)
    },[])

    const FeaturedProducts = async (url) => {
      dispatch({type:GET_FEATURED_PRODUCT_BEGIN})
      try {
        const response = await axios.get(`${url}?Featured=true`);
        const {data:products} = response.data;
        // console.log(products);
        dispatch({type:GET_FEATURED_PRODUCT_SUCCESS, payload:products})
      } catch (error) {
        dispatch({type: GET_FEATURED_PRODUCT_ERROR})
      }
    }
    

    const SingleProduct = async (url) => {
      dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
      try {
        const response = await axios.get(url);
        // console.log(response)
        const {data:product} = response.data;
        // console.log("API Response:", product); 
        dispatch({type:GET_SINGLE_PRODUCT_SUCCESS, payload:product})
        // console.log("Redux State:", state);
      } catch (error) {
        dispatch({type:GET_SINGLE_PRODUCT_ERROR})
      }
    }
    // const changeSize = () => {

    // }
    useEffect(() => {
      FeaturedProducts(url)
    },[])
  return (
    <SidebarContext.Provider value={{...state,openSidebar, closeSidebar, SingleProduct}}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  return useContext(SidebarContext)
}
