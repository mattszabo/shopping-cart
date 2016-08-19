var pricingRules = require('./data/pricingRules.json');

var co = require('./src/checkout.js');

var shoppingCart = [];
shoppingCart = co.scan(shoppingCart, 'atv');
shoppingCart = co.scan(shoppingCart, 'atv');
shoppingCart = co.scan(shoppingCart, 'ipd');
var total = 0;//co.total(shoppingCart);

console.log('Purchased items: ')
console.log(shoppingCart);
console.log('Total price: $', total);
