import { Page, Locator } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import {HomePage} from '../pages/HomePage';

export class LoginPage {
    //1. Maintain Page Loctors/objects
    private readonly page: Page;
    private readonly eleUtil;
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly warningMsg: Locator;

    //2. Page Class Constructors
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator(`//input[@type='submit']`);
        this.warningMsg = page.locator(`#account-login > div.alert`);
    }

    //3. Page Methods/Actions

    /**
     * Navigate to Login Page
     */
    async goToLoginPage() {
        await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    }

    /**
     * Login to application using usernam and password
     * @param email 
     * @param password 
     * @returns 
     */
    async doLogintoApplication(email: string, password: string): Promise<HomePage> {
        // await this.emailId.fill(''); // We have to use fill method again and again, instead of writing like this (ugly way) we have to use element utils
        // await this.passsword.fill('');
        await this.eleUtil.fill(this.emailId, email);
        await this.eleUtil.fill(this.password, password);
        await this.eleUtil.click(this.loginButton, { force: true, timeout: 5000 });
        return new HomePage(this.page);
        //const pageTitle = await this.page.title();
        //console.log('Home Page Title is:' +pageTitle);
        //return pageTitle;
    }

    /**
     * Get the Warning Message
     * @returns 
     */

    async getInvalidLoginMessage(): Promise<string | null> {
        const errormessage = await this.eleUtil.getText(this.warningMsg);
        console.log('Invalid Login waring message:' + errormessage);
        return errormessage;

    }

}