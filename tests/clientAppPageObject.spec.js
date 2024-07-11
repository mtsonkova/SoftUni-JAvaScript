// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');

const host = 'https://rahulshettyacademy.com/client';
const email = 'samgreen@qa.com';
const password = 'Qa_Password1';
const expectedProductsTitles = ['ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO'];
const productName = 'ZARA COAT 3';
const text = " Thankyou for the order. "

test('Purchase one product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goToUrl(host);
    await loginPage.validLogin(email, password);


    //add product to shoping cart
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.clickOnCartBtn();


    const cartPage = new CartPage(page);

    const isElementPresentInCart = await cartPage.isProductVisibleInCart(productName);

    await expect(isElementPresentInCart).toBeTruthy();
    


    //Personal info
    let personalInfo = await cartPage.clickCheckoutBtn();

    await personalInfo.locator('.text-validated').fill('5555 5555 5555 5555');

    await personalInfo.locator('select.ddl').first().selectOption('05');
    await personalInfo.locator('select.ddl').last().selectOption('15');

    //CVV CODE
    await personalInfo.locator('[type="text"]').nth(1).fill('123');

    //Name on card
    await personalInfo.locator('[type="text"]').nth(2).fill('Samantha Green');



    //Shipping information
    let userInfo = await page.locator('.user__name');
    let userMail = await userInfo.locator('input').first().inputValue();


    //email
    await expect(userMail).toEqual(email);


    await page.locator('[placeholder*="Country"]').pressSequentially('ind');
    let dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();


    const numOfButtons = await dropdown.locator('button').count();

    for (let i = 0; i < numOfButtons; i++) {
        if (await dropdown.locator('button').nth(i).textContent() === ' Indonesia') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    // click on place order btn
    await page.click('text =Place Order');

    //get h1 text
    let msg = await page.locator('h1').first().textContent();

    await expect(msg).toEqual(text);

    let finalPageTitle = await page.locator('.box').first();
    let orderIdRow = await finalPageTitle.locator('tr').last();
    let orderText = await orderIdRow.locator('td').textContent();
    let orderId = orderText?.split('|').filter(element => element.length > 1).toString().trim();

    //click on orders btn
    let navButtons = await page.locator('button.btn-custom');
    await navButtons.nth(1).click();
    let hasOrderId = false;

    let th = await page.locator('tbody tr th');
    let tr = await page.locator('tbody tr');
    let currentIndex = 0;
    await th.first().waitFor();
    let thCount = await th.count();

    for (let i = 0; i < thCount; i++) {
        let currentOrderId = await th.nth(i).textContent();
        if (currentOrderId === orderId) {
            hasOrderId = true;
            currentIndex = i;
            break;
        }
    }

    await expect(hasOrderId).toBeTruthy();
    // click on view button
    await tr.nth(currentIndex).getByRole('button').first().click();

    //TODO Check if OrderID on this row equals

    let title = await page.locator('div.email-title').textContent();
    await expect(title).toEqual(' order summary ');

    let orderIdOrderSummary = await page.locator('div.col-text').first().textContent();

    await expect(orderIdOrderSummary).toEqual(orderId);



    //click on visible locator with playwright
    //await page.locator('locator-here:visible').click();


    //switch to frame in playwright
    //const framePage = await page.frameLocator('framelocatorHere');

    //how to take screenshots on the entire page in playwright
    // await page.screenshot({ path: 'screenshot.png' });

    // how to take screenshot of particular element only
    //  await page.locator('displayed-text').screenshot({ path: 'scrrenshot.png' });
});