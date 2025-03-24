import{test,expect} from '@playwright/test'

test('taking screenshot test', async({page})=>{

    await page.goto('https://demo.applitools.com/');
    await page.waitForLoadState('networkidle');

    await page.screenshot({path: 'screenshots/login.png', fullPage:true});
    await page.fill('#username','testuser');
    await page.fill('#password','testpassword');

    await page.click('#log-in');

    await page.waitForLoadState('networkidle');

})

test.skip('taking comparison test', async({page})=>{

    await page.goto('https://demo.applitools.com/');
    await page.waitForLoadState('networkidle');


    //await page.screenshot({path: 'screenshots/login.png', fullPage:true}); -- to take screenshot
    await page.fill('#username','testuser');
    await page.fill('#password','testpassword');

    //expect to compare the screenshots
    await expect(page).toHaveScreenshot({path: 'screenshots/login.png'},{fullPage: true});

    await page.click('#log-in');

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot({path: 'screenshots/dashboard.png'}, {fullPage: true});

})

test.skip('visual comparison with custom inputs', async({page})=>{

    await page.goto('https://demo.playwright.dev/todomvc/')
    await page.getByPlaceholder('What needs to be done?').fill('buy groceries');
    await page.keyboard.press('Enter');
    await page.getByPlaceholder('What needs to be done').fill('write tests');
    await page.keyboard.press('Enter');

    //compare with custome threshold 

    await expect(page).toHaveScreenshot('to-do-app-with-items.png',{
        threshold: 0.2,
        maxDiffPixelRatio:0.3
    });

})

// example with masking the dynamic content on screen

test.skip('visual comparison with masked areas', async({page}) =>{

   await page.goto('https://demo.playwright.dev/todomvc/');

   await page.getByPlaceholder('what needs to be done').fill('this will be masked');
   await page.keyboard.press('Enter');

   //compare with masked areas

   await expect(page).toHaveScreenshot('todo-app-masked.png',{
   //syntax for mask content
   mask:[

     //mask the todo item text which might change

     page.locator('.todo-list li label')
   ]

})

})

test.skip('screenshot comparison with multiple masks', async({page})=>{

    await page.goto('https://demo.playwright.dev/todomvc/');

    await page.getByPlaceholder('what needs to be done').fill('task 1');
    await page.keyboard.press('Enter');
    await page.getByPlaceholder('what needs to be done').fill('task 2');
    await page.keyboard.press('Enter');

    //comparison when multiple areas are masked

    await expect(page).toHaveScreenshot('todo-app-multiple-masked.png',{

        mask:[
            //mask all todo items
            page.locator('.todo-list li label'),
            //mask counter in footer
            page.locator('.todo-count')
        ]
    });
})

//exmaple with specific element screenshot
test.skip('specific element screenshot', async({page})=>{
    
    await page.goto('https://demo.playwright.dev/todomvc/');

    //add an item in todo
    await page.getByPlaceholder('what needs to be done').fill('Test Element Screenshot');
    await page.keyboard.press('Enter');

    const toDoList = page.locator('.todo-list');
    await expect(page).toHaveScreenshot('todo-list-only.png')

    //select footer for comparison

    const footer= page.locator('.footer');
    await expect(footer).toHaveScreenshot('todo-app-footer.png');

});


