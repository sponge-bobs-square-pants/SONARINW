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
  
  const Sidebar_reducer = (state, action) => {
    if (action.type === SIDEBAR_OPEN){
        return{...state, isSidebarOpen: true}
    }
    if (action.type === SIDEBAR_CLOSE){
        return{...state, isSidebarOpen: false}
    }
    if (action.type === GET_PRODUCTS_BEGIN) {
      return{...state, products_Loading: true}
    }
    if(action.type === GET_PRODUCTS_SUCCESS){
      // const featured_products = action.payload.filter((product) => product.Featured === true)
      // const featured_products = action.payload;
      return{...state, products_Loading: false, products:action.payload }
    }
    if(action.type === GET_PRODUCTS_ERROR){
      return{...state, products_Loading:false, products_error:true}
    }
    if(action.type === GET_SINGLE_PRODUCT_BEGIN){
      return{...state, single_product_loading:true, single_product_error:false}
    }
    if(action.type === GET_SINGLE_PRODUCT_SUCCESS){
      return {...state, single_product_loading:false, single_product:action.payload}
    }
    if(action.type === GET_SINGLE_PRODUCT_ERROR){
      return {...state, single_product_loading:false, single_product_error:true}
    }

    if (action.type === GET_FEATURED_PRODUCT_BEGIN) {
      return{...state, products_Loading: true}
    }
    if(action.type === GET_FEATURED_PRODUCT_SUCCESS){
      return{...state, products_Loading: false, featured_products:action.payload }
    }
    if(action.type === GET_FEATURED_PRODUCT_ERROR){
      return{...state, products_Loading:false, products_error:true}
    }


    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default Sidebar_reducer
  