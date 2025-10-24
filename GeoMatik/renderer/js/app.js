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

let units = [1 / 10, 1 / 5, 1 / 2, 1, 2, 5, 10, 20]
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

/* WATCH LIST */
function writeWatchList(wtch, type = null) {
	let watchlistspan = document.getElementById('watchList')
	Object.entries(wtch).forEach(([key, value]) => {
		if (type) { watchlistspan.innerHTML += key + ':' + value + '<br>' } else { console.log(key + ':' + value) }
	});
}
/* WATCH LIST */

let idCount = -1
function idCounter() {
	idCount++
	return idCount
}

class mPoint {
	constructor(x, y, come = null, setid = true) {
		if (come == null) come = '(' + x + ',' + y + ')'
		this.name = createName('point')
		setid ? this.id = idCounter() : this.id = null
		this.x = x
		this.y = y
		this.color = getRandomColor()
		this.visibility = true
		this.size = 3
		this.type = 'point'
		this.inputView = come
	}
}
class mLineSegment {
	constructor(A, B, come = null, setid = true) {
		if (come == null) come = 'DoğruParçası(' + A.inputView + ',' + B.inputView + ')'
		this.name = createName('linesegment')
		setid ? this.id = idCounter() : this.id = null
		this.A = A
		this.B = B
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.type = 'linesegment'
		this.inputView = come
	}
}
class mLine {
	constructor(a, b, A, B, come = null, startX = null, endX = null, setid = true) {
		if (come == null) come = 'y=' + a + 'x+' + b
		if (classify(come).subtype == 'vertical') {
			const denkCount = arrObjects.filter(f => f.name.includes("denk")).length + 1
			this.name = 'denk' + denkCount
		} else {
			this.name = createName('line')
		}
		setid ? this.id = idCounter() : this.id = null
		this.a = a
		this.b = b
		this.A = A
		this.B = B
		if (Math.sign(b) == -1) {
			this.graph = a + '*x-' + Math.abs(b)
		} else {
			this.graph = a + '*x+' + b
		}
		this.startX = startX
		this.endX = endX
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'line'
		this.inputView = come
	}
}
class mFunction {
	constructor(newCome, come, startX = null, endX = null) {
		this.name = createName('other')
		this.id = idCounter()
		this.graph = newCome
		this.startX = startX
		this.endX = endX
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'other'
		this.inputView = come
	}
}
class mSequence {
	constructor(seq, s, e, come) {
		this.name = createName('sequence')
		this.id = idCounter()
		this.graph = seq
		this.start = s
		this.end = e
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'sequence'
		this.inputView = come
	}
}

class mLimit {
	constructor(lim, a, come) {
		this.name = createName('limit')
		this.id = idCounter()
		this.graph = lim
		this.approachVal = a
		this.approachValRight = Number(a) + 0.4
		this.approachValLeft = a - 0.4
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.type = 'limit'
		this.inputView = come
	}
}

function derivative(funcStr, variable = "x") {
	try {
		const df = math.derivative(normalize(funcStr), variable);
		return df.toString();
	} catch (err) {
		return "undefined";
	}
}

class mTurev {
	constructor(tur, a, come) {
		this.name = createName('turev')
		this.id = idCounter()
		this.graph = tur
		this.turGraph = derivative(classify(come).func)
		this.approachVal = a
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.type = 'turev'
		this.inputView = come
	}
}

class mSectionalFunctions {
	constructor(come) {
		this.name = createName('other')
		this.id = idCounter()
		this.secFuncs = null
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'sectionalfunctions'
		this.inputView = come
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
	} else if (type == 'turev') {
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
		} else if (item.type === 'line') {
			drawLine(item)
		} else if (item.type === 'sequence') {
			drawSequence(item)
		} else if (item.type === 'limit') {
			drawLimit(item)
		} else if (item.type === 'turev') {
			drawTurev(item)
		} else if (item.type === 'other') {
			drawFunction(item)
		} else if (item.type === 'linesegment') {
			drawLineSegment(item)
		} else if (item.type === 'sectionalfunctions') {
			drawSectionalFunctions(item)
		} else { console.log('Type bulunamadı.') }
	})
}

