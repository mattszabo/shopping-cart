// var inventory = require('../data/inventory.json');
// var pricingRules = require('../data/pricingRules.json');

module.exports = function Checkout(inventory, pricingRules) {

  this.inventory = inventory;
  this.pricingRules = pricingRules;
  
  this.scan = function scan(shoppingCart, sku) {

    var newShoppingCart = this.copyCart(shoppingCart);
    var item = this.getItemFromSku(sku);

    newShoppingCart.push(item);

    var freeItem = this.checkForFreeItem(sku);
    if(!!freeItem) {
      newShoppingCart.push(freeItem)
    }

    return newShoppingCart;
  }

  this.checkForFreeItem = function checkForFreeItem(sku) {
    for (var key in this.pricingRules) {
      if(key === 'freeItem') {
        if(this.pricingRules[key]['triggerSku'] === sku) {
          return this.getItemFromSku(this.pricingRules[key]['freeItemSku'])
        }
      }
    }
  }

  this.getItemFromSku = function getItemFromSku(sku) {
    for (var i = 0; i < inventory.length; i++) {
      if (sku === inventory[i]["sku"]) {
        return inventory[i];
      }
    }
    return "Item not found";
  }
  // Creates a new shopping cart without mutating the old one.
  // This is useful when developping with tools like redux.
  this.copyCart = function copyCart(shoppingCart) {
    var newShoppingCart = [];
    for(var i = 0; i < shoppingCart.length; i++) {
      newShoppingCart.push(shoppingCart[i]);
    }
    return newShoppingCart;
  }
}


//
// function total(shoppingCart) {
//   for(var i = 0; i < shoppingCart.length; i++) {
//     total += getItemLineTotal(shoppingCart[0]);
//   }
//   return total;
// }
//
// function getItemLineTotal(item) {
//   return item["total"]
// }
//
// function getItemCodesWithDeals(pricingRules) {
//   var skuList = []
//   for(var i = 0; i < pricingRules.length; i++) {
//     skuList.push(pricingRules[i]["sku"]);
//   }
//   return skuList;
// }

// module.exports.Checkout = Checkout;
// module.exports.total = total;
