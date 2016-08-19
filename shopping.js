var pricingRules = require('./data/pricingRules.json');

var co = require('./src/checkout.js');

var shoppingCart = [];
shoppingCart = co.scan(shoppingCart, 'atv');
shoppingCart = co.scan(shoppingCart, 'atv');
shoppingCart = co.scan(shoppingCart, 'ipd');
var total = co.total(shoppingCart, pricingRules);

console.log('Purchased items: ')
console.log(shoppingCart);
console.log('Total price: $', total);
