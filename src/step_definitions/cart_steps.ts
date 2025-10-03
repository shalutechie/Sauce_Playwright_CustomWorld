import {Then} from "@cucumber/cucumber";
import config from '../config/config.json';
import {expect} from "@playwright/test";
import { CustomWorld } from "../support/custom-world";


Then('the user should be navigated to the cart page and verifies products in cart list', async function (this:CustomWorld) {
    expect(await this.cartPage!.getURL()).toBe(config.cartPageURL);
    const itemsInCheckoutCart=await this.cartPage!.getProductsInCartList();
    expect(itemsInCheckoutCart).toEqual(this.productNames);
});

Then('the user proceeds to checkout', async function (this:CustomWorld) {
    await this.cartPage!.clickCheckoutButton();
});