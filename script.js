const spreads = document.querySelectorAll(".spread");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumber = document.getElementById("pageNumber");

let current = 0;

function showPage(index) {

    if (index < 0 || index >= spreads.length) return;

    spreads[current].classList.remove("active");

    current = index;

    spreads[current].classList.add("active");

    pageNumber.textContent = `${current + 1} / ${spreads.length}`;

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === spreads.length - 1;

    prevBtn.style.opacity = current === 0 ? 0.4 : 1;
    nextBtn.style.opacity = current === spreads.length - 1 ? 0.4 : 1;
}

prevBtn.addEventListener("click", () => {
    showPage(current - 1);
});

nextBtn.addEventListener("click", () => {
    showPage(current + 1);
});

// スワイプ対応
let startX = 0;

document.getElementById("book").addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.getElementById("book").addEventListener("touchend", e => {

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) < 50) return;

    if (diff < 0) {
        showPage(current + 1);
    } else {
        showPage(current - 1);
    }

});

// キーボード対応（PC確認用）
document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight") {
        showPage(current + 1);
    }

    if (e.key === "ArrowLeft") {
        showPage(current - 1);
    }

});

// 初期化
showPage(0);