class DashboardPage {
    constructor(page) {

        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cartBtn = page.locator('[routerlink*="cart"]');
    }

    async getProductsTitles() {
        let productsTitles = await this.productsText.allTextContents();
        return productsTitles;
       }

    async addProductToCart(product) {
        let productsTitles = await this.getProductsTitles();
        let size = await this.products.count();
               
        for(let i = 0; i< size; i++) {
            let currentProductName = await this.products.nth(i).locator('b').textContent();
            if(currentProductName === product) {
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }     

    }

    async clickOnCartBtn() {
        await this.cartBtn.click();
        await this.page.locator('div li').first().waitFor();
    }
}

module.exports = {DashboardPage};