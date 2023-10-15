import React from 'react'

const Pagination = ({products, totalPages, updatePage}) => {
    const buttonNumbers = Array.from({ length: totalPages}, (_, index) => index + 1);
    return (
    <div style={{paddingTop:'5%', display:'flex', justifyContent:'center', marginTop:'5%'}}className='product-container1'>
        {buttonNumbers.map((page, index) => {
          // console.log(page)
          return(<button style={{padding:'0.3%', margin:'2px', 
          background:'#A5A58D', border:'transparent', paddingLeft:'0.8%', paddingRight:'0.8%',
          color:'whitesmoke'}} 
          onClick={updatePage} 
          name='page'
          data-page={page}
          key={index} 
          className='product-container1'>
          {page}</button>)
        })}
      </div>
  )
}

export default Pagination
