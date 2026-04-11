/* POLYGON */
let canvas = document.getElementById('drawingBoard')
canvas.width = window.innerWidth - canvas.offsetLeft
canvas.height = window.innerHeight - canvas.offsetTop
let ctx = canvas.getContext('2d')

document.getElementById('xCenterRange').value = Math.round((canvas.width - canvas.width * .05) / 2)
document.getElementById('xCenterLabel').innerHTML = 'Merkez (x): ' + Math.round((canvas.width - canvas.width * .05) / 2)
document.getElementById('yCenterRange').value = Math.round(canvas.height - canvas.height * .8 / 2)
document.getElementById('yCenterLabel').innerHTML = 'Merkez (y): ' + Math.round(canvas.height - canvas.height * .8 / 2)
document.getElementById('radius').value = Math.round(canvas.height * 1.15 / 2)
document.getElementById('radiusLabel').innerHTML = 'Yarıçap: ' + Math.round(canvas.height * 1.15 / 2)

let missing = 'polygonMiddle'

let edgeNum = 3
let stepNum = 1
let ba

let arrPoly = []
class mPoly {
    constructor(xCenter, yCenter, r) {
        this.xCenter = xCenter
        this.yCenter = yCenter
        this.r = r
    }
}

function calculatePolyPerimeter(n, a, k = 1) {
    if (n < 3 || a < 1 || k <= 0) {
        throw new Error("n >= 3, a >= 1 ve k > 0 olmalı.");
    }

    const r = Math.cos(Math.PI / n);

    let terms = [];
    let total = 0;

    for (let i = 0; i < a; i++) {
        let perimeter = n * k * Math.pow(r, i);
        total += perimeter;

        let formatted = Number(perimeter.toFixed(2)).toLocaleString("tr-TR");
        terms.push(formatted);
    }

    let expression = terms.join("+");
    let totalFormatted = Number(total.toFixed(2)).toLocaleString("tr-TR");

    return {
        strPer: expression,
        sumPer: totalFormatted
    };
}

function calculatePolyArea(n, a, k = 1) {
    if (n < 3 || a < 1 || k <= 0) {
        throw new Error("n >= 3, a >= 1 ve k > 0 olmalı.");
    }

    const r = Math.cos(Math.PI / n);
    const r2 = r * r;
    const A1 = (n * k * k) / (4 * Math.tan(Math.PI / n));

    let terms = [];
    let total = 0;

    for (let i = 0; i < a; i++) {
        let area = A1 * Math.pow(r2, i);
        total += area;

        let formatted = Number(area.toFixed(2)).toLocaleString("tr-TR");
        terms.push(formatted);
    }

    let expression = terms.join("+");
    let totalFormatted = Number(total.toFixed(2)).toLocaleString("tr-TR");

    return {
        strArea: expression,
        sumArea: totalFormatted
    };
}

function calculateSierpinskiPerimeter(a, k = 1) {
    if (a < 1 || k <= 0) {
        throw new Error("a >= 1 ve k > 0 olmalı.");
    }
    let perimeter = 3 * k * Math.pow(3 / 2, a - 1);
    return {
        sumPer: Number(perimeter.toFixed(2)).toLocaleString("tr-TR")
    };
}

function calculateSierpinskiArea(a, k = 1) {
    if (a < 1 || k <= 0) {
        throw new Error("a >= 1 ve k > 0 olmalı.");
    }

    let area = Math.pow(3, a - 1) * Math.pow(k / Math.pow(2, a - 1), 2) * Math.sqrt(3) / 4;

    return {
        sumArea: Number(area.toFixed(2)).toLocaleString("tr-TR")
    };
}

function drawPolyCalculates() {
    let per = calculatePolyPerimeter(edgeNum, stepNum, 1)
    let are = calculatePolyArea(edgeNum, stepNum, 1)


    ctx.beginPath
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";

    stepNum > 1 ? ctx.fillText("Toplam Çevre = " + per.strPer + " = " + per.sumPer, 20, innerHeight - 55) : ctx.fillText("Toplam Çevre = " + per.sumPer, 20, innerHeight - 55);
    stepNum > 1 ? ctx.fillText("Toplam Alan   = " + are.strArea + " = " + are.sumArea, 20, innerHeight - 25) : ctx.fillText("Toplam Alan   = " + are.sumArea, 20, innerHeight - 25);

    ctx.closePath
}

