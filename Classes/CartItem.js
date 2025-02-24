const Item = require("./Item");

class CartItem extends Item {
    constructor(item, qty) {
        super(item.name, item.price);
        this.qty = qty;
    }

    getItem() {
        return this.item;
    }

    getQty() {
        return parseInt(this.qty);
    }

    setItem(x) {
        this.item = x;
    }

    setQty(x) {
        this.qty = x;
    }

}

module.exports = CartItem;