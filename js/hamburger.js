//======================ハンバーガーメニュー========================//
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-morph');
    const nav = document.querySelector('.nav-morph');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');

            const isOpen = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            nav.setAttribute('aria-hidden', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }
});