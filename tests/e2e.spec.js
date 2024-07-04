// @ts-check
const { test, expect } = require('@playwright/test');

const host = 'https://rahulshettyacademy.com/client';
const email = 'samgreen@qa.com';
const password = 'Qa_Password1';
const expectedProductsTitles = ['ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO'];
const expectedProduct = 'ZARA COAT 3';

test('Purchase one product', async ({ page }) => {
    await page.goto(host);

    //Login page form
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.click('#login');
    await page.waitForLoadState('networkidle');

    //add product to shoping cart

    const products = await page.locator('.card-body');

    const titles = await page.locator('.card-body b').allTextContents();
    let size = await products.count();

    for(let i = 0; i < size; ++i){
        if(await products.nth(i).locator('b').textContent() === expectedProduct) {
            await products.nth(i).locator('text=Add To Cart').click();
            break;
        }
    }

    await page.locator('[routerlink*="cart"]').click(); 

    page.locator('div li').first().waitFor();
    const isElementPresentInCart = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();

    expect(isElementPresentInCart).toBeTruthy();

    await page.locator('text = Checkout').click();

    //ToDo
    //select payment method and fill credit card details
    await page.locator('[placeholder*="Country"]').pressSequentially('ind');
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();

    const numOfButtons = await dropdown.locator('button').count();

    for(let i = 0; i < numOfButtons; i++) {
        if(await dropdown.locator('button').nth(i).textContent() === ' Indonesia') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    //how to take screenshots in playwright
    await page.screenshot({path: 'screenshot.png'});
})


/*

test('Purchase all products', async ({ page }) => {

    const products = await page.locator('.card-body');

    await page.goto(host);

    //Login page form
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill(password);
    await page.click('#login');
    await page.waitForLoadState('networkidle');

    //add product to shoping cart

    
    const titles = await page.locator('.card-body b').allTextContents();
    
   let size = await products.count();

   // Add all products to the shopping cart
   for(let i = 0; i < size; i++) {
    await products.nth(i)
    .locator('button')
    .locator('text=Add To Cart')
    .click();         
    page.waitForLoadState('domcontentloaded');
   }

   
   // click on cart icon

   await page.getByRole('button', {name: 'Cart'}).first().click();
   page.waitForLoadState('domcontentloaded');
   // get all elements in cart

   let cartProducts = await page.locator('.cartSection h3');
   
   await expect(cartProducts).toHaveCount(size,{timeout:5000});

   
   let cartProductsTitles = await cartProducts.allTextContents();


   console.log(cartProductsTitles);
   
   
});

*/