function drawPoint(point) {
	if (!point.visibility) return
	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.fillStyle = point.color
	let pSize
	point.id == activeElementID ? pSize = point.size + 2 : pSize = point.size

	ctx.arc((-minX + point.x / unitY) * scaleY, (-minY - point.y / unitX) * scaleX, pSize, 0, 2 * Math.PI)
	ctx.lineWidth = 1
	//ctx.fillRect(400, 400, 20, 20)
	if (point.inputView) text((-minX + point.x / unitY) * scaleY - 10, (-minY - point.y / unitX) * scaleX - 5, point.color, 'center', 'bold 15px arial', point.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()

	if (findPointPos != null) {
		let distance =
			Number((findPointPos.x - point.x) * (findPointPos.x - point.x) +
				(findPointPos.y - point.y) * (findPointPos.y - point.y)).toFixed(2)
		if (distance == 0) {
			console.log(point.name, distance)
		}
	}
}

function drawLine(line) {
	if (!line.visibility) return

	let verticalNumber
	let mostLeft = minX * unitY
	let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
	let startX
	let endX
	line.startX == null ? startX = -50000 : startX = line.startX
	line.endX == null ? endX = 50000 : endX = line.endX
	startX = Math.max(mostLeft, startX)
	endX = Math.min(mostRight, endX)
	if (startX > endX) startX = endX

	let lineSize
	line.id == activeElementID ? lineSize = line.size + 1 : lineSize = line.size
	ctx.lineWidth = lineSize
	if (line.A == null) {
		if (classify(line.inputView).subtype == 'vertical') {
			//console.log('vertical denklem girildi')
			verticalNumber = classify(line.inputView).x
			ctx.beginPath()
			ctx.strokeStyle = ctx.fillStyle = line.color
			ctx.lineWidth = lineSize
			ctx.moveTo((-minX + verticalNumber / unitY) * scaleY, canvas.height + 100)
			ctx.lineTo((-minX + verticalNumber / unitY) * scaleY, -canvas.height - 100)
			if (line.id != null) text((-minX + verticalNumber / unitY) * scaleY + 10, 15, line.color, 'center', 'bold 15px arial', line.name)
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
		} else {
			//console.log('eğimli denklem girildi')
			let x, y
			ctx.beginPath()
			ctx.strokeStyle = ctx.fillStyle = line.color
			ctx.lineWidth = lineSize
			x = startX
			y = math.evaluate(line.graph, { x: x })
			ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			x = endX
			y = math.evaluate(line.graph, { x: x })
			ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			if (line.a != 0) {
				if (line.id != null) text((-minX + (-minY - line.b) / line.a) * scaleY + 5, 20, line.color, 'center', 'bold 15px arial', line.name)
			} else {
				if (line.id != null) text(canvas.width - 10, -minY * scaleX - (y * scaleX) / unitX - 10, line.color, 'center', 'bold 15px arial', line.name)
			}
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
		}
	} else {
		if (line.A.x == line.B.x) {
			//console.log('noktalar girildi A.x=B.x')
			verticalNumber = line.A.x
			ctx.beginPath()
			ctx.strokeStyle = ctx.fillStyle = line.color
			ctx.lineWidth = lineSize
			ctx.moveTo((-minX + verticalNumber / unitY) * scaleY, canvas.height + 100)
			ctx.lineTo((-minX + verticalNumber / unitY) * scaleY, -canvas.height - 100)
			if (line.id != null) text((-minX + verticalNumber / unitY) * scaleY + 10, 15, line.color, 'center', 'bold 15px arial', line.name)
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
		} else {
			//console.log('noktalar girildi A.x!=B.x', line)
			let x, y
			ctx.beginPath()
			ctx.strokeStyle = ctx.fillStyle = line.color
			ctx.lineWidth = lineSize
			x = startX
			y = math.evaluate(line.graph, { x: x })
			ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			x = endX
			y = math.evaluate(line.graph, { x: x })
			ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			if (line.a != 0) {
				if (line.id != null) text((-minX + (-minY - line.b) / line.a) * scaleY + 5, 20, line.color, 'center', 'bold 15px arial', line.name)
			} else {
				if (line.id != null) text(canvas.width - 10, -minY * scaleX - (y * scaleX) / unitX - 10, line.color, 'center', 'bold 15px arial', line.name)
			}
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
		}
	}
}

function drawFunction(func) {
	if (!func.visibility) return

	let mostLeft = minX * unitY
	let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
	let startX
	let endX
	func.startX == null ? startX = -50000 : startX = func.startX
	func.endX == null ? endX = 50000 : endX = func.endX
	startX = Math.max(mostLeft, startX)
	endX = Math.min(mostRight, endX)
	if (startX > endX) startX = endX

	ctx.beginPath()
	ctx.strokeStyle = func.color
	let fSize
	func.id == activeElementID ? fSize = func.size + 1 : fSize = func.size
	ctx.lineWidth = fSize
	let step = 0.01
	let firstPoint = true
	let x = startX
	while (x < endX) {
		let y = math.evaluate(func.graph, { x: x })
		if (!isFinite(y)) {
			firstPoint = true
			x += step
			continue
		}
		let canvasX = -minX * scaleY + (x * scaleY) / unitY
		let canvasY = -minY * scaleX - (y * scaleX) / unitX

		if (firstPoint) {
			ctx.moveTo(canvasX, canvasY)
			firstPoint = false
		} else {
			ctx.lineTo(canvasX, canvasY)
		}
		x += step
	}
	ctx.stroke()
	ctx.closePath()
}

function drawSequence(seq) {
	if (!seq.visibility) return

	ctx.beginPath()
	ctx.strokeStyle = seq.color
	let sSize
	seq.id == activeElementID ? sSize = seq.size + 1 : sSize = seq.size - 1
	ctx.lineWidth = sSize
	ctx.setLineDash([2, 5])
	let step = 0.01
	let firstPoint = true
	let x = minX * unitY

	while (x < (minX + Math.round(canvas.width / scaleY) + 1) * unitY) {
		let y = math.evaluate(seq.graph, { x: x })
		if (!isFinite(y)) {
			firstPoint = true
			x += step
			continue
		}

		let canvasX = -minX * scaleY + (x * scaleY) / unitY
		let canvasY = -minY * scaleX - (y * scaleX) / unitX

		if (firstPoint) {
			ctx.moveTo(canvasX, canvasY)
			firstPoint = false
		} else {
			ctx.lineTo(canvasX, canvasY)
		}
		x += step
	}

	ctx.stroke()
	ctx.setLineDash([])
	ctx.closePath()

	for (let x = seq.start; x <= seq.end; x++) {
		ctx.beginPath()
		ctx.strokeStyle = 'black'
		ctx.fillStyle = seq.color
		ctx.lineWidth = 1
		let y = math.evaluate(seq.graph, { x: x })
		ctx.arc((-minX + x / unitY) * scaleY, (-minY - y / unitX) * scaleX, seq.size, 0, 2 * Math.PI)
		text((-minX + x / unitY) * scaleY - 10, (-minY - y / unitX) * scaleX - 5, seq.color, 'center', 'bold 15px arial', seq.name + x)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
	}
}

function drawLimit(lim) {
	if (!lim.visibility) return
	ctx.beginPath()
	ctx.strokeStyle = lim.color
	let limSize
	lim.id == activeElementID ? limSize = lim.size + 1 : limSize = lim.size
	ctx.lineWidth = limSize
	ctx.setLineDash(lim.lineDash)
	let step = 0.01
	let firstPoint = true
	let x = minX * unitY

	while (x < (minX + Math.round(canvas.width / scaleY) + 1) * unitY) {
		let y = math.evaluate(lim.graph, { x: x })
		if (!isFinite(y)) {
			firstPoint = true
			x += step
			continue
		}

		let canvasX = -minX * scaleY + (x * scaleY) / unitY
		let canvasY = -minY * scaleX - (y * scaleX) / unitX

		if (firstPoint) {
			ctx.moveTo(canvasX, canvasY)
			firstPoint = false
		} else {
			ctx.lineTo(canvasX, canvasY)
		}
		x += step
	}

	ctx.stroke()
	ctx.setLineDash([])
	ctx.closePath()

	// Limit noktasında
	let A = new mPoint(Number(lim.approachVal), 0)
	let B = new mPoint(Number(lim.approachVal), math.evaluate(lim.graph, { x: A.x }))
	let C = new mPoint(0, math.evaluate(lim.graph, { x: A.x }))
	A.inputView = B.inputView = C.inputView = null
	let vls = new mLineSegment(A, B)
	let hls = new mLineSegment(B, C)
	A.color = B.color = C.color = vls.color = hls.color = lim.color
	vls.inputView = hls.inputView = null
	drawLineSegment(vls)
	drawLineSegment(hls)
	drawPoint(A)
	drawPoint(B)
	drawPoint(C)

	if (lim.id == activeElementID) {
		// Limit noktasının sağında
		let A = new mPoint(lim.approachValRight, 0)
		let B = new mPoint(lim.approachValRight, math.evaluate(lim.graph, { x: A.x }))
		let C = new mPoint(0, math.evaluate(lim.graph, { x: A.x }))
		A.inputView = B.inputView = C.inputView = null
		let vls = new mLineSegment(A, B)
		let hls = new mLineSegment(B, C)
		A.color = B.color = C.color = vls.color = hls.color = lim.color
		vls.lineDash = hls.lineDash = [2, 5]
		vls.inputView = hls.inputView = null
		drawLineSegment(vls)
		drawLineSegment(hls)
		drawPoint(A)
		drawPoint(B)
		drawPoint(C)

		//limit noktasının solunda
		A = new mPoint(lim.approachValLeft, 0)
		B = new mPoint(lim.approachValLeft, math.evaluate(lim.graph, { x: A.x }))
		C = new mPoint(0, math.evaluate(lim.graph, { x: A.x }))
		A.inputView = B.inputView = C.inputView = null
		vls = new mLineSegment(A, B)
		hls = new mLineSegment(B, C)
		A.color = B.color = C.color = vls.color = hls.color = lim.color
		vls.lineDash = hls.lineDash = [2, 5]
		vls.inputView = hls.inputView = null
		drawLineSegment(vls)
		drawLineSegment(hls)
		drawPoint(A)
		drawPoint(B)
		drawPoint(C)
	}
}

function drawTurev(tur) {
	if (!tur.visibility) return
	ctx.beginPath()
	ctx.strokeStyle = tur.color
	let turSize
	tur.id == activeElementID ? turSize = tur.size + 1 : turSize = tur.size
	ctx.lineWidth = turSize
	ctx.setLineDash(tur.lineDash)

	let step = 0.01
	let firstPoint = true
	let x = minX * unitY
	while (x < (minX + Math.round(canvas.width / scaleY) + 1) * unitY) {
		let y = math.evaluate(tur.graph, { x: x })
		if (!isFinite(y)) {
			firstPoint = true
			x += step
			continue
		}

		let canvasX = -minX * scaleY + (x * scaleY) / unitY
		let canvasY = -minY * scaleX - (y * scaleX) / unitX
		if (firstPoint) {
			ctx.moveTo(canvasX, canvasY)
			firstPoint = false
		} else {
			ctx.lineTo(canvasX, canvasY)
		}
		x += step
	}

	ctx.stroke()
	ctx.setLineDash([])
	ctx.closePath()

	// Türev noktasında
	let A = new mPoint(Number(tur.approachVal), 0)
	let B = new mPoint(Number(tur.approachVal), math.evaluate(tur.graph, { x: A.x }))
	let C = new mPoint(0, math.evaluate(tur.graph, { x: A.x }))
	A.inputView = B.inputView = C.inputView = null
	let vls = new mLineSegment(A, B)
	let hls = new mLineSegment(B, C)
	A.color = B.color = C.color = vls.color = hls.color = tur.color
	vls.inputView = hls.inputView = null
	drawLineSegment(vls)
	drawLineSegment(hls)
	drawPoint(A)
	drawPoint(B)
	drawPoint(C)

	//Teğet Doğrusu
	if (tur.id == activeElementID) {
		let m = math.evaluate(tur.turGraph, { x: tur.approachVal })
		let c = math.evaluate(tur.graph, { x: tur.approachVal }) - m * tur.approachVal
		let tLine = new mLine(m, c, null, null, null, null, null, false)
		tLine.color = 'black'
		drawLine(tLine)
	}
}

function drawLineSegment(ls) {
	if (!ls.visibility) return
	ls.inputView = 'DoğruParçası(' + ls.A.inputView + ',' + ls.B.inputView + ')'
	//Doğru Parçası
	ctx.beginPath()
	ctx.strokeStyle = ctx.fillStyle = ls.color
	let lsSize
	ls.id == activeElementID ? lsSize = ls.size + 1 : lsSize = ls.size
	ctx.lineWidth = lsSize
	ctx.setLineDash(ls.lineDash)
	ctx.moveTo((-minX + ls.A.x / unitY) * scaleY, (-minY - ls.A.y / unitX) * scaleX)
	ctx.lineTo((-minX + ls.B.x / unitY) * scaleY, (-minY - ls.B.y / unitX) * scaleX)
	//text((-minX + verticalNumber / unitY) * scaleY + 10, 15, line.color, 'center', 'bold 15px arial', line.name)
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
		if (func.type == 'line') {
			drawLine(func)
		} else if (func.type == 'other') {
			drawFunction(func)
		} else {
			console.log('Type bulunamadı.')
		}
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
		//labelA.style.width = '70px'
		labelA.htmlFor = item.id + '-sliderA'
		let sliderA = document.createElement('input')
		sliderA.type = "range"
		sliderA.id = item.id + '-sliderA'
		sliderA.step = 0.01

		let labelB = document.createElement('label')
		labelB.id = item.id + '-labelB'
		//labelB.style.width = '70px'
		labelB.htmlFor = item.id + '-sliderB'

		let sliderB = document.createElement('input')
		sliderB.type = "range"
		sliderB.id = item.id + '-sliderB'
		sliderB.step = 0.01

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
			input.value = item.name + item.inputView
		} else if (item.type == 'line') {
			if (item.A == null) {
				input.value = item.name + ':' + item.inputView
				if (item.a == null) {
					labelB.hidden = true
					sliderB.hidden = true
				}
			} else {
				input.value = item.name + '(x) = Doğru(' + item.A.inputView + ',' + item.B.inputView + ')'
				output.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = ' + item.graph
				if (item.a == null) {
					input.value = item.name + ' = Doğru(' + item.A.inputView + ',' + item.B.inputView + ')'
					output.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = ' + item.inputView
					labelB.hidden = true
					sliderB.hidden = true
				}
			}
		} else if (item.type == 'linesegment') {
			input.value = item.name + ' = ' + item.inputView
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'sequence') {
			input.value = item.name + 'ₓ = ' + item.inputView
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'limit') {
			input.value = item.name + ' = ' + item.inputView
		} else if (item.type == 'turev') {
			input.value = item.name + '=' + item.inputView
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'sectionalfunctions') {
			input.value = item.name + '(x) = {' + item.inputView + '}'
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'other') {
			input.value = item.name + ':' + item.inputView
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else {
			console.log('Tür bulunamadı.')
		}

		sliderA.min = minX * unitY - 1
		sliderA.max = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
		sliderB.max = -minY * unitX + 1
		sliderB.min = (minY + Math.round(canvas.height / scaleX) + 1) * -unitX

		if (item.type == 'point') {
			sliderA.value = item.x
			labelA.innerHTML = 'a = ' + item.x
			sliderB.value = item.y
			labelB.innerHTML = 'b = ' + item.y
		} else if (item.type == 'line') {
			sliderA.value = item.a
			labelA.innerHTML = 'm = ' + item.a
			sliderB.value = item.b
			labelB.innerHTML = 'n = ' + item.b
			if (classify(item.inputView).subtype == 'vertical') {
				labelA.innerHTML = 'x=' + classify(item.inputView).x
				sliderA.value = Number(classify(item.inputView).x)
			}
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

		} else if (item.type == 'turev') {
			let mostLeft = minX * unitY
			let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY

			sliderA.min = mostLeft
			sliderA.max = mostRight
			sliderA.step = '0.01'
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
			activeObject = 'choice'
			showToast('GEOMATİK', 'HENÜZ YAPIM AŞAMASINDA...')
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

function changeCSS(cssFile) {
	var newlink = document.createElement("link")
	newlink.setAttribute("rel", "stylesheet")
	newlink.setAttribute("type", "text/css")

	if ("css/" + cssFile == "css/styleHorizontal.css") {
		newlink.setAttribute("href", "css/styleVertical.css")
	} else {
		newlink.setAttribute("href", "css/styleHorizontal.css")
	}
	document.getElementsByTagName("head").item(0).children[10].replaceWith(newlink)
}

function changeActiveElement(id) {
	let clickedid = Number(id.substring(0, id.indexOf("-")))
	if (activeElementID != null) document.getElementById(activeElementID + '-input').style.background = 'white'

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
	let activeitem = arrObjects.find(item => item.id == activeElementID)

	document.getElementById(activeElementID + '-labelA').hidden = false
	document.getElementById(activeElementID + '-sliderA').hidden = false
	document.getElementById(activeElementID + '-labelB').hidden = false
	document.getElementById(activeElementID + '-sliderB').hidden = false

	if (activeitem.type == 'turev' || classify(activeitem.inputView).subtype == 'vertical') {
		document.getElementById(activeElementID + '-labelB').hidden = true
		document.getElementById(activeElementID + '-sliderB').hidden = true
	}
	if (activeitem.type == 'sequence' || activeitem.type == 'linesegment') {
		document.getElementById(activeElementID + '-labelA').hidden = true
		document.getElementById(activeElementID + '-sliderA').hidden = true
		document.getElementById(activeElementID + '-labelB').hidden = true
		document.getElementById(activeElementID + '-sliderB').hidden = true
	}

	setname.value = activeitem.name
	if (activeitem.type == 'sequence') {
		setname.value = activeitem.name + 'ₓ'
	}
	setdef.value = activeitem.inputView
	setcolor.value = activeitem.color
	setsizelabel.innerHTML = 'Boyut: ' + activeitem.size
	setsize.value = activeitem.size
	setsize.hidden = false

	drawAll()
}

/* CLASSIFY METHOD PROCESS */
function normalize(str) {
	const specialMap = {
		"dizi": "Dizi",
		"bileşke": "Bileşke",
		"limit": "Limit",
		"türev": "Türev",
		"doğruparçası": "DoğruParçası"
	}

	for (const word in specialMap) {
		const re = new RegExp(word, "gi")
		if (re.test(str)) {
			str = str.replace(re, specialMap[word])
		}
	}

	str = str.replaceAll('y=', '');
	str = str.replaceAll('+-', '-');
	str = str.replace(/\s+/g, "");

	// ---- Tabanlı log/ln yazımları ----
	str = str.replace(/\bln_(\w+)\(([^)]+)\)/g, "log($2, $1)");
	str = str.replace(/\blog_(\w+)\(([^)]+)\)/g, "log($2, $1)");
	str = str.replace(/\bln\(([^,]+),\s*([^)]+)\)/g, "log($1, $2)");

	// ---- Fonksiyon isimleri alias ----
	str = str.replace(/\bln\(/g, "log(");
	str = str.replace(/\btg\(/g, "tan(");
	str = str.replace(/\bctg\(/g, "1/tan(");
	str = str.replace(/\bcot\(/g, "1/tan(");
	str = str.replace(/\blg\(/g, "log10(");

	// ---- Diğer normalleştirmeler ----
	str = str.replace(/([0-9a-zA-Z)])-x/g, "$1-1*x");   // 3-x → 3-1*x, sin(x)-x → sin(x)-1*x
	str = str.replace(/(^|[^\w])-x/g, "$1-1*x");        // -x → -1*x
	str = str.replace(/(^|[^\w])\+x/g, "$1+1*x");
	str = str.replace(/-\(/g, "-1*(");
	str = str.replace(/(\d)\(/g, "$1*(");
	str = str.replace(/\)(\d)/g, ")*$1");
	str = str.replace(/(\d)([a-zA-Z])/g, "$1*$2");
	return str
}

function classify(inputRaw) {


	//PARÇALI FONKSİYON {OLARAK} KABUL EDİLECEK


	const norm = inputRaw.trim()
	// ---- Noktalar ----
	const pointRe = /^\s*\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/
	const pMatch = norm.match(pointRe)

	if (pMatch) {
		const [, xStr, yStr] = pMatch
		return {
			type: 'point',
			x: Number(xStr),
			y: Number(yStr)
		}
	}

	// ---- DOĞRULAR ----
	// ---- x = sabit veya sabit = x ----
	const lineXConstRe = /^\s*(?:x\s*=\s*([+-]?\d+(?:\.\d+)?)|([+-]?\d+(?:\.\d+)?)\s*=\s*x)\s*$/i
	const xcMatch = norm.match(lineXConstRe)
	if (xcMatch) {
		const val = xcMatch[1] !== undefined ? xcMatch[1] : xcMatch[2]
		return { type: 'line', subtype: 'vertical', x: Number(val) }
	}
	// ---- x eksenine paralel ----
	const horizRe = /^\s*([+-]?\d+(?:\.\d+)?)\s*$/
	const hMatch = norm.match(horizRe)
	if (hMatch) return { type: 'line', subtype: 'horizontal', m: 0, n: Number(hMatch[1]) }

	// Normalize: -x => -1*x, +x => 1*x, x => 1*x
	let expr = norm.replace(/(^|\s)-\s*([a-z])/gi, "$1-1*$2")
	expr = expr.replace(/(^|\s)\+\s*([a-z])/gi, "$11*$2")
	expr = expr.replace(/(^|\s)([a-z])/gi, "$11*$2")

	// mx + n
	let slopeMatch = expr.match(/^\s*([+-]?\d*\.?\d*)\*?([a-z])([+-]\d+(?:\.\d+)?)?\s*$/i)
	if (slopeMatch) {
		const m = Number(slopeMatch[1] || 1)
		const n = slopeMatch[3] ? Number(slopeMatch[3].replace(/\s+/g, "")) : 0
		return { type: 'line', subtype: 'slope', m, n }
	}

	// n + mx
	slopeMatch = expr.match(/^\s*([+-]?\d+(?:\.\d+)?)?([+-]?\d*\.?\d*)\*?([a-z])\s*$/i)
	if (slopeMatch) {
		const n = slopeMatch[1] ? Number(slopeMatch[1]) : 0
		const m = Number(slopeMatch[2] || 1)
		return { type: 'line', subtype: 'slope', m, n }
	}

	// ---- Dizi(function, start, end) ----
	const diziRe = /^\s*Dizi\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const arrayMatch = normalize(norm).match(diziRe)
	if (arrayMatch) {
		const func = arrayMatch[1].trim()
		const start = Number(arrayMatch[2])
		const end = Number(arrayMatch[3])
		return {
			type: "sequence",
			func,
			start,
			end
		}
	}

	// ---- Bileşke(...) ----
	const funcCompRe = /^\s*Bileşke\s*\((.+)\)\s*$/i // <-- i flag var
	const compMatch = normalize(norm).match(funcCompRe)
	if (compMatch) {
		const inside = compMatch[1]
		const functions = inside.split(/\s*,\s*/).map(p => p.trim())
		return {
			type: "functionCompositions",
			functions
		}
	}

	// ---- Limit(f,2) ----
	const limitRe = /^\s*Limit\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const limitMatch = normalize(norm).match(limitRe)
	if (limitMatch) {
		const func = limitMatch[1] // f
		const approachVal = limitMatch[2] // 2
		return {
			type: "limit",
			func,
			approachVal
		}
	}

	// ---- Türev(f,2) ----
	const turevRe = /^\s*Türev\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const turevMatch = normalize(norm).match(turevRe)
	if (turevMatch) {
		const func = turevMatch[1] // f
		const approachVal = turevMatch[2] // 2
		return {
			type: "turev",
			func,
			approachVal
		}
	}

	// ---- DoğruParçası ----
	if (/^DoğruParçası\s*\(/i.test(norm)) {
		const trimmed = norm.trim()
		// Kapanış parantezi kontrolü
		if (!trimmed.endsWith(")")) {
			return { type: "unknown", reason: "Eksik kapanış parantezi." }
		}
		const inner = trimmed.replace(/^DoğruParçası\s*\(/i, '').replace(/\)$/, '')
		let depth = 0, splitIndex = -1
		for (let i = 0; i < inner.length; i++) {
			const ch = inner[i]
			if (ch === '(') depth++
			else if (ch === ')') depth--
			else if (ch === ',' && depth === 0) {
				splitIndex = i
				break
			}
		}
		if (splitIndex === -1 || depth !== 0) {
			return { type: 'unknown', reason: "Nokta sayısı yeterli değil." }
		}
		const rawP1 = inner.slice(0, splitIndex).trim()
		const rawP2 = inner.slice(splitIndex + 1).trim()
		function parsePoint(raw) {
			const coordRe = /^\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)$/
			const coordMatch = raw.match(coordRe)
			if (coordMatch) return { name: null, x: Number(coordMatch[1]), y: Number(coordMatch[2]) }
			const pointRe = /^[A-Z][0-9]*$/;
			if (pointRe.test(raw)) return { name: raw, x: null, y: null }
			if (/^[a-z]/.test(raw)) {
				return { unknown: raw, reason: "Nokta adları büyük harle başlamalıdır." }
			}
			return { unknown: raw }
		}
		return {
			type: 'linesegment',
			points: [parsePoint(rawP1), parsePoint(rawP2)]
		}
	}
	// ---- Doğru ----
	if (/^Doğru\s*\(/i.test(norm)) {
		const trimmed = norm.trim()
		if (!trimmed.endsWith(")")) {
			return { type: "unknown", reason: "Eksik kapanış parantezi." }
		}
		const inner = trimmed.replace(/^Doğru\s*\(/i, '').replace(/\)$/, '')
		let depth = 0, splitIndex = -1
		for (let i = 0; i < inner.length; i++) {
			const ch = inner[i]
			if (ch === '(') depth++
			else if (ch === ')') depth--
			else if (ch === ',' && depth === 0) {
				splitIndex = i
				break
			}
		}
		if (splitIndex === -1 || depth !== 0) {
			return { type: 'unknown', reason: "Nokta sayısı yeterli değil." }
		}
		const rawP1 = inner.slice(0, splitIndex).trim()
		const rawP2 = inner.slice(splitIndex + 1).trim()
		function parsePoint(raw) {
			const coordRe = /^\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)$/
			const coordMatch = raw.match(coordRe)
			if (coordMatch) return { name: null, x: Number(coordMatch[1]), y: Number(coordMatch[2]) }
			const pointRe = /^[A-Z][0-9]*$/
			if (pointRe.test(raw)) return { name: raw, x: null, y: null }

			if (/^[a-z]/.test(raw)) {
				return { unknown: raw, reason: "Nokta adları büyük harle başlamalıdır." }
			}
			return { unknown: raw }
		}
		return {
			type: 'linewithpoints',
			points: [parsePoint(rawP1), parsePoint(rawP2)]
		}
	}

	if (!/log|ln|sin|cos|tan|cot|sqrt/.test(norm)) {
		// ---- f+g, 2f-3g, -f, -3g+1 ----
		const funcOpRe = /([+-]?\d*)([fghpqr][0-9]*)\b/gi
		const opMatches = [...norm.matchAll(funcOpRe)]
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
			return { type: "functionOperations", functions, coefficients }
		}
	}

	// ---- SectionalFunctions ----
	if (/,/.test(normalize(norm))) { // en az bir ',' varsa işle
		const segments = normalize(norm).split(";").map(s => s.trim()).filter(s => s.length > 0);
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

					if (a > b) return { type: "unknown", reason: `Invalid range: '${expr}'` };

					return {
						from: a,
						to: b,
						fromInclusive: leftOp === "<=",
						toInclusive: rightOp === "<="
					};
				}

				return { type: "unknown", reason: `Invalid range expression: '${expr}'` };
			}
			const range = parseRange(rangeExpr);
			if (!range || range.type === "unknown") return range;

			functions.push(func);
			ranges.push(range);
		}

		return {
			type: "sectionalfunctions",
			functions,
			ranges
		};
	}

	return {
		type: 'unknown',
		function: normalize(inputRaw)
	}
}
/* CLASSIFY METHOD END */

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



		/* let come = document.getElementById(id).value
		if (come == '') return
		come = come.replaceAll('y=', '')
		come = come.replaceAll('=y', '')
		if (id == 'name') {
			let newName = document.getElementById(id).value
			if (arrObjects[activeElementID].type == 'point' && pointNames.includes(newName)) changeName(newName)
			else if (arrObjects[activeElementID].type == 'line' && lineNames.includes(newName)) changeName(newName)
			else if (arrObjects[activeElementID].type == 'limit' && limitNames.includes(newName)) changeName(newName)
			else if (arrObjects[activeElementID].type == 'sequence' && sequenceNames.includes(newName)) changeName(newName)
			else if (arrObjects[activeElementID].type == 'other' && lineNames.includes(newName)) changeName(newName)

		} else if (id == 'defination') {
			let newDef = document.getElementById(id).value
			newDef = newDef.replaceAll('y=', '')
			newDef = newDef.replaceAll('=y', '')
			if (classify(newDef).type == 'point') {
				//console.log('point def değişecek')
				arrObjects[activeElementID].x = classify(newDef).x
				arrObjects[activeElementID].y = classify(newDef).y
				arrObjects[activeElementID].inputView = newDef
			} else if (classify(newDef).type == 'line' && getDrawableFunction(normalizeExpr(newDef)).status) {
				//console.log('line def değişecek', classify(newDef))
				arrObjects[activeElementID].m = classify(newDef).m
				arrObjects[activeElementID].n = classify(newDef).n
				arrObjects[activeElementID].graph = classify(newDef).m + '*x+' + classify(newDef).n
				arrObjects[activeElementID].inputView = 'y=' + newDef
			} else if (classify(newDef).type == 'sequence' && getDrawableFunction(normalizeExpr(classify(newDef).func))) {
				//console.log('dizi değişecek', classify(newDef))
				arrObjects[activeElementID].start = classify(newDef).start
				arrObjects[activeElementID].end = classify(newDef).end
				arrObjects[activeElementID].graph = normalizeExpr(classify(newDef).func)
				arrObjects[activeElementID].inputView = capitalizeName(newDef)
			} else if (classify(newDef).type == 'limit' && getDrawableFunction(normalizeExpr(classify(newDef).func))) {
				//console.log('Limit değişecek', classify(newDef))
				arrObjects[activeElementID].approachVal = classify(newDef).approachVal
				arrObjects[activeElementID].graph = normalizeExpr(classify(newDef).func)
				arrObjects[activeElementID].inputView = capitalizeName(newDef)
			} else if (classify(newDef).type == 'unknown' && getDrawableFunction(classify(newDef).func)) {
				//console.log('Unknown değişecek', classify(newDef))
			} else if (classify(newDef).type == 'functionOperations') {
				//console.log('functionOperations değişecek', classify(newDef))
			} else if (classify(newDef).type == 'functionCompositions') {
				//console.log('functionCompositions değişecek', classify(newDef))
			} else {
				//console.log('TÜR BULUNAMADI...')
			}
		} */
		//fillSetWindow()
	}
}

