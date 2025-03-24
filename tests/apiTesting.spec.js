import {test,expect,request} from '@playwright/test'

test('API Testing 1', async({browser})=>{

    const apiContext = await request.newContext();

    const loginPayload = {userEmail: "playwrighttestuser1@gmail.com",userPassword:"Test@123"};

    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{

        data: loginPayload
    })

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson= await loginResponse.json();
    console.log(loginResponseJson);
    const token = loginResponseJson.token;
    console.log(token);

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.addInitScript(value =>{

        window.localStorage.setItem('token',value);
    },token);

    await page.goto("https://rahulshettyacademy.com/client");

    expect(await page.locator('button[routerlink="/dashboard/"]').textContent()).toContain("HOME");

});

test.only('API Automation -2 ', async({browser})=>{

    //logging into the application using API calls
    const apiContext = await request.newContext();
    const loginPayload = await {userEmail: "playwrighttestuser1@gmail.com", userPassword:"Test@123"};
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{

        data:loginPayload
    })

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    const token = loginResponseJson.token;
    console.log(token);

    //after logging in creating an order using API calls

    const orderPayload = {orders:[{country: "United Kingdom", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {                
         data: orderPayload,
         headers:{

            'Authorization':token,
            'Content-Type': 'application/json'
         },

    })

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = await orderResponseJson.orders[0];
    console.log(orderId);



})




