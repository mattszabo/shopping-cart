var pricingRules = require('./data/pricingRules.json');

var co = require('./src/checkout.js');

var shoppingCart = {
  "items": []
};
shoppingCart = co.scan(shoppingCart, 'atv');
shoppingCart = co.scan(shoppingCart, 'atv');
shoppingCart = co.scan(shoppingCart, 'atv');
var total = co.total(shoppingCart, pricingRules);

console.log('Purchased items: ')
console.log(shoppingCart["items"]);
console.log('Total price: $', total);
