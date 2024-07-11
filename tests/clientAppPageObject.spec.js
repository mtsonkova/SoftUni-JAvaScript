// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const { OrderConfirmationPage } = require('../pageobjects/OrderConfirmationPage');
const { OrderSummaryPage } = require('../pageobjects/OrderSummaryPage');

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
    await page.waitForLoadState('networkidle');

    //add product to shoping cart
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.clickOnCartBtn();


    const cartPage = new CartPage(page);

    const isElementPresentInCart = await cartPage.isProductVisibleInCart(productName);

    await expect(isElementPresentInCart).toBeTruthy();
    await cartPage.clickCheckoutBtn();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutPageWithValidData('5555 5555 5555 5555', '05', '15', '123', 'Samantha Green', 'Indonesia');
   await checkoutPage.clickPlaceOrderBtn();

    const orderConfirmationPage = new OrderConfirmationPage(page);
    let msg = await orderConfirmationPage.getMsgText();

    await expect(msg).toEqual(text);

    let orderId = await orderConfirmationPage.getOrderId();
    await orderConfirmationPage.clickOnViewOrderBtn(orderId);

    let orderSummaryPage = new OrderSummaryPage(page);
   //let title = await orderSummaryPage.getOrderSummaryHeader();
    
    //await expect(title).toEqual(' order summary ');

    let orderIdSummary = await orderSummaryPage.getOrderSummaryId();

    await expect(orderIdSummary).toEqual(orderId);

});