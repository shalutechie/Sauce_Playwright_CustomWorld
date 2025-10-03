import {Given, Then, When} from "@cucumber/cucumber";
import config from '../config/config.json';
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/custom-world";

When('the user enters checkout information as {string} {string} {string} and hit continue', async function (this:CustomWorld,firstName, lastName, postalCode) {
    await this.checkoutPage!.enterCheckoutInformation(firstName, lastName, postalCode);
    await this.checkoutPage!.clickContinueButton();
});

Then('the user should be navigated to the checkout overview page', async function (this:CustomWorld) {
    expect(await this.checkoutPage!.getURL()).toEqual(config.checkoutPageTwoURL); 
});

When('the user verifies products and quantity displayed on icon in checkout overview page', async function (this:CustomWorld) {
    let qtyDisplayedOnCartIcon= await this.checkoutPage!.getCartIconCount();
    const{itemsFromCheckoutPageList,calculatedCartIconQty}= await this.checkoutPage!.getItemsCheckoutOverviewPage();
    expect(this.productsUserWantsToAdd).toEqual(itemsFromCheckoutPageList);
    expect (qtyDisplayedOnCartIcon).toBe(calculatedCartIconQty);
});

When('the user verifies subtotal, tax and total amount', async function (this:CustomWorld) {
    const subTotalDisplayed= await this.checkoutPage!.getDisplayedSubTotal();
    expect(this.subTotalOfItemsUserAdded).toEqual(subTotalDisplayed);
    const actualTotalPrice= await this.checkoutPage!.getCalculatedTotalPrice();
    const displayedTotalPrice= await this.checkoutPage!.getDisplayedTotalPrice();
    expect(displayedTotalPrice).toBeCloseTo(actualTotalPrice, 1); // 1 decimal places
});

Then('clicks finish button', async function (this:CustomWorld) {
    await this.checkoutPage!.clickFinishButton();
});

Then('the user verifies the order is placed successfully', async function (this:CustomWorld) {
    const orderConfirmationMsg=await this.checkoutPage!.getOrderConfirmationMessage()
    expect(orderConfirmationMsg).toBe("Thank you for your order!");
});


