const data = require('../Food.json'); 
const Item = require('./Item');
const rl = require('readline-sync');


class UIDisplay {
    constructor(time) {
        this.time = time;
        this.OrderType;
        this.foods = [];
    }

    setOrderType(x) {   
        this.OrderType = x;
    }

    getOrderType() {
        return this.OrderType;
    }

    setTime(x) {
        this.time = x;
    }

    displayMain() {
        var good = false;
        do{
            try {
                console.log('==============================\nWelcome to SAFCafe\n==============================\n1. Dine in\n2. Take Away\n0. Exit');
                var orderType = parseInt(rl.question('>>> '));

                // Remember to use break; for each case or else it will proceed to default
                switch(orderType) {
                    case 0:
                        process.exit();
                        break;
                    case 1:
                        this.setOrderType(1);
                        good = true;
                        break;
                    case 2:
                        this.setOrderType(2);
                        good = true;
                        break;
                    default:
                        throw new Error('');
                }
            }
            catch(e) {
                console.clear();
                console.log('PLEASE PROVIDE A VALID NUMBER!!!');
                good = false;
            }

        }while(!good);

        return true;
    }

    initFoods() {
        for(let i = 0; i < data.Foods.length; i++) {
            this.foods.push(new Item(data.Foods[i].Name, data.Foods[i].Price));
        }

        return this.foods;
    }

    displayMenu() {
        var good = false;
        var result = {};

        do {
            try{

                var str = '==============================\nMenu\n==============================';
                for(let i = 0; i < this.foods.length; i++) {
                    str += `\n${i + 1})\nName: ${this.foods[i].getName()}\nPrice: ${this.foods[i].getPrice()}\n`;
                }
                str += '\nPlease select an item. \nPress 0 to return to previous page.\nPress Continue to proceed.';
                console.log(str);
                
                var selectedItem = rl.question('>>> ');

                if (selectedItem == 'Continue') {
                    var result = {
                        status: true,
                        item: null,
                        continue: true
                    };

                    return result;
                }

                selectedItem = parseInt(selectedItem);
                if(selectedItem == 0) {
                    result = {
                        status: false,
                        item: null,
                        continue: false
                    };
                    return result;
                }
                else if (selectedItem <= this.foods.length) {
                    good = true;
                    result = {
                        status: true,
                        item: this.foods[selectedItem - 1],
                        continue: false
                    };
                }
                else {
                    throw new Error('');
                }
                
            }
            catch(e) {
                console.clear();
                console.log('PLEASE PROVIDE A VALID NUMBER!!!');
                good = false;
            }
        } while(!good)
        
        return result;
    }

    displayQty(foodItem, cart) {
        var good = false;
        var result = {};

        do {
            try{

                console.log(`You have selected ${foodItem.getName()}. Key in the desired quantity. Press 0 to return to the previous page.`);
                var qty = parseInt(rl.question('>>> '));
                if(qty == 0) {
                    result = {
                        status: false,
                        returnQty: null,
                        returnItem: null
                    }
                    return result;
                }

                if (cart.length > 0) {
                    for(let i = 0; i < cart.length; i++) {
                        if(foodItem.getName() == cart[i].getName()) {

                            cart[i].setQty(cart[i].getQty() + qty);

                            result = {
                                status: true,
                                returnQty: null,
                                returnItem: null
                            }
                            return result;

                        }
                    }
                }
                
                result = {
                    status : true,
                    returnQty: qty,
                    returnItem: foodItem
                };
            

                good = true;

            }
            catch(e) {
                console.clear();
                console.log('PLEASE PROVIDE A VALID NUMBER!!!');
                good = false;
            }
        } while(!good)

        return result;
    }

    displayCart(cart) {
        var total = 0;
        var good = false;

        do {
            try {
                var str = '==============================\nYour Cart\n==============================\n';

                for(let i = 0; i < cart.length; i++) {
                    str += `${i + 1}) ${cart[i].getName()} --- ${cart[i].getPrice()} x${cart[i].getQty()}\n\n`;

                    total += parseFloat(cart[i].getPrice()).toFixed(2) * cart[i].getQty();
                }
               
                console.log(this.getOrderType());
                if(this.getOrderType() == 1) {
                    str += 'Order Type: Dine In\n';
                }
                else {
                    str += 'Order Type: Take Away (+ $0.50)\n';
                    total += 0.5;
                }

                str += 'Total: ' + total.toFixed(2) + '\n\n1. Make Payment\n2. Back';

                console.log(str);
                var opt = parseInt(rl.question('>>> '));
                if (opt == 1) {
                    console.log('Thank you for your purchase!');
                    process.exit();
                }
                else if (opt == 2) {
                    good = true;
                    return false;
                }
                else {
                    throw new Error('');
                }
            } catch(e) {
                console.clear();
                console.log('PLEASE PROVIDE A VALID NUMBER!!!');
                good = false;
            }
            
            
        } while(!good);
        
    }
};

module.exports = UIDisplay;