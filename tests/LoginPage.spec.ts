import {test, Expect, expect} from "@playwright/test"
import { LoginPage} from "../pages/LoginPage"


test('Verify Valid Login', async({page}) => {

    let loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
    const actualTitle = await loginpage.doLogintoApplication('pwtest@nal.com', 'test123');
    await expect(page).toHaveTitle('My Account');
});

test('Verfiy Invalid Login', async({page}) => {

    let loginpage = new LoginPage(page);
    await loginpage.goToLoginPage();
    await loginpage.doLogintoApplication('pwtgfgt@nal.com', 'tesfvcdft123');
    const errormsg = await loginpage.getInvalidLoginMessage();
    await expect(errormsg).toContain('Warning: No match for E-Mail Address and/or Password.');
    


});

