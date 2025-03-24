import {test,expect} from '@playwright/test'

// Handling authentication popups
// Navigating through child windows

test('demo Tab and windows handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route('**/*', (route)=>{
    const url = route.request().url();
    if(url.includes('googlesyndication') || url.includes('recaptcha')){
    route.abort();
    }
    else{
    return route.continue();
    }
    })
    await page.goto('https://demoqa.com/browser-windows', {
    ignoreHTTPSErrors: true
    });

    const [newTab, newWindow] = await Promise.all([
        context.waitForEvent('page'),
        context.waitForEvent('page').then(page => page),
        page.click('#tabButton'),
        page.click('#windowButton')
        ]);
   await newTab.waitForLoadState();
await newWindow.waitForLoadState();
await newTab.bringToFront();
expect(await newTab.locator('#sampleHeading').textContent()).toBe('This is a sample page');
await newWindow.bringToFront();
expect(await newWindow.locator('#sampleHeading').textContent()).toBe('This is a sample page');
newTab.close();
newWindow.close();
})

test.only('event listener', async({page}) =>{

    page.on('load', ()=> {

    console.log('page loaded');
 });

 page.on('dom content loaded', ()=>{

    console.log('dom is ready');
 });

 page.on('request', req=>{
    console.log('Request: ${req.url()} - Method: ${req.method()}')
});

page.on('response', res=>{
    console.log('Response: ${res.url()} - Method: ${res.method()}')
});
    
 await page.goto('https://demoqa.com/browser-windows');

})
        