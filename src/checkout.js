var inventory = require('../data/inventory.json');

function scan(shoppingCart, sku) {
  var newShoppingCart = shoppingCart;
  var newItem = true;
  for( var i = 0; i < newShoppingCart["items"].length; i++) {
    var currentItem = newShoppingCart["items"][i];
    if(sku === currentItem["sku"]) {
      newItem = false;
      currentItem.count = currentItem.count + 1
    }
  }
  if(newItem) {
    var item = getItemFromSku(sku, inventory);
    item.count = 1;
    newShoppingCart["items"].push(item);
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

function total(shoppingCart, pricingRules) {
  var skuWithDeal = [];
  for(var i = 0; i < pricingRules.length; i++) {
    skuWithDeal.push(pricingRules[i]["sku"])
  }
  return skuWithDeal;
}

module.exports.scan = scan;
module.exports.total = total;
