import {updateCartQuantity } from './cart.js';


export function setupAddToCartButtons() {
    const addToCartBtn = document.querySelectorAll('.js-add-to-cart');
    updateCartQuantity(); 
  
    if (addToCartBtn.length === 0) {
      return;
    }
  
    addToCartBtn.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = button.dataset.productId;
  
        if (!productId) {
          console.warn('Add to Cart button missing data-product-id!');
          return;
        }
  

        updateCartQuantity();

        flashCheckmark();
  
        
      });
    });
  }
  
  export function flashCheckmark(productBox) {
    let checkmark;
    if (productBox) {
      checkmark = productBox.querySelector('.addedCheckmark');
    } else {
      checkmark = document.querySelector('.addedCheckmark');
    }
    if (!checkmark) return;
    checkmark.classList.remove('removeCheckmark');
    setTimeout(() => {
      checkmark.classList.add('removeCheckmark');
  }, 3000);
  }
  