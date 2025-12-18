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