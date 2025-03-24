import {test,expect} from '@playwright/test';

test.only('demo locators', async ({page}) =>{

    await page.goto('https://demo.applitools.com/');

    await page.getByPlaceholder('Enter your username').fill('testuser'); //placeholder selector
    await page.locator('#password').fill('testpwd'); //CSS selevctor
    await page.getByText('Sign in').click(); //text selector

    //putting a pause for any debug operation check

    await page.pause();

    let expectedText = await page.locator('.element-header').first().textContent();

    expect(expectedText.trim()).toEqual('Financial Overview');

   /* await page.getByRole('button',{name:'Sign in'}).click(); //role selector
    await page.getByLabel('Username').fill('testuser'); //label selector

    //title selector
    await page.getByTitle('login').click();

    //data-testid ='login'

    await page.getByTestId('login').click();

    //has text

    await page.locator('button',{hasText:'Sign in'}).click(); */

});

test('demo wait', async ({page}) =>{

    await page.goto('https://demoblaze.com/');
    await page.locator('#login2').clear();
    await page.locator('#loginusername').fill('playwrightuser1');
    await page.locator('#loginpassword').fill('Test"123');
    await page.getByRole('button').locator('text=Log in').click();
    await page.waitForLoadState('networkidle'); //network wait
    await page.locator('.card-title a').first().waitFor();

    await page.waitForTimeout(2000); //need to be careful with timeout wait

})

test('demo alerts', async({page})=>{
   
    await page.goto('https://testpages.eviltester.com/styled/alerts/alert-test.html');

    page.on('dialog', async dialog=>{

        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('I am an alert box!')
        await dialog.accept();
    })
    await page.click('#alertexamples')

})

test('demo confirm page', async({page})=>{
   
    await page.goto('https://testpages.eviltester.com/styled/alerts/alert-test.html');

    page.on('dialog', async dialog=>{

        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('I am a confirm alert');
        await dialog.accept();
    });
    await page.click('#confirmexample');
   const testResult = await page.textContent('#confirmreturn');
   expect(testResult).toBe('true');

})

test('demo prompt page', async({page})=>{
   
    await page.goto('https://testpages.eviltester.com/styled/alerts/alert-test.html');

    page.on('dialog', async dialog=>{

        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toBe('I prompt you');
        await dialog.accept("Hi Seema!");
    });
    await page.click('#promptexample');
   const testResult = await page.textContent('#promptreturn');
   expect(testResult).toBe('Hi Seema!');

})