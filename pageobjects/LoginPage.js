class LoginPage{

    constructor(page) {
        this.page = page;
        this.email = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    }

    async goToUrl(url) {
        await this.page.goto(url);
    }

    async validLogin(userEmail, userPassword){
        await this.email.fill(userEmail);
        await this.password.fill(userPassword);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};