import {test,expect} from '@playwright/test'

test('demo UI components', async({page})=>{

    await page.goto('https://testpages.eviltester.com/styled/reference/input.html');

    //checkbox
    await page.getByLabel('Checkbox').check();

    expect (page.getByLabel('Checkbox')).toBeChecked();

    //radio buttons
    await page.getByLabel('Radio 1').click();
    expect(page.getByLabel('Radio 1')).toBeChecked();

})


test('demo UI-dropdown', async({page})=>{

    await page.goto('https://testpages.eviltester.com/styled/validation/input-validation.html');

    await page.locator('#country').selectOption('India');

})