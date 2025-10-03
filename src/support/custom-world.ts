import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { POManager } from '../page_objects/POManager';
import {LoginPage} from "../page_objects/LoginPage";
import {CartPage} from "../page_objects/CartPage";
import {ProductPage} from "../page_objects/ProductPage";
import {CheckoutPage} from "../page_objects/CheckoutPage";


export class CustomWorld extends World  {
    browser?: Browser;
    context?: BrowserContext;
    page?: Page;
    poManager?: POManager;
    productNames: string[] = [];
    productsUserWantsToAdd: Record<string, string>[] = [];
    subTotalOfItemsUserAdded: number = 0;
    totalProductsQty: number = 0;
    sortOption: string = '';
    
    loginPage?: LoginPage;
    productPage?: ProductPage
    cartPage?: CartPage
    checkoutPage?: CheckoutPage;
    

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);


//The ? makes the browser property optional, meaning it can be undefined. If you remove the ?, 
// TypeScript expects browser to always be assigned a value when a CustomWorld instance is created. 
// Since you are not initializing browser in the constructor, TypeScript will show an error about the property not being 
// definitely assigned.  To remove the ?, you must either:  
// Initialize browser in the constructor, or
// Use the non-null assertion (!) like browser!: Browser; to tell TypeScript you will assign it later.