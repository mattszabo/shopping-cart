var pricingRules = require('./data/pricingRules.json');
var inventory = require('./data/inventory.json');

var Checkout = require('./src/checkout.js');
var co = new Checkout(inventory, pricingRules)

co.scan('mbp');
co.scan('vga');
co.scan('ipd');

console.log('Purchased items: ')
console.log(co.getShoppingCart());
console.log('Total price: $', co.total());
