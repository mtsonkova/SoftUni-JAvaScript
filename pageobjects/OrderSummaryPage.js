class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('div.email-title');
        this.orderIdSummary = page.locator('div.col-text');
    }

    async getOrderSummaryHeader() {
       
        return await this.title.first().textContent();
    }

    async getOrderSummaryId() {
        return this.orderIdSummary.first().textContent();
    }   
  
}

module.exports = {OrderSummaryPage};