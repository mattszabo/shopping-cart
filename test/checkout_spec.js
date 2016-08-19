var chai = require('chai');
var expect = chai.expect;

var Checkout = require('../src/checkout.js');
var inventory = [
  { "sku": "ipd", "name": "Super iPad", "price": 549.99 },
  { "sku": "mbp", "name": "MacBook Pro", "price": 1399.99 },
  { "sku": "atv", "name": "Apple TV", "price": 109.50 },
  { "sku": "vga", "name": "VGA adapter", "price": 30.00 }
];
var pricingRules = {
  "freeItem": { "triggerSku": "mbp", "freeItemSku": "vga" },
  "xForPriceOfY": { "triggerSku": "atv", "x": 3, "y": 2 },
  "bulkDiscount": { "triggerSku": "ipd", "minItemCount": 4, "discountPrice": 499.99}
}

describe('Checkout logic', () => {
  describe('Scanning Items', () => {

    it('adds a single item to the shopping cart with correct sku', () => {
      var co = new Checkout(inventory, pricingRules);

      co.scan('ipd');

      expect(co.getShoppingCart().length).to.equal(1);
      expect(co.getShoppingCart()[0]["sku"]).to.equal('ipd');
    });


    it('adds two duplicate items to the shopping cart with correct sku', () => {
      var co = new Checkout(inventory, pricingRules);

      //not a pure function
      co.scan('ipd');
      co.scan('ipd');

      expect(co.getShoppingCart().length).to.equal(2);
      expect(co.getShoppingCart()[0]["sku"]).to.equal('ipd');
      expect(co.getShoppingCart()[1]["sku"]).to.equal('ipd');
    });

    it('adds three items to the shopping cart (2 are duplicates) with correct skus', () => {
      var co = new Checkout(inventory, pricingRules);

      //not a pure function
      co.scan('ipd');
      co.scan('ipd');
      co.scan('vga');

      expect(co.getShoppingCart().length).to.equal(3);
      expect(co.getShoppingCart()[0]["sku"]).to.equal('ipd');
      expect(co.getShoppingCart()[1]["sku"]).to.equal('ipd');
      expect(co.getShoppingCart()[2]["sku"]).to.equal('vga');
    });

  });

  describe('Totalling prices', () => {
    it('Calculates single item cost', () => {
      var co = new Checkout(inventory, pricingRules);

      co.scan('mbp');
      expect(co.total()).to.equal(1399.99);
    });

    it('Calculates multiple item cost', () => {
      var co = new Checkout(inventory, pricingRules);

      co.scan('mbp');
      co.scan('ipd');
      co.scan('atv');

      expect(co.total()).to.equal(1399.99+549.99+109.50);
    });

    it('Deducts free item price based on pricing rules', () => {
      var co = new Checkout(inventory, pricingRules);

      co.scan('mbp');
      co.scan('vga');

      expect(co.total()).to.equal(1399.99);
    })

    it('Applies the x for the price of y rule', () => {
      var co = new Checkout(inventory, pricingRules);

      co.scan('atv');
      co.scan('atv');
      co.scan('atv');

      expect(co.total()).to.equal(109.5 * 2);
    })

    it('Applies the bulk buy pricing rule', () => {
      var co = new Checkout(inventory, pricingRules);

      co.scan('ipd');
      co.scan('ipd');
      co.scan('ipd');
      co.scan('ipd');

      expect(co.total()).to.equal(499.99 * 4);
    })
  });

});
