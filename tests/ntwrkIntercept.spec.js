const {test, expect,request} = require('@playwright/test');

const loginPayload = {userEmail: "playwrighttestuser1@gmail.com", userPassword: "Test@123"};
const orderPayload = {orders:[{country: "United Kingdom", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
const fakePayloadOrder = {data: [], message: "Currently No Orders" };

let token = "";

test.beforeAll(async () =>{

   const apiContext = await request.newContext();
   
     //Login and get the token

   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data: loginPayload
   });

   const loginResponseJson = await loginResponse.json();
   token = loginResponseJson.token;
   console.log('Token: ${token}');

    //Create an order using API calls

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{

        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    });

    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    console.log('Order Id: ${orderId}');

})

test('Networking Intercepting Example-1', async({browser}) =>{

    const context = await browser.newContext();
    const page = await browser.newPage();

    await page.addInitScript(value =>{

        window.localStorage.setItem('token',value);
    },token)

    await page.goto("https://rahulshettyacademy.com/client");

    await page.waitForLoadState('networkidle');

    await page.pause();
    
})

test('Network Intercept- moccking response', async({browser})=>{

    const context = await browser.newContext();
    const page = await browser.newPage();

    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    //mock the body response

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route =>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrder);
            route.fulfill(
                {
                    response,
                    body,

                });
        }
    )



})