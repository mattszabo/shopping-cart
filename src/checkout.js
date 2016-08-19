var inventory = require('../data/inventory.json');
var pricingRules = require('../data/pricingRules.json');

function scan(shoppingCart, sku) {

  var newShoppingCart = copyCart(shoppingCart);
  newShoppingCart = addItemToCartFromSku(newShoppingCart, sku);
  
  return newShoppingCart;
}

function addItemToCartFromSku(newShoppingCart, sku) {
  var isNewItem = true;

  // check to see if we can incrememnt the count of the new item
  for(var i = 0; i < newShoppingCart.length; i++) {
    var currentItem = newShoppingCart[i];
    if(sku === currentItem["sku"]) {
      isNewItem = false;
      currentItem.count = currentItem.count + 1
    }
  }

  // add the new item if we haven't previously seen it
  if(isNewItem) {
    var item = getItemFromSku(sku, inventory);
    item.count = 1;
    newShoppingCart.push(item);
  }

  return newShoppingCart;
}

function getItemFromSku(sku, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (sku === inventory[i]["sku"]) {
      return inventory[i];
    }
  }
  return "Item not found";
}

// Creates a new shopping cart without mutating the old one.
// This is useful when developping with tools like redux.
function copyCart(shoppingCart) {
  var newShoppingCart = [];
  for(var i = 0; i < shoppingCart.length; i++) {
    newShoppingCart.push(shoppingCart[i]);
  }
  return newShoppingCart;
}

function total(shoppingCart) {
  for(var i = 0; i < shoppingCart.length; i++) {
    total += getItemLineTotal(shoppingCart[0]);
  }
  return total;
}

function getItemLineTotal(item) {
  return item["total"]
}

function getItemCodesWithDeals(pricingRules) {
  var skuList = []
  for(var i = 0; i < pricingRules.length; i++) {
    skuList.push(pricingRules[i]["sku"]);
  }
  return skuList;
}

module.exports.scan = scan;
module.exports.total = total;
