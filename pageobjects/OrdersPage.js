class OrdersPage {
    constructor(page) {
        this.page = page;
        this.th = page.locator('tbody tr th');
        this.tr = page.locator('tbody tr');
        this.viewBtn = page.getByRole('button', { name: 'View' });
    }

    async clickOnViewOrderBtn(orderId) {
      
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
                await this.viewBtn.click()
            } else {
                console.log('No such order id')
            }
        }

    }
}

module.exports = { OrdersPage };

