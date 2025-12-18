//=================== ふわっと表示エフェクト ======================//
document.addEventListener('DOMContentLoaded', () => {
    const fadeTargets = document.querySelectorAll('.fade-in');

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