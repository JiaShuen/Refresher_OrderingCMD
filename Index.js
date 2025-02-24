const UIDisplay = require("./Classes/UI");
const CartItem = require('./Classes/CartItem');

var d = new Date();
var UI = new UIDisplay(d.getTime());
var cart = [];
var mainmenu = false;
var menupage = {};
var qtyPage = {};
var cartPage = false;

// Initialise food objects
var foods = UI.initFoods();

do {
    // Displays main menu
    mainmenu = UI.displayMain();

    do {
        // Displays food items on the menu
        menupage = UI.displayMenu();
        if (!menupage.status) {
            mainmenu = false;
            continue;
        }

        if (!menupage.continue) {
            // Displays menu to select quantity
            qtyPage = UI.displayQty(menupage.item, cart);
            if (!qtyPage.status) {
                menupage.status = true;
                menupage.item = null;
                menupage.continue = false;
                continue;
            }
        }

        if (menupage.continue) {
            // Displays cart
            cartpage = UI.displayCart(cart);
            if (!cartpage) {
                menupage.status = true;
                menupage.item = null;
                menupage.continue = false;
                continue;
            }
        }

        if (qtyPage.status && qtyPage.returnQty != null && qtyPage.returnItem != null) {
            cart.push(new CartItem(qtyPage.returnItem, qtyPage.returnQty));
        }
        
    }while(mainmenu && menupage.status);
    
} while(!mainmenu);
