var Checkout = require('../src/checkout.js');
var inventory = require('../data/inventory.json');
var pricingRules = {}

var co = new Checkout(inventory, pricingRules);

// BASIC TESTS
console.log("Test scanning first new item");
var shoppingCart = co.scan([], 'ipd');
if(shoppingCart.length != 1) {
  console.log("Failed. There should only be one item, not: ", shoppingCart.length);
}
if(shoppingCart[0]["sku"] === 'ipd') {
  console.log("Success: First item successfully scanned: ");
  console.log(shoppingCart);
} else {
  console.log("Failed. Expected to scan 1 item with sku 'ipd'. Instead scanned:\n", shoppingCart[0]);
}

console.log("\nTest scan second new item");
shoppingCart = co.scan(shoppingCart, 'mbp');
if(shoppingCart.length != 2) {
  console.log("Failed. There should be two item entries, not: ", shoppingCart.length);
}
if(shoppingCart[0]["sku"] === 'ipd' && shoppingCart[1]["sku"] === 'mbp') {
  console.log("Success: new sku scanned: ");
  console.log(shoppingCart);
} else {
  console.log("Failed. Expected to scan duplicate sku 'ipd' and increment count. Instead resulted in:\n", shoppingCart[0]);
}

console.log("\nTest adding second new item");
shoppingCart = co.scan(shoppingCart, 'ipd');
if(shoppingCart.length != 3) {
  console.log("Failed. There should now be 3 item entries, not: ", shoppingCart.length);
}
if(  shoppingCart[0]["sku"] === 'ipd'  && shoppingCart[1]["sku"] === 'mbp' && shoppingCart[2]["sku"] === 'ipd') {
  console.log("Success: duplicate sku scanned, added to list");
  console.log(shoppingCart);
} else {
  console.log("Failed. Expected to see two items. Instead resulted in:\n", shoppingCart);
}

// FREE ITEM TEST
pricingRules = {
  "freeItem" : {
    "triggerSku": "mbp",
    "freeItemSku": "vga"
  }
}

co = new Checkout(inventory, pricingRules);
console.log("\nTest scanning item that adds a free item");
shoppingCart = co.scan([], 'mbp');
if(shoppingCart.length != 2) {
  console.log("Failed. There should be 2 items, not: ", shoppingCart.length);
}
if(shoppingCart[0]["sku"] === 'mbp' && shoppingCart[1]["sku"] === 'vga') {
  console.log("Success: 1 item scanned resulting in 1 item plus a free item: ");
  console.log(shoppingCart);
} else {
  console.log("Failed. Expected to see 2 items with sku 'mbp' and 'vga'. Instead found:\n", shoppingCart[0]);
}

// TOTAL TEST
pricingRules = {}
co = new Checkout(inventory, pricingRules);
console.log('\nTest tallying total');
shoppingCart = co.scan([], 'mbp');
if(shoppingCart[0]) {

}
