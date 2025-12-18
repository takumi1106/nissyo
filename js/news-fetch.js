//======================CMSのお知らせ========================//
fetch("api/news.php")
    .then(res => res.json())
    .then(data => {
        if (!data.contents || data.contents.length === 0) return;

        const list = document.getElementById("newsList");

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
                    <p class="news-item__title">${item.title}</p>
                    <p class="news-item__text">${content}</p>
                </li>
            `;
        }).join("");

        list.innerHTML = html;
    })
    .catch(err => {
        console.error(err);
        document.getElementById("newsList").innerHTML = "<li>ニュースを取得できませんでした</li>";
    });