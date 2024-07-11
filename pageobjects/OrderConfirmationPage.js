class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.msg = page.locator('h1');
        this.finalPageTitleData = page.locator('.box');
        this.navButtons = page.locator('button.btn-custom');
        this.th = page.locator('tbody tr th');
        this.tr = page.locator('tbody tr');
    }

    async getMsgText() {
        return await this.msg.first().textContent();
    }

    async getOrderId() {
        let finalPageTitle = await this.finalPageTitleData.first();
        let orderIdRow = await finalPageTitle.locator('tr').last();
        let orderText = await orderIdRow.locator('td').textContent();
        let orderId = orderText?.split('|').filter(element => element.length > 1).toString().trim();
        return orderId;
    }

    async clickOnViewOrderBtn(orderId) {
        await this.navButtons.nth(1).click();
        let hasOrderId = false;

        let currentIndex = 0;
        await this.th.first().waitFor();
        let thCount = await this.th.count();

        for (let i = 0; i < thCount; i++) {
            let currentOrderId = await this.th.nth(i).textContent();
            if (currentOrderId === orderId) {
                hasOrderId = true;
                currentIndex = i;
                break;
            }

            if (hasOrderId) {
                await this.tr.nth(currentIndex).getByRole('button').first().click();
            } else {
                console.log('No such order id')
            }
        }

    }
}

module.exports = {OrderConfirmationPage};