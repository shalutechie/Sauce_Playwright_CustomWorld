import { LoginPage } from "./LoginPage";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import {BrowserContext, Page} from "@playwright/test";
export class POManager{

private  loginPage:LoginPage;
private  productPage:ProductPage;
private  cartPage:CartPage;
private  checkoutPage:CheckoutPage;
    constructor(page: Page, context: BrowserContext){
        this.loginPage = new LoginPage(page, context);
        this.productPage = new ProductPage(page, context);
        this.cartPage = new CartPage(page, context);
        this.checkoutPage = new CheckoutPage(page, context);
    }

    getLoginPage():LoginPage{
        return this.loginPage;
    }

    getProductPage(): ProductPage{
        return this.productPage;
    }

    getCartPage(): CartPage{
        return this.cartPage;
    }
    getCheckoutPage(): CheckoutPage{
        return this.checkoutPage;
    }
    
    //This can be replaced with page factory class where you dont have to create all page objects
    //in the constructor. Instead create only when required based on the user input from steps


    // export class PageFactory {
    //     static getPage(page: Page, pageName: string) {
    //         switch (pageName) {
    //             case 'Login':
    //                 return new LoginPage(page);
    //             case 'Product':
    //                 return new ProductPage(page);
    //             default:
    //                 throw new Error(`Unknown page: ${pageName}`);
    //         }
    //     }
    // }
    //The factory design pattern can be used in a Cucumber + Playwright Page Object Model (POM) setup to create 
    // and manage page objects dynamically based on the page name or type. This decouples the test steps from 
    // direct class instantiation, making your code more maintainable and scalable.

}