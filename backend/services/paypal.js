const axios = require('axios')
const { parse } = require('dotenv')

async function generateAccessToken() {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        }
    })
console.log(response.data)
    return response.data.access_token
}
exports.getOrderDetails=async  (orderId) =>{
    const accessToken = await generateAccessToken();

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    });

    return response.data;
}

exports.createOrder = async (price) => {
    const accessToken = await generateAccessToken()
 price=parseInt(price);

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        data: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    items: [
                        {
                            
                                "name": "Book Membership",
                                "description": "Access to premium books",
                                "quantity": 1,
                                "unit_amount": {
                                    "currency_code": "USD",
                                    "value": price
                                }
                            
                            
                        }
                    ],

                    amount: {
                        currency_code: 'USD',
                        value: price,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: price
                            }
                        }
                    }
                }
            ],

            application_context: {
                return_url: process.env.BASE_URL + '/complete-order',
                cancel_url: process.env.BASE_URL + '/cancel-order',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                brand_name: 'book.io'
            }
        })
    })
console.log(response.data)
    return response.data.links.find(link => link.rel === 'approve').href
}

exports.capturePayment = async (orderId) => {
    const accessToken = await generateAccessToken()

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + `/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return response.data
}