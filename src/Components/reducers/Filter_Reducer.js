import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
    PAGE_FILTER,
    UPDATE_TOTAL_ITEMS,
    UPDATE_TOTAL_PAGES,
    UPDATE_PAGE,
    RESET_PAGE,
  } from '../actions'
  
const Filter_Reducer = (state, action) => {
    
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.Price)
    maxPrice = Math.max(...maxPrice);
    // console.log(maxPrice);
    return {
      ...state, 
      all_products:[...action.payload], 
      filtered_products: [...action.payload],
      filters:{...state.filters, max_price:maxPrice, Price:maxPrice}}
  }
  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view:true}
  }
  if(action.type === SET_LISTVIEW){
    return {...state, grid_view:false}
  }
  if(action.type === UPDATE_SORT){
    return{...state, sort: action.payload}; 
  }
  if(action.type === SORT_PRODUCTS){
    // console.log('Sorting');
    return {...state, filtered_products:action.payload}
  }
  if(action.type === UPDATE_FILTERS){
    const {name, value} = action.payload
    // console.log(name, value);
    return{...state, filters:{...state.filters, [name]:value}}
  }
  if(action.type === UPDATE_TOTAL_ITEMS){
    // console.log(action.payload);
    return{...state, totalItems:action.payload}
  }

  if(action.type === UPDATE_TOTAL_PAGES){
    return{...state, totalPages:action.payload}
  }
  if(action.type === UPDATE_PAGE){
    return{...state, page:action.payload}
  }
  if (action.type === PAGE_FILTER){
    const {filtered_products} = state;
     return{...state, filtered_products}
  }
  if(action.type === RESET_PAGE){
    return { ...state, page: 1 };
  }
  if(action.type === 'PAGE_RELOAD'){
    const {page, sort, product} = action.payload
    return{...state, page:page, sort:sort, filtered_products:product}
  }
  if(action.type === 'PRODUCT_NAME'){
    // const {ProductName} = state;
    const {name, value} = action.payload;
    // const {filters} =state;
    // console.log(filters);
    return{...state, filters:{...state.filters,[name]:value}}
  }
  if(action.type === "CATEGORY_NAME"){
    const {name, value} = action.payload;
    // const {filters} =state;
    return{...state, filters:{...state.filters,[name]:value}}
  }
  if(action.type === FILTER_PRODUCTS){
    

    // const {all_products} = state;
    // let temp_products = [...all_products]
    return{...state, filtered_products:action.payload}
  }
  if(action.type === CLEAR_FILTERS){
    return{...state, filters:{
      ...state.filters,
      ProductName:'',
      Company:'all',
      Category:'',
      Color:'all',
      Price:state.filters.max_price,
      shipping:false,
    },sort:'Price'}
  }
  throw new Error(`No Matching "${action.type}" - action type`);
}

export default Filter_Reducer