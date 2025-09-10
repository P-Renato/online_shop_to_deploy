import { fetchProducts } from "./fetchProducts.js";
import './date.js';
import {updateCartQuantity, addToCart, setupDeleteItem } from './cart.js';
import { setupLoginModal } from "./loginModal.js"; 


document.addEventListener('DOMContentLoaded', ()=>{
  updateCartQuantity(); 
  setupDeleteItem();
  setupLoginModal();
})

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
console.log('Product ID:', productId)

let allProducts = JSON.parse(localStorage.getItem('allProducts'));
console.log('allProducts from localStorage:', allProducts);
let productsArray = Object.values(allProducts);
let product = productsArray.find(p => p.id == productId);



if (!product) {
  console.warn('Product not found in localStorage. Refetching...');
  allProducts = await fetchProducts();
  product = allProducts?.find(p => p.id == productId);
}

const container = document.getElementById('product-details');
container.innerHTML = `
<div class="product-details">
<h1>${product.title}</h1>
<img src="${product.image}" alt="${product.title}" />
<p class="descriptionText">${product.description}</p>
<div class="priceText addedToBasket"> 
<div class="priceGreenTag">
<p class="price"><strong>Price:</strong> $${product.price.toFixed(2)}</p></div>
<div class="addedCheckmark removeCheckmark">
<img class="checkmark" src="Icons/checkmark.png" alt="checkmark">
<p class="addedText"> Added to basket </p>
</div>
</div>
<button class="js-add-to-cart" data-product-id="${productId}">Add to basket</button>
</div>
`;


const sliderContainer = document.querySelector('.slider');

// Add all product images to the slider
productsArray.forEach((p) => {
  const img = document.createElement('img');
  img.src = p.image;
  img.alt = p.title;
  img.classList.add('slider-image');
  img.dataset.productId = p.id;

  
  img.addEventListener('click', () => {
    window.location.href = `product.html?id=${p.id}`; // Reload page with new product
    
  });

  sliderContainer.appendChild(img);
});


document.querySelector('.js-add-to-cart')?.addEventListener('click', () => {
  console.log('[DEBUG] Add button clicked for:', productId);
  addToCart(productId);
});



const slider = document.querySelector('.slider');
document.querySelector('.scroll-btn.left').addEventListener('click', () => {
  slider.scrollBy({ left: -200, behavior: 'smooth' });
});
document.querySelector('.scroll-btn.right').addEventListener('click', () => {
  slider.scrollBy({ left: 200, behavior: 'smooth' });
});