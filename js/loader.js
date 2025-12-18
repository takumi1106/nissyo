//==========================ロード画面============================//
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');

    // 最低表示時間 0.55秒
    const minDisplay = 200;

    setTimeout(() => {
        // 文字をフェードアウト
        loadingText.style.transition = 'opacity 2.3s ease';
        loadingText.style.opacity = 0;

        setTimeout(() => {
            // 背景をフェードアウト
            loadingScreen.style.transition = 'opacity 0.5s ease';
            loadingScreen.style.opacity = 0;

            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 700);
        }, 700);
    }, minDisplay);
});