import {test,expect} from '@playwright/test'

test('demo frames using frame locator',async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    await page.waitForLoadState();
    const middleFrame = page.frameLocator('frame[name ="frame-top"]').frameLocator('frame[name="frame-middle"]');
    console.log(await middleFrame.locator('#content').textContent());

});

test('demo frames using frame',async({page})=>{

  await page.goto('https://the-internet.herokuapp.com/nested_frames');
  await page.waitForLoadState();
  const middleFrame = page.frame({name: "frame-middle"});
  console.log(await middleFrame.locator('#content').textContent());

});

test('demo drag & drop',async({page})=>{

  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  await page.locator('#column-a').dragTo(page.locator('#column-b'));
  console.log(await page.locator('h3').textContent());

});