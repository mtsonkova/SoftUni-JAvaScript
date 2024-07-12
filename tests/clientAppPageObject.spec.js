// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');


const host = 'https://rahulshettyacademy.com/client';
const email = 'samgreen@qa.com';
const password = 'Qa_Password1';
const expectedProductsTitles = ['ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO'];
const productName = 'ZARA COAT 3';
const text = " Thankyou for the order. "

test('Purchase one product', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl(host);
    await loginPage.validLogin(email, password);
    await page.waitForLoadState('networkidle');

    //add product to shoping cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.clickOnCartBtn();


    const cartPage = poManager.getCartPage();

    const isElementPresentInCart = await cartPage.isProductVisibleInCart(productName);

    await expect(isElementPresentInCart).toBeTruthy();
    await cartPage.clickCheckoutBtn();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.fillCheckoutPageWithValidData('5555 5555 5555 5555', '05', '15', '123', 'Samantha Green', 'Indonesia');
    await checkoutPage.clickPlaceOrderBtn();

    const orderConfirmationPage = poManager.getOrderConfirmationPage()
    let msg = await orderConfirmationPage.getMsgText();

    await expect(msg).toEqual(text);

    let orderId = await orderConfirmationPage.getOrderId();
    await orderConfirmationPage.clickOnOrdersBtn();
    //await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/myorders');
    let ordersPage = poManager.getOrdersPage();
    await ordersPage.clickOnViewOrderBtn(orderId);

    let orderSummaryPage = poManager.getOrderSummaryPage();

    let title = await orderSummaryPage.getOrderSummaryHeader();
   
    await expect(title).toEqual(' order summary ');

    let orderIdSummary = await orderSummaryPage.getOrderSummaryId();
    await expect(orderIdSummary).toEqual(orderId);

});