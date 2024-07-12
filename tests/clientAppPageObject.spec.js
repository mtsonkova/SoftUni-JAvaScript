// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../testdata/clientAppPageObjects.json")));

dataSet.forEach((data, index) => {

    const host = data.host;
    const email = data.email;
    const password = data.password;
    const productName = data.productName;
    const text = data.text;

    //test.describe.configure({mode: 'serial'})
    test(`Purchase one product ${index + 1} : ${data.id}`, async ({ page }) => {
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
        await checkoutPage.fillCheckoutPageWithValidData(data.creditCardNumber, data.month, data.day, data.cvvCode, data.cardOwnerName, data.country);
        await checkoutPage.clickPlaceOrderBtn();

        const orderConfirmationPage = poManager.getOrderConfirmationPage()
        let msg = await orderConfirmationPage.getMsgText();

        await expect(msg).toEqual(text);

        let orderId = await orderConfirmationPage.getOrderId();
        await orderConfirmationPage.clickOnOrdersBtn();
        await page.waitForLoadState('networkidle');

        let ordersPage = poManager.getOrdersPage();
        await ordersPage.clickOnViewOrderBtn(orderId);

        let orderSummaryPage = poManager.getOrderSummaryPage();

        let title = await orderSummaryPage.getOrderSummaryHeader();

        await expect(title).toEqual(' order summary ');

        let orderIdSummary = await orderSummaryPage.getOrderSummaryId();
        await expect(orderIdSummary).toEqual(orderId);

    });
});