var pricingRules = require('./data/pricingRules.json');
var inventory = require('./data/inventory.json');

var Checkout = require('./src/checkout.js');
var co = new Checkout(inventory, pricingRules)

co.scan('mbp');
// shoppingCart = co.scan(shoppingCart, 'atv');
// shoppingCart = co.scan(shoppingCart, 'ipd');
// var total = 0;//co.total(shoppingCart);

console.log('Purchased items: ')
console.log(co.getShoppingCart());
console.log('Total price: $', co.total());
