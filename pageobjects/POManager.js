const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderConfirmationPage} = require('./OrderConfirmationPage');
const {OrdersPage} = require('./OrdersPage');
const {OrderSummaryPage} = require('./OrderSummaryPage');

class POManager{
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
        this.orderSummaryPage = new OrderSummaryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }
    getOrdersPage() {
        return this.ordersPage;
    }

    getOrderSummaryPage() {
        return this.OrderSummaryPage;
    }
}

module.exports = {POManager};