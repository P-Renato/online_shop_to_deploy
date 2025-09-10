export function setupLoginModal() {
    const profileIcon = document.querySelector('.profileIcon');
    const loginModal = document.querySelector('.login-modal');
    const closeModal = document.querySelector('.closeModal');
    const body = document.querySelector('body');

    if (profileIcon && loginModal) {
        profileIcon.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('active');
        });
    }

    if (closeModal && loginModal) {
        closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
        });
    }

    // Hide modal when pressing ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
        loginModal.classList.remove('active');
        }
    });
}

