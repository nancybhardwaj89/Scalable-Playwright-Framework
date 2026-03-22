import { test, Expect, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage";
import { ResultsPage } from "../pages/ResultsPage";

//Data Provider for Product Search Key and Results Count
let searchData = [
    { searchkey: 'macbook', resultscount: 3 },
    { searchkey: 'samsung', resultscount: 2 },
    { searchkey: 'imac', resultscount: 1 },
    { searchkey: 'canon', resultscount: 1 },
    { searchkey: 'dummy', resultscount: 0 }
]

for (let product of searchData) {
    test(`Verify product search ${product.searchkey}`, async ({ page }) => {
        let loginpage = new LoginPage(page);
        await loginpage.goToLoginPage();
        let homepage: HomePage = await loginpage.doLogintoApplication('er.nancy@nal.com', '123456');
        let resultspage: ResultsPage = await homepage.doSearch(product.searchkey);
        expect(await resultspage.getSearchResultsCount()).toBe(product.resultscount);

    });
}



