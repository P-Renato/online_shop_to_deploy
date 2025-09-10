export class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateQuantityDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const totalQuantity = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = totalQuantity;
    }
  }

  add(productId, deliveryOptionId = null) {
    if (!productId) {
      console.warn('Invalid productId passed to add');
      return;
    }

    if (deliveryOptionId === null) {
      const deliveryInput = document.querySelector('input[name="delivery-option"]:checked');
      deliveryOptionId = deliveryInput ? deliveryInput.value : 1;
    }

    const matchingItem = this.cart.find(
      item => item.productId === productId && item.deliveryOptionId == deliveryOptionId
    );

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cart.push({ productId, quantity: 1, deliveryOptionId });
    }

    this.save();
    this.updateQuantityDisplay();
  }

  remove(productId, deliveryOptionId) {
    this.cart = this.cart.filter(
      item => !(item.productId === productId && item.deliveryOptionId == deliveryOptionId)
    );
    this.save();
    this.updateQuantityDisplay();
  }

  updateQuantity(productId, deliveryOptionId, newQuantity) {
    const item = this.cart.find(
      item => item.productId === productId && item.deliveryOptionId == deliveryOptionId
    );
    if (item) {
      item.quantity = newQuantity;
      this.save();
      this.updateQuantityDisplay();
    }
  }

  getCart() {
    return this.cart;
  }
}
