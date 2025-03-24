import{test,expect} from '@playwright/test'

test.skip('assertions', async({page})=>{

    await page.goto('https://testpages.eviltester.com/styled/reference/input.html');


    await expect(page.getByRole('button',{name:'Toggle Event Info Display'})).toBeVisible();

    await expect(page).toHaveTitle('Input Elements - HTML Testing Reference');

    await expect(page.getByLabel('Checkbox')).toBeVisible();

    //soft assertion using incorrect paramater which still takes the execution flow to next piece of code

    await expect.soft(page.getByLabel('Checkbox')).toBeChecked();

    await expect(page.getByLabel('Checkbox')).not.toBeChecked();

    await expect(page.locator('h1')).toHaveText('Input Elements - HTML Testing Reference');
})

test('Capture Events', async({page})=>{

    page.on('load',()=>{

        console.log('page loaded')
    });

    page.on('domcontentloaded',()=>{

        console.log('DOM is ready')
   });

   page.on('request', req =>{

    console.log('Request: ${req.url()}-Method:${req.method()}')
   });

   page.on('response',res=>{

    console.log('Response: ${res.url()} - Method: ${res.method()}')
   })

   await page.goto('https://demoqa.com/browser-windows')
})