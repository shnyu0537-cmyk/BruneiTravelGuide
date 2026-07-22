const book = document.getElementById("book");

// スマホ判定
const isMobile = window.matchMedia("(max-width: 767px)").matches;

const pageList = isMobile
    ? [
        "images/pages/cover.jpg",
        "images/pages/01.jpg",
        "images/pages/02.jpg",
        "images/pages/03.jpg",
        "images/pages/04.jpg",
        "images/pages/05.jpg",
        "images/pages/06.jpg",
        "images/pages/07.jpg",
        "images/pages/08.jpg",
        "images/pages/09.jpg",
        "images/pages/10.jpg",
        "images/pages/back.jpg"
    ]
    : [
        "images/pages/cover.jpg",
        "images/spreads/spread01.jpg",
        "images/spreads/spread02.jpg",
        "images/spreads/spread03.jpg",
        "images/spreads/spread04.jpg",
        "images/spreads/spread05.jpg",
        "images/pages/back.jpg"
    ];

let current = 0;

// ページ生成
pageList.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("page");

    if (index === 0) {
        img.classList.add("active");
    }

    book.appendChild(img);
});

const pages = document.querySelectorAll(".page");

// ページ切替
function showPage(index) {

    if (index < 0 || index >= pages.length) return;

    pages[current].classList.remove("active");

    current = index;

    pages[current].classList.add("active");
}

// ---------- タップ ----------

book.addEventListener("click", (e) => {

    if (e.clientX > window.innerWidth / 2) {

        showPage(current + 1);

    } else {

        showPage(current - 1);

    }

});

// ---------- スワイプ ----------

let startX = 0;
let startY = 0;

book.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

});

book.addEventListener("touchend", (e) => {

    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    if (Math.abs(dx) < 50) return;
    if (Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {

        showPage(current + 1);

    } else {

        showPage(current - 1);

    }

});

// ---------- キーボード ----------

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        showPage(current + 1);

    }

    if (e.key === "ArrowLeft") {

        showPage(current - 1);

    }

});

// 初期表示
showPage(0);