function drawSierCalculates() {
    let per = calculateSierpinskiPerimeter(stepNum, 1)
    let are = calculateSierpinskiArea(stepNum, 1)

    ctx.beginPath
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";

    ctx.fillText("Toplam Çevre = " + per.sumPer, 20, innerHeight - 55)
    ctx.fillText("Toplam Alan   = " + are.sumArea, 20, innerHeight - 25)

    ctx.closePath
}

function updateArrayCorner() {
    ba = (Math.PI - 2 * Math.PI / edgeNum) / 2
    arrPoly = []
    let mp = new mPoly(Number(document.getElementById('xCenterRange').value), Number(document.getElementById('yCenterRange').value), Number(document.getElementById('radius').value))
    arrPoly.push(mp)
    for (let s = 0; s < stepNum - 1; s++) {
        mp = new mPoly(arrPoly[s].xCenter - arrPoly[s].r * Math.cos(ba) / 2, arrPoly[s].yCenter + arrPoly[s].r * Math.sin(ba) / 2, arrPoly[s].r / 2)
        arrPoly.push(mp)
    }
}

function updateArrayMiddle() {
    ba = (Math.PI - 2 * Math.PI / edgeNum) / 2
    arrPoly = []
    let mp = new mPoly(Number(document.getElementById('xCenterRange').value), Number(document.getElementById('yCenterRange').value), Number(document.getElementById('radius').value))
    arrPoly.push(mp)
    for (let s = 0; s < stepNum - 1; s++) {
        mp = new mPoly(arrPoly[s].xCenter, arrPoly[s].yCenter, arrPoly[s].r * Math.sin(ba))
        arrPoly.push(mp)
    }
}

function drawPolygonCorner() {
    updateArrayCorner()
    arrPoly.forEach(mp => {
        ctx.beginPath()
        ctx.moveTo(mp.xCenter + mp.r * Math.cos(ba), mp.yCenter + mp.r * Math.sin(ba))
        for (var i = 1; i <= edgeNum; i += 1) {
            ctx.lineTo(mp.xCenter + mp.r * Math.cos(i * 2 * Math.PI / edgeNum + ba), mp.yCenter + mp.r * Math.sin(i * 2 * Math.PI / edgeNum + ba))
        }
        ctx.strokeStyle = "#0000EE"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(mp.xCenter, mp.yCenter, 1, 0, 2 * Math.PI)
        ctx.fillStyle = "#0000EE"
        ctx.fill()
        ctx.closePath()
    })
    drawPolyCalculates()
}

function drawPolygonMiddle() {
    updateArrayMiddle()
    let s = 0
    arrPoly.forEach(mp => {
        s++
        ctx.beginPath()
        if (s % 2 != 0) {
            ctx.moveTo(mp.xCenter + mp.r * Math.cos(ba), mp.yCenter + mp.r * Math.sin(ba))
        } else {
            ctx.moveTo(mp.xCenter + mp.r * Math.cos(Math.PI / 2), mp.yCenter + mp.r * Math.sin(Math.PI / 2))
        }
        for (var i = 0; i <= edgeNum; i += 1) {
            if (s % 2 != 0) {
                ctx.lineTo(mp.xCenter + mp.r * Math.cos(i * 2 * Math.PI / edgeNum + ba), mp.yCenter + mp.r * Math.sin(i * 2 * Math.PI / edgeNum + ba))
            } else {
                ctx.lineTo(mp.xCenter + mp.r * Math.cos(i * 2 * Math.PI / edgeNum + Math.PI / 2), mp.yCenter + mp.r * Math.sin(i * 2 * Math.PI / edgeNum + Math.PI / 2))
            }
        }
        ctx.strokeStyle = "#0000EE"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(mp.xCenter, mp.yCenter, 1, 0, 2 * Math.PI)
        ctx.fillStyle = "#0000EE"
        ctx.fill()
        ctx.closePath()
    })
    drawPolyCalculates()
}

function edgeNumChanged() {
    edgeNum = Number(document.getElementById('edgeNum').value)
    document.getElementById('edgeNumLabel').innerHTML = 'Kenar Sayısı: ' + edgeNum
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (missing == 'polygonMiddle') {
        drawPolygonMiddle()
    } else if (missing == 'polygonCorner') {
        drawPolygonCorner()
    }
}
function xCenterChanged() {
    arrPoly[0].xCenter = Number(document.getElementById('xCenterRange').value)
    document.getElementById('xCenterLabel').innerHTML = 'Merkez (x): ' + arrPoly[0].xCenter
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (missing == 'polygonMiddle') {
        drawPolygonMiddle()
    } else if (missing == 'polygonCorner') {
        drawPolygonCorner()
    }
}

