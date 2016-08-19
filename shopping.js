var pricingRules = require('./data/pricingRules.json');
var inventory = require('./data/inventory.json');

var Checkout = require('./src/checkout.js');
var co = new Checkout(inventory, pricingRules)

// console.log(co);
// var co = new Checkout(inventory, pricingRules);
var shoppingCart = [];
shoppingCart = co.scan(shoppingCart, 'mbp');
// shoppingCart = co.scan(shoppingCart, 'atv');
// shoppingCart = co.scan(shoppingCart, 'ipd');
var total = 0;//co.total(shoppingCart);

console.log('Purchased items: ')
console.log(shoppingCart);
console.log('Total price: $', total);
