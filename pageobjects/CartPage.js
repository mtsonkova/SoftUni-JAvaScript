class CartPage{
    constructor(page) {
        this.page = page;
        this.checkoutBtn = page.locator('text = Checkout');
    }    

    async isProductVisibleInCart(productName) {
        return await this.page.locator(`h3:has-text("${productName}")`).isVisible();
    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
        
    }

}

module.exports = {CartPage};