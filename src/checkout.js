// var inventory = require('../data/inventory.json');
// var pricingRules = require('../data/pricingRules.json');

module.exports = function Checkout(inventory, pricingRules) {

  this.inventory = inventory;
  this.pricingRules = pricingRules;
  this.freeItemList = []
  this.shoppingCart = [];
  this.totalPrice = 0;

  this.scan = function scan(sku) {
    var item = this.getItemFromSku(sku);

    this.shoppingCart.push(item);
    if(this.freeItemList.indexOf(sku) < 0 ) {
      this.totalPrice += item["price"];
    }

    this.checkForFreeItemFlag(sku);
  }

  this.getShoppingCart = function getShoppingCart() {
    return this.shoppingCart;
  }

  this.checkForFreeItemFlag = function checkForFreeItem(sku) {
    for (var key in this.pricingRules) {
      if(key === 'freeItem') {
        if(this.pricingRules[key]['triggerSku'] === sku) {
          this.addToFreeItemList(this.pricingRules[key]['freeItemSku'])
        }
      }
    }
  }

  this.addToFreeItemList = function(sku) {
    this.freeItemList.push(sku);
  }

  this.getItemFromSku = function getItemFromSku(sku) {
    for (var i = 0; i < inventory.length; i++) {
      if (sku === inventory[i]["sku"]) {
        return inventory[i];
      }
    }
    return "Item not found";
  }

  this.total = function total() {
    return this.totalPrice;
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
