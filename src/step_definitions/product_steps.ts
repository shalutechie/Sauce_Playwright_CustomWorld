import {Given, Then, When} from "@cucumber/cucumber";
import config from '../config/config.json';
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/custom-world";

Given('the user logged in and navigate to the inventory page', async function (this:CustomWorld) {
    await this.productPage!.navigateTo(config.inventoryPageURL)
    await this.productPage!.waitFor(this.productPage!.sortDropdown);
    expect(await this.productPage!.getURL()).toBe(config.inventoryPageURL); 
});

When('the user sorts items by clicking sort option {string}', async function (this:CustomWorld,sortOption: string) {
    this.sortOption = sortOption;
    await this.productPage!.sortItemsBySortOption( this.sortOption);
});

Then(/^the items should be displayed in (?:alphabetical|reverse alphabetical|descending price|ascending price) order$/, async function (this:CustomWorld) {
    let listFromPageAfterSorting = await this.productPage!.saveInventoryListFromPage( this.sortOption);
    let listProgramaticallySorted = await this.productPage!.sortInventoryListProgramaticallyFromPage(this.sortOption,listFromPageAfterSorting);
    expect(listFromPageAfterSorting).toEqual(listProgramaticallySorted);
});

When('the user adds few products to the cart', async function (this:CustomWorld,dataTable) {
    const { productsUserWantsToAdd, totalProductsQty, productNames,subTotalOfItemsUserAdded }=await this.productPage!.addProductsFromDataTable(dataTable);
    this.productsUserWantsToAdd=productsUserWantsToAdd;
    this.totalProductsQty = totalProductsQty;
    this.productNames = productNames;
    this.subTotalOfItemsUserAdded=subTotalOfItemsUserAdded;
});

Then('the cart icon count should match the number of products added', async function (this:CustomWorld) {
    const qtyDisplayedInCartIcon= await this.productPage!.getCartIconCount();
    expect(qtyDisplayedInCartIcon).toBe(this.totalProductsQty);
});

When('the user clicks the cart icon', async function (this:CustomWorld) {
    await this.productPage!.clickOnCartIcon();
});

