import { renderCheckoutPage } from './checkout.js';
import { setupAddToCartButtons } from './checkmark.js';
import './deliveryOptions.js'
import {renderOrderSummary} from './orderSummary.js'


document.addEventListener('DOMContentLoaded', ()=>{
  setupAddToCartButtons();
  renderCheckoutPage();
  removeFromCart()
})

export function updateCartQuantity() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartQuantity = 0;
  storedCart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
    console.log('Cart quantity is', cartQuantity)
  });

  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cartQuantity;
  }
  if (storedCart.length === 0) {
    const checkoutContainer = document.querySelector('.checkout-products');
    if (checkoutContainer) {
     checkoutContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
  }
}

export  function addToCart(productId) {
  console.trace('addToCart called with:', productId);
    if (!productId) {
        console.warn('Invalid productId passed to addToCart:', productId);
        return; 
      }
    const cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const deliveryInput = document.querySelector(`input[name="delivery-option-${productId}"]:checked`);
    let selectedDeliveryOptionId = '1';
    if (deliveryInput) {
      selectedDeliveryOptionId = deliveryInput.value;
    }
    
    const matchingItem = cart.find(item =>
      String(item.productId) === String(productId) &&
      String(item.deliveryOptionId) === String(selectedDeliveryOptionId)
    );
  

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId.toString(),
        quantity: 1,
        deliveryOptionId: selectedDeliveryOptionId
      });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity(); 
    renderCheckoutPage();
  }

  /* “Hey! When the user changes the quantity on this dropdown (selectQuantity), 
  I want you to update this cart item (cartItem) in the cart.”*/
  export function setupQuantityChangeListener(selectElement, cartItem, quantityTextElement) {
    selectElement.addEventListener('change', () => {
      const newQuantity = Number(selectElement.value);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const itemToUpdate = cart.find(item =>
        String(item.productId) === String(cartItem.productId) &&
        String(item.deliveryOptionId) === String(cartItem.deliveryOptionId)
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        quantityTextElement.textContent = `Quantity: ${newQuantity}`;
        updateCartQuantity();
        renderCheckoutPage();
        renderOrderSummary();
      }
    });
  }
  

  
  export function setupDeleteItem() {
    const deleteBtn = document.querySelectorAll('.delete-button');
    
    deleteBtn.forEach((button) =>{
      button.addEventListener('click', (event)=>{
        event.preventDefault();
        event.stopPropagation();

        const productId = button.dataset.productId;
        const deliveryOptionId = button.dataset.deliveryOptionId; // <-- treat as string

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.filter(item => 
          !(String(item.productId) === String(productId) &&
            String(item.deliveryOptionId) === String(deliveryOptionId))
        );
        
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart)

        const removeFromDOM = document.querySelector(
          `.checkout-box-id${productId}[data-delivery-option-id="${deliveryOptionId}"]`
        )

        if (removeFromDOM) {
          removeFromDOM.remove();
        } else {
          console.warn('No DOM element found for:', {
            productId,
            deliveryOptionId,
            selector: `.checkout-box-id${productId}[data-delivery-option-id="${deliveryOptionId}"]`
          });     
        }
        renderOrderSummary();
        updateCartQuantity();
      })
    })
  }


  function removeFromCart(cart, productId, deliveryOptionId) {
  if (!Array.isArray(cart)) return [];

 return cart.filter(item => {
    return !(
      Number(item.productId) === productId &&
      Number(item.deliveryOptionId) === deliveryOptionId
    );
  });
}

/*
<button class="js-add-to-cart" data-product-id="123">Add to basket</button>
*/