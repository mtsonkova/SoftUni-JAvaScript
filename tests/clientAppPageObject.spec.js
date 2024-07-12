// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../testdata/clientAppPageObjects.json")));


const host = dataSet.host;
const email = dataSet.email;
const password = dataSet.password;
const productName = dataSet.productName;
const text = dataSet.text;

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
    await checkoutPage.fillCheckoutPageWithValidData(dataSet.creditCardNumber, dataSet.month, dataSet.day, dataSet.cvvCode, dataSet.cardOwnerName, dataSet.country); 
     await checkoutPage.clickPlaceOrderBtn();

    const orderConfirmationPage = poManager.getOrderConfirmationPage()
    let msg = await orderConfirmationPage.getMsgText();

    await expect(msg).toEqual(text);

    let orderId = await orderConfirmationPage.getOrderId();
    await orderConfirmationPage.clickOnOrdersBtn();
   
    let ordersPage = poManager.getOrdersPage();
    await ordersPage.clickOnViewOrderBtn(orderId);

    let orderSummaryPage = poManager.getOrderSummaryPage();

    let title = await orderSummaryPage.getOrderSummaryHeader();
   
    await expect(title).toEqual(' order summary ');

    let orderIdSummary = await orderSummaryPage.getOrderSummaryId();
    await expect(orderIdSummary).toEqual(orderId);

});