function yCenterChanged() {
    arrPoly[0].yCenter = Number(document.getElementById('yCenterRange').value)
    document.getElementById('yCenterLabel').innerHTML = 'Merkez (y): ' + arrPoly[0].yCenter
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (missing == 'polygonMiddle') {
        drawPolygonMiddle()
    } else if (missing == 'polygonCorner') {
        drawPolygonCorner()
    }
}

function radiusChanged() {
    arrPoly[0].r = Number(document.getElementById('radius').value)
    document.getElementById('radiusLabel').innerHTML = 'Yarıçap: ' + arrPoly[0].r
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    if (missing == 'polygonMiddle') {
        drawPolygonMiddle()
    } else if (missing == 'polygonCorner') {
        drawPolygonCorner()
    }
}
updateArrayMiddle()
drawPolygonMiddle()
/* END POLYGON */

let fillColor = 'red'

let width = canvas.width
let height = canvas.height
let size = canvas.height

function sierpinski(Ax, Ay, Bx, By, Cx, Cy, d, ctx) {
    if (d > 0) {
        let pointAx = (Bx + Cx) / 2
        let pointAy = (By + Cy) / 2

        let pointBx = (Ax + Cx) / 2
        let pointBy = (Ay + Cy) / 2

        let pointCx = (Ax + Bx) / 2
        let pointCy = (Ay + By) / 2

        sierpinski(Ax, Ay, pointBx, pointBy, pointCx, pointCy, d - 1, ctx)
        sierpinski(pointCx, pointCy, pointAx, pointAy, Bx, By, d - 1, ctx)
        sierpinski(pointBx, pointBy, pointAx, pointAy, Cx, Cy, d - 1, ctx)
    }
    else {
        ctx.moveTo(Ax, Ay)
        ctx.lineTo(Bx, By)
        ctx.lineTo(Cx, Cy)
        ctx.lineTo(Ax, Ay)
    }
}

function drawTriangle() {
    let midPointX = width * .95 / 2
    let midPointY = height * 1.2 / 2

    let ri = (size / 6) * Math.sqrt(3)
    let ru = (size / 3) * Math.sqrt(3)

    let pointAx = midPointX - (size / 2)
    let pointAy = midPointY + ri

    let pointBx = midPointX + (size / 2)
    let pointBy = midPointY + ri

    let pointCx = midPointX
    let pointCy = midPointY - ru

    sierpinski(pointAx, pointAy, pointBx, pointBy, pointCx, pointCy, stepNum - 1, ctx)
}

function drawSierpinski() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.resetTransform()
    ctx.beginPath()
    ctx.moveTo(0, 0)
    drawTriangle()
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.stroke()
    drawSierCalculates()
}

/* END SIERPINSKI */

let radioPolyMiddle = document.getElementById('polygonMiddle')
radioPolyMiddle.addEventListener('change', e => {
    document.getElementById('stepNumLabel').innerHTML = 'Adım Sayısı: 1'
    document.getElementById('stepNum').value = stepNum = 1
    document.getElementById('stepNum').max = 50
    document.getElementById('edgeNumLabel').style.display = 'block'
    document.getElementById('edgeNum').style.display = 'block'
    document.getElementById('radiusLabel').style.display = 'block'
    document.getElementById('radius').style.display = 'block'
    document.getElementById('xCenterLabel').style.display = 'block'
    document.getElementById('xCenterRange').style.display = 'block'
    document.getElementById('yCenterLabel').style.display = 'block'
    document.getElementById('yCenterRange').style.display = 'block'

    missing = 'polygonMiddle'
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    updateArrayMiddle()
    drawPolygonMiddle()
})

let radioPolyCorner = document.getElementById('polygonCorner')
radioPolyCorner.addEventListener('change', e => {
    document.getElementById('stepNumLabel').innerHTML = 'Adım Sayısı: 1'
    document.getElementById('stepNum').value = stepNum = 1
    document.getElementById('stepNum').max = 10
    document.getElementById('edgeNumLabel').style.display = 'block'
    document.getElementById('edgeNum').style.display = 'block'
    document.getElementById('radiusLabel').style.display = 'block'
    document.getElementById('radius').style.display = 'block'
    document.getElementById('xCenterLabel').style.display = 'block'
    document.getElementById('xCenterRange').style.display = 'block'
    document.getElementById('yCenterLabel').style.display = 'block'
    document.getElementById('yCenterRange').style.display = 'block'

    missing = 'polygonCorner'
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    updateArrayCorner()
    drawPolygonCorner()
})

