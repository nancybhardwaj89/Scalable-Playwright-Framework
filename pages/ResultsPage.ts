import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../utils/ElementUtil';
import {LoginPage} from '../pages/LoginPage';



export class ResultsPage
{
    //1.Page Locators/Objects
    private readonly page: Page;
    private readonly eleUtil: ElementUtil;
    private readonly results:Locator;
  



    //2. Page Class Constructor

    constructor(page:Page)
    {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
   this.results = page.locator('.product-thumb'); 
    }

    //3. Page Actions
    async getSearchResultsCount(): Promise<number>
    {
        return await this.results.count()
    }

 


}

