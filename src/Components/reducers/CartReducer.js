import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
  } from '../actions'
//   import { formatPrice } from '../component/utils/helpers';
  
  const CartReducer = (state, action) => {
    
    if(action.type === ADD_TO_CART){
        const {_id, amount, Products1, size, Description} = action.payload;
        // console.log(state.cart);
        const tempItem = state.cart.find((i) => i.id === _id + size)
        // console.log(_id + size);
        if(tempItem){
            const tempCart = state.cart.map((cartItem) => {
                if(cartItem.id === _id + size){
                    // console.log(_id + size);
                    let newAmount = cartItem.amount + amount;
                    if(newAmount > cartItem.Max){
                        newAmount = cartItem.Max
                    }
                    return {...cartItem, amount:newAmount}
                }else{
                    return cartItem
                }
            })
            return {...state, cart:tempCart}
        }
        else{
            let Price1 = Products1.Price * 9 / 10
            // console.log(Price);
            // console.log(Products1.Size[size]);
            const newItem = {
                id:_id + size,
                name:Products1.ProductName,
                amount:amount,
                image:Products1.Image,
                Price:Price1,
                Max:Products1.Size[size],
                size:size,
                Description:Description,
            };
            return{...state, cart:[...state.cart, newItem]}
            
        }
        
        // return {...state}
    }
    if(action.type === REMOVE_CART_ITEM){
        const tempCart = state.cart.filter((item) => item.id !== action.payload)
        return{...state, cart:tempCart}
    }
    if(action.type === CLEAR_CART){
        return{...state, cart:[]}
    }
    if(action.type === TOGGLE_CART_ITEM_AMOUNT){
        const {id, value} = action.payload;
        const tempCart = state.cart.map((item) => {
            if(item.id === id){
                if(value === 'inc'){
                    let newAmount = item.amount + 1
                    if(newAmount > item.Max){
                        newAmount = item.Max
                    }
                    return{...item, amount:newAmount}
                }
                if(value === 'dec'){
                    let newAmount= item.amount - 1
                    if(newAmount < 1){
                        newAmount = 1
                    }
                    return{...item, amount:newAmount}
                }
                
            }
            return item
        })

        return{...state, cart:tempCart}
    }
    if(action.type === COUNT_CART_TOTALS){
        const {total_items, total_amount} = state.cart.reduce((total, item) => {
            const {amount, Price} = item
            // console.log(Price,'count cart total');
            total.total_items += amount
            total.total_amount += Price * amount
            return total
        },{
            total_items:0,
            total_amount:0,
        })
        return{...state, total_amount, total_items}
    }
    throw new Error(`No matching ${action.type} - action type`)
  }
  
  export default CartReducer