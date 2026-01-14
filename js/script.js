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
    const links = nav?.querySelectorAll('.nav-morph__link');

    if (!hamburger || !nav || !links) return;

    const isDesktop = () =>
        window.matchMedia('(min-width: 1024px)').matches;

    /* =========================
       フォーカス制御
    ========================= */
    const disableLinks = () => {
        links.forEach(link => {
            link.tabIndex = -1;
        });
    };

    const enableLinks = () => {
        links.forEach(link => {
            link.tabIndex = 0;
        });
    };

    /* =========================
       メニュー開く
    ========================= */
    const openMenu = () => {
        if (isDesktop()) return;

        nav.hidden = false;                // ★ aria-hiddenは使わない
        requestAnimationFrame(() => {
            nav.classList.add('active');
        });

        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');

        enableLinks();
        document.body.style.overflow = 'hidden';

        links[0]?.focus();
    };

    /* =========================
       メニュー閉じる
    ========================= */
    const closeMenu = () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');

        disableLinks();
        document.body.style.overflow = '';

        nav.addEventListener(
            'transitionend',
            () => {
                if (!nav.classList.contains('active')) {
                    nav.hidden = true;
                }
            },
            { once: true }
        );

        hamburger.focus();
    };

    /* =========================
       初期状態
    ========================= */
    nav.hidden = true;
    disableLinks();

    /* =========================
       イベント
    ========================= */
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.contains('active')
            ? closeMenu()
            : openMenu();
    });

    nav.addEventListener('click', (e) => {
        if (e.target.closest('.nav-morph__link')) return;
        closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (isDesktop()) {
            closeMenu();
        }
    });
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
const backBtn = document.getElementById('backBtn');

// ヘッダー高さ取得（スマホ対応）
function getHeaderHeight() {
    let header = document.querySelector('.header');
    let height = header ? header.offsetHeight : 80;

    // スマホサイズ（768px以下）なら少し補正
    if (window.innerWidth <= 768) {
        height = height * 1.4; // 調整値
    }
    return height;
}

// スクロール補正関数
function scrollToElement(el, offset = 0) {
    const headerHeight = getHeaderHeight();
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
}

// 確認ボタン押下
if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        if (!form.checkValidity()) {
            form.reportValidity();

            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                scrollToElement(firstInvalid, 20); // 余白20px
            }
            return;
        }

        // 入力画面非表示
        document.querySelectorAll('.contact__inner form > article, #confirmBtn')
            .forEach(el => el.style.display = 'none');

        // 確認画面表示
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

        // 確認画面スクロール
        scrollToElement(confirmTitle);
    });
}

if (backBtn) {
    backBtn.addEventListener('click', () => {
        // 入力画面を再表示
        document.querySelectorAll('.contact__inner form > article, #confirmBtn')
            .forEach(el => el.style.display = '');

        // 確認画面非表示
        confirmTitle.style.display = 'none';
        confirmLead.style.display = 'none';
        confirmArea.style.display = 'none';

        // 入力画面スクロール（トップ付近に戻す）
        scrollToElement(form);
    });
}
//========================== スクロールストップ ============================//
document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight) {
        window.scrollTo(0, documentHeight - windowHeight);
    }
});