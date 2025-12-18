//========================== form確認ページ ============================//
const confirmBtn = document.getElementById('confirmBtn');
const confirmArea = document.getElementById('confirmArea');
const confirmTitle = document.getElementById('confirmTitle');
const confirmLead = document.getElementById('confirmLead');

const form = document.getElementById('contactForm');

confirmBtn.addEventListener('click', () => {

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    document.querySelectorAll('.contact__inner form > article, #confirmBtn')
        .forEach(el => el.style.display = 'none');

    confirmTitle.style.display = 'block';
    confirmLead.style.display = 'block';
    confirmArea.style.display = 'block';

    document.getElementById('confirm-name').textContent =
        document.getElementById('name').value;

    document.getElementById('confirm-company').textContent =
        document.getElementById('company-name').value;

    document.getElementById('confirm-email').textContent =
        document.getElementById('email').value;

    document.getElementById('confirm-tel').textContent =
        document.getElementById('tel').value;

    document.getElementById('confirm-address').textContent =
        document.getElementById('address').value;

    document.getElementById('confirm-message').textContent =
        document.getElementById('message').value;

    const checked = document.querySelector('input[name="content-type"]:checked');
    document.getElementById('confirm-content').textContent =
        checked ? checked.parentNode.textContent.trim() : '';

    confirmTitle.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
const backBtn = document.getElementById('backBtn');

backBtn.addEventListener('click', () => {
    // 入力画面を再表示
    document.querySelectorAll('.contact__inner form > article, #confirmBtn')
        .forEach(el => el.style.display = '');

    // 確認系を非表示
    confirmTitle.style.display = 'none';
    confirmLead.style.display = 'none';
    confirmArea.style.display = 'none';
});