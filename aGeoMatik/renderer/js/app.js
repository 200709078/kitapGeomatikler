let canvas = document.getElementById('canvas')
canvas.style.cursor = 'pointer'
ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const clearSound = new Audio("sound/clear.mp3")
let activeObject = 'choice'
let activeElementID = null
let lineDrawing = false
let lineA, lineB
let lineSegmentDrawing = false
let lineSegmentA, lineSegmentB
let scaleX = 100
let scaleY = 100

let minX = -8
let minY = -3

let units = [1 / 10, 1 / 5, 1 / 2, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000]
let tickX = 3
let unitX = units[tickX]
let tickY = 3
let unitY = units[tickY]
let firstMousePos, lastMousePos, findPointPos = null
let arrObjects = []
let undoObjects = []
let pointNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let sequenceNames = "abcdeijklmostuvwxyz"
let limitNames = "abcdeijklmostuvwxyz"
let turevNames = "abcdeijklmostuvwxyz"
let lineNames = "fghpqr"
let sliders = document.getElementById('sliders')

let idCount = -1
function idCounter() {
	idCount++
	return idCount
}
let delCount = 0

class mPoint {
	constructor(a, b, temp = false) {
		this.type = 'point'
		this.name = createName('point')
		this.id = idCounter()
		this.a = a
		this.b = b
		this.color = getRandomColor()
		this.visibility = true
		this.size = 3
		this.temp = temp
	}
}

class mVerLine {
	constructor(x) {
		this.type = "verLine"
		const denkCount = arrObjects.filter(f => f.name.includes("denk")).length + 1
		this.name = "denk" + denkCount
		this.id = idCounter()
		this.x = x
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
	}
}

function normalizeLine(m, n) {
	m = Number.isInteger(m) ? m : Number(m.toFixed(2))
	n = Number.isInteger(n) ? n : Number(n.toFixed(2))
	if (m === 0) {
		return `${n}`;
	}

	let result = '';

	if (m === 1) {
		result = 'x';
	} else if (m === -1) {
		result = '-x';
	} else {
		result = `${m}x`;
	}

	if (n === 0) {
		return result;
	}

	if (n > 0) {
		result += `+${n}`;
	} else {
		result += `${n}`;
	}
	return result;
}

class mLineWithEquation {
	constructor(m, n, startX = null, endX = null) {
		this.type = 'lineWithEquation'
		this.name = createName('line')
		this.id = idCounter()
		this.m = m
		this.n = n
		this.func = normalizeLine(m, n)
		this.startX = startX
		this.endX = endX
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
	}
}

class mLineWithPoints {
	constructor(A, B, temp = false) {
		this.type = 'lineWithPoints'
		this.name = createName('line')
		this.id = idCounter()
		this.A = A
		this.B = B
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mLineSegment {
	constructor(A, B, temp = false) {
		this.type = 'lineSegment'
		this.name = createName('lineSegment')
		this.id = idCounter()
		this.A = A
		this.B = B
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}
class mSequence {
	constructor(func, s, e) {
		this.type = 'sequence'
		this.name = createName('sequence')
		this.id = idCounter()
		this.func = func
		this.start = s
		this.end = e
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
	}
}

class mLimit {
	constructor(func, a) {
		this.type = 'limit'
		this.name = createName('limit')
		this.id = idCounter()
		this.func = func
		this.approachVal = a
		this.approachValRight = Number(a) + 0.4
		this.approachValLeft = a - 0.4
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
	}
}

class mFunction {
	constructor(func, startX = null, endX = null) {
		this.type = 'function'
		this.name = createName('function')
		this.id = idCounter()
		this.func = func
		this.startX = startX
		this.endX = endX
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
	}
}

class mTurev {
	constructor(func, a) {
		this.type = 'derivative'
		this.name = createName('derivative')
		this.id = idCounter()
		this.func = func
		this.approachVal = a
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
	}
}

class mSectionalFunctions {
	constructor(str) {
		this.name = createName('function')
		this.id = idCounter()
		this.secFuncs = null
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'sectionalFunctions'
		this.cmd = str
	}
}

function derivative(funcStr, variable = "x") {
	try {
		const df = math.derivative(funcStr, variable);
		return df.toString();
	} catch (err) {
		return "undefined";
	}
}

function getRandomColor() {
	var lum = -0.25
	var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '')
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
	}
	var rgbColor = "#",
		c, i
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16)
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
		rgbColor += ("00" + c).substr(c.length)
	}
	return rgbColor
}

function createName(type) {
	let nm
	let iFound = false
	let i = 0

	if (type == 'point') {
		if (arrObjects.length == 0) return pointNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < pointNames.length) {
				if (!names.includes(pointNames[i])) {
					iFound = true
					nm = pointNames[i]
				}
			}
			if (i >= pointNames.length) {
				if (!(names.includes(pointNames[i % pointNames.length] + ((i / pointNames.length) - ((i / pointNames.length) % 1))))) {
					iFound = true
					nm = pointNames[i % pointNames.length] + ((i / pointNames.length) - ((i / pointNames.length) % 1))
				}
			}
			i++
		}
	} else if (type == 'sequence') {
		if (arrObjects.length == 0) return sequenceNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < sequenceNames.length) {
				if (!names.includes(sequenceNames[i])) {
					iFound = true
					nm = sequenceNames[i]
				}
			}
			if (i >= sequenceNames.length) {
				if (!(names.includes(sequenceNames[i % sequenceNames.length] + ((i / sequenceNames.length) - ((i / sequenceNames.length) % 1))))) {
					iFound = true
					nm = sequenceNames[i % sequenceNames.length] + ((i / sequenceNames.length) - ((i / sequenceNames.length) % 1))
				}
			}
			i++
		}
	} else if (type == 'limit') {
		if (arrObjects.length == 0) return limitNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < limitNames.length) {
				if (!names.includes(limitNames[i])) {
					iFound = true
					nm = limitNames[i]
				}
			}
			if (i >= limitNames.length) {
				if (!(names.includes(limitNames[i % limitNames.length] + ((i / limitNames.length) - ((i / limitNames.length) % 1))))) {
					iFound = true
					nm = limitNames[i % limitNames.length] + ((i / limitNames.length) - ((i / limitNames.length) % 1))
				}
			}
			i++
		}
	} else if (type == 'derivative') {
		if (arrObjects.length == 0) return turevNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < turevNames.length) {
				if (!names.includes(turevNames[i])) {
					iFound = true
					nm = turevNames[i]
				}
			}
			if (i >= turevNames.length) {
				if (!(names.includes(turevNames[i % turevNames.length] + ((i / turevNames.length) - ((i / turevNames.length) % 1))))) {
					iFound = true
					nm = turevNames[i % turevNames.length] + ((i / turevNames.length) - ((i / turevNames.length) % 1))
				}
			}
			i++
		}
	} else {
		if (arrObjects.length == 0) return lineNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < lineNames.length) {
				if (!names.includes(lineNames[i])) {
					iFound = true
					nm = lineNames[i]
				}
			}
			if (i >= lineNames.length) {
				if (!(names.includes(lineNames[i % lineNames.length] + ((i / lineNames.length) - ((i / lineNames.length) % 1))))) {
					iFound = true
					nm = lineNames[i % lineNames.length] + ((i / lineNames.length) - ((i / lineNames.length) % 1))
				}
			}
			i++
		}
	}
	return nm
}

function drawAll() {
	ctx.strokeStyle = ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, innerWidth, innerHeight)

	let s = -1
	let n = minY
	for (let i = 0; i < canvas.height / scaleX; i += .2) {
		s++
		let txt = null
		Number.isInteger(-n * unitX) ? txt = -n * unitX : txt = (-n * unitX).toFixed(1)
		ctx.beginPath()
		ctx.lineWidth = 1
		ctx.strokeStyle = "black"
		ctx.moveTo(0, i * scaleX)
		ctx.lineTo(canvas.width, i * scaleX)
		if (s % 5 == 0) {
			ctx.lineWidth = .5
			if (n * unitX != 0) text(-minX * scaleY + 10, i * scaleX + 15, 'black', 'center', '15px arial', txt)
			n++
		} else {
			ctx.lineWidth = .2
		}
		if (i.toFixed(1) == -minY) {
			ctx.lineWidth = 2
			ctx.strokeStyle = "red"
		} else {
			ctx.strokeStyle = "black"
		}

		ctx.stroke()
		ctx.closePath()
	}

	s = -1
	n = minX
	for (let i = 0; i < (canvas.width / scaleY); i += .2) {
		s++
		let txt = null
		Number.isInteger(n * unitY) ? txt = n * unitY : txt = (n * unitY).toFixed(1)
		ctx.beginPath()
		ctx.lineWidth = 1
		ctx.strokeStyle = "black"
		ctx.moveTo(i * scaleY, 0)
		ctx.lineTo(i * scaleY, canvas.height)

		if (s % 5 == 0) {
			ctx.lineWidth = .6
			text(i * scaleY + 10, -minY * scaleX + 15, 'black', 'center', '15px arial', txt)
			n++
		} else {
			ctx.lineWidth = .2
		}
		if (i.toFixed(1) == -minX) {
			ctx.lineWidth = 2
			ctx.strokeStyle = "red"
		} else {
			ctx.strokeStyle = "black"
		}

		ctx.stroke()
		ctx.closePath()
	}

	arrObjects.sort(function (a, b) { return a.id - b.id })
	arrObjects.findLast((item) => {
		if (item.type === 'point') {
			drawPoint(item)
		} else if (item.type === 'verLine') {
			drawVerLine(item)
		} else if (item.type === 'lineWithEquation') {
			drawLineWithEquation(item)
		} else if (item.type === 'lineWithPoints') {
			drawLineWithPoints(item)
		} else if (item.type === 'lineSegment') {
			drawLineSegment(item)
		} else if (item.type === 'sequence') {
			drawSequence(item)
		} else if (item.type === 'limit') {
			drawLimit(item)
		} else if (item.type === 'derivative') {
			drawDerivative(item)
		} else if (item.type === 'sectionalFunctions') {
			drawSectionalFunctions(item)
		} else if (item.type === 'function') {
			drawFunction(item)
		} else { console.log('drawAll içinde type bulunamadı.') }
	})
}

