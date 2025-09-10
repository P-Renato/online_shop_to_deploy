import { render } from './store.js';
import './date.js'; 
import { updateCartQuantity } from './cart.js';
import { fetchProducts } from "./fetchProducts.js";
import { setupLoginModal } from './loginModal.js';

document.addEventListener('DOMContentLoaded', () => {
    setupLoginModal(); 
});

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.products-container');

  if (!container) {
    console.warn('No container found on main page!');
    return;
  }
  await fetchProducts();
  await render(container);

  observeProductImages();

  const slideImage = document.querySelector('.slideImg');
  if (slideImage) {
    observeSlideImage(slideImage);
  } else {
    console.warn('No element found with class .slideImg to observe.');
  }
  updateCartQuantity();
});




function observeProductImages () {
    const images = document.querySelectorAll('.product-image');
  
    if (images.length === 0)  {
      console.warn('No images found with class .product-image to observe.');
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, {
      threshold: 0.1
    });
  
    images.forEach(img => observer.observe(img));
  };
  

  
function observeSlideImage(image) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        image.classList.add('slide-animation');
      } else {
        image.classList.remove('slide-animation');
      }
    });
  }, {
    threshold: 0,
    rootMargin: "0px 0px -50% 0px"
  });

  observer.observe(image);
}

// document.addEventListener('DOMContentLoaded', () => {
//   const profileIcon = document.querySelector('.profileIcon');
//   const loginModal = document.querySelector('.login-modal');
//   const closeModal = document.querySelector('.closeModal')

//   if (profileIcon) {
//     profileIcon.addEventListener('click', (e) => {
//       e.preventDefault();
//       loginModal.classList.replace('login-modal', 'active');
//     });
//   }

//   // Optional: Hide modal when clicking outside or pressing ESC
//   closeModal.addEventListener('click', (e) => {
//     console.log(loginModal)
//     if (e.target === closeModal) {
//        loginModal.style.border = '2px solid black'
//       loginModal.classList.replace('active', 'login-modal');
//     }
//   });
//   window.addEventListener('cick', (e) => {
//     if (e.key === 'Escape'&& loginModal.classList.contains('active')) {
//       loginModal.classList.remove('active');
//     }
//   });
// });



// document.addEventListener('DOMContentLoaded', () => {
//   const profileIcon = document.querySelector('.profileIcon');
//   const loginModal = document.querySelector('.login-modal');
//   const closeModal = document.querySelector('.closeModal');
//   const body = document.querySelector('body');

//   if (profileIcon && loginModal) {
//     profileIcon.addEventListener('click', (e) => {
//       e.preventDefault();
//       loginModal.classList.add('active');
//     });
//   }

//   if (closeModal && loginModal) {
//     closeModal.addEventListener('click', () => {
//       loginModal.classList.remove('active');
//     });
//   }

//   // Hide modal when pressing ESC
//   window.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && loginModal.classList.contains('active')) {
//       loginModal.classList.remove('active');
//     }
//   });
// });

