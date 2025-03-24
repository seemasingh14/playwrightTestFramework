import {test,expect} from '@playwright/test'

test('demo file upload',async({page})=>{

    await page.goto('https://testpages.eviltester.com/styled/file-upload-test.html')

    await page.setInputFiles('#fileinput', 'upload/testupload.txt');

  //  await page.locator('.styled-click-button').click();

     await page.getByRole('button',{name: 'Upload'}).click()
})