function drawPoint(point) {
	if (!point.visibility) return
	ctx.beginPath()

	let pSize
	point.id == activeElementID ? pSize = point.size + 2 : pSize = point.size
	let pColor = point.color
	if (point.temp) pColor = '#000000'

	ctx.strokeStyle = 'black'
	ctx.fillStyle = pColor
	ctx.arc((-minX + point.a / unitY) * scaleY, (-minY - point.b / unitX) * scaleX, pSize, 0, 2 * Math.PI)
	ctx.lineWidth = 1
	if (point.id != null && !point.temp) text((-minX + point.a / unitY) * scaleY - 10, (-minY - point.b / unitX) * scaleX - 5, pColor, 'center', 'bold 15px arial', point.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function drawVerLine(vline) {
	if (!vline.visibility) return
	ctx.beginPath()

	let vlSize
	vline.id == activeElementID ? vlSize = vline.size + 1 : vlSize = vline.size
	let vlColor = vline.color

	ctx.strokeStyle = ctx.fillStyle = vlColor
	ctx.lineWidth = vlSize
	ctx.moveTo((-minX + vline.x / unitY) * scaleY, canvas.height + 100)
	ctx.lineTo((-minX + vline.x / unitY) * scaleY, -canvas.height - 100)
	if (vline.id != null) text((-minX + vline.x / unitY) * scaleY + 10, 15, vlColor, 'center', 'bold 15px arial', vline.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function drawLineWithEquation(line) {
	if (!line.visibility) return

	let mostLeft = minX * unitY
	let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
	let startX
	let endX
	line.startX == null ? startX = -50000 : startX = line.startX
	line.endX == null ? endX = 50000 : endX = line.endX
	startX = Math.max(mostLeft, startX)
	endX = Math.min(mostRight, endX)
	if (startX > endX) startX = endX
	let x, y
	ctx.beginPath()

	let lSize
	line.id == activeElementID ? lSize = line.size + 1 : lSize = line.size
	let lColor = line.color

	ctx.strokeStyle = ctx.fillStyle = lColor
	ctx.lineWidth = lSize
	x = startX
	y = math.evaluate(line.m + "*" + x + "+" + line.n, { x: x })
	ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	x = endX
	y = math.evaluate(line.m + "*" + x + "+" + line.n, { x: x })
	ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	text((-minX + (-minY - line.n) / line.m) * scaleY + 5, 20, lColor, 'center', 'bold 15px arial', line.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function drawLineWithPoints(pl) {
	if (!pl.visibility) return

	let plSize
	pl.id == activeElementID ? plSize = pl.size + 1 : plSize = pl.size
	let plColor = pl.color
	if (pl.temp) plColor = '#000000'

	if (pl.A.a == pl.B.a && pl.A.b != pl.B.b) {
		// draw A
		ctx.beginPath()
		ctx.strokeStyle = 'black'
		ctx.fillStyle = plColor
		ctx.arc((-minX + pl.A.a / unitY) * scaleY, (-minY / unitX) * scaleX, plSize + 1, 0, 2 * Math.PI)
		ctx.lineWidth = 1
		ctx.fill()
		ctx.stroke()
		ctx.closePath()

		//draw line
		ctx.beginPath()
		ctx.strokeStyle = ctx.fillStyle = plColor
		ctx.lineWidth = plSize
		ctx.moveTo((-minX + pl.A.a / unitY) * scaleY, canvas.height + 100)
		ctx.lineTo((-minX + pl.A.a / unitY) * scaleY, -canvas.height - 100)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()

	} else {
		// draw A
		ctx.beginPath()
		ctx.strokeStyle = 'black'
		ctx.fillStyle = plColor
		ctx.arc((-minX + pl.A.a / unitY) * scaleY, (-minY - pl.A.b / unitX) * scaleX, plSize + 1, 0, 2 * Math.PI)
		ctx.lineWidth = 1
		ctx.fill()
		ctx.stroke()
		ctx.closePath()

		//draw B
		ctx.beginPath()
		ctx.strokeStyle = 'black'
		ctx.fillStyle = plColor
		ctx.arc((-minX + pl.B.a / unitY) * scaleY, (-minY - pl.B.b / unitX) * scaleX, plSize + 1, 0, 2 * Math.PI)
		ctx.lineWidth = 1
		ctx.fill()
		ctx.stroke()
		ctx.closePath()

		let x, y
		ctx.beginPath()
		ctx.strokeStyle = ctx.fillStyle = plColor
		ctx.lineWidth = plSize

		x = -50000
		y = math.evaluate(createLineEquation(pl.A, pl.B).m + '*x+' + createLineEquation(pl.A, pl.B).c, { x: x })
		ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
		x = 50000
		y = math.evaluate(createLineEquation(pl.A, pl.B).m + '*x+' + createLineEquation(pl.A, pl.B).c, { x: x })
		ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
		if (!pl.temp) text((-minX + (-minY - createLineEquation(pl.A, pl.B).c) / createLineEquation(pl.A, pl.B).m) * scaleY + 5, 20, plColor, 'center', 'bold 15px arial', pl.name)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
	}
}

function drawFunction(func, temp = false) {
	if (!func.visibility) return
	let lastFunc = func.func
	if (func.type == 'sequence') lastFunc = lastFunc.replace(/(?<![a-zA-Z0-9_])n(?![a-zA-Z0-9_])/g, 'x');

	let prevCanvasY = null
	const jumpThreshold = canvas.height
	let mostLeft = minX * unitY
	let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
	let startX
	let endX
	func.startX == null ? startX = -50000 : startX = func.startX
	func.endX == null ? endX = 50000 : endX = func.endX
	startX = Math.max(mostLeft, startX)
	endX = Math.min(mostRight, endX)
	if (startX > endX) startX = endX

	let fSize
	func.id == activeElementID ? fSize = func.size + 1 : fSize = func.size
	let fColor = func.color

	ctx.beginPath()
	ctx.strokeStyle = fColor
	ctx.lineWidth = fSize
	if (temp) ctx.setLineDash([2, 5])
	let step = 0.01
	let firstPoint = true
	let x = startX
	while (x < endX) {
		let y = math.evaluate(lastFunc, { x: x })
		if (!isFinite(y)) {
			firstPoint = true
			x += step
			continue
		}

		let canvasX = -minX * scaleY + (x * scaleY) / unitY
		let canvasY = -minY * scaleX - (y * scaleX) / unitX

		// ASİMPTOT KONTROLÜ
		if (prevCanvasY !== null && Math.abs(canvasY - prevCanvasY) > jumpThreshold) {
			firstPoint = true
			prevCanvasY = canvasY
			x += step
			continue
		}

		if (firstPoint) {
			ctx.moveTo(canvasX, canvasY)
			firstPoint = false
		} else {
			ctx.lineTo(canvasX, canvasY)
		}

		prevCanvasY = canvasY
		x += step
	}
	ctx.stroke()
	if (temp) ctx.setLineDash([])
	ctx.closePath()
}

function drawSequence(seq) {
	if (!seq.visibility) return

	let seqColor = seq.color
	let seqSize
	seq.id == activeElementID ? seqSize = seq.size + 1 : seqSize = seq.size

	// draw Function
	drawFunction(seq, true)

	//draw Points
	for (let n = seq.start; n <= seq.end; n++) {
		ctx.beginPath()
		ctx.strokeStyle = 'black'
		ctx.fillStyle = seqColor
		ctx.lineWidth = 1
		let y = math.evaluate(seq.func, { n: n })
		ctx.arc((-minX + n / unitY) * scaleY, (-minY - y / unitX) * scaleX, seqSize, 0, 2 * Math.PI)
		text((-minX + n / unitY) * scaleY - 10, (-minY - y / unitX) * scaleX - 5, seqColor, 'center', 'bold 15px arial', seq.name + n)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
	}
}

function drawLimit(lim) {
	if (!lim.visibility) return
	// draw Function
	drawFunction(lim)

	// Limit (.)
	let A = new mPoint(lim.approachVal, 0)
	let B = new mPoint(lim.approachVal, math.evaluate(lim.func, { x: A.a }))
	let C = new mPoint(0, math.evaluate(lim.func, { x: A.a }))
	A.id = B.id = C.id = null
	let vls = new mLineSegment(A, B, true)
	let hls = new mLineSegment(B, C, true)
	A.color = B.color = C.color = vls.color = hls.color = lim.color
	drawLineSegment(vls)
	drawLineSegment(hls)
	drawPoint(A)
	drawPoint(B)
	drawPoint(C)

	if (lim.id == activeElementID) {
		// Limit (+)
		let A = new mPoint(lim.approachValRight, 0)
		let B = new mPoint(lim.approachValRight, math.evaluate(lim.func, { x: A.a }))
		let C = new mPoint(0, math.evaluate(lim.func, { x: A.a }))
		A.id = B.id = C.id = null
		let vls = new mLineSegment(A, B, true)
		let hls = new mLineSegment(B, C, true)
		A.color = B.color = C.color = vls.color = hls.color = lim.color
		vls.lineDash = hls.lineDash = [2, 5]
		drawLineSegment(vls)
		drawLineSegment(hls)
		drawPoint(A)
		drawPoint(B)
		drawPoint(C)

		//limit (-)
		A = new mPoint(lim.approachValLeft, 0)
		B = new mPoint(lim.approachValLeft, math.evaluate(lim.func, { x: A.a }))
		C = new mPoint(0, math.evaluate(lim.func, { x: A.a }))
		A.id = B.id = C.id = null
		vls = new mLineSegment(A, B, true)
		hls = new mLineSegment(B, C, true)
		A.color = B.color = C.color = vls.color = hls.color = lim.color
		vls.lineDash = hls.lineDash = [2, 5]
		drawLineSegment(vls)
		drawLineSegment(hls)
		drawPoint(A)
		drawPoint(B)
		drawPoint(C)
	}
}

function drawDerivative(tur) {
	if (!tur.visibility) return
	drawFunction(tur)
	// Türev (.)
	let A = new mPoint(Number(tur.approachVal), 0)
	let B = new mPoint(Number(tur.approachVal), math.evaluate(tur.func, { x: A.a }))
	let C = new mPoint(0, math.evaluate(tur.func, { x: A.a }))
	A.id = B.id = C.id = null
	let vls = new mLineSegment(A, B)
	let hls = new mLineSegment(B, C)
	A.color = B.color = C.color = vls.color = hls.color = tur.color
	drawLineSegment(vls)
	drawLineSegment(hls)
	drawPoint(A)
	drawPoint(B)
	drawPoint(C)

	//Teğet Doğrusu
	if (tur.id == activeElementID) {
		let m = math.evaluate(derivative(tur.func), { x: tur.approachVal })
		let c = math.evaluate(tur.func, { x: tur.approachVal }) - m * tur.approachVal
		let tLine = new mLineWithEquation(m, c)
		tLine.color = 'black'
		drawLineWithEquation(tLine)
	}
}

function drawLineSegment(ls) {
	if (!ls.visibility) return
	let lsSize
	ls.id == activeElementID ? lsSize = ls.size + 1 : lsSize = ls.size
	let lsColor = ls.color
	if (ls.temp) lsColor = '#000000'

	// draw A
	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.fillStyle = lsColor
	ctx.arc((-minX + ls.A.a / unitY) * scaleY, (-minY - ls.A.b / unitX) * scaleX, lsSize + 1, 0, 2 * Math.PI)
	ctx.lineWidth = 1
	ctx.fill()
	ctx.stroke()
	ctx.closePath()

	//draw B
	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.fillStyle = lsColor
	ctx.arc((-minX + ls.B.a / unitY) * scaleY, (-minY - ls.B.b / unitX) * scaleX, lsSize + 1, 0, 2 * Math.PI)
	ctx.lineWidth = 1
	ctx.fill()
	ctx.stroke()
	ctx.closePath()

	ctx.beginPath()
	ctx.strokeStyle = ctx.fillStyle = lsColor
	ctx.lineWidth = lsSize
	ctx.setLineDash(ls.lineDash)
	ctx.moveTo((-minX + ls.A.a / unitY) * scaleY, (-minY - ls.A.b / unitX) * scaleX)
	ctx.lineTo((-minX + ls.B.a / unitY) * scaleY, (-minY - ls.B.b / unitX) * scaleX)
	if (!ls.temp) text((-minX + ((ls.A.a + ls.B.a) / 2) / unitY) * scaleY - 10, (-minY - ((ls.A.b + ls.B.b) / 2) / unitX) * scaleX - 10, lsColor, 'center', 'bold 15px arial', ls.name)
	ctx.fill()
	ctx.stroke()
	ctx.setLineDash([])
	ctx.closePath()
}

function drawSectionalFunctions(sf) {
	if (!sf.visibility) return
	if (sf.id == activeElementID) {
		sf.secFuncs.forEach(func => {
			func.size = sf.size + 1
		})
	} else {
		sf.secFuncs.forEach(func => {
			func.size = sf.size
		})
	}
	sf.secFuncs.forEach(func => {
		drawFunction(func)
	})
}

function labelsCreator() {
	objectsContainer.innerHTML = ""
	arrObjects.forEach(item => {
		let emptyDiv = document.createElement('div')
		let exprDiv = document.createElement('div')
		exprDiv.classList = 'expr-block'
		let input = document.createElement('input')
		input.id = item.id + '-input'
		let output = document.createElement('output')
		output.id = item.id + '-output'

		let btnGizle = document.createElement('button')
		btnGizle.classList = 'btn gizle'
		item.visibility ? btnGizle.title = 'Gizle' : btnGizle.title = 'Göster'
		item.visibility ? btnGizle.style.background = item.color : btnGizle.style.background = 'transparent'
		let btnDuzenle = document.createElement('button')
		btnDuzenle.classList = 'btn duzenle'
		btnDuzenle.title = 'Düzenle'
		let btnSil = document.createElement('button')
		btnSil.classList = 'btn sil'
		btnSil.title = 'Sil'
		let sliderDiv = document.createElement('div')
		sliderDiv.classList = 'sliders'

		let labelA = document.createElement('label')
		labelA.id = item.id + '-labelA'
		labelA.htmlFor = item.id + '-sliderA'
		labelA.style.width = '50px'

		let sliderA = document.createElement('input')
		sliderA.type = "range"
		sliderA.id = item.id + '-sliderA'
		sliderA.step = "0.01"

		let labelB = document.createElement('label')
		labelB.id = item.id + '-labelB'
		labelB.htmlFor = item.id + '-sliderB'
		labelB.style.width = '50px'

		let sliderB = document.createElement('input')
		sliderB.type = "range"
		sliderB.id = item.id + '-sliderB'
		sliderB.step = "0.01"

		labelA.hidden = false
		sliderA.hidden = false
		labelB.hidden = false
		sliderB.hidden = false

		input.addEventListener('click', () => changeActiveElement(input.id))
		input.addEventListener('keydown', (e) => digerKeyDown(e, input.id))
		btnSil.addEventListener('click', (e) => delBtnClick(e))
		btnDuzenle.addEventListener('click', (e) => ayarBtnClick(e))
		btnGizle.addEventListener('click', (e) => visibilityBtnClick(e))

		sliderA.addEventListener('input', () => crossSlider())
		sliderB.addEventListener('input', () => crossSlider())

		input.style.height = '24px'
		output.innerHTML = ''
		if (item.type == 'point') {
			input.value = item.name + "=(" + item.a + "," + item.b + ")"
		} else if (item.type == 'verLine') {
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ": x = " + item.x
		} else if (item.type == 'lineWithEquation') {
			let lineEquation = item.name + ': y = ' + item.m + 'x + ' + item.n
			lineEquation = lineEquation.replace('+ -', '- ')
			lineEquation = lineEquation.replace('1x', 'x')
			lineEquation = lineEquation.replace('0x ', '')
			lineEquation = lineEquation.replace(' + 0', '')
			input.value = lineEquation
		} else if (item.type == 'lineWithPoints') {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': ' + 'Doğru((' + item.A.a + ',' + item.A.b + '), ' + '(' + item.B.a + ',' + item.B.b + '))'
			if (item.A.a == item.B.a && item.A.b != item.B.b) {
				output.value = "x = " + item.A.a
			} else if (item.A.b == item.B.b) {
				output.innerHTML = ''
			}
			else {
				output.value = "y = " + normalizeLine(createLineEquation(item.A, item.B).m, createLineEquation(item.A, item.B).c)
			}
		} else if (item.type == 'lineSegment') {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': ' + 'DoğruParçası((' + item.A.a + ',' + item.A.b + '), ' + '(' + item.B.a + ',' + item.B.b + '))'
		} else if (item.type == 'sequence') {
			input.value = item.name + 'ₙ = Dizi(' + item.func + ',' + item.start + ',' + item.end + ')'
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'limit') {
			input.value = item.name + ' = Limit(' + item.func + ',' + item.approachVal + ')'
		} else if (item.type == 'derivative') {
			input.value = item.name + ' = Türev(' + item.func + ',' + item.approachVal + ')'
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'sectionalFunctions') {
			input.value = item.name + '(x) = {' + item.cmd + '}'
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'function') {
			input.value = item.name + ': y = ' + item.func
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else {
			console.log('labelsCreator içinde type bulunamadı.')
		}

		sliderA.min = minX * unitY - 1
		sliderA.max = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
		sliderB.max = -minY * unitX + 1
		sliderB.min = (minY + Math.round(canvas.height / scaleX) + 1) * -unitX

		if (item.type == 'point') {
			sliderA.value = item.a
			labelA.innerHTML = 'a = ' + item.a
			sliderB.value = item.b
			labelB.innerHTML = 'b = ' + item.b
		} else if (item.type == 'verLine') {
			sliderA.value = item.x
			labelA.innerHTML = 'x = ' + item.x
		} else if (item.type == 'lineWithEquation') {
			sliderA.value = item.m
			labelA.innerHTML = 'm = ' + item.m
			sliderB.value = item.n
			labelB.innerHTML = 'n = ' + item.n
		} else if (item.type == 'limit') {
			let verticalMNumberRight = Number(item.approachValRight * 1).toFixed(2)
			let verticalMNumberLeft = Number(item.approachValLeft * 1).toFixed(2)
			let mostLeft = minX * unitY
			let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY

			sliderA.min = item.approachVal * 1
			sliderA.max = mostRight
			sliderA.value = verticalMNumberRight
			labelA.innerHTML = sliderA.min + '⁺ = ' + verticalMNumberRight

			sliderB.min = mostLeft
			sliderB.max = item.approachVal * 1
			sliderB.value = verticalMNumberLeft
			labelB.innerHTML = sliderB.max + '⁻ = ' + verticalMNumberLeft

		} else if (item.type == 'derivative') {
			let mostLeft = minX * unitY
			let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY

			sliderA.min = mostLeft
			sliderA.max = mostRight
			sliderA.step = "0.01"
			sliderA.value = item.approachVal
			labelA.innerHTML = 'x = ' + item.approachVal
		}

		if (item.id != activeElementID) {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else {
			input.style.backgroundColor = 'lightgreen'
			output.style.backgroundColor = 'lightgreen'
		}

		sliderDiv.appendChild(labelA)
		sliderDiv.appendChild(sliderA)
		sliderDiv.appendChild(labelB)
		sliderDiv.appendChild(sliderB)
		exprDiv.appendChild(input)
		exprDiv.appendChild(output)
		exprDiv.appendChild(btnGizle)
		exprDiv.appendChild(btnDuzenle)
		exprDiv.appendChild(btnSil)
		emptyDiv.appendChild(exprDiv)
		emptyDiv.appendChild(sliderDiv)
		emptyDiv.appendChild(document.createElement('hr'))
		objectsContainer.prepend(emptyDiv)
	})
}

document.querySelector('.buttonGroup').addEventListener('click', e => {
	const btn = e.target.closest('button')
	if (!btn) return
	document.querySelectorAll('.buttonGroup .button').forEach(b => b.classList.remove('active'))
	btn.classList.add('active')
	canvas.style.cursor = btn.dataset.cursor || 'default'
	switch (btn.dataset.action) {
		case 'choice':
			activeObject = 'choice'
			break
		case 'point':
			activeObject = 'point'
			break
		case 'line':
			activeObject = 'line'
			break
		case 'linesegment':
			activeObject = 'linesegment'
			break
		case 'calc':
			activeObject = 'choice'
			toggleCalcIcon(document.getElementById('btnimgCalc'))
			document.getElementById('leftWrapper').classList.toggle('hide')
			break
		case 'help':
			document.getElementById('help-popup').style.display = 'flex';
			const giris = document.getElementById('giris').value = ''
			break
	}
	if (btn.dataset.toast) {
		const [title, msg] = btn.dataset.toast.split('|')
		showToast(title, msg)
	}
	drawAll()
})

function toggleCalcIcon(imgEl) {
	const cycle = ["img/left.svg", "img/right.svg"]
	let current = imgEl.getAttribute("src")
	let next = cycle[(cycle.indexOf(current) + 1) % cycle.length]
	imgEl.src = next
}

function closeHelp() {
	activeObject = 'choice'
	canvas.style.cursor = 'pointer'
	document.querySelectorAll('.buttonGroup .button').forEach(b => b.classList.remove('active'))
	document.getElementById('btnChoice').classList.add('active')
	document.getElementById('help-popup').style.display = 'none';
}

document.querySelectorAll('.example').forEach(el => {
	el.addEventListener('click', () => {
		const giris = document.getElementById('giris')
		if (giris) {
			giris.value = el.textContent.trim()
			giris.focus()
			closeHelp()
		}
	})
})

function changeActiveElement(id) {
	let clickedid = Number(id.substring(0, id.indexOf("-")))
	if (activeElementID != null) document.getElementById(activeElementID + '-input').style.background = 'white'
	if (activeElementID != null) document.getElementById(activeElementID + '-output').style.background = 'white'

	let sliders = document.querySelectorAll("input[type='range']");
	sliders.forEach(slider => {
		slider.hidden = true
	})
	let labels = document.querySelectorAll("label");
	labels.forEach(label => {
		label.hidden = true
	})
	activeElementID = clickedid
	document.getElementById(activeElementID + '-input').style.background = 'lightgreen'
	document.getElementById(activeElementID + '-output').style.background = 'lightgreen'
	let activeitem = arrObjects.find(item => item.id == activeElementID)

	document.getElementById(activeElementID + '-labelA').hidden = false
	document.getElementById(activeElementID + '-sliderA').hidden = false
	document.getElementById(activeElementID + '-labelB').hidden = false
	document.getElementById(activeElementID + '-sliderB').hidden = false

	if (activeitem.type == 'derivative' || activeitem.type == "verLine") {
		document.getElementById(activeElementID + '-labelB').hidden = true
		document.getElementById(activeElementID + '-sliderB').hidden = true
	}
	if (activeitem.type == 'sequence' || activeitem.type == 'lineSegment' || activeitem.type == 'lineWithPoints' || activeitem.type == 'sectionalFunctions' || activeitem.type == 'function') {
		document.getElementById(activeElementID + '-labelA').hidden = true
		document.getElementById(activeElementID + '-sliderA').hidden = true
		document.getElementById(activeElementID + '-labelB').hidden = true
		document.getElementById(activeElementID + '-sliderB').hidden = true
	}
	drawAll()
}

function bileskeProcess(funcs) {
	return funcs.reduceRight((acc, f) => {
		return f.replace(/x/g, `(${acc})`)
	}, "x")
}

function digerKeyDown(evt, id) {
	let allowKeys = '(){}[],=-+.;<>*^/_bçdğjımnşquüvxyzCÇEFGĞHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(evt.key) && !allowKeys.includes(evt.key)) {
		evt.preventDefault()
	}
	if (evt.key === 'Enter') {
		console.log(id, ' id li giriş.')
	}
}

function isNumeric(str) {
	try {
		const result = math.evaluate(str);
		if (result === null || result === undefined) return false;
		if (typeof result === 'number') {
			return Number.isFinite(result);
		}
		if (math.isBigNumber(result)) {
			return result.isFinite();
		}
		if (math.isFraction(result)) {
			return true;
		}
		if (math.isComplex(result)) {
			return false;
		}
		return false;
	} catch (err) {
		return false;
	}
}

function isPoint(input) {
	if (typeof input !== 'string') return { status: false };

	let str = input.trim();

	// (a,b) formatı
	if (!str.startsWith('(') || !str.endsWith(')')) {
		return { status: false };
	}

	// dış parantezleri kaldır
	str = str.slice(1, -1).trim();

	// depth-aware split
	let parts = [];
	let current = '';
	let depth = 0;

	for (let i = 0; i < str.length; i++) {
		const ch = str[i];

		if (ch === '(') {
			depth++;
			current += ch;
		} else if (ch === ')') {
			depth--;
			if (depth < 0) return { status: false };
			current += ch;
		} else if (ch === ',' && depth === 0) {
			parts.push(current.trim());
			current = '';
		} else {
			current += ch;
		}
	}

	if (current.length > 0) parts.push(current.trim());

	// tam 2 parametre olmalı
	if (parts.length !== 2) return { status: false };

	const [aRaw, bRaw] = parts;

	if (!aRaw || !bRaw) return { status: false };

	// numerik kontrol (senin fonksiyon)
	if (!isNumeric(aRaw) || !isNumeric(bRaw)) {
		return { status: false };
	}

	try {
		const aVal = math.evaluate(aRaw);
		const bVal = math.evaluate(bRaw);

		if (!Number.isFinite(aVal) || !Number.isFinite(bVal)) {
			return { status: false };
		}

		return {
			type: "point",
			a: aVal,
			b: bVal,
			status: true
		};

	} catch {
		return { status: false };
	}
}

function isVerLine(input) {
	if (typeof input !== 'string') return { status: false };

	const str = input.trim();

	// sadece 1 '=' olmalı
	const eqCount = (str.match(/=/g) || []).length;
	if (eqCount !== 1) return { status: false };

	let [leftRaw, rightRaw] = str.split('=');
	if (!leftRaw || !rightRaw) return { status: false };

	const left = leftRaw.trim();
	const right = rightRaw.trim();

	let expr;

	// x izolasyonu
	if (left === 'x') {
		expr = right;
	} else if (right === 'x') {
		expr = left;
	} else {
		return { status: false };
	}

	// numerik kontrol (senin fonksiyon)
	if (!isNumeric(expr)) {
		return { status: false };
	}

	try {
		const val = math.evaluate(expr);

		if (!Number.isFinite(val)) {
			return { status: false };
		}

		return {
			type: "verLine",
			x: val,
			status: true
		};

	} catch {
		return { status: false };
	}
}

function isLineWithEquation(input) {
	if (typeof input !== 'string') return { status: false };
	if (!input.includes('y')) input = 'y=' + input
	const str = input.trim();

	// sadece 1 '=' olmalı
	const eqCount = (str.match(/=/g) || []).length;
	if (eqCount !== 1) return { status: false };

	let [leftRaw, rightRaw] = str.split('=');
	if (!leftRaw || !rightRaw) return { status: false };

	const left = leftRaw.trim();
	const right = rightRaw.trim();

	let expr;

	// y izolasyonu
	if (left === 'y') {
		expr = right;
	} else if (right === 'y') {
		expr = left;
	} else {
		return { status: false };
	}

	const normalized = expr.replace(/\s+/g, '');

	// ❌ parantezli çarpım reddi
	if (/\*\(/.test(normalized) && normalized.includes('x')) {
		return { status: false };
	}

	// değişken kontrolü
	try {
		const node = math.parse(expr);
		const symbols = new Set();

		node.traverse(function (n) {
			if (n.isSymbolNode) {
				symbols.add(n.name);
			}
		});

		for (let s of symbols) {
			if (s !== 'x' && s !== 'e' && s !== 'pi') {
				return { status: false };
			}
		}
	} catch {
		return { status: false };
	}

	// x yoksa → sabit fonksiyon
	if (!normalized.includes('x')) {
		if (!isNumeric(normalized)) return { status: false };

		const nVal = math.evaluate(normalized);

		if (!Number.isFinite(nVal)) return { status: false };

		return {
			type: "lineWithEquation",
			m: 0,
			n: nVal,
			status: true
		};
	}

	// x terimi bul
	const xMatch = normalized.match(/([+-]?[^x]*x)/);
	if (!xMatch) return { status: false };

	let xTerm = xMatch[0];

	let mRaw = xTerm.replace('x', '');

	if (mRaw === '' || mRaw === '+') mRaw = '1';
	if (mRaw === '-') mRaw = '-1';

	let rest = normalized.replace(xTerm, '');
	let nRaw = rest || '0';

	if (nRaw.startsWith('+')) nRaw = nRaw.slice(1);

	// numerik kontrol
	if (!isNumeric(mRaw) || !isNumeric(nRaw)) {
		return { status: false };
	}

	try {
		const mVal = math.evaluate(mRaw);
		const nVal = math.evaluate(nRaw);

		if (!Number.isFinite(mVal) || !Number.isFinite(nVal)) {
			return { status: false };
		}

		return {
			type: "lineWithEquation",
			m: mVal,
			n: nVal,
			status: true
		};

	} catch {
		return { status: false };
	}
}

function isLineWithPoints(input) {
	if (typeof input !== 'string') return { status: false };

	let str = input.trim();

	// Doğru(...) kontrolü (case-insensitive)
	const match = str.match(/^doğru\s*\((.*)\)$/i);
	if (!match) return { status: false };

	let inner = match[1].trim();

	// iki point'i ayır (depth-aware)
	let parts = [];
	let current = '';
	let depth = 0;

	for (let i = 0; i < inner.length; i++) {
		const ch = inner[i];

		if (ch === '(') {
			depth++;
			current += ch;
		} else if (ch === ')') {
			depth--;
			if (depth < 0) return { status: false };
			current += ch;
		} else if (ch === ',' && depth === 0) {
			parts.push(current.trim());
			current = '';
		} else {
			current += ch;
		}
	}

	if (current.length > 0) parts.push(current.trim());

	if (parts.length !== 2) return { status: false };

	// isPoint mantığı
	function parsePoint(str) {
		if (!str.startsWith('(') || !str.endsWith(')')) return null;

		let inner = str.slice(1, -1).trim();

		let parts = [];
		let current = '';
		let depth = 0;

		for (let i = 0; i < inner.length; i++) {
			const ch = inner[i];

			if (ch === '(') {
				depth++;
				current += ch;
			} else if (ch === ')') {
				depth--;
				if (depth < 0) return null;
				current += ch;
			} else if (ch === ',' && depth === 0) {
				parts.push(current.trim());
				current = '';
			} else {
				current += ch;
			}
		}

		if (current.length > 0) parts.push(current.trim());
		if (parts.length !== 2) return null;

		const [aRaw, bRaw] = parts;

		if (!isNumeric(aRaw) || !isNumeric(bRaw)) return null;

		try {
			const a = math.evaluate(aRaw);
			const b = math.evaluate(bRaw);

			if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

			return { x: a, y: b };
		} catch {
			return null;
		}
	}

	const p1 = parsePoint(parts[0]);
	const p2 = parsePoint(parts[1]);

	if (!p1 || !p2) return { status: false };

	return {
		type: "lineWithPoints",
		xA: p1.x,
		yA: p1.y,
		xB: p2.x,
		yB: p2.y,
		status: true
	};
}

function isLineSegment(input) { //DoğruParçası((1,2),(3,4))
	if (typeof input !== 'string') return { status: false };

	let str = input.trim();

	// DoğruParçası(...) kontrolü (case-insensitive)
	const match = str.match(/^doğruparçası\s*\((.*)\)$/i);
	if (!match) return { status: false };

	let inner = match[1].trim();

	// iki point'i ayır (depth-aware)
	let parts = [];
	let current = '';
	let depth = 0;

	for (let i = 0; i < inner.length; i++) {
		const ch = inner[i];

		if (ch === '(') {
			depth++;
			current += ch;
		} else if (ch === ')') {
			depth--;
			if (depth < 0) return { status: false };
			current += ch;
		} else if (ch === ',' && depth === 0) {
			parts.push(current.trim());
			current = '';
		} else {
			current += ch;
		}
	}

	if (current.length > 0) parts.push(current.trim());

	if (parts.length !== 2) return { status: false };

	// isPoint mantığı
	function parsePoint(str) {
		if (!str.startsWith('(') || !str.endsWith(')')) return null;

		let inner = str.slice(1, -1).trim();

		let parts = [];
		let current = '';
		let depth = 0;

		for (let i = 0; i < inner.length; i++) {
			const ch = inner[i];

			if (ch === '(') {
				depth++;
				current += ch;
			} else if (ch === ')') {
				depth--;
				if (depth < 0) return null;
				current += ch;
			} else if (ch === ',' && depth === 0) {
				parts.push(current.trim());
				current = '';
			} else {
				current += ch;
			}
		}

		if (current.length > 0) parts.push(current.trim());
		if (parts.length !== 2) return null;

		const [aRaw, bRaw] = parts;

		if (!isNumeric(aRaw) || !isNumeric(bRaw)) return null;

		try {
			const a = math.evaluate(aRaw);
			const b = math.evaluate(bRaw);

			if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

			return { x: a, y: b };
		} catch {
			return null;
		}
	}

	const p1 = parsePoint(parts[0]);
	const p2 = parsePoint(parts[1]);

	if (!p1 || !p2) return { status: false };

	return {
		type: "lineSegment",
		xA: p1.x,
		yA: p1.y,
		xB: p2.x,
		yB: p2.y,
		status: true
	};
}

/* function isSequence(str) { // Dizi(x^3,-1,5)
	const diziRe = /^\s*Dizi\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const arrayMatch = str.match(diziRe)
	if (arrayMatch) {
		const func = arrayMatch[1].trim()
		const start = Number(arrayMatch[2])
		const end = Number(arrayMatch[3])
		return {
			type: "sequence",
			status: true,
			func,
			start,
			end
		}
	} else {
		return { status: false }
	}
} */


function isSequence(str) {
	// Boşlukları temizle (input toleransı)
	const cleanStr = str.replace(/\s+/g, '');

	// Regex ile Dizi(...) parse et
	const diziRe = /^Dizi\(\s*(.+)\s*,\s*([^\s,]+)\s*,\s*([^\s,]+)\s*\)$/i;
	const match = cleanStr.match(diziRe);
	if (!match) return { status: false };

	let funcStr = match[1];
	const startStr = match[2];
	const endStr = match[3];

	// a ve b doğal sayı >= 1 olmalı
	const start = Number(startStr);
	const end = Number(endStr);
	if (!Number.isInteger(start) || start < 1) return { status: false };
	if (!Number.isInteger(end) || end < 1) return { status: false };

	// func sabit veya n'e bağlı olmalı
	// func içindeki standalone "n" → "x" değiştir

	// funcStr'de standalone "n" var mı?
	const hasN = /(?<![a-zA-Z0-9_])n(?![a-zA-Z0-9_])/.test(funcStr);

	// func sabit mi? (evaluate edilebilir ve değişken yok)
	const isConstant = !/[a-zA-Z]/.test(funcStr); // sadece rakam ve operatörler

	if (!hasN && !isConstant) return { status: false };

	const safeFunc = funcStr.replace(/(?<![a-zA-Z0-9_])n(?![a-zA-Z0-9_])/g, 'x');

	// isFunction kontrolü
	const funcCheck = isFunction(safeFunc);
	if (!funcCheck.status) return { status: false };

	// Eğer func sabitse (n yok) kabul
	// implicit çarpım zaten isFunction tarafından kabul ediliyor

	// Output objesi, boşluksuz
	return {
		type: "sequence",
		status: true,
		func: funcStr.replace(/\s+/g, ''), // orijinal func, boşluksuz
		start,
		end
	};
}

function isLimit(str) { // Limit(x^2,1)
	const limitRe = /^\s*Limit\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const limitMatch = str.match(limitRe)
	if (limitMatch) {
		const func = limitMatch[1]
		const approachVal = Number(limitMatch[2])
		return {
			type: "limit",
			status: true,
			func,
			approachVal
		}
	} else {
		return { status: false }
	}
}

function isDerivative(str) { // Türev(x^2+1,1)
	const turevRe = /^\s*Türev\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const turevMatch = str.match(turevRe)
	if (turevMatch) {
		const func = turevMatch[1] // f
		const approachVal = turevMatch[2] // c
		return {
			type: "derivative",
			status: true,
			func,
			approachVal
		}
	} else {
		return { status: false }
	}
}

function isFunctionOperations(str) { // f+g,f-g,f*g,f/g
	if (!/log|ln|sin|cos|tan|cot|sqrt/.test(str)) {
		// ---- f+g, 2f-3g, -f, -3g+1 ----
		const funcOpRe = /([+-]?\d*)([fghpqr][0-9]*)\b/gi
		const opMatches = [...str.matchAll(funcOpRe)]
		if (opMatches.length > 0) {
			const functions = []
			const coefficients = []

			for (let m of opMatches) {
				let coeffStr = m[1]
				let funcName = m[2]

				if (coeffStr === "" || coeffStr === "+") coeffStr = "+1"
				else if (coeffStr === "-") coeffStr = "-1"
				else if (!coeffStr.startsWith("+") && !coeffStr.startsWith("-")) {
					coeffStr = "+" + coeffStr
				}

				functions.push(funcName)
				coefficients.push(coeffStr)
			}
			return { type: "functionOperations", functions, coefficients, status: true }
		}
	}
	return { status: false }
}

function isFunctionCompositions(str) { // Bileşke(f,x^2)
	const funcCompRe = /^\s*Bileşke\s*\((.+)\)\s*$/i
	const compMatch = str.match(funcCompRe)
	if (compMatch) {
		const inside = compMatch[1]
		const functions = inside.split(/\s*,\s*/).map(p => p.trim())
		return {
			type: "functionCompositions",
			status: true,
			functions
		}
	} else {
		return { status: false }
	}
}

function isSectionalFunctions(str) { // ParçalıFonksiyon(x^2, x<0; x, x>=0)
	if (/,/.test(str)) {
		const segments = str.split(";").map(s => s.trim()).filter(s => s.length > 0);
		const functions = [];
		const ranges = [];

		for (let seg of segments) {
			const parts = seg.split(",").map(p => p.trim());
			if (parts.length !== 2) {
				return { type: "unknown", reason: `Segment '${seg}' must be in 'func,range' format` };
			}

			const func = parts[0];
			const rangeExpr = parts[1].replace(/\s+/g, "");

			// Range parse
			function parseRange(expr) {
				let from = null, to = null, fromInclusive = false, toInclusive = false;

				// Tek nokta x=c
				let mEq = expr.match(/^x=([+-]?\d+(?:\.\d+)?)$/);
				if (mEq) {
					const c = Number(mEq[1]);
					return { from: c, to: c, fromInclusive: true, toInclusive: true };
				}

				// Tek taraflı
				let m1 = expr.match(/^x([<>=]+)(-?\d+(?:\.\d+)?)$/);
				let m2 = expr.match(/^(-?\d+(?:\.\d+)?)([<>=]+)x$/);

				if (m1) {
					const op = m1[1], num = Number(m1[2]);
					if (op === "<") return { from: null, to: num, fromInclusive: false, toInclusive: false };
					if (op === "<=") return { from: null, to: num, fromInclusive: false, toInclusive: true };
					if (op === ">") return { from: num, to: null, fromInclusive: false, toInclusive: false };
					if (op === ">=") return { from: num, to: null, fromInclusive: true, toInclusive: false };
				}

				if (m2) {
					const num = Number(m2[1]), op = m2[2];
					if (op === "<") return { from: num, to: null, fromInclusive: false, toInclusive: false };
					if (op === "<=") return { from: num, to: null, fromInclusive: true, toInclusive: false };
					if (op === ">") return { from: null, to: num, fromInclusive: false, toInclusive: false };
					if (op === ">=") return { from: null, to: num, fromInclusive: false, toInclusive: true };
				}

				// Çift taraflı
				let m3 = expr.match(/^(-?\d+(?:\.\d+)?)(<=|<)x(<=|<)(-?\d+(?:\.\d+)?)$/);
				if (m3) {
					const a = Number(m3[1]), leftOp = m3[2];
					const rightOp = m3[3], b = Number(m3[4]);

					if (a > b) return { type: "unknown", reason: `Invalid range: '${expr}'`, status: false };

					return {
						from: a,
						to: b,
						fromInclusive: leftOp === "<=",
						toInclusive: rightOp === "<="
					};
				}

				return { type: "unknown", reason: `Invalid range expression: '${expr}'`, status: false };
			}
			const range = parseRange(rangeExpr);
			if (!range || range.type === "unknown") return range;

			functions.push(func);
			ranges.push(range);
		}

		return {
			type: "sectionalFunctions",
			functions,
			ranges,
			status: true
		};
	} else {
		return { status: false }
	}
}

function isFunction(input) {
	if (typeof input !== 'string' || input.toLowerCase().includes('dizi')) return { status: false };
	let str = input.trim();
	// y= normalize
	const eqCount = (str.match(/=/g) || []).length;
	if (eqCount > 1) return { status: false };

	if (eqCount === 1) {
		const [left, right] = str.split('=').map(s => s.trim());
		if (left === 'y') str = right;
		else if (right === 'y') str = left;
		else return { status: false };
	}

	// boşluk temizle
	const expr = str.replace(/\s+/g, '');

	let compiled;
	try {
		compiled = math.compile(expr);
	} catch {
		return { status: false }; // syntax hatası
	}

	// evaluate dene
	try {
		compiled.evaluate({ x: 1 });
	} catch (err) {
		const msg = err.message.toLowerCase();

		// SADECE undefined variable ise reject
		if (msg.includes('undefined symbol') || msg.includes('not defined')) {
			return { status: false };
		}
		// diğer tüm hatalar (domain vs) kabul
	}

	return {
		type: "function",
		func: input.trim(),
		status: true
	};
}

function girisKeyDown(event) {
	let setform = document.getElementById('set-popup')
	setform.style.display = 'none'
	handleParanthesis(event)
	let allowKeys = '(){}[],=-+.;<>*^/_bçdğjımnşquüvxyzCÇEFGĞHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(event.key) && !allowKeys.includes(event.key)) {
		event.preventDefault()
	}
	if (event.key === 'Enter' && event.target.value != '') {
		let str = event.target.value
		str = str.replaceAll('y', '')
		str = str.replaceAll('=', '')
		str = str.replaceAll(' ', '')
		if (isPoint(str).status) {
			console.log('Nokta:', isPoint(str))

			let pt = new mPoint(isPoint(str).a, isPoint(str).b)
			arrObjects.push(pt)
			activeElementID = pt.id
			undoObjects = []
			delCount = 0
		} else if (isVerLine(str).status) {
			console.log('Dik doğru:', isVerLine(str))

			let vl = new mVerLine(isVerLine(str).x)
			arrObjects.push(vl)
			activeElementID = vl.id
			undoObjects = []
			delCount = 0
		} else if (isLineWithEquation(str).status) {
			console.log('Eğimli doğru:', isLineWithEquation(str))

			let l = new mLineWithEquation(isLineWithEquation(str).m, isLineWithEquation(str).n)
			arrObjects.push(l)
			activeElementID = l.id
			undoObjects = []
			delCount = 0
		} else if (isLineWithPoints(str).status) {
			console.log('Nokta ile doğru:', isLineWithPoints(str))

			let A = new mPoint(isLineWithPoints(str).xA, isLineWithPoints(str).yA)
			let B = new mPoint(isLineWithPoints(str).xB, isLineWithPoints(str).yB)
			let line = new mLineWithPoints(A, B)
			arrObjects.push(line)
			activeElementID = line.id
			undoObjects = []
			delCount = 0
		} else if (isLineSegment(str).status) {
			console.log('DoğruParçası:', isLineSegment(str))

			let A = new mPoint(isLineSegment(str).xA, isLineSegment(str).yA)
			let B = new mPoint(isLineSegment(str).xB, isLineSegment(str).yB)
			let lineSegment = new mLineSegment(A, B)
			arrObjects.push(lineSegment)
			activeElementID = lineSegment.id
			undoObjects = []
			delCount = 0
		} else if (isSequence(str).status) {
			console.log('Dizi:', isSequence(str))

			let seq = new mSequence(isSequence(str).func, isSequence(str).start, isSequence(str).end)
			arrObjects.push(seq)
			activeElementID = seq.id
			undoObjects = []
			delCount = 0
		} else if (isLimit(str).status) {
			console.log('Limit(x^2,1)', isLimit(str))
			let funcFound = true
			let names = arrObjects.map((item) => item.name)

			if (!isLimit(str).func.includes('x') && !Number.isFinite(Number(isLimit(str).func))) {
				if (!names.includes(isLimit(str).func)) funcFound = false
			}
			if (funcFound) {
				if (!isLimit(str).func.includes('x') && !Number.isFinite(Number(isLimit(str).func))) {
					str = str.replaceAll(isLimit(str).func, arrObjects.find(o => o.name === isLimit(str).func).func)
				}
				let lim = new mLimit(isLimit(str).func, isLimit(str).approachVal)
				arrObjects.push(lim)
				activeElementID = lim.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (girisKeyDown:Limit içinde)')
			}
		} else if (isDerivative(str).status) {
			console.log('Türev(x^2,1)', isDerivative(str))

			let funcFound = true
			let names = arrObjects.map((item) => item.name)
			if (!isDerivative(str).func.includes('x') && !Number.isFinite(Number(isDerivative(str).func))) {
				if (!names.includes(isDerivative(str).func)) funcFound = false
			}
			if (funcFound) {
				if (!isDerivative(str).func.includes('x') && !Number.isFinite(Number(isDerivative(str).func))) {
					str = str.replaceAll(isDerivative(str).func, arrObjects.find(o => o.name === isDerivative(str).func).func)
				}
				let tur = new mTurev(isDerivative(str).func, isDerivative(str).approachVal)
				arrObjects.push(tur)
				activeElementID = tur.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (girisKeyDown:Derivative içinde)')
			}

		} else if (isFunctionCompositions(str).status) {
			console.log('Bileşke(x^2,2x+1):', isFunctionCompositions(str))
			let funcsFound = true
			let names = arrObjects.map((item) => item.name)
			isFunctionCompositions(str).functions.forEach(f => {
				if (!f.includes('x') && !Number.isFinite(Number(f))) {
					if (!names.includes(f)) funcsFound = false
				}
			});
			if (funcsFound) {
				isFunctionCompositions(str).functions.forEach(f => {
					if (!f.includes('x') && !Number.isFinite(Number(f))) {
						str = str.replaceAll(f, arrObjects.find(o => o.name === f).func)
					}
				})
				let cometoBileske = bileskeProcess(isFunctionCompositions(str).functions)
				let func = new mFunction(cometoBileske)
				console.log('Bileşke fonksiyon ifadesi:', cometoBileske)
				arrObjects.push(func)
				activeElementID = func.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (girisKeyDown:Function Compositions içinde)')
			}
		} else if (isFunctionOperations(str).status) {
			console.log('3f+2g, f-4g, 2f*g, f/3g :', isFunctionOperations(str))
			const hepsiVarMi = isFunctionOperations(str).functions.every(name => arrObjects.some(f => f.name === name));
			if (hepsiVarMi) {
				let comeWithFuncs = str
				isFunctionOperations(str).functions.forEach(f => {
					comeWithFuncs = comeWithFuncs.replaceAll(f, '(' + arrObjects.find(o => o.name === f).func + ')')
				});
				let fo = new mFunction(comeWithFuncs)
				arrObjects.push(fo)
				activeElementID = fo.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (girisKeyDown:Function Operations içinde)')
			}
		} else if (isFunction(str).status) {
			console.log('Fonksiyon:', isFunction(str))

			let f = new mFunction(isFunction(str).func)
			arrObjects.push(f)
			activeElementID = f.id
			undoObjects = []
			delCount = 0
		} else if (isSectionalFunctions(str).status) {
			console.log('2x,x<0; x^3, x>=0', isSectionalFunctions(str))

			let allFuncsDrawable = true
			if (allFuncsDrawable) {
				let secFuncs = []
				isSectionalFunctions(str).functions.forEach((func, i) => {
					if (isLineWithEquation(func).status) {
						let line = new mLineWithEquation(isLineWithEquation(func).m, isLineWithEquation(func).n, isSectionalFunctions(str).ranges[i].from, isSectionalFunctions(str).ranges[i].to)
						line.id = null
						secFuncs.push(line)
					} else if (isFunction(func).status) {
						let other = new mFunction(func, isSectionalFunctions(str).ranges[i].from, isSectionalFunctions(str).ranges[i].to)
						other.id = null
						secFuncs.push(other)
					} else {
						console.log('Tür bulunamadı. (girisKeyDown:Sectional Functions içinde)')
					}
				})
				let sf = new mSectionalFunctions(str)
				sf.secFuncs = secFuncs
				arrObjects.push(sf)
				activeElementID = sf.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. (girisKeyDown:Sectional Functions içinde)')
			}

		} else {
			showToast('Hata', 'Girdi tanınamadı. Lütfen doğru formatta girdiğinizden emin olun. (girisKeyDown içinde)')
		}
		drawAll()
		labelsCreator()
		event.target.value = null
	}
}

function handleParanthesis(e) {
	const el = e.target
	const pairs = {
		'(': ')',
		'[': ']',
		'{': '}'
	}
	// const closePairs = Object.fromEntries(Object.entries(pairs).map(([o, c]) => [c, o]))
	// --- Açılış parantezi yazma ---
	if (pairs[e.key]) {
		e.preventDefault()
		const start = el.selectionStart
		const end = el.selectionEnd
		const value = el.value
		const open = e.key
		const close = pairs[e.key]
		const selectedText = value.slice(start, end)

		el.value = value.slice(0, start) + open + selectedText + close + value.slice(end);

		if (selectedText) {
			el.selectionStart = start + 1
			el.selectionEnd = end + 1
		} else {
			el.selectionStart = el.selectionEnd = start + 1
		}
	}

	// --- Backspace ile silme kontrolü ---
	if (e.key === "Backspace") {
		const start = el.selectionStart
		const end = el.selectionEnd
		const value = el.value

		// Seçim varsa normal silmeye izin ver
		if (start !== end) return

		// Sol karakter bir açılış parantezi mi?
		const prevChar = value[start - 1]
		const nextChar = value[start]

		if (pairs[prevChar] && nextChar === pairs[prevChar]) {
			e.preventDefault()
			el.value = value.slice(0, start - 1) + value.slice(start + 1)
			el.selectionStart = el.selectionEnd = start - 1
		}
	}
}

function delBtnClick(e) {
	delCount++
	let elementid = e.target.closest("div").children[0].id
	let delid = elementid.substring(0, elementid.indexOf("-"))
	let deletedObj = arrObjects.find(item => item.id == delid)

	undoObjects.push(deletedObj)
	arrObjects = arrObjects.filter(item => item.id !== Number(delid));

	activeElementID = null
	activeObject = 'choice'
	canvas.style.cursor = 'pointer'
	document.querySelectorAll('.buttonGroup .button').forEach(b => b.classList.remove('active'))
	document.getElementById('btnChoice').classList.add('active')
	document.getElementById('set-popup').style.display = 'none'

	drawAll()
	labelsCreator()
}

function ayarBtnClick(e) {
	let setform = document.getElementById('set-popup')
	let elementid = e.target.closest("div").children[0].id
	changeActiveElement(elementid)
	if (setform.style.display != 'block') setform.style.display = 'block'
}

function visibilityBtnClick(e) {
	let elementid = e.target.closest("div").children[0].id
	changeActiveElement(elementid)
	let activeitem = arrObjects.find(item => item.id == activeElementID)
	if (activeitem.visibility == true) {
		activeitem.visibility = false
		e.target.style.background = 'transparent'
	} else {
		activeitem.visibility = true
		e.target.style.background = activeitem.color
	}
	drawAll()
}

function closeSetClick(evt) {
	let setform = document.getElementById('set-popup')
	setform.style.display = 'none'
}

function setsizeChanged() {
	arrObjects.find(item => item.id == activeElementID).size = document.getElementById('setsize').value
	setsizelabel.innerHTML = 'Boyut: ' + arrObjects.find(item => item.id == activeElementID).size
	drawAll()
}

function setcolorClick() {
	arrObjects.find(item => item.id == activeElementID).color = setcolor.value
	drawAll()
}

function getMousePos(evt) {
	let rect = canvas.getBoundingClientRect()
	let xx = (evt.clientX - rect.left + minX * scaleY) / scaleY
	let yy = (evt.clientY - rect.top + minY * scaleX) / -scaleX

	let intRoundXX = Math.round(xx)
	let fixRoundXX = Number(xx).toFixed(2)

	if (Math.abs(intRoundXX - fixRoundXX) < .1) {
		xx = intRoundXX
	} else {
		xx = fixRoundXX
	}

	let intRoundYY = Math.round(yy)
	let fixRoundYY = Number(yy).toFixed(2)
	if (Math.abs(intRoundYY - fixRoundYY) < .1) {
		yy = intRoundYY
	} else {
		yy = fixRoundYY
	}

	return { x: xx * unitY, y: yy * unitX }
}

function crossSlider() {
	if (activeElementID != null) {
		let sliderA = document.getElementById(activeElementID + '-sliderA')
		let sliderB = document.getElementById(activeElementID + '-sliderB')
		let labelA = document.getElementById(activeElementID + '-labelA')
		let labelB = document.getElementById(activeElementID + '-labelB')
		let input = document.getElementById(activeElementID + '-input')
		let output = document.getElementById(activeElementID + '-output')
		let item = arrObjects.find(item => item.id == activeElementID)

		if (item.type == 'point') {
			labelA.innerHTML = 'a = ' + sliderA.value
			item.a = sliderA.value
			labelB.innerHTML = 'b = ' + sliderB.value
			item.b = sliderB.value
			input.value = item.name + '(' + item.a + ',' + item.b + ')'
		} else if (item.type == 'derivative') {
			labelA.innerHTML = 'x = ' + sliderA.value
			item.approachVal = sliderA.value
		} else if (item.type == 'lineWithEquation') {
			item.m = sliderA.value
			item.n = sliderB.value
			labelA.innerHTML = 'm = ' + item.m
			labelB.innerHTML = 'n = ' + item.n
			input.value = 'y = ' + normalizeLine(Number(item.m), Number(item.n))
		} else if (item.type == 'verLine') {
			item.x = sliderA.value
			labelA.innerHTML = 'x = ' + item.x
			input.value = item.name + ': x = ' + item.x
		} else if (item.type == 'limit') {
			item.approachValRight = sliderA.value
			labelA.innerHTML = sliderA.min + '⁺ = ' + sliderA.value
			sliderA.innerHTML = item.approachValRight + '⁺ = ' + Number(sliderA.value).toFixed(2)
			item.approachValLeft = sliderB.value
			labelB.innerHTML = sliderB.max + '⁻ = ' + sliderB.value
			sliderB.innerHTML = item.approachVal + '⁻ = ' + Number(sliderB.value).toFixed(2)

			let A = new mPoint(Number(sliderA.value), 0)
			let B = new mPoint(Number(sliderA.value), math.evaluate(item.func, { x: A.a }))
			let C = new mPoint(0, math.evaluate(item.func, { x: A.a }))
			let vls = new mLineSegment(A, B)
			let hls = new mLineSegment(B, C)
			A.color = B.color = C.color = vls.color = hls.color = item.color
			vls.lineDash = hls.lineDash = [2, 5]
			drawLineSegment(vls)
			drawLineSegment(hls)
			drawPoint(A)
			drawPoint(B)
			drawPoint(C)
		} else {
			console.log('crossSlider içinde type bulunamadı.')
		}
	}
	drawAll()
}

function defaultClick(evt) {
	if (evt.name == 'zoomDef') {
		if (document.getElementById('coor').innerHTML == 'x') {
			minY = -3
			scaleY = 100
			unitY = 1
			tickY = 3
		} else {
			minX = -8
			scaleX = 100
			unitX = 1
			tickX = 3
		}
	} else {
		minX = -8
		scaleX = 100
		unitX = 1
		tickX = 3

		minY = -3
		scaleY = 100
		unitY = 1
		tickY = 3
	}
	drawAll()
}
function buttonMove(e) {
	document.getElementById('coor').innerHTML = e.name
}

function showToast(title, msg) {
	let x = document.getElementById("snackbar")
	document.getElementById('snackTitle').innerHTML = title
	document.getElementById('snackContent').innerHTML = msg
	x.className = "show"
	setTimeout(function () { x.className = x.className.replace("show", "") }, 3000)
}

function changeName(newName) {
	let hasNameid
	let found = arrObjects.find(item => item.name === newName)
	hasNameid = found ? found.id : null

	if (hasNameid != null && arrObjects[hasNameid] != newName) {
		let i = 1
		let names
		if (arrObjects[hasNameid].type === 'point') names = arrObjects.filter(item => item.type === "point").map(item => item.name)
		if (arrObjects[hasNameid].type === 'sequence') names = arrObjects.filter(item => item.type === "sequence").map(item => item.name)
		if (arrObjects[hasNameid].type === 'limit') names = arrObjects.filter(item => item.type === "limit").map(item => item.name)
		if (arrObjects[hasNameid].type === 'other' || arrObjects[hasNameid].type === 'line') names = arrObjects.filter(item => item.type === "line" || item.type === "other").map(item => item.name)
		let foundName
		while (true) {
			if (!(names).includes(arrObjects[hasNameid].name + i)) {
				foundName = arrObjects[hasNameid].name + i
				break
			}
			i++
		}
		arrObjects[hasNameid].name = foundName
	}
	arrObjects[activeElementID].name = newName
}

function createLineEquation(A, B) {
	let m = (B.b - A.b) / (B.a - A.a)
	let c = A.b - m * A.a
	return {
		m: m,
		c: c
	}
}

function isMobile() {
	return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

$(document).ready(function () {

	// document.addEventListener('contextmenu', event => event.preventDefault())

	let objectsContainer = document.getElementById('objectsContainer')
	drawAll()
	window.onresize = function () {
		canvas.width = innerWidth
		canvas.height = innerHeight
		drawAll()
	}

	if (isMobile()) {
		document.getElementById('leftWrapper').classList.toggle('hide')
		toggleCalcIcon(document.getElementById('btnimgCalc'))
		minX = -2
		minY = -3
		drawAll()
	}


	document.getElementById('undo').addEventListener('click', function (evt) {
		activeElementID = null
		if (arrObjects.length != 0) {
			if (delCount == 0) {
				undoObjects.push(arrObjects.pop())
			} else {
				arrObjects.push(undoObjects.pop())
				delCount--
			}
		} else {
			activeElementID = null
			activeObject = 'choice'
			canvas.style.cursor = 'pointer'
			document.querySelectorAll('.buttonGroup .button').forEach(b => b.classList.remove('active'))
			document.getElementById('btnChoice').classList.add('active')
		}
		drawAll()
		labelsCreator()
	}, false)

	document.getElementById('clear').addEventListener('click', function (evt) {
		if (arrObjects.length != 0) {
			arrObjects = []
			undoObjects = []
			delCount = 0
			activeElementID = null
			clearSound.play()
			activeObject = 'choice'
			lineDrawing = false
			canvas.style.cursor = 'pointer'
			document.querySelectorAll('.buttonGroup .button').forEach(b => b.classList.remove('active'))
			document.getElementById('btnChoice').classList.add('active')
			document.getElementById('set-popup').style.display = 'none'
			drawAll()
			objectsContainer.innerHTML = ''
		}
	}, false)

	document.getElementById('redo').addEventListener('click', function (evt) {
		if (undoObjects.length != 0 && delCount == 0) {
			arrObjects.push(undoObjects.pop())
			drawAll()
			labelsCreator()
		}
	}, false)

	document.getElementById('left').addEventListener('click', function (evt) {
		minX--
		drawAll()
	}, false)

	document.getElementById('right').addEventListener('click', function (evt) {
		minX++
		drawAll()
	}, false)

	document.getElementById('up').addEventListener('click', function (evt) {
		minY--
		drawAll()
	}, false)

	document.getElementById('down').addEventListener('click', function (evt) {
		minY++
		drawAll()
	}, false)

	document.getElementById('minusX').addEventListener('click', function (evt) {
		if (tickY < units.length - 1) {
			scaleY *= .95
			tickY++
			unitY = units[tickY]
			drawAll()
		}
	}, false)

	document.getElementById('plusX').addEventListener('click', function (evt) {
		if (0 < tickY) {
			scaleY *= 1.05
			tickY--
			unitY = units[tickY]
			drawAll()
		}
	}, false)

	document.getElementById('minusY').addEventListener('click', function (evt) {
		if (tickX < units.length - 1) {
			scaleX *= .95
			tickX++
			unitX = units[tickX]
			drawAll()
		}
	}, false)

	document.getElementById('plusY').addEventListener('click', function (evt) {
		if (0 < tickX) {
			scaleX *= 1.05
			tickX--
			unitX = units[tickX]
			drawAll()
		}
	}, false)

	canvas.addEventListener("wheel", (e) => {
		if (e.deltaY < 0) {
			if (0 < tickY) {
				scaleY *= 1.05
				tickY--
				unitY = units[tickY]
				drawAll()
			}
			if (0 < tickX) {
				scaleX *= 1.05
				tickX--
				unitX = units[tickX]
				drawAll()
			}
		}
		if (e.deltaY > 0) {
			if (tickY < units.length - 1) {
				scaleY *= .95
				tickY++
				unitY = units[tickY]
				drawAll()
			}
			if (tickX < units.length - 1) {
				scaleX *= .95
				tickX++
				unitX = units[tickX]
				drawAll()
			}
		}
	})

	canvas.addEventListener("mousemove", function (evt) {
		let tempPoint = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
		if (activeObject === 'point') {
			canvas.style.cursor = 'none'
			drawAll()
			drawPoint(tempPoint, true)
		}
		if (activeObject === 'line') {
			canvas.style.cursor = 'none'
			drawAll()
			drawPoint(tempPoint, true)
			if (lineDrawing) {
				let lineB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
				drawLineWithPoints(new mLineWithPoints(lineA, lineB, true))
			}
		}
		if (activeObject === 'linesegment') {
			canvas.style.cursor = 'none'
			drawAll()
			drawPoint(tempPoint, true)
			if (lineSegmentDrawing) {
				let lineSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawAll()
				drawPoint(lineSegmentB, true)
				drawLineSegment(new mLineSegment(lineSegmentA, lineSegmentB, true))
			}
		}
	}, false)

	canvas.addEventListener("mousedown", function (evt) {
		if (evt.button == 0) {
			if (activeObject == 'choice') {
				canvas.style.cursor = 'grabbing'
				firstMousePos = getMousePos(evt)
				findPointPos = getMousePos(evt)
			}

			if (activeObject === 'point') {
				let mousePos = getMousePos(evt)
				let point = new mPoint(mousePos.x, mousePos.y)
				arrObjects.push(point)
				activeElementID = point.id
				undoObjects = []
				delCount = 0
				drawAll()
				labelsCreator()
			}
			if (activeObject === 'line') {
				if (lineDrawing == false) {
					lineA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					lineDrawing = true
				} else {
					lineB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					let lwp = new mLineWithPoints(lineA, lineB)
					arrObjects.push(lwp)
					lineDrawing = false
					lineA = lineB = null
				}
			}

			if (activeObject === 'linesegment') {
				if (lineSegmentDrawing == false) {
					lineSegmentA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					lineSegmentDrawing = true
				} else {
					lineSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)

					let ls = new mLineSegment(lineSegmentA, lineSegmentB)
					arrObjects.push(ls)
					activeElementID = ls.id
					lineSegmentDrawing = false
					lineSegmentA = lineSegmentB = null
				}
			}
		}
		drawAll()
		labelsCreator()
	}, false)

	canvas.addEventListener("mouseup", function (evt) {
		if (activeObject == 'choice' && firstMousePos != undefined) {
			lastMousePos = getMousePos(evt)
			if (lastMousePos.x - firstMousePos.x >= 1 * unitY) minX--
			if (lastMousePos.x - firstMousePos.x <= -1 * unitY) minX++
			if (lastMousePos.y - firstMousePos.y >= 1 * unitX) minY++
			if (lastMousePos.y - firstMousePos.y <= -1 * unitX) minY--
			canvas.style.cursor = 'pointer'
			drawAll()
		}
	}, false)

	document.addEventListener("keydown", function (evt) {
		if (evt.key == 'Escape') {
			if (lineDrawing == true) {
				lineDrawing = false
				lineA = lineB = null
				arrObjects.pop()
			}
			if (lineSegmentDrawing == true) {
				lineSegmentDrawing = false
				lineSegmentA = lineSegmentB = null
				arrObjects.pop()
			}
			activeElementID = null

			activeObject = 'choice'
			canvas.style.cursor = 'pointer'
			document.querySelectorAll('.buttonGroup .button').forEach(b => b.classList.remove('active'))
			document.getElementById('btnChoice').classList.add('active')

			drawAll()
			labelsCreator()
		}
	}, false)

	let reSizer = document.querySelector(".reSizer")
	let leftWrapper = document.querySelector(".leftWrapper")

	function initResizerFunction(reSizer, leftWrapper) {
		let x, w, y, h
		function mouseDownHand(e) {
			leftWrapper.style.transition = "all 0s"
			if (innerHeight < innerWidth) {
				x = e.clientX
				let sbWidth = window.getComputedStyle(leftWrapper).width
				w = parseInt(sbWidth, 10)
			} else {
				y = e.clientY
				let sbHeight = window.getComputedStyle(leftWrapper).height
				h = parseInt(sbHeight, 10)
			}
			document.addEventListener('mousemove', mouseMoveHand)
			document.addEventListener('mouseup', mouseUpHand)
		}

		function mouseMoveHand(evt) {
			if (innerHeight < innerWidth) {
				let dx = evt.clientX - x
				let cw = w + dx
				if (cw < 700) {
					leftWrapper.style.width = cw + "px"
				}
			} else {
				let dy = y - evt.clientY
				let ch = h + dy
				if (ch < 450) {
					leftWrapper.style.height = ch + "px"
				}
			}
		}
		function mouseUpHand() {
			leftWrapper.style.transition = "all 1s"
			document.removeEventListener('mouseup', mouseUpHand)
			document.removeEventListener('mousemove', mouseMoveHand)
		}
		reSizer.addEventListener('mousedown', mouseDownHand)
	}

	initResizerFunction(reSizer, leftWrapper)
})