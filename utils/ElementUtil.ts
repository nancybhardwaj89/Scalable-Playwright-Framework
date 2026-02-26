import { Locator, Page } from '@playwright/test'

type flexiablelocator = string | Locator;

export class ElementUtil {
    private page: Page;
    private defaultTimeOut: number = 30000;

    constructor(page: Page, timeout: number = 30000) {
        this.page = page;
        this.defaultTimeOut = timeout;
    }
    /**
     * 
     * @param locator this method to convert string to locator or else it will return semantic based locators
     * @param index
     * @returns 
     */
    private getLocator(locator: flexiablelocator, index?: number): Locator {
        if (typeof locator === 'string') {
            if(index)
            {
                return this.page.locator(locator).nth(index);
            }
            else{
                return this.page.locator(locator).first();
            }   
        }
        else
        {
            if(index)
            {
                return locator.nth(index);
            }
            else{
                return locator.first();
            }
        }
    }
    /**
     * Click on the element 
     * @param locator 
     * @param options 
     * @param index 
     */
    async click(locator: flexiablelocator, options?: { force?: boolean, timeout?: number }, index?:number): Promise<void> {
        await this.getLocator(locator, index).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeOut
        });
        console.log(`Clicked on the element: ${locator}`);

    }
    /**
     * Double click the element
     * @param locator 
     */
    async doubleclick(locator: flexiablelocator): Promise<void> {
        await this.getLocator(locator).dblclick({
            timeout: this.defaultTimeOut
        });
        console.log(`Double Clicked on the element: ${locator}`);
    }
    /**
     * Right Click on the element
     * @param locator 
     */
    async rightclick(locator: flexiablelocator): Promise<void> {
        await this.getLocator(locator).dblclick({
            button: 'right',
            timeout: this.defaultTimeOut
        });
        console.log(`Right Clicked on the element: ${locator}`);
    }
    /**
     * Fill text into the element
     * @param locator 
     * @param text 
     */
    async fill(locator: flexiablelocator, text: string): Promise<void> {
        await this.getLocator(locator).fill(text, { timeout: this.defaultTimeOut });
        console.log(`Filled the text: ${text} into element ${locator}`);
    }
    /**
     * TYped text with delay
     * @param locator
     * @param text 
     * @param delay 
     */

    async type(locator: flexiablelocator, text: string, delay: number = 500): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, { delay, timeout: this.defaultTimeOut });
        console.log(`Type the text as a human: ${text} into element ${locator}`);
    }
    /**
     * Clear the text
     * @param locator 
     */
    async clear(locator: flexiablelocator): Promise<void> {
        await this.getLocator(locator).clear({ timeout: this.defaultTimeOut });
        console.log(`Cleared the text: ${locator}`);
    }
    /**
     * Get Text Context of the Element
     * @param locator 
     * @returns 
     */
    async getText(locator: flexiablelocator): Promise<string | null> {
        const text = await this.getLocator(locator).textContent({ timeout: this.defaultTimeOut });
        return text;

    }
    /**
     * Get Inner Text of the Element
     * @param locator 
     * @returns 
     */
    async getInnerText(locator: flexiablelocator): Promise<string> {
        const text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeOut });
        return text.trim();

    }
    /**
     * Get Attribute Value of an element
     * @param locator 
     * @returns 
     */
    async getAttribute(locator: flexiablelocator, attributeName: string): Promise<string | null> {
        return await this.getLocator(locator).getAttribute(attributeName);
    }

    /**
     * Get Input (entered) value of an element
     * @param locator 
     * @returns 
     */
    async getInputValue(locator: flexiablelocator): Promise<string | null> {
        return await this.getLocator(locator).inputValue({ timeout: this.defaultTimeOut });
    }

    /**
     * Get all text content from multiple elements
     * @param locator 
     * @returns 
     */

    async getAllInnerText(locator: flexiablelocator) {
        return await this.getLocator(locator).allInnerTexts();

    }
    //======================Element Visibility & State Check=======================================================//

     /**
     * Check Element is Visible
     * @param locator 
     * @returns 
     */

    async isVisible(locator: flexiablelocator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isVisible({ timeout: this.defaultTimeOut });
    }
    /**
     * Check Element is Hidden
     * @param locator 
     * @returns 
     */

    async isHidden(locator: flexiablelocator): Promise<boolean> {
        return await this.getLocator(locator).isHidden({ timeout: this.defaultTimeOut });
    }
    /**
     * Check Element is Enabled
     * @param locator 
     * @returns 
     */
    async isEnabled(locator: flexiablelocator): Promise<boolean> {
        return await this.getLocator(locator).isEnabled({ timeout: this.defaultTimeOut });
    }
    /**
     * Check Element is Disbaled
     * @param locator 
     * @returns 
     */
    async isDisabled(locator: flexiablelocator): Promise<boolean> {
        return await this.getLocator(locator).isDisabled({ timeout: this.defaultTimeOut });

    }
    /**
     * Check Element is Checked (radio/checkbox)
     * @param locator 
     * @returns 
     */

    async isChecked(locator: flexiablelocator): Promise<boolean> {
        return await this.getLocator(locator).isChecked({ timeout: this.defaultTimeOut });

    }
    /**
     * Check Element is editable or not
     * @param locator 
     * @returns 
     */
    async isEditable(locator: flexiablelocator): Promise<boolean> {
        return await this.getLocator(locator).isEditable({ timeout: this.defaultTimeOut });
    }

    //==============================Wait Utils===============================================================//

    /**
      * Check ELement is Visible
      * @param locator 
      * @param timeout 
      * @returns 
      */
    async WaitForElementisVisible(locator: flexiablelocator, timeout: number = 5000) {
        try {
            await this.getLocator(locator).waitFor({ state: 'visible', timeout });
            console.log(`Waited for element to be visible`)
            return true;
        }
        catch {
            return false;

        }

    }
    /**
     * Wait for element attached to the DOM
     * @param locator 
     * @param timeout 
     * @returns 
     */

    async WaitForElementAttached(locator: flexiablelocator, timeout: number = 5000) {
        try {
            await this.getLocator(locator).waitFor({ state: 'attached', timeout });
            console.log(`Waited for element to be attached to the dom`)
            return true;
        }
        catch {
            return false;

        }

    }
    /**
     * Waited for Page Load State
     * @param state 
     */

    async waitforPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
        console.log(`Waited for PAge load state: ${state}`);
    }
    /**
     * Wait for a specific timeout
     * @param timeout 
     */
    async sleep(timeout: number): Promise<void> {
        this.page.waitForTimeout(timeout);
        console.log(`Waited for ${timeout} milliseconds`);
    }
    //==========================Drop Down Utilities/Select Based Drop downs=====================================================================//

    /**
     * Select by Text from dropdown
     * @param locator 
     * @param text 
     */
    async selectByText(locator: flexiablelocator, text: string)
    {
        await this.getLocator(locator).selectOption({label: text}, {timeout: this.defaultTimeOut });
        console.log(`selected option ${text} from dropdown ${locator}`);
    }

    /**
     * Select by Value from dropdown
     * @param locator 
     * @param value 
     */

    async selectByValue(locator: flexiablelocator, value: string)
    {
        await this.getLocator(locator).selectOption({value: value}, {timeout: this.defaultTimeOut });
        console.log(`selected option ${value} from dropdown ${locator}`);
    }

    /**
     * Select by index from dropdown
     * @param locator 
     * @param index 
     */

     async selectByIndex(locator: flexiablelocator, index: number)
    {
        await this.getLocator(locator).selectOption({index: index}, {timeout: this.defaultTimeOut });
        console.log(`selected option ${index} from dropdown ${locator}`);
    }

























}

