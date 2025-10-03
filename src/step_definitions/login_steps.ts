import {Given, Then, When} from "@cucumber/cucumber";
import config from '../config/config.json';
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/custom-world";

Given('the user navigate to the login page', async function (this:CustomWorld) {
     //In default world TS was not strictly checking the properties on this. Type safety 
    // was not enforced but now with custom world, you said in world class that   poManager?: POManager;, which mean
    //PO manager can be undefined as well (?) So to avoid that we are using ! after poManager to tell TS that it will never be undefined here.
    //This way you are dealing with an issue that might arise in compile time. Now if PO manager is still undefined during run time
    //an error will be thrown
    //You pass this:CustomWorld in every step to provide TypeScript with type information about the step context. 
    // This ensures that within each step, this is recognized as a CustomWorld instance, giving you access to its
    // properties and methods with proper type safety and autocompletion. Without this annotation, 
    // TypeScript would treat this as any, losing type safety and potentially causing runtime errors.
    
    //CustomWorld gets invoked automatically by Cucumber before each scenario starts. Cucumber creates a 
    // new instance of CustomWorld for every scenario, ensuring isolation between tests. This instance is available as 
    // this in your step definitions, allowing you to store and access scenario-specific data.
    await this.loginPage!.navigateTo(config.baseURL)
    await this.loginPage!.waitFor(this.loginPage!.userName);
});

When('the user enters credentials as {string} and {string} and click login button', async function (this:CustomWorld,username, password) {
    await this.loginPage!.enterCredentials(username, password);
    await this.loginPage!.clickLoginButton();
   
});

Then('an error message should be displayed', async function (this:CustomWorld) {
    await this.loginPage!.waitFor(this.loginPage!.invalidCredentialError);
    expect(await this.loginPage!.getInvalidCredentialError()).toContain("Epic sadface: Sorry, this user has been locked out.");
});

Then('the user should be redirected to the inventory page', async function (this:CustomWorld) {
    expect(await this.loginPage!.getURL()).toBe(config.inventoryPageURL);
});


       
       