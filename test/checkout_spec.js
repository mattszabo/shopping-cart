var co = require('../src/checkout.js');

// SCAN TESTS
console.log("Test scanning first item adds the item with a count of 1");
var shoppingCart = co.scan([], 'ipd');
if(shoppingCart.length != 1) {
  console.log("Failed. There should only be one item, not: ", shoppingCart.length);
}
if(shoppingCart[0]["sku"] === 'ipd' && shoppingCart[0]["count"] === 1) {
  console.log("Success: 1 new item successfully scanned: ");
  console.log(shoppingCart);
} else {
  console.log("Failed. Expected to scan 1 item with sku 'ipd'. Instead scanned:\n", shoppingCart[0]);
}

console.log("\nTest incrementing item count");
shoppingCart = co.scan(shoppingCart, 'ipd');
if(shoppingCart.length != 1) {
  console.log("Failed. There should still be only one item entry, not: ", shoppingCart.length);
}
if(shoppingCart[0]["sku"] === 'ipd' && shoppingCart[0]["count"] === 2) {
  console.log("Success: duplicate sku scanned, which increased count : ");
  console.log(shoppingCart);
} else {
  console.log("Failed. Expected to scan duplicate sku 'ipd' and increment count. Instead resulted in:\n", shoppingCart[0]);
}

console.log("\nTest adding second new item");
shoppingCart = co.scan(shoppingCart, 'mbp');
if(shoppingCart.length != 2) {
  console.log("Failed. There should now be 2 item entries, not: ", shoppingCart.length);
}
if(  (shoppingCart[0]["sku"] === 'ipd' && shoppingCart[0]["count"] === 2)
  && (shoppingCart[1]["sku"] === 'mbp' && shoppingCart[1]["count"] === 1)) {
  console.log("Success: new sku scanned, added to list");
  console.log(shoppingCart);
} else {
  console.log("Failed. Expected to see two items. Instead resulted in:\n", shoppingCart);
}

// TOTAL TESTS