function girisOninput(e) { //Cep telefonu için
	const el = e.target
	const start = el.selectionStart
	const value = el.value
	const pairs = { '(': ')', '[': ']', '{': '}' }

	// Son yazılan karakter
	const lastChar = value[start - 1]

	if (pairs[lastChar]) {
		// kapanış parantezini otomatik ekle
		el.value = value.slice(0, start) + pairs[lastChar] + value.slice(start)
		el.selectionStart = el.selectionEnd = start // imleci araya al
	}
}

function girisKeyDown(event) {
	handleParanthesis(event)
	let allowKeys = '(){}[],=-+.;<>*^/_bçdğjımnşquüvxyzCÇEFGĞHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(event.key) && !allowKeys.includes(event.key)) {
		event.preventDefault()
	}
	if (event.key === 'Enter') {
		let come = event.target.value
		if (come == '') return
		come = come.replaceAll('y=', '')
		come = come.replaceAll('=y', '')
		if (classify(come).type == 'point') {
			console.log('girisKeyDown point çalıştı', come)

			let point = new mPoint(classify(come).x, classify(come).y, come)
			arrObjects.push(point)
			activeElementID = point.id
			undoObjects = []
			delCount = 0
		} else if (classify(come).type == 'line') {
			console.log('girisKeyDown line çalıştı', classify(come))

			let line
			if (classify(come).subtype == 'vertical') {
				console.log('girisKeyDown line-vertical çalıştı', classify(come))
				line = new mLine(classify(come).m, classify(come).n, null, null, 'x=' + classify(come).x)
				line.a = null
				line.b = null
			} else {
				line = new mLine(classify(come).m, classify(come).n, null, null, 'y=' + come)
			}
			arrObjects.push(line)
			activeElementID = line.id
			undoObjects = []
			delCount = 0
		} else if (classify(come).type == 'sequence') {
			console.log('girisKeyDown sequence çalıştı', classify(come))

			if (come.split(",").length - 1 !== 2) {
				showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
				return
			}
			let funcFound = true
			let names = arrObjects.map((item) => item.name)
			if (!classify(come).func.includes('x') && !Number.isFinite(Number(classify(come).func))) {
				if (!names.includes(classify(come).func)) funcFound = false
			}
			if (funcFound) {
				if (!classify(come).func.includes('x') && !Number.isFinite(Number(classify(come).func))) {
					come = come.replaceAll(classify(come).func, arrObjects.find(o => o.name === classify(come).func).graph)
				}
				let comeFunc = classify(come).func
				let seq = new mSequence(comeFunc, classify(come).start, classify(come).end, come)
				arrObjects.push(seq)
				activeElementID = seq.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}
		} else if (classify(come).type == 'functionOperations') {
			console.log('girisKeyDown functionOperations çalıştı', classify(come))

			const hepsiVarMi = classify(come).functions.every(name => arrObjects.some(f => f.name === name));
			if (hepsiVarMi) {
				let comeWithFuncs = come
				classify(come).functions.forEach(f => {
					comeWithFuncs = comeWithFuncs.replaceAll(f, '(' + arrObjects.find(o => o.name === f).graph + ')')
				});
				let func = new mFunction(comeWithFuncs, come + '=y=' + comeWithFuncs)
				arrObjects.push(func)
				activeElementID = func.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}
		} else if (classify(come).type == 'functionCompositions') {
			console.log('girisKeyDown functionCompositions çalıştı', classify(come))

			if (come.split(",").length - 1 < 1) {
				showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
				return
			}

			let funcsFound = true
			let names = arrObjects.map((item) => item.name)
			classify(come).functions.forEach(f => {
				if (!f.includes('x') && !Number.isFinite(Number(f))) {
					if (!names.includes(f)) funcsFound = false
				}
			});
			if (funcsFound) {
				classify(come).functions.forEach(f => {
					if (!f.includes('x') && !Number.isFinite(Number(f))) {
						come = come.replaceAll(f, arrObjects.find(o => o.name === f).graph)
					}
				})
				let cometoBileske = bileskeProcess(classify(come).functions)
				let func = new mFunction(cometoBileske, come + '=' + cometoBileske)
				arrObjects.push(func)
				activeElementID = func.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}
		} else if (classify(come).type == 'limit') {
			console.log('girisKeyDown Limit çalıştı', classify(come))

			if (come.split(",").length - 1 !== 1) {
				showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
				return
			}
			let funcFound = true
			let names = arrObjects.map((item) => item.name)

			if (!classify(come).func.includes('x') && !Number.isFinite(Number(classify(come).func))) {
				if (!names.includes(classify(come).func)) funcFound = false
			}
			if (funcFound) {
				if (!classify(come).func.includes('x') && !Number.isFinite(Number(classify(come).func))) {
					come = come.replaceAll(classify(come).func, arrObjects.find(o => o.name === classify(come).func).graph)
				}
				let comeFunc = classify(come).func
				let lim = new mLimit(comeFunc, classify(come).approachVal, come)
				arrObjects.push(lim)
				activeElementID = lim.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}
		} else if (classify(come).type == 'turev') {
			console.log('girisKeyDown Türev çalıştı', classify(come))

			if (come.split(",").length - 1 !== 1) {
				showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
				return
			}
			let funcFound = true
			let names = arrObjects.map((item) => item.name)

			if (!classify(come).func.includes('x') && !Number.isFinite(Number(classify(come).func))) {
				if (!names.includes(classify(come).func)) funcFound = false
			}
			if (funcFound) {
				if (!classify(come).func.includes('x') && !Number.isFinite(Number(classify(come).func))) {
					come = come.replaceAll(classify(come).func, arrObjects.find(o => o.name === classify(come).func).graph)
				}
				let comeFunc = classify(come).func
				let tur = new mTurev(comeFunc, classify(come).approachVal, come)
				arrObjects.push(tur)
				activeElementID = tur.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}

		} else if (classify(come).type == 'linesegment') {
			console.log('girisKeyDown linesegment çalıştı', classify(come))

			if (come.split(",").length - 1 !== 3) {
				showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
				return
			}
			let A = new mPoint(classify(come).points[0].x, classify(come).points[0].y)
			arrObjects.push(A)
			let B = new mPoint(classify(come).points[1].x, classify(come).points[1].y)
			arrObjects.push(B)
			let ls = new mLineSegment(A, B, classify(come))
			arrObjects.push(ls)
			activeElementID = ls.id
			undoObjects = []
			delCount = 0
		} else if (classify(come).type == 'linewithpoints') {
			console.log('inputKeyDown linewithpoints çalıştı', classify(come))
			let A = new mPoint(classify(come).points[0].x, classify(come).points[0].y)
			arrObjects.push(A)
			let B = new mPoint(classify(come).points[1].x, classify(come).points[1].y)
			arrObjects.push(B)
			let line
			if (createLineEquation(A, B).x) {
				line = new mLine(createLineEquation(A, B).m, createLineEquation(A, B).c, A, B, 'x=' + createLineEquation(A, B).x)
				line.graph = null
			} else {
				line = new mLine(createLineEquation(A, B).m, createLineEquation(A, B).c, A, B)
			}
			arrObjects.push(line)
			activeElementID = line.id
		} else if (classify(come).type == 'sectionalfunctions') {
			console.log('inputKeyDown sectionalfunctions çalıştı', classify(come))
			let allFuncsDrawable = true
			/* 			classify(come).functions.forEach(func => {
							if (!gettttttt(classify(come).func).status) {
								allFuncsDrawable = false
							}
						}) */
			if (allFuncsDrawable) {
				let secFuncs = []
				classify(come).functions.forEach((func, i) => {
					if (classify(func).type == 'line') {
						let line = new mLine(classify(func).m, classify(func).n, null, null, null, classify(come).ranges[i].from, classify(come).ranges[i].to)
						line.id = null
						secFuncs.push(line)
					} else if (classify(func).type == 'unknown') {
						let other = new mFunction(func, func, classify(come).ranges[i].from, classify(come).ranges[i].to)
						other.id = null
						secFuncs.push(other)
					} else {
						console.log('Tür bulunamadı.')
					}
				})
				let sf = new mSectionalFunctions(come)
				sf.secFuncs = secFuncs
				arrObjects.push(sf)
				activeElementID = sf.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız.')
			}

		} else if (classify(come).type == 'unknown') {
			console.log('inputKeyDown unknown çalıştı', classify(come))
			let func = new mFunction(classify(come).function, 'y=' + classify(come).function)
			arrObjects.push(func)
			activeElementID = func.id
			undoObjects = []
			delCount = 0
		} else {
			console.log('Giriş türü bulunamadı.')
		}
		event.target.value = null
		drawAll()
		labelsCreator()
	}
}

