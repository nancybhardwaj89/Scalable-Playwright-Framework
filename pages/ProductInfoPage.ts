import { Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';

export class ProductInfoPage {

    private readonly page: Page;
    private readonly eleutil: ElementUtil;
    private readonly header: Locator;
    private readonly imageCount: Locator;
    private readonly productMetaData: Locator;
    private readonly productPriceData: Locator;

    constructor(page: Page) {
        this.page = page;
        this.eleutil = new ElementUtil(page);
        this.header = page.locator('h1');
        this.imageCount = page.locator('div#content img');
        this.productMetaData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[1]`);
        this.productPriceData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[2]`);
    }

    async getProductHeader(): Promise<string> {
        const header = await this.eleutil.getInnerText(this.header);
        console.log('Product Header is:' + header);
        return header.trim();
    }

    async getProductimagesCount(): Promise<number> {
        await this.eleutil.WaitForElementisVisible(this.imageCount);
        const imagescount = await this.imageCount.count();
        console.log(`Total number of images for ${await this.getProductHeader()} ===> ${imagescount})`);
        return imagescount;
    }
}


