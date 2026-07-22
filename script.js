const pages = document.querySelectorAll(".page");

let current = 0;

function showPage(index) {

    if (index < 0 || index >= pages.length) return;

    pages[current].classList.remove("active");

    current = index;

    pages[current].classList.add("active");
}

// --------------------
// タップ
// --------------------

document.getElementById("book").addEventListener("click", (e) => {

    const x = e.clientX;

    if (x < window.innerWidth / 2) {

        showPage(current - 1);

    } else {

        showPage(current + 1);

    }

});

// --------------------
// スワイプ
// --------------------

let startX = 0;
let startY = 0;

const book = document.getElementById("book");

book.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;

});

book.addEventListener("touchend", (e) => {

    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    // 縦スクロールは無視
    if (Math.abs(dy) > Math.abs(dx)) return;

    if (Math.abs(dx) < 50) return;

    if (dx < 0) {

        showPage(current + 1);

    } else {

        showPage(current - 1);

    }

});

// --------------------
// キーボード（PC確認用）
// --------------------

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