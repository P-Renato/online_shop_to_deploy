import { fetchProducts } from './fetchProducts.js';
import {updateCartQuantity, addToCart } from './cart.js';
import { flashCheckmark } from './checkmark.js';
import { setupLoginModal } from './loginModal.js';

document.addEventListener('DOMContentLoaded', () => {
    setupLoginModal(); 
});


export async function render(container) {
  if (!container) {
    console.warn('No container found!');
    return;
  }
  const products = await fetchProducts();

    const categories = {};
    Object.values(products).forEach(product => {
    if (!categories[product.category]) {
        categories[product.category] = [];
    }
    categories[product.category].push(product);
    });


    for (const categoryName in categories) {
        const categoryBox = document.createElement('div');
        categoryBox.classList.add('category-box');

        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = categoryName;
        categoryBox.appendChild(categoryHeading);

        const categoryContent = document.createElement('div');
        categoryContent.classList.add('boxed-product-content');
        categoryBox.appendChild(categoryContent);

        categories[categoryName].forEach(product => {
            const productBox = document.createElement('div');
            productBox.classList.add('product-box');

            const img = document.createElement('img');
            img.src = product.image || "";
            img.classList.add('product-image');
            img.style.width = '5em';
            img.style.margin = '0.5em';
            productBox.appendChild(img);

            const title = document.createElement('h3');
            title.textContent = product.title;
            productBox.appendChild(title);

            const description = document.createElement('p');
            description.textContent = product.description || "";
            productBox.appendChild(description);
            
            const ratingCount = document.createElement('span');
            ratingCount.textContent = product.rating.count || "";

            const roundedToFive = Math.round(product.rating.rate * 10 / 5) * 5;  // This is to make it multiple to 5
            const ratingStars = document.createElement('img');
            ratingStars.src = `./ratings/rating-${roundedToFive}.png`;
            ratingStars.style.height = '1em';    
            ratingStars.style.width = '4em';      
            
            const ratingBox = document.createElement('aside');
            ratingBox.classList.add('rating-box');
            productBox.appendChild(ratingBox);
            ratingBox.appendChild(ratingStars);
            ratingBox.appendChild(ratingCount);


            const price = document.createElement('p');
            price.textContent = `$${(product.price).toFixed(2)}`;
            productBox.appendChild(price);

            const btn = document.createElement('button');
            btn.classList.add('add-to-basket-btn');
            btn.textContent = 'Add to basket';
            btn.dataset.productId = product.id; 
            productBox.appendChild(btn);

            const addedCheckmark = document.createElement('div');
          
            addedCheckmark.classList.add('addedCheckmark', 'removeCheckmark');

            const checkmarkImg = document.createElement('img');
            checkmarkImg.classList.add('checkmark');
            checkmarkImg.src = './Icons/checkmark.png';
            checkmarkImg.alt = 'checkmark';

            const addedText = document.createElement('p');
            addedText.classList.add('addedText');
            addedText.textContent = 'Added to basket';

            // Append the image and text to the checkmark container
            addedCheckmark.appendChild(checkmarkImg); 
            addedCheckmark.appendChild(addedText);
            


            // Then append addedCheckmark to your container (e.g., productBox)
            productBox.appendChild(addedCheckmark);

            
            btn.addEventListener('click', (e)=>{
              const productId = btn.dataset.productId
              addToCart(productId);
              updateCartQuantity();

              const productBox = btn.closest('.product-box');
              flashCheckmark(productBox);
            });



            img.addEventListener('click', () => {
                const productNewWindow = window.location.href = `product.html?id=${product.id}`;
                
              });

            categoryContent.appendChild(productBox);
        });

        container.appendChild(categoryBox);
    }

}