let radioSierpinski = document.getElementById('sierpinski')
radioSierpinski.addEventListener('change', e => {
    document.getElementById('stepNumLabel').innerHTML = 'Adım Sayısı: 1'
    document.getElementById('stepNum').value = stepNum = 1
    document.getElementById('stepNum').max = 10
    document.getElementById('edgeNumLabel').style.display = 'none'
    document.getElementById('edgeNum').style.display = 'none'
    document.getElementById('radiusLabel').style.display = 'none'
    document.getElementById('radius').style.display = 'none'
    document.getElementById('xCenterLabel').style.display = 'none'
    document.getElementById('xCenterRange').style.display = 'none'
    document.getElementById('yCenterLabel').style.display = 'none'
    document.getElementById('yCenterRange').style.display = 'none'

    missing = 'sierpinski'
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawSierpinski()
})

function stepNumChanged() {
    stepNum = Number(document.getElementById('stepNum').value)
    document.getElementById('stepNumLabel').innerHTML = 'Adım Sayısı: ' + stepNum
    if (missing == 'polygonMiddle') {
        ctx.strokeStyle = ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawPolygonMiddle()
    } else if (missing == 'polygonCorner') {
        ctx.strokeStyle = ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawPolygonCorner()
    } else {
        drawSierpinski()
    }
}

const urlParams = new URLSearchParams(window.location.search)
const checkedType = urlParams.get('checkedType')

if (checkedType == "polygonMiddle") {
    document.getElementById("polygonMiddle").checked = true
    document.getElementById('stepNumLabel').innerHTML = 'Adım Sayısı: 1'
    document.getElementById('stepNum').value = stepNum = 1
    document.getElementById('stepNum').max = 50
    document.getElementById('edgeNumLabel').style.display = 'block'
    document.getElementById('edgeNum').style.display = 'block'
    document.getElementById('radiusLabel').style.display = 'block'
    document.getElementById('radius').style.display = 'block'
    document.getElementById('xCenterLabel').style.display = 'block'
    document.getElementById('xCenterRange').style.display = 'block'
    document.getElementById('yCenterLabel').style.display = 'block'
    document.getElementById('yCenterRange').style.display = 'block'
    missing = 'polygonMiddle'
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    updateArrayMiddle()
    drawPolygonMiddle()
} else if (checkedType == "polygonCorner") {
    document.getElementById("polygonCorner").checked = true
    document.getElementById('stepNumLabel').innerHTML = 'Adım Sayısı: 1'
    document.getElementById('stepNum').value = stepNum = 1
    document.getElementById('stepNum').max = 10
    document.getElementById('edgeNumLabel').style.display = 'block'
    document.getElementById('edgeNum').style.display = 'block'
    document.getElementById('radiusLabel').style.display = 'block'
    document.getElementById('radius').style.display = 'block'
    document.getElementById('xCenterLabel').style.display = 'block'
    document.getElementById('xCenterRange').style.display = 'block'
    document.getElementById('yCenterLabel').style.display = 'block'
    document.getElementById('yCenterRange').style.display = 'block'
    missing = 'polygonCorner'
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    updateArrayCorner()
    drawPolygonCorner()
} else if (checkedType == "sierpinski") {
    document.getElementById("sierpinski").checked = true
    document.getElementById('stepNumLabel').innerHTML = 'Adım Sayısı: 1'
    document.getElementById('stepNum').value = stepNum = 1
    document.getElementById('stepNum').max = 10
    document.getElementById('edgeNumLabel').style.display = 'none'
    document.getElementById('edgeNum').style.display = 'none'
    document.getElementById('radiusLabel').style.display = 'none'
    document.getElementById('radius').style.display = 'none'
    document.getElementById('xCenterLabel').style.display = 'none'
    document.getElementById('xCenterRange').style.display = 'none'
    document.getElementById('yCenterLabel').style.display = 'none'
    document.getElementById('yCenterRange').style.display = 'none'

    missing = 'sierpinski'
    ctx.strokeStyle = ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawSierpinski()
}