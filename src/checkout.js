module.exports = function Checkout(inventory, pricingRules) {

  this.inventory = inventory;
  this.pricingRules = pricingRules;
  this.freeItemList = [];
  this.shoppingCart = [];
  this.totalPrice = 0;

  this.scan = function scan(sku) {
    var item = this.getItemFromSku(sku);

    this.getShoppingCart().push(item);

    // Check to see if the item comes free from the purchase of another item.
    // If it does, then it's free and we remove it from the free item list
    var freeItemIndex = this.freeItemList.indexOf(sku);
    if(freeItemIndex < 0 ) {
      this.totalPrice += item["price"];
    } else {
      this.removeFromFreeItemList(freeItemIndex);
    }

    this.applyPricingDeals(sku);
  }

  this.applyPricingDeals = function applyPricingDeals(sku) {
    for (var key in this.pricingRules) {
      var rule = this.pricingRules[key];

      if(key === 'freeItem') {
        if(rule['triggerSku'] === sku) {
          this.addToFreeItemList(rule['freeItemSku'])
        }
      } else if (key === 'xForPriceOfY') {

        if(rule['triggerSku'] === sku) {
          var x = rule['x'];
          var y = rule['y'];
          this.applyXForPriceOfY(x, y, sku)
        }
      } else if (key === 'bulkDiscount') {

        if(rule['triggerSku'] === sku) {
          var minItemCount = rule["minItemCount"];
          var discountPrice = rule["discountPrice"];
          this.applyBulkDiscount(minItemCount, discountPrice, sku);
        }
      }
    }
  }

  this.applyBulkDiscount = function applyBulkDiscount(minItemCount, discountPrice, sku) {
    var itemCount = this.getCountOfSkuInCart(sku);
    var item;
    item = this.getItemFromSku(sku);
    priceDifference = item["price"] - discountPrice;
    if (itemCount === minItemCount) {
      this.totalPrice -= (priceDifference * minItemCount);
    } else if (itemCount > minItemCount) {
      this.totalPrice -= priceDifference;
    }
  }

  this.applyXForPriceOfY = function applyXForPriceOfY(x, y, sku) {
    var itemCount = this.getCountOfSkuInCart(sku);
    if(itemCount % x === 0) {
      var item = this.getItemFromSku(sku);
      var itemPricetoSubtract = ((x - y) * item["price"]);
      this.totalPrice -= itemPricetoSubtract;
    }
  }

  this.getCountOfSkuInCart = function getCountOfSkuInCart(sku) {
    var count = 0;
    var cart = this.getShoppingCart();
    for(var i = 0; i < cart.length; i++ ) {
      if(sku === cart[i]["sku"]) {
        count++;
      }
    }
    return count;
  }

  this.getShoppingCart = function getShoppingCart() {
    return this.shoppingCart;
  }

  this.addToFreeItemList = function addToFreeItemList(sku) {
    this.freeItemList.push(sku);
  }

  this.removeFromFreeItemList = function removeFromFreeItemList(index) {
    this.freeItemList.splice(index, 1);
  }

  this.getItemFromSku = function getItemFromSku(sku) {
    for (var i = 0; i < inventory.length; i++) {
      if (sku === inventory[i]["sku"]) {
        return inventory[i];
      }
    }
    return "Item not found";
  }

  this.total = function total() {
    return this.totalPrice;
  }

}
