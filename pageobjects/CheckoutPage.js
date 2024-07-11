class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.personalInfo = page.locator('.form__cc');
        this.cardNumber = this.personalInfo.locator('.text-validated');
        this.expiryDate = this.personalInfo.locator('select.ddl');
        this.textFields = this.personalInfo.locator('[type="text"]');
        this.shippingInfo = this.page.locator('.user__name');
        this.userShippingData = this.shippingInfo.locator('input');
        this.countryPlaceholder = this.page.locator('[placeholder*="Country"]');
        this.dropdown = this.page.locator('.ta-results');
        this.buttons = this.dropdown.locator('button');
        this.placeOrderBtn = this.page.locator('text =Place Order');
    }
    async enterCardNumber(cardNumber) {
        await this.cardNumber.fill(cardNumber);
    }

    async enterDate(monthParam, dayParam) {
        let month = await this.expiryDate.first();
        await month.selectOption(monthParam);
        let day = await this.expiryDate.last();
        await day.selectOption(dayParam);
    }

    async enterCVVCode(cvvCode) {
        let CVV = await this.textFields.nth(1);
        await CVV.fill(cvvCode);
    }

    async enterCardName(cardName) {
        let namePlaceholder = await this.textFields.nth(2);
        await namePlaceholder.fill(cardName);
    }

    async getUserEmail() {
        return this.userShippingData.first().inputValue();
    }

    async selectCountry(countryName) {
        let subStr = countryName.substring(0, 3).toLowerCase();

        await this.countryPlaceholder.pressSequentially(subStr);
        await this.dropdown.waitFor();
        let numOfButtons = await this.buttons.count();

        for (let i = 0; i < numOfButtons; i++) {
            if (await this.buttons.nth(i).textContent() === countryName) {
                await this.buttons.nth(i).click();
                break;
            }
        }
    }


    async clickPlaceOrderBtn() {
        await this.placeOrderBtn.click();
    }

    async submitCheckoutPageWithValidData(cardNumber, monthParam, dayParam, cvvCode, cardName, countryName) {
        await this.cardNumber.fill(cardNumber);

        let month = await this.expiryDate.first();
        await month.selectOption(monthParam);
        let day = await this.expiryDate.last();
        await day.selectOption(dayParam);

        let CVV = await this.textFields.nth(1);
        await CVV.fill(cvvCode);

        let namePlaceholder = await this.textFields.nth(2);
        await namePlaceholder.fill(cardName);

        let subStr = countryName.substring(0, 3).toLowerCase();

        await this.countryPlaceholder.pressSequentially(subStr);
        await this.dropdown.waitFor();
        let numOfButtons = await this.buttons.count();

        for (let i = 0; i < numOfButtons; i++) {
            if (await this.buttons.nth(i).textContent() === countryName) {
                await this.buttons.nth(i).click();
                break;
            }
        }

        await this.placeOrderBtn.click();
    }

}

module.exports = {CheckoutPage};