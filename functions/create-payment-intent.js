const { default: axios } = require('axios');
// const { products_url } = require('../src/Components/component/utils/constants');

require('dotenv').config()
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function(event, context){
    // console.log(event);
    console.log(stripe);
    if(event.body){
        const {cart, shipping_fee, total_amount} = JSON.parse(event.body)
        // console.log(cart);
        
        const calculateOrderAmount = async () => {
            // console.log(cart,'This is me');

            try {
                const productsRequest = cart.map((item) => {
                    const adjustedID = item.id.slice(0, -1)
                    // console.log(adjustedID, 'Adjusted ID');
                    return {url: `${process.env.REACT_APP_PRODUCT_URL}/${adjustedID}`, quantity:item.amount}
                })

                const totalAmountPromise = productsRequest.map(async (request) => {
                    const response = await axios.get(request.url)
                    // console.log(response.data.product.Price, 'This is response data');
                    const actual_price = response.data.product.Price * 9 / 10
                    
                    const totalAmount = actual_price * request.quantity
                    return totalAmount
                })
                // const data = response.data
                const totalAmounts = await Promise.all(totalAmountPromise);
                const total_amount = totalAmounts.reduce((acc,amount) => acc + amount, 0)
                // console.log(total_amount);
                return shipping_fee + total_amount
            } catch (error) {
                throw new Error('Failed to fetch total amount from the server: ' + error.message);
            }
            
        }
        try {
            const amount = await calculateOrderAmount();

            const paymentIntent = await stripe.paymentIntents.create({
                amount:amount,
                currency:'inr',
            })
            return{
                statusCode:200,
                body:JSON.stringify({clientSecret: paymentIntent.client_secret, totalAmount:amount})
            }
        } catch (error) {
            return {
                statusCode:500,
                body:JSON.stringify({error:error.message})
            }
        }
        // console.log(cart);
        // return{
        //     statusCode:200,
        //     body: JSON.stringify(cart)
        // }
    }
    return {
        statusCode:200,
        body:'Create Payment Intent'
    }
    
}