function handleParanthesis(e) {
	const el = e.target
	const pairs = {
		'(': ')',
		'[': ']',
		'{': '}'
	}
	const closePairs = Object.fromEntries(Object.entries(pairs).map(([o, c]) => [c, o]))
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

let delCount = 0
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
			item.x = sliderA.value
			labelB.innerHTML = 'b = ' + sliderB.value
			item.y = sliderB.value
			item.inputView = '(' + item.x + ',' + item.y + ')'
			input.value = item.name + item.inputView
		} else if (item.type == 'turev') {
			labelA.innerHTML = 'x = ' + sliderA.value
			item.approachVal = sliderA.value
			item.inputView = "Türev(" + item.graph + "," + item.approachVal + ")"
		} else if (item.type == 'limit') {
			item.approachValRight = sliderA.value
			labelA.innerHTML = sliderA.min + '⁺ = ' + sliderA.value
			sliderA.innerHTML = item.approachValRight + '⁺ = ' + Number(sliderA.value).toFixed(2)
			item.approachValLeft = sliderB.value
			labelB.innerHTML = sliderB.max + '⁻ = ' + sliderB.value
			sliderB.innerHTML = item.approachVal + '⁻ = ' + Number(sliderB.value).toFixed(2)

			let A = new mPoint(Number(sliderA.value), 0)
			let B = new mPoint(Number(sliderA.value), math.evaluate(item.graph, { x: A.x }))
			let C = new mPoint(0, math.evaluate(item.graph, { x: A.x }))
			A.inputView = B.inputView = C.inputView = null
			let vls = new mLineSegment(A, B)
			let hls = new mLineSegment(B, C)
			A.color = B.color = C.color = vls.color = hls.color = item.color
			vls.lineDash = hls.lineDash = [2, 5]
			vls.inputView = hls.inputView = null
			drawLineSegment(vls)
			drawLineSegment(hls)
			drawPoint(A)
			drawPoint(B)
			drawPoint(C)
		} else if (item.type == 'line' && classify(item.inputView).subtype != 'vertical') {
			labelA.innerHTML = 'm = ' + sliderA.value
			labelB.innerHTML = 'n = ' + sliderB.value
			item.a = sliderA.value
			item.b = sliderB.value
			item.inputView = 'y=' + sliderA.value + 'x+' + sliderB.value
			input.value = item.name + ':' + item.inputView
			item.graph = normalize(sliderA.value + '*x+' + sliderB.value)
		} else if (item.type == 'line' && classify(item.inputView).subtype == 'vertical') {
			labelA.innerHTML = 'x= ' + Number(sliderA.value)
			item.inputView = 'x= ' + Number(sliderA.value)
			input.value = item.name + ':' + item.inputView
		} else {
			console.log('Tür bulunamadı.')
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
showToast = function (title, msg) {
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
	if ((B.x - A.x) != 0) {
		let m = (B.y - A.y) / (B.x - A.x)
		let c = A.y - m * A.x

		if (!Number.isInteger(m)) {
			m = Number((B.y - A.y) / (B.x - A.x)).toFixed(2)
		}
		if (!Number.isInteger(c)) {
			c = Number(A.y - m * A.x).toFixed(2)
		}
		return {
			m: m,
			c: c
		}
	} else {
		return { x: A.x }
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

	canvas.addEventListener("click", function (evt) {
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
	}, false)

	canvas.addEventListener("mousemove", function (evt) {
		let line
		if (activeObject === 'line') {
			let tempPoint = new mPoint(getMousePos(evt).x, getMousePos(evt).y, null, false)
			drawAll()
			drawPoint(tempPoint)
			if (lineDrawing) {
				let lineB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, null, false)
				if (createLineEquation(lineA, lineB).x) {
					line = new mLine(createLineEquation(lineA, lineB).m, createLineEquation(lineA, lineB).c, lineA, lineB, 'x=' + createLineEquation(lineA, lineB).x, null, null, false)
					line.graph = null
				} else {
					line = new mLine(createLineEquation(lineA, lineB).m, createLineEquation(lineA, lineB).c, lineA, lineB, null, null, null, false)
				}
				drawAll()
				drawPoint(line.B)
				drawLine(line)
			}
		}

		let ls
		if (activeObject === 'linesegment') {
			let tempPoint = new mPoint(getMousePos(evt).x, getMousePos(evt).y, null, false)
			drawAll()
			drawPoint(tempPoint)
			if (lineSegmentDrawing) {
				let lineSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, null, false)
				drawAll()

				drawPoint(lineSegmentB)
				ls = new mLineSegment(lineSegmentA, lineSegmentB, null, false)
				drawLineSegment(ls)
			}
		}

		if (activeObject === 'point') {
			let tempPoint = new mPoint(getMousePos(evt).x, getMousePos(evt).y, null, false)
			drawAll()
			drawPoint(tempPoint)
		}
	}, false)

	canvas.addEventListener("mousedown", function (evt) {
		if (activeObject == 'choice') {
			canvas.style.cursor = 'grabbing'
			firstMousePos = getMousePos(evt)
			findPointPos = getMousePos(evt)
		}
		if (activeObject === 'line' && evt.button == 0) {
			if (lineDrawing == false) {
				lineA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
				arrObjects.push(lineA)
				lineDrawing = true
			} else {
				lineB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
				arrObjects.push(lineB)
				let line
				if (createLineEquation(lineA, lineB).x) {
					line = new mLine(createLineEquation(lineA, lineB).m, createLineEquation(lineA, lineB).c, lineA, lineB, 'x=' + createLineEquation(lineA, lineB).x)
					line.graph = null
				} else {
					line = new mLine(createLineEquation(lineA, lineB).m, createLineEquation(lineA, lineB).c, lineA, lineB)
				}
				arrObjects.push(line)
				activeElementID = line.id

				lineDrawing = false
				lineA = lineB = null
			}
		}

		if (activeObject === 'linesegment' && evt.button == 0) {
			if (lineSegmentDrawing == false) {
				lineSegmentA = new mPoint(getMousePos(evt).x, getMousePos(evt).y, null)
				arrObjects.push(lineSegmentA)
				lineSegmentDrawing = true
			} else {
				lineSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, null)
				arrObjects.push(lineSegmentB)

				let ls = new mLineSegment(lineSegmentA, lineSegmentB)
				arrObjects.push(ls)
				activeElementID = ls.id
				lineSegmentDrawing = false
				lineSegmentA = lineSegmentB = null
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