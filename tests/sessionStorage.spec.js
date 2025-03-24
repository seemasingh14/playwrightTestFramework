const{test,expect} = require ('@playwright/test');
let webContext;

//beforall is used to run a set of code before any other tests on the page

test.beforeAll(async({browser}) =>{
     
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("playwrighttestuser1@gmail.com");
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    //to store the storage state in a file state.json.we can give any location for it to be stored. not recommended as it could be security issue.
   // await context.storageState({ path:'state.json' });
    
    // store the stoarge state in object in browser and not in a file
    webContext = await context.storageState();

    page.close();
})

test('Network Intercepting', async({browser}) =>{

   // const context = await browser.newContext({storageState: 'state.json'}); //storage state provided with the file name
    
   const context = await browser.newContext({storageState : webContext});
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    const products = page.locator(".card-body"); //locator to list the products
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    await page.pause();



})