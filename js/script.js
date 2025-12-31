//======================ページトップへボタン========================//
document.addEventListener('DOMContentLoaded', () => {
    const pageTop = document.getElementById('pageTop');
    if (!pageTop) return;

    pageTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
//======================CMSのお知らせ========================//
fetch("api/news.php")
    .then(res => res.json())
    .then(data => {
        if (!data.contents || data.contents.length === 0) return;

        const list = document.querySelector("#newsList");
        if (!list) return;

        // 新しい順（最新が上）にソート
        const sorted = data.contents.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        const html = sorted.map(item => {
            const d = new Date(item.publishedAt);
            const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

            // 改行対応
            const content = item.content.replace(/\n/g, "<br>");

            return `
                <li class="news-item">
                    <span class="news-item__date">${date}</span>
                    <p class="news-item__text">${content}</p>
                </li>
            `;
        }).join("");

        list.innerHTML = html;
    })
    .catch(err => {
        console.error(err);
        document.getElementById("newsList").innerHTML = "<li>お知らせは現在ありません</li>";
    });

//========================== ヘッダー ============================//
let lastScroll = 0;

window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // 下スクロール → 隠れる
        document.querySelector(".header").classList.add("hide");
    } else {
        // 上スクロール → 出る
        document.querySelector(".header").classList.remove("hide");
    }

    lastScroll = currentScroll;
});
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
//================= ふわっと表示エフェクト(fade-in) ======================//
document.addEventListener('DOMContentLoaded', () => {
    const fadeTargets = document.querySelectorAll('.fade-in, .fade-main, .fade-sub');

    if (fadeTargets.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        fadeTargets.forEach(target => observer.observe(target));
    }
});
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