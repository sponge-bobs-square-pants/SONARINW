import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import GridView from './GridView'
import ListView from './ListView';
const ProductList = () => {
    const {filtered_products:products, grid_view, totalPages, updatePage} = useFilterContext();
    // console.log(totalPages)
    if(products.length < 1){
        return(
        <h5 style={{textTransform:'none'}}>No, Products Found...</h5>
        )
    }
    if(!grid_view){
        return <ListView products={products} totalPages={totalPages} updatePage={updatePage}/>
    }
    return <GridView products={products} totalPages={totalPages} updatePage={updatePage}>Product List</GridView>
  
}


export default ProductList
