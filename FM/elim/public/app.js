const slider = document.getElementById("nSlider");
const nValue = document.getElementById("nValue");
const eHatSpan = document.getElementById("eHat");
const canvas = document.getElementById("numberLine");
const ctx = canvas.getContext("2d");
const E = Math.E;
const autoBtn = document.getElementById("autoBtn");
const autoIcon = document.getElementById("autoIcon");
let autoInterval = null;
let isAutoRunning = false;

function computeEHat(n) {
    return Math.pow(1 + 1 / n, n);
}

function drawNumberLine(eHat) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const min = 0.85;
    const max = 3.15;
    const y = 60;
    const leftPad = 30;
    const rightPad = 30;
    const lineStart = leftPad;
    const lineEnd = canvas.width - rightPad;
    const mapX = x =>
        lineStart +
        (x - min) / (max - min) * (lineEnd - lineStart);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(lineStart, y);
    ctx.lineTo(lineEnd, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(lineStart, y);
    ctx.lineTo(lineStart + 10, y - 6);
    ctx.lineTo(lineStart + 10, y + 6);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(lineEnd, y);
    ctx.lineTo(lineEnd - 10, y - 6);
    ctx.lineTo(lineEnd - 10, y + 6);
    ctx.closePath();
    ctx.fill();

    ctx.font = "14px Arial";
    [1, 2, 3].forEach(val => {
        const x = mapX(val);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(val.toString(), x - 4, y + 22);
    });

    const eX = mapX(E);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(eX, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("e", eX - 4, y - 14);

    const eHatX = mapX(eHat);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(eHatX, y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("ê", eHatX - 6, y - 14);
}

function update() {
    const n = Number(slider.value)
    const eHat = computeEHat(n)
    nValue.innerHTML = "\\( n = " + n + " \\)";
    MathJax.typesetPromise([nValue]);
    eHatSpan.innerHTML = "\\( \\hat e = " + eHat.toFixed(8) + "... \\)";
    MathJax.typesetPromise([eHatSpan]);
    drawNumberLine(eHat)
}

function startAuto() {
    isAutoRunning = true;
    autoIcon.src = "icons/pause.svg";
    autoInterval = setInterval(() => {
        let n = Number(slider.value);

        if (n >= 150) {
            n = 1;
        } else {
            n += 1;
        }

        slider.value = n;
        update();
    }, 200)
}

function stopAuto() {
    isAutoRunning = false;
    autoIcon.src = "icons/play.svg";
    clearInterval(autoInterval);
}

update()

slider.addEventListener("input", () => {
    if (isAutoRunning) {
        stopAuto();
    }
    update();
});
autoBtn.addEventListener("click", () => {
    if (isAutoRunning) {
        stopAuto();
    } else {
        startAuto();
    }
});