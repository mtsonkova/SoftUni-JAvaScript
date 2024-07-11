class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('div.email-title');
        this.orderIdSummary = page.locator('div.col-text');
    }

    async getOrderSumaryHeader() {
        return await this.title.textContent();
    }

    async getOrderSummaryId() {
        return this.getOrderSummaryId.first().textContent();
    }   
  
}

module.exports = {OrderSummaryPage};