class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.msg = page.locator('h1.hero-primary');
        this.finalPageTitleData = page.locator('.box');        
        this.ordersBtn = page.getByRole('button', {name: "  ORDERS"});
    }

    async getMsgText() {
       
        return await this.msg.textContent();
    }

    async getOrderId() {
        let finalPageTitle = await this.finalPageTitleData.first();
        let orderIdRow = await finalPageTitle.locator('tr').last();
        let orderText = await orderIdRow.locator('td').textContent();
        let orderId = orderText?.split('|').filter(element => element.length > 1).toString().trim();
        return orderId;
    }

    async clickOnOrdersBtn() {
        await this.ordersBtn.click()
    }

   
}

module.exports = {OrderConfirmationPage};