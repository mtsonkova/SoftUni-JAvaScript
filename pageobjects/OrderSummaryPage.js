class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('div.email-title');
        this.orderIdSummary = page.locator('div.col-text.-main');
    }

    async getOrderSummaryHeader() {
       return await this.title.textContent();
    }

    async getOrderSummaryId() {
       return this.orderIdSummary;
       
    }   
  
}

module.exports = {OrderSummaryPage};