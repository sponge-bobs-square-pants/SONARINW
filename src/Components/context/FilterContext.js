import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/Filter_Reducer'
import { products_url} from '../component/utils/constants'
import { debounce } from 'lodash';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
  PAGE_FILTER,
  UPDATE_TOTAL_ITEMS,
  UPDATE_TOTAL_PAGES,
  UPDATE_PAGE,
  RESET_PAGE
} from '../actions'
import { useSidebarContext } from './SidebarContext'
import axios from 'axios'

const initialState = {
  filtered_products:[],
  all_products:[],
  grid_view:true,
  sort:'Price',
  page:1,
  limit:9,
  totalItems:0,
  totalPages:0,
  filters:{
    ProductName:'',
    Company:'all',
    Category:'',
    Color:'all',
    min_price:0,
    max_price:0,
    Price:0,
    shipping:false,
    Size:{}
  },
  
}


const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
    const {products} = useSidebarContext();
   
    const [state, dispatch] = useReducer(reducer, initialState);
    const loadProducts = async () => {
      const {sort,page,limit} = state;
      const {ProductName, Category} = filters;
      const totalItems = products.length;
      const totalPages = Math.ceil(totalItems / state.limit);
      let page1 = 1;
      dispatch({ type: LOAD_PRODUCTS, payload: products });
      // console.log(totalItems, totalPages, sort, page, limit)
      // console.log('send');
      // const url = `${products_url}?sort=${sort}&page=${page}&limit=${limit}`;
      const url = `${products_url}?sort=${sort}&page=${page}&limit=${limit}&ProductName=${ProductName}&Category=${Category}`;
     
      try {
        // console.log('sent1');
        
        const response = await axios.get(url);
        
        if (response.status === 200) {
          // console.log('sent2');
          const { data: products} = response.data;
          
          dispatch({ type: SORT_PRODUCTS, payload: products });
          dispatch({type:UPDATE_PAGE, payload:page1})
          dispatch({ type: UPDATE_TOTAL_ITEMS, payload: totalItems });
          dispatch({ type: UPDATE_TOTAL_PAGES, payload: totalPages });
          dispatch({ type: UPDATE_SORT, payload: sort });
          // dispatch({type:UPDATE_PAGE, payload:page1})
          // dispatch({ type: LOAD_PRODUCTS, payload: products });
          // dispatch({type:CLEAR_FILTERS})
          // dispatch({ type: SORT_PRODUCTS, payload: products });
        }
        else {
          throw new Error('Network response was not ok');
        }

       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      

    };
    useEffect(() => {
      loadProducts();
      // eslint-disable-next-line
    }, [products, state.limit]);
    
    const {filters} = state;
   
    useEffect(() => { 
      const loadFilteredProducts = async () => {
        const {sort,page,limit, filters} = state;
        const {ProductName, Category} = filters;
        dispatch({ type: LOAD_PRODUCTS, payload: products });
        let page1 = 1;
        const url = `${products_url}?sort=${sort}&page=${page}&limit=${limit}&ProductName=${ProductName}&Category=${Category}`;

        try {
          const response = await axios.get(url);
          // console.log(response);
          if (response.status === 200) {
            // console.log('i ran');
            const { data: products} = response.data;
            dispatch({ type: SORT_PRODUCTS, payload: products });
            dispatch({type:UPDATE_PAGE, payload:page1})
            dispatch({ type: UPDATE_SORT, payload: sort });
          }
          else {
            throw new Error('Network response was not ok');
          }

         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        

      };
  
      loadFilteredProducts();
      // eslint-disable-next-line
    }, [filters.Category, filters.ProductName]);
   
    useEffect(() => {
      const Pagination = async () => {
        const {sort,page,limit, filters} = state;
        const {ProductName, Category} = filters;
        let page1 = 1;
        // console.log(Category);
        if(Category === 'all'){
          // console.log(Category);
          // dispatch({type:'PRODUCT_NAME', payload:})
          const val = ''
          const Cat = 'Category'
          dispatch({type:'PRODUCT_NAME', payload:{Cat,val}});
          // console.log(val);
          const {all_products} = state
          // console.log(all_products,'Pagination for all');
          dispatch({ type: LOAD_PRODUCTS, payload: all_products });
          const totalItems = products.length;
          const totalPages = Math.ceil(totalItems / state.limit);
          const url = `${products_url}?sort=${sort}&page=${page}&limit=${limit}`;
          try {
            const response = await axios.get(url);
          if (response.status === 200) {
            const { data: products} = response.data;
            dispatch({ type: SORT_PRODUCTS, payload: products });
            dispatch({type:UPDATE_PAGE, payload:page1})
            dispatch({ type: UPDATE_TOTAL_ITEMS, payload: totalItems });
            dispatch({ type: UPDATE_TOTAL_PAGES, payload: totalPages });
            dispatch({ type: UPDATE_SORT, payload: sort });
          }else {
            throw new Error('Network response was not ok');
          }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
         

          // dispatch({type:UPDATE_PAGE, payload:page1})
          // dispatch({ type: UPDATE_TOTAL_ITEMS, payload: calc });
          // dispatch({ type: UPDATE_TOTAL_PAGES, payload: totalPages });
          // dispatch({ type: UPDATE_SORT, payload: value });
          // dispatch({ type: SORT_PRODUCTS, payload: products });
          // dispatch({ type: PAGE_FILTER, payload: calc });

        
      }else{
        dispatch({type:UPDATE_PAGE, payload:page1})
      
        const url = `${products_url}?&ProductName=${ProductName || ''}&Category=${Category}`;
        try {
          const response = await axios.get(url);
          if(response.status === 200){
            const { data: products} = response.data;
            // console.log(products, 'I ran baby');
            
            const totalItems = products.length;
        const totalPages = Math.ceil(totalItems / state.limit);
            dispatch({ type: UPDATE_TOTAL_ITEMS, payload: totalItems });
            dispatch({ type: UPDATE_TOTAL_PAGES, payload: totalPages });
            
            
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
        
      }
      Pagination()
      // eslint-disable-next-line
    },[filters.Category, filters.ProductName])

    const setGridView = () => {
        dispatch({type:SET_GRIDVIEW});
    }
    
    const setListView = () => {
        dispatch({type:SET_LISTVIEW});
    }

  // const startIndex = (state.page - 1) * state.limit;
  // const endIndex = startIndex + state.limit;
  // const displayedProducts = state.filtered_products.slice(startIndex, endIndex);
  
    const updatePage = async (e) => {
      const {sort} = state;
      const {filters}= state;
      const {ProductName, Category} = filters
      // console.log(Category);
      const page = e.target.dataset.page
      let page1 = Number(page)
      const limit = state.limit
      
      dispatch({ type: SORT_PRODUCTS, payload: products });
      dispatch({type:UPDATE_PAGE, payload:page1})
      
      
      const url = `${products_url}?&sort=${sort}&page=${page}&limit=${limit}&ProductName=${ProductName || ''}&Category=${Category || ''}`;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const { data: products} = response.data;
            dispatch({ type: SORT_PRODUCTS, payload: products });
        }
        else {
            throw new Error('Network response was not ok');
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      // console.log(state.page);
    }
  // }

    const updateSort = async (e) => {
        // const name = e.target.name;
        const value = e.target.value;
        // let page = e.target.dataset.page;
        const {all_products, filters, limit, page}= state;
        const {ProductName, Category}= filters
        const url = `${products_url}?sort=${value}&page=${page}&limit=${limit}&ProductName=${ProductName || ''}&Category=${Category || ''}
        `;
        try {
          const response = await axios.get(url);
          // console.log(response);
          if (response.status === 200) {
            const { data: products} = response.data;
            
            let calc = all_products.length
            // const totalItems = all_products.length;
            let totalPages = Math.ceil(calc / limit);
            
            // console.log(all_products.all_products.length)
            // dispatch({type:'PRODUCT_NAME', payload:value})
            dispatch({ type: UPDATE_TOTAL_ITEMS, payload: calc });
            dispatch({ type: UPDATE_TOTAL_PAGES, payload: totalPages });
            dispatch({ type: UPDATE_SORT, payload: value });
            dispatch({ type: SORT_PRODUCTS, payload: products });
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }}

    const updateFilters = async (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let value1 = ''
      const debounceUpdate = debounce(async() => {
        let value = e.target.value;
        value1 = value;
      }, 100);
      
      
      if(name === 'Category'){
        //here
        value = e.target.textContent
        const {filters, sort, page, limit} = state
        const {Category, ProductName} = filters
        dispatch({type:'PRODUCT_NAME', payload:{name,value}});
        
        // console.log(Category,ProductName);
        const url = `${products_url}?page=${page}&limit=${limit}&sort=${sort}&Category=${Category}&ProductName=
        ${ProductName}`;
        // const url1 = `${products_url}?&ProductName=${ProductName || ''}&Category=${value}`;
        try {
          const response = await axios.get(url)
          // const response1 = await axios.get(url1);
          // console.log(response1);
          if (response.status === 200) {

            const { data: products} = response.data;
            // const {data:products1} = response1.data;
            // console.log(products1.length);
            // dispatch({type:'PAGE_RELOAD', payload:[page, sort, products]})
           dispatch({type:UPDATE_PAGE, payload:page})
           dispatch({ type: RESET_PAGE });
           dispatch({ type: UPDATE_SORT, payload: sort });
          //  dispatch({type:UPDATE_FILTERS, payload:{name, value}});
           dispatch({type:FILTER_PRODUCTS, payload:products}) 
            //  dispatch({ type: SORT_PRODUCTS, payload: products });
           
          //  dispatch({type:UPDATE_PAGE, payload:page})
            // console.log(products);
          }
          else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          
        }
        // console.log(filters,Category, ProductName);
        
        // console.log(Category, ProductName);

      }
      if(name === 'ProductName'){
        debounceUpdate();
        const {sort, page, limit, filters} =state;
        const {Category}= filters;
        // console.log(Category, 'ProductName');
        // dispatch({type:'PRODUCT_NAME', payload:{name,value}})
        dispatch({type:UPDATE_FILTERS, payload:{name, value1}});
        // console.log(Category);
        const url = `${products_url}?page=${page}&limit=${limit}&sort=${sort}&Category=${Category || ''}&ProductName=${value}`;
        const url1 = `${products_url}?&ProductName=${value}`;
        try {
          const response = await axios.get(url);
          const response1 = await axios.get(url1);
          // console.log(response, response1);
        if (response.status === 200) {
          const { data: products} = response.data;
          const {data:products1} = response1.data;
          let totalItems = products1.length;
          const totalPages = Math.ceil(totalItems / limit);
          // dispatch({ type: UPDATE_TOTAL_ITEMS, payload: totalItems });
          // dispatch({ type: UPDATE_TOTAL_PAGES, payload: totalPages });
          // dispatch({type:UPDATE_PAGE, payload:page})
          // dispatch({ type: RESET_PAGE });
          // dispatch({ type: UPDATE_SORT, payload: sort });
          // dispatch({ type: SORT_PRODUCTS, payload: products });
          // dispatch({type:'PRODUCT_NAME', payload:{name,value}})
          // dispatch({type:UPDATE_FILTERS, payload:{name, value}});
          // dispatch({type:FILTER_PRODUCTS, payload:products})   
        }
        else {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        
      }
      dispatch({type:UPDATE_FILTERS, payload:{name, value}});
    }

    const clearFilters = async () => {
      // console.log('Clearing Filters');
          dispatch({ type: LOAD_PRODUCTS, payload: products });
          // const totalItems = products.length;
          // const totalPages = Math.ceil(totalItems / state.limit);
          let page1 = 1;
          dispatch({type:CLEAR_FILTERS})
          // const {ProductName, Category} = filters;
          // const {sort,page,limit, filters} = state;
          dispatch({type:UPDATE_PAGE, payload:page1})
          loadProducts();
          // console.log(totalItems, totalPages)
          // const url = `${products_url}?sort=${sort}&page=${page}&limit=${limit}`;
          // try {
          //   const response = await axios.get(url);
          //   if (response.status === 200) {
          //     const { data: products,nbHits} = response.data;
          //     // console.log(sort, page, products);
          //     dispatch({type:UPDATE_PAGE, payload:page1})
          //     // console.log(sort, page, products);
          //   }
          //   else {
          //     throw new Error('Network response was not ok');
          //   }
  
           
          // } catch (error) {
          //   console.error('Error fetching data:', error);
          // }
      // dispatch({type:CLEAR_FILTERS})


    }
  

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort, updateFilters, clearFilters, dispatch, updatePage }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}