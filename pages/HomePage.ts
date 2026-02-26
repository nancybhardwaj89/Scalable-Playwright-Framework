import {Locator, Page} from '@playwright/test'
import {ElementUtil} from '../utils/ElementUtil'

export class HomePage
{
    private readonly page: Page;
    private readonly eleUtil;


    //2. Page Class Constructor

    constructor(page:Page)
    {

    this.page = page;
    this.eleUtil = new ElementUtil(page);
    
    }


}

