let canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const clearSound = new Audio("sound/clear.mp3")
let activeObject = 'choice'
let activeElementID = null
let lineDrawing = false
let lineA, lineB
let lineSegmentDrawing = false
let circleDrawing = false
let angleDrawing = false
let lineSegmentA, lineSegmentB
let circleA, circleB, circleC
let angleA, angleB, angleC
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
let bigNames = "ABC"
let smallNames = "abc"
let lineNames = "fgh"
let angleNames = "αβθ"
let sliders = document.getElementById('sliders')

let grabbing = false
let hitObject = null

let idCount = -1
function idCounter() {
	idCount++
	return idCount
}
let delCount = 0

class mPoint {
	constructor(a, b, temp = false) {
		this.type = 'point'
		temp ? this.name = null : this.name = createName('point')
		temp ? this.id = null : this.id = idCounter()
		this.a = a
		this.b = b
		this.color = getRandomColor()
		this.visibility = true
		this.size = 3
		this.temp = temp
		this.onOther = []
	}
}

function reprojectAllOnOther() {
	arrObjects.forEach(obj => {
		if (obj.type == 'point') {
			if (obj.onOther.length > 0) {
				obj.onOther.forEach(o => {
					if (o.type == 'onCircle') {
						let circle = arrObjects.find(item => item.id == o.circleId)
						if (circle.type == 'circle2') {
							let r = distanceAB(circle.A, circle.B)
							let angle = Math.atan2(obj.b - circle.A.b, obj.a - circle.A.a)
							obj.a = circle.A.a + r * Math.cos(angle)
							obj.b = circle.A.b + r * Math.sin(angle)
						} else if (circle.type == 'circle3') {
							let r = getCircle3RA(circle).r
							let angle = Math.atan2(obj.b - getCircle3RA(circle).n, obj.a - getCircle3RA(circle).m)
							obj.a = getCircle3RA(circle).m + r * Math.cos(angle)
							obj.b = getCircle3RA(circle).n + r * Math.sin(angle)
						} else if (circle.type == 'circleR') {
							let r = circle.r
							let angle = Math.atan2(obj.b - circle.A.b, obj.a - circle.A.a)
							obj.a = circle.A.a + r * Math.cos(angle)
							obj.b = circle.A.b + r * Math.sin(angle)
						} else {
							console.log('Type bulunamadı. reProjectAllOnOther içinde')
						}
					}
				})
			}
		}
	});
}

function distanceAB(A, B) {
	return Math.sqrt(Math.pow(B.b - A.b, 2) + Math.pow(B.a - A.a, 2))
}


class mmmmmmmPoint {
	constructor(a, b, temp = false) {
		this.type = 'point'
		temp ? this.name = null : this.name = createName('point')
		temp ? this.id = null : this.id = idCounter()

		this.a = a
		this.b = b

		this.color = getRandomColor()
		this.visibility = true
		this.size = 3
		this.temp = temp
		this.constraints = []
	}

	set(a, b, context = {}) {
		this.a = a
		this.b = b
		this.applyConstraints(context)
	}

	applyConstraints(context) {
		for (let c of this.constraints) {
			if (c.type === "onCircle") {
				const circle = context.circles?.find(x => x.id === c.circleId)
				if (!circle) continue

				if (c.theta == null) {
					const dx = this.a - circle.A.a
					const dy = this.b - circle.A.b
					c.theta = Math.atan2(dy, dx)
				}

				// 🔥 çember merkez + r + theta ile konum
				this.a = circle.A.a + circle.r * Math.cos(c.theta)
				this.b = circle.A.b + circle.r * Math.sin(c.theta)
			}
		}
	}
}

function aaaaaattachPointToCircle(p, circle) {
	const dx = p.a - circle.A.a
	const dy = p.b - circle.A.b

	const theta = Math.atan2(dy, dx)

	p.constraints.push({
		type: "onCircle",
		circleId: circle.id,
		theta
	})

	// hemen normalize et
	updatePointFromCircleAngle(p, circle)
}

function uuuuupdatePointFromCircleAngle(p, circle) {
	const c = p.constraints.find(x => x.circleId === circle.id)
	if (!c) return

	p.a = circle.A.a + circle.r * Math.cos(c.theta)
	p.b = circle.A.b + circle.r * Math.sin(c.theta)
}

function mmmmmovePoint(p, x, y, context) {
	p.a = x
	p.b = y

	for (let c of p.constraints) {

		if (c.type === "onCircle") {
			const circle = context.circles?.find(x => x.id === c.circleId)
			if (!circle) continue

			if (c.theta == null) {
				const dx = p.a - circle.A.a
				const dy = p.b - circle.A.b
				c.theta = Math.atan2(dy, dx)
			}

			p.a = circle.A.a + circle.r * Math.cos(c.theta)
			p.b = circle.A.b + circle.r * Math.sin(c.theta)
		}
	}
}

function uuuuuupdateCirclePoints(circle, points) {
	for (let p of points) {
		for (let c of p.constraints) {
			if (c.circleId === circle.id) {
				updatePointFromCircleAngle(p, circle)
			}
		}
	}
}

class mmmmmCircleR {
	constructor(A, r, temp = false) {
		this.type = 'circleR'
		this.name = createName('circleR')
		temp ? this.id = null : this.id = idCounter()

		this.A = A
		this.r = r

		this.color = getRandomColor()
		this.visibility = true
		this.size = 1
		this.temp = temp
	}

	updatePoints(points) {
		for (let p of points) {
			if (!p.constraints) continue

			for (let c of p.constraints) {
				if (c.type === "onCircle" && c.circleId === this.id) {
					const dx = p.a - this.A.a
					const dy = p.b - this.A.b
					const dist = Math.sqrt(dx * dx + dy * dy)

					if (dist === 0) continue

					p.a = this.A.a + (dx / dist) * this.r
					p.b = this.A.b + (dy / dist) * this.r
				}
			}
		}
	}
}

class mCircleR {
	constructor(A, r, temp = false) {
		this.type = 'circleR'
		this.name = createName('circleR')
		temp ? this.id = null : this.id = idCounter()
		this.A = A
		this.r = r
		this.color = getRandomColor()
		this.visibility = true
		this.size = 1
		this.temp = temp
	}
}
class mCircle2 {
	constructor(A, B, temp = false) {
		this.type = 'circle2'
		this.name = createName('circleR')
		temp ? this.id = null : this.id = idCounter()
		this.A = A
		this.B = B
		this.color = getRandomColor()
		this.visibility = true
		this.size = 1
		this.temp = temp
	}
}

class mCircle3 {
	constructor(A, B, C, temp = false) {
		this.type = 'circle3'
		this.name = createName('circleR')
		temp ? this.id = null : this.id = idCounter()
		this.A = A
		this.B = B
		this.C = C
		this.color = getRandomColor()
		this.visibility = true
		this.size = 1
		this.temp = temp
	}
}

class mAngle {
	constructor(A, B, C, temp = false) {
		this.type = 'angle'
		this.name = createName('angle')
		temp ? this.id = null : this.id = idCounter()
		this.A = A
		this.B = B
		this.C = C
		this.color = getRandomColor()
		this.visibility = true
		this.size = 1
		this.temp = temp
	}
}

class mVerLine {
	constructor(x, temp = null) {
		this.type = "verLine"
		const denkCount = arrObjects.filter(f => f.name.includes("denk")).length + 1
		this.name = "denk" + denkCount
		temp ? this.id = null : this.id = idCounter()
		this.x = x
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.temp = temp
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
	constructor(m, n, temp = false, startX = null, endX = null) {
		this.type = 'lineWithEquation'
		temp ? this.name = null : this.name = createName('line')
		temp ? this.id = null : this.id = idCounter()
		this.m = m
		this.n = n
		this.func = normalizeLine(m, n)
		this.startX = startX
		this.endX = endX
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mLineWithPoints {
	constructor(A, B, temp = false) {
		this.type = 'lineWithPoints'
		temp ? this.name = null : this.name = createName('line')
		temp ? this.id = null : this.id = idCounter()
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
		temp ? this.id = null : this.id = idCounter()
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
	constructor(func, s, e, temp = false) {
		this.type = 'sequence'
		this.name = createName('sequence')
		temp ? this.id = null : this.id = idCounter()
		this.func = func
		this.start = s
		this.end = e
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mLimit {
	constructor(func, a, temp = false) {
		this.type = 'limit'
		this.name = createName('limit')
		temp ? this.id = null : this.id = idCounter()
		this.func = func
		this.approachVal = a
		this.approachValRight = Number(a) + 0.4
		this.approachValLeft = a - 0.4
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mFunction {
	constructor(func, temp = false, startX = null, endX = null) {
		this.type = 'function'
		temp ? this.name = null : this.name = createName('function')
		temp ? this.id = null : this.id = idCounter()
		this.func = func
		this.startX = startX
		this.endX = endX
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mFunctionComposions {
	constructor(funcs, temp = false, startX = null, endX = null) {
		this.type = 'functioncomposition'
		temp ? this.name = null : this.name = createName('functioncomposition')
		temp ? this.id = null : this.id = idCounter()
		this.funcs = funcs
		this.func = bileskeProcess(funcs)
		this.startX = startX
		this.endX = endX
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}
class mTangent {
	constructor(func, a, temp = false) {
		this.type = 'tangent'
		this.name = createName('tangent')
		temp ? this.id = null : this.id = idCounter()
		this.func = func
		this.approachVal = a
		let m = math.evaluate(derivative(func), { x: a })
		let c = math.evaluate(func, { x: a }) - m * a
		this.tngLine = new mLineWithEquation(m, c, true)
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mTangentHX {
	constructor(func, a, haveH, temp = false) {
		this.type = 'tangentHX'
		this.name = createName('tangentHX')
		temp ? this.id = null : this.id = idCounter()
		this.func = func
		this.approachVal = a
		this.h = 2
		this.haveH = haveH
		let A = new mPoint(a, math.evaluate(func, { x: a }), true)
		let B = haveH ? new mPoint(a + this.h, math.evaluate(func, { x: a + this.h }), true) : new mPoint(this.h, math.evaluate(func, { x: this.h }), true)
		let m = math.evaluate(derivative(func), { x: a })
		let c = math.evaluate(func, { x: a }) - m * a
		this.tngLine = new mLineWithEquation(m, c, true)
		this.aodLine = new mLineWithPoints(A, B, true)
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mDerivative {
	constructor(func, derFunc, temp = false) {
		this.type = 'derivative'
		this.name = createName('derivative')
		temp ? this.id = null : this.id = idCounter()
		this.func = func
		this.derFunc = derFunc
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mSectionalFunctions {
	constructor(str, temp = false) {
		this.name = createName('function')
		temp ? this.id = null : this.id = idCounter()
		this.secFuncs = null
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'sectionalFunctions'
		this.cmd = str
		this.temp = temp
	}
}

function derivative(funcStr, variable = "x") {
	try {
		const df = math.derivative(funcStr, variable);
		return df.toString().replaceAll(' ', '');
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
	let objNames = arrObjects.map((item) => item.name)
	let newNames
	if (type == 'point') {
		newNames = bigNames
	} else if (type == 'lineSegment' || type == 'sequence' || type == 'circleR') {
		newNames = smallNames
	} else if (type == 'line' || type == 'limit' || type == 'tangent' || type == 'function' || type == 'sectionalFunctions' || type == 'tangent' || type == 'tangentHX' || type == 'derivative' || type == 'functioncomposition') {
		newNames = lineNames
	} else if (type == 'angle') {
		newNames = angleNames
	}

	if (arrObjects.length == 0) return newNames[0]
	while (!iFound) {
		if (i < newNames.length) {
			if (!objNames.includes(newNames[i])) {
				iFound = true
				nm = newNames[i]
			}
		}
		if (i >= newNames.length) {
			if (!(objNames.includes(newNames[i % newNames.length] + ((i / newNames.length) - ((i / newNames.length) % 1))))) {
				iFound = true
				nm = newNames[i % newNames.length] + ((i / newNames.length) - ((i / newNames.length) % 1))
			}
		}
		i++
	}
	return nm
}

function drawAll() {
	reprojectAllOnOther()
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
	if (angleA && angleB) drawLineSegment(new mLineSegment(angleA, angleB, true))

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
		} else if (item.type === 'tangent') {
			drawTangent(item)
		} else if (item.type === 'tangentHX') {
			drawTangentHX(item)
		} else if (item.type === 'sectionalFunctions') {
			drawSectionalFunctions(item)
		} else if (item.type === 'function') {
			drawFunction(item)
		} else if (item.type === 'functioncomposition') {
			drawFunctionComposition(item)
		} else if (item.type === 'circleR') {
			drawCircleR(item)
		} else if (item.type === 'circle2') {
			drawCircle2(item)
		} else if (item.type === 'circle3') {
			drawCircle3(item)
		} else if (item.type === 'angle') {
			drawAngle(item)
		} else if (item.type === 'derivative') {
			drawDerivative(item)
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
	if (!point.temp) text((-minX + point.a / unitY) * scaleY - 10, (-minY - point.b / unitX) * scaleX - 5, pColor, 'center', 'bold 15px arial', point.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}
function drawCircleR(circle) {
	if (!circle.visibility) return

	let sp = new mPoint(circle.A.a + circle.r, circle.A.b, true)
	drawPoint(sp)
	let sls = new mLineSegment(circle.A, sp, true)
	drawLineSegment(sls)

	let cSize
	circle.id == activeElementID ? cSize = circle.size + 1 : cSize = circle.size
	let cColor = circle.color
	if (circle.temp) cColor = '#000000'
	ctx.beginPath()
	ctx.strokeStyle = cColor
	ctx.arc((-minX + circle.A.a / unitY) * scaleY, (-minY - circle.A.b / unitX) * scaleX, circle.r * scaleX, 0, 2 * Math.PI)
	ctx.lineWidth = cSize
	if (!circle.temp) text((-minX + circle.A.a / unitY) * scaleY - circle.r * scaleY * 0.75, (-minY - circle.A.b / unitX) * scaleX - circle.r * scaleX * 0.75, cColor, 'center', 'bold 15px arial', circle.name)
	text((-minX + (circle.A.a + sp.a) / 2 / unitY) * scaleY, (-minY - (circle.A.b + sp.b) / 2 / unitX) * scaleX, cColor, 'center', 'bold 15px arial', 'r = ' + circle.r)
	ctx.stroke()
	ctx.closePath()
}

function getCircle3RA(circle) {
	const D = 2 * (
		circle.A.a * (circle.B.b - circle.C.b) +
		circle.B.a * (circle.C.b - circle.A.b) +
		circle.C.a * (circle.A.b - circle.B.b)
	)

	if (Math.abs(D) < 1e-10) return { status: false }

	const a2 = circle.A.a * circle.A.a + circle.A.b * circle.A.b
	const b2 = circle.B.a * circle.B.a + circle.B.b * circle.B.b
	const c2 = circle.C.a * circle.C.a + circle.C.b * circle.C.b

	const ux = (
		a2 * (circle.B.b - circle.C.b) +
		b2 * (circle.C.b - circle.A.b) +
		c2 * (circle.A.b - circle.B.b)
	) / D

	const uy = (
		a2 * (circle.C.a - circle.B.a) +
		b2 * (circle.A.a - circle.C.a) +
		c2 * (circle.B.a - circle.A.a)
	) / D

	const r = Math.sqrt((ux - circle.A.a) ** 2 + (uy - circle.A.b) ** 2)

	return {
		m: ux,
		n: uy,
		r: r,
	}
}

function drawCircle2(circle) {
	if (!circle.visibility) return

	let r = math.sqrt(math.pow(circle.B.a - circle.A.a, 2) + math.pow(circle.B.b - circle.A.b, 2)).toFixed(2)
	let cSize
	circle.id == activeElementID ? cSize = circle.size + 1 : cSize = circle.size
	let cColor = circle.color
	if (circle.temp) cColor = '#000000'
	ctx.beginPath()
	ctx.strokeStyle = cColor
	ctx.arc((-minX + circle.A.a / unitY) * scaleY, (-minY - circle.A.b / unitX) * scaleX, r * scaleX, 0, 2 * Math.PI)
	ctx.lineWidth = cSize
	if (!circle.temp) text((-minX + circle.A.a / unitY) * scaleY - r * scaleY * 0.75, (-minY - circle.A.b / unitX) * scaleX - r * scaleX * 0.75, cColor, 'center', 'bold 15px arial', circle.name)
	ctx.stroke()
	ctx.closePath()
}

function drawCircle3(circle) {
	if (!circle.visibility) return

	let mr = getCircle3RA(circle)
	let cSize
	circle.id == activeElementID ? cSize = circle.size + 1 : cSize = circle.size
	let cColor = circle.color
	if (circle.temp) cColor = '#000000'
	ctx.beginPath()
	ctx.strokeStyle = cColor
	ctx.arc((-minX + mr.m / unitY) * scaleY, (-minY - mr.n / unitX) * scaleX, mr.r * scaleX, 0, 2 * Math.PI)
	ctx.lineWidth = cSize
	if (!circle.temp) text((-minX + mr.m / unitY) * scaleY - mr.r * scaleY * 0.75, (-minY - mr.n / unitX) * scaleX - mr.r * scaleX * 0.75, cColor, 'center', 'bold 15px arial', circle.name)
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
	text((-minX + vline.x / unitY) * scaleY + 10, 15, vlColor, 'center', 'bold 15px arial', vline.name)
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

	let lSize
	line.id == activeElementID ? lSize = line.size + 1 : lSize = line.size
	let lColor = line.color
	if (line.temp) lColor = '#000000'

	ctx.beginPath()
	ctx.strokeStyle = ctx.fillStyle = lColor
	ctx.lineWidth = lSize
	x = startX
	y = math.evaluate(line.m + "*" + x + "+" + line.n, { x: x })
	ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	x = endX
	y = math.evaluate(line.m + "*" + x + "+" + line.n, { x: x })
	ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	if (!line.temp) text((-minX + (-minY - line.n) / line.m) * scaleY + 5, 20, lColor, 'center', 'bold 15px arial', line.name)
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
	drawFunction(lim)
	// Limit (.)
	let A = new mPoint(lim.approachVal, 0, true)
	let B = new mPoint(lim.approachVal, math.evaluate(lim.func, { x: A.a }), true)
	let C = new mPoint(0, math.evaluate(lim.func, { x: A.a }), true)
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
		let A = new mPoint(lim.approachValRight, 0, true)
		let B = new mPoint(lim.approachValRight, math.evaluate(lim.func, { x: A.a }), true)
		let C = new mPoint(0, math.evaluate(lim.func, { x: A.a }), true)
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
		A = new mPoint(lim.approachValLeft, 0, true)
		B = new mPoint(lim.approachValLeft, math.evaluate(lim.func, { x: A.a }), true)
		C = new mPoint(0, math.evaluate(lim.func, { x: A.a }), true)
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

function drawTangent(tur) {
	if (!tur.visibility) return
	drawFunction(tur)
	// Türev (.)
	let A = new mPoint(Number(tur.approachVal), 0, true)
	let B = new mPoint(Number(tur.approachVal), math.evaluate(tur.func, { x: A.a }), true)
	let C = new mPoint(0, math.evaluate(tur.func, { x: A.a }), true)
	let vls = new mLineSegment(A, B, true)
	let hls = new mLineSegment(B, C, true)
	A.color = B.color = C.color = vls.color = hls.color = tur.color
	vls.lineDash = hls.lineDash = [2, 5]
	drawLineSegment(vls)
	drawLineSegment(hls)
	drawPoint(A)
	drawPoint(B)
	drawPoint(C)

	//Teğet Doğrusu
	let m = math.evaluate(derivative(tur.func), { x: tur.approachVal })
	let c = math.evaluate(tur.func, { x: tur.approachVal }) - m * tur.approachVal
	tur.tngLine = new mLineWithEquation(m, c, true)
	if (tur.id == activeElementID) drawLineWithEquation(tur.tngLine)

}

function drawTangentHX(turHX) {
	if (!turHX.visibility) return
	drawFunction(turHX)

	// TürevH (.)
	let A1 = new mPoint(turHX.aodLine.A.a, 0, true)
	let C1 = new mPoint(0, turHX.aodLine.A.b, true)
	let vls = new mLineSegment(A1, turHX.aodLine.A, true)
	let hls = new mLineSegment(turHX.aodLine.A, C1, true)
	vls.lineDash = hls.lineDash = [2, 5]
	drawPoint(A1)
	drawPoint(turHX.aodLine.A)
	drawPoint(C1)
	drawLineSegment(vls)
	drawLineSegment(hls)

	// TürevH (+h)
	let A2 = new mPoint(turHX.aodLine.B.a, 0, true)
	let C2 = new mPoint(0, turHX.aodLine.B.b, true)
	vls = new mLineSegment(A2, turHX.aodLine.B, true)
	hls = new mLineSegment(turHX.aodLine.B, C2, true)
	vls.lineDash = hls.lineDash = [2, 5]
	drawPoint(A2)
	drawPoint(turHX.aodLine.B)
	drawPoint(C2)
	drawLineSegment(vls)
	drawLineSegment(hls)

	//Anlık Değişim Oranı
	drawLineWithPoints(new mLineWithPoints(turHX.aodLine.A, turHX.aodLine.B, true))

	//Teğet Doğrusu
	if (turHX.aodLine.A.a == turHX.aodLine.B.a && turHX.aodLine.A.b == turHX.aodLine.B.b) drawLineWithEquation(turHX.tngLine)
}

function drawDerivative(der) {
	if (!der.visibility) return
	drawFunction(der.derFunc)
	if (activeElementID == der.id) drawFunction(der.func.func, true)
}
function drawFunctionComposition(funcComp) {
	if (!funcComp.visibility) return
	drawFunction(funcComp)
}

function drawLineSegment(ls) {
	if (!ls.visibility) return
	let lsSize
	ls.id == activeElementID ? lsSize = ls.size + 1 : lsSize = ls.size
	let lsColor = ls.color
	if (ls.temp) lsColor = '#000000'
	ctx.beginPath()
	ctx.strokeStyle = lsColor
	ctx.lineWidth = lsSize
	if (ls.temp) ctx.setLineDash(ls.lineDash)
	ctx.moveTo((-minX + ls.A.a / unitY) * scaleY, (-minY - ls.A.b / unitX) * scaleX)
	ctx.lineTo((-minX + ls.B.a / unitY) * scaleY, (-minY - ls.B.b / unitX) * scaleX)
	if (!ls.temp) text((-minX + ((ls.A.a + ls.B.a) / 2) / unitY) * scaleY - 10, (-minY - ((ls.A.b + ls.B.b) / 2) / unitX) * scaleX - 10, lsColor, 'center', 'bold 15px arial', ls.name)
	ctx.stroke()
	ctx.setLineDash([])
	ctx.closePath()
}

function calculateAngle(ag) {
	let u = { x: ag.A.a - ag.B.a, y: ag.A.b - ag.B.b }
	let v = { x: ag.C.a - ag.B.a, y: ag.C.b - ag.B.b }
	let angleBA = Math.atan(u.y / u.x) * 180 / Math.PI
	if (u.x > 0 && u.y >= 0) {
		angleBA = angleBA
	} else if (u.x < 0 && u.y > 0) {
		angleBA = angleBA + 180
	} else if (u.x < 0 && u.y <= 0) {
		angleBA = angleBA + 180
	} else if (u.x >= 0 && u.y <= 0) {
		angleBA = angleBA + 360
	}
	let angleBC = Math.atan(v.y / v.x) * 180 / Math.PI
	if (v.x > 0 && v.y >= 0) {
		angleBC = angleBC
	} else if (v.x < 0 && v.y > 0) {
		angleBC = angleBC + 180
	} else if (v.x < 0 && v.y <= 0) {
		angleBC = angleBC + 180
	} else if (v.x >= 0 && v.y <= 0) {
		angleBC = angleBC + 360
	}
	return { angleBA, angleBC }
}


function drawAngle(ag) {
	if (!ag.visibility) return
	let agSize
	ag.id == activeElementID ? agSize = ag.size + 1 : agSize = ag.size
	let agColor = ag.color
	if (ag.temp) agColor = '#000000'
	// Açı
	ctx.beginPath()
	ctx.strokeStyle = agColor
	ctx.lineWidth = agSize
	ctx.moveTo((-minX + ag.A.a / unitY) * scaleY, (-minY - ag.A.b / unitX) * scaleX)
	ctx.lineTo((-minX + ag.B.a / unitY) * scaleY, (-minY - ag.B.b / unitX) * scaleX)
	ctx.lineTo((-minX + ag.C.a / unitY) * scaleY, (-minY - ag.C.b / unitX) * scaleX)
	ctx.stroke()
	ctx.closePath()

	//Sembol ve ölçü
	let angles = calculateAngle(ag)
	let angleBetween
	angles.angleBC - angles.angleBA < 0 ? angleBetween = angles.angleBC - angles.angleBA + 360 : angleBetween = angles.angleBC - angles.angleBA
	let cx = (-minX + ag.B.a / unitY) * scaleY
	let cy = (-minY - ag.B.b / unitX) * scaleX
	let startAngle = 360 - angles.angleBC
	let endAngle = startAngle + angles.angleBC - angles.angleBA

	ctx.beginPath()
	ctx.strokeStyle = agColor
	ctx.lineWidth = agSize + 1
	ctx.arc(cx, cy, 20, startAngle * Math.PI / 180, endAngle * Math.PI / 180)
	ctx.stroke()
	ctx.closePath()
	text(cx, cy - 40, agColor, 'center', 'bold 15px arial', ag.name + '=' + angleBetween.toFixed(0) + '°')
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
			input.value = item.name + "=(" + Number(item.a).toFixed(2) + "," + Number(item.b).toFixed(2) + ")"
		} else if (item.type == 'verLine') {
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ": x = " + item.x
		} else if (item.type == 'circleR') {
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': Çember((' + item.A.a + ',' + item.A.b + '),' + item.r + ')'
		} else if (item.type == 'circle2') {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': Çember((' + item.A.a + ',' + item.A.b + '),(' + item.B.a + ',' + item.B.b + '))'
		} else if (item.type == 'circle3') {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': Çember((' + item.A.a + ',' + item.A.b + '),(' + item.B.a + ',' + item.B.b + '),(' + item.C.a + ',' + item.C.b + '))'
		} else if (item.type == 'angle') {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': Açı((' + item.A.a + ',' + item.A.b + '),(' + item.B.a + ',' + item.B.b + '),(' + item.C.a + ',' + item.C.b + '))'
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
		} else if (item.type == 'tangent') {
			input.value = 'Teğet(' + item.func + ',' + item.approachVal + ')'
			output.value = item.name + ': y = ' + item.tngLine.func
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'tangentHX') {

			let tan, eq
			if (item.aodLine.A.a == item.aodLine.B.a && item.aodLine.A.b == item.aodLine.B.b) {
				eq = item.name + "'(" + item.approachVal + ")="
				tan = item.tngLine.m
			} else {
				eq = ''
				tan = tan = createLineEquation(item.aodLine.A, item.aodLine.B).m.toFixed(2)
			}

			let N = item.haveH ? 'H' : 'X'
			input.value = 'Teğet' + N + '(' + item.func + ',' + item.approachVal + ')'
			if (item.haveH) output.value = '[' + item.name + '(' + item.approachVal + '+h) - ' + item.name + '(' + item.approachVal + ')] / h = ' + eq + tan
			if (!item.haveH) output.value = '[' + item.name + '(' + item.h + ') - ' + item.name + '(x₀)] /(' + item.h + '-x₀)  = ' + eq + tan
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
		} else if (item.type == 'functioncomposition') {
			input.value = 'Bileşke(' + item.funcs.join(',') + ')'
			output.value = item.name + ': y = ' + item.func
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
		} else if (item.type == 'derivative') {
			input.value = item.name + ': y = ' + item.func.func.func
			output.value = item.derFunc.name + ': y = ' + item.derFunc.func
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
			labelA.innerHTML = 'a = ' + Number(item.a).toFixed(2)
			sliderB.value = item.b
			labelB.innerHTML = 'b = ' + Number(item.b).toFixed(2)
		} else if (item.type == 'verLine') {
			sliderA.value = item.x
			labelA.innerHTML = 'x = ' + item.x
		} else if (item.type == 'circleR') {
			sliderA.min = 0
			sliderA.max = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
			sliderA.value = item.r
			labelA.innerHTML = 'r = ' + item.r
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
		} else if (item.type == 'tangent') {
			let mostLeft = minX * unitY
			let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
			sliderA.min = mostLeft
			sliderA.max = mostRight
			sliderA.step = "0.01"
			sliderA.value = item.approachVal
			labelA.innerHTML = 'x = ' + item.approachVal
		} else if (item.type == 'tangentHX') {
			let mostLeft = minX * unitY
			let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
			sliderA.min = mostLeft
			sliderA.max = mostRight
			sliderA.step = "1"
			sliderA.value = item.approachVal
			labelA.innerHTML = 'x₀ = ' + item.approachVal
			sliderB.step = "0.1"
			item.haveH ? sliderB.min = 0 : sliderB.min = mostLeft
			item.haveH ? sliderB.max = 10 : sliderB.max = mostRight
			sliderB.value = item.h
			item.haveH ? labelB.innerHTML = 'h = ' + item.h : labelB.innerHTML = 'x = ' + item.h
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
	//canvas.style.cursor = btn.dataset.cursor || 'default'
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
		case 'circle2':
			activeObject = 'circle2'
			break
		case 'circle3':
			activeObject = 'circle3'
			break
		case 'angle':
			activeObject = 'angle'
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
	//canvas.style.cursor = 'pointer'
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

	if (activeitem.type == 'tangent' || activeitem.type == "verLine" || activeitem.type == 'circleR') {
		document.getElementById(activeElementID + '-labelB').hidden = true
		document.getElementById(activeElementID + '-sliderB').hidden = true
	}
	if (activeitem.type == 'sequence' || activeitem.type == 'lineSegment' || activeitem.type == 'lineWithPoints' || activeitem.type == 'sectionalFunctions' || activeitem.type == 'function' || activeitem.type == 'circle2' || activeitem.type == 'circle3' || activeitem.type == 'angle' || activeitem.type == 'functioncomposition' || activeitem.type == 'derivative') {
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

	if (!str.startsWith('(') || !str.endsWith(')')) {
		return { status: false };
	}

	str = str.slice(1, -1).trim();

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
	if (parts.length !== 2) return { status: false };

	const [aRaw, bRaw] = parts;

	if (!aRaw || !bRaw) return { status: false };
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

	const eqCount = (str.match(/=/g) || []).length;
	if (eqCount !== 1) return { status: false };

	let [leftRaw, rightRaw] = str.split('=');
	if (!leftRaw || !rightRaw) return { status: false };

	const left = leftRaw.trim();
	const right = rightRaw.trim();

	let expr;

	if (left === 'x') {
		expr = right;
	} else if (right === 'x') {
		expr = left;
	} else {
		return { status: false };
	}

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
	const eqCount = (str.match(/=/g) || []).length;
	if (eqCount !== 1) return { status: false };

	let [leftRaw, rightRaw] = str.split('=');
	if (!leftRaw || !rightRaw) return { status: false };

	const left = leftRaw.trim();
	const right = rightRaw.trim();

	let expr;
	if (left === 'y') {
		expr = right;
	} else if (right === 'y') {
		expr = left;
	} else {
		return { status: false };
	}

	const normalized = expr.replace(/\s+/g, '');

	if (/\*\(/.test(normalized) && normalized.includes('x')) {
		return { status: false };
	}

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

	const xMatch = normalized.match(/([+-]?[^x]*x)/);
	if (!xMatch) return { status: false };

	let xTerm = xMatch[0];

	let mRaw = xTerm.replace('x', '');

	if (mRaw === '' || mRaw === '+') mRaw = '1';
	if (mRaw === '-') mRaw = '-1';

	let rest = normalized.replace(xTerm, '');
	let nRaw = rest || '0';

	if (nRaw.startsWith('+')) nRaw = nRaw.slice(1);
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
	const match = str.match(/^doğru\s*\((.*)\)$/i);
	if (!match) return { status: false };

	let inner = match[1].trim();
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

function isLineSegment(input) {
	if (typeof input !== 'string') return { status: false };

	let str = input.trim();
	const match = str.match(/^doğruparçası\s*\((.*)\)$/i);
	if (!match) return { status: false };

	let inner = match[1].trim();

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

function isSequence(str) {
	const cleanStr = str.replace(/\s+/g, '');

	const diziRe = /^Dizi\(\s*(.+)\s*,\s*([^\s,]+)\s*,\s*([^\s,]+)\s*\)$/i;
	const match = cleanStr.match(diziRe);
	if (!match) return { status: false };

	let funcStr = match[1];
	const startStr = match[2];
	const endStr = match[3];

	const start = Number(startStr);
	const end = Number(endStr);
	if (!Number.isInteger(start) || start < 1) return { status: false };
	if (!Number.isInteger(end) || end < 1) return { status: false };
	const hasN = /(?<![a-zA-Z0-9_])n(?![a-zA-Z0-9_])/.test(funcStr);
	const isConstant = !/[a-zA-Z]/.test(funcStr);

	if (!hasN && !isConstant) return { status: false };

	const safeFunc = funcStr.replace(/(?<![a-zA-Z0-9_])n(?![a-zA-Z0-9_])/g, 'x');
	const funcCheck = isFunction(safeFunc);
	if (!funcCheck.status) return { status: false };

	return {
		type: "sequence",
		status: true,
		func: funcStr.replace(/\s+/g, ''),
		start,
		end
	};
}

function isLimit(str) {
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

function isTangent(str) {
	const tangentRe = /^\s*Teğet\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const tangentMatch = str.match(tangentRe)
	if (tangentMatch) {
		const func = tangentMatch[1]
		const approachVal = tangentMatch[2]
		return {
			type: "tangent",
			status: true,
			func,
			approachVal
		}
	} else {
		return { status: false }
	}
}

function isTangentHX(str) {
	const tangentReH = /^\s*TeğetH\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const tangentReX = /^\s*TeğetX\s*\(\s*(.+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const tangentMatch = str.match(tangentReH) || str.match(tangentReX)
	if (tangentMatch) {
		const func = tangentMatch[1]
		const approachVal = Number(tangentMatch[2])
		return {
			type: "tangentHX",
			status: true,
			func,
			approachVal,
			haveH: str.match(tangentReH) ? true : false
		}
	} else {
		return { status: false }
	}
}

function isDerivative(input) {
	if (typeof input !== 'string') return { status: false }

	// dış boşlukları temizle
	const str = input.trim()

	// Türev(...) formatı
	const match = str.match(/^Türev\s*\((.*)\)$/i)
	if (!match) return { status: false }

	const inner = match[1].trim()
	if (!inner) return { status: false }

	let fu
	if (isFunction(inner) && !isFunctionCompositions(inner).status && !isFunctionOperations(inner).status) {
		fu = new mFunction(inner, true)
		return {
			type: "derivative",
			inner,
			subType: 'function',
			func: fu,
			status: true
		}
	}

	if (isFunctionCompositions(inner).status) {
		let funcsFound = true
		let names = arrObjects.map((item) => item.name)
		isFunctionCompositions(inner).functions.forEach(f => {
			if (!names.includes(f)) funcsFound = false
		});
		if (funcsFound) {
			let newInner = inner
			isFunctionCompositions(inner).functions.forEach(f => {
				if (!f.includes('x') && !Number.isFinite(Number(f))) {
					newInner = newInner.replaceAll(f, arrObjects.find(o => o.name === f).func)
				}
			})
			fu = new mFunction(bileskeProcess(isFunctionCompositions(newInner).functions), true)
		} else {
			showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (isDerivative:Function Compositions içinde)')
		}
		return {
			type: "derivative",
			inner,
			subType: "functioncompositions",
			func: fu,
			status: true
		}
	}
	if (isFunctionOperations(inner)) {
		const hepsiVarMi = isFunctionOperations(inner).functions.every(name => arrObjects.some(f => f.name === name));
		if (hepsiVarMi) {
			let comeWithFuncs = inner
			isFunctionOperations(inner).functions.forEach(f => {
				comeWithFuncs = comeWithFuncs.replaceAll(f, '(' + arrObjects.find(o => o.name === f).func + ')')
			});
			fu = new mFunction(comeWithFuncs, true)
		} else {
			showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (isDerivative:Function Operations içinde)')
		}
		return {
			type: "derivative",
			inner,
			subType: "functionoperations",
			func: fu,
			status: true
		}
	}
	return { status: false }
}

function isFunctionOperations(str) {
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

function isFunctionCompositions(str) {
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

function isSectionalFunctions(str) {
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

function isCircleR(input) {
	if (typeof input !== 'string') return { status: false }

	// boşlukları temizle
	const str = input.replace(/\s+/g, '')

	// Çember(...) kontrolü
	const match = str.match(/^Çember\((.*)\)$/i)
	if (!match) return { status: false }

	const inner = match[1]

	// SON virgülü bul (iç içe parantezler için)
	let depth = 0
	let splitIndex = -1

	for (let i = inner.length - 1; i >= 0; i--) {
		if (inner[i] === ')') depth++
		else if (inner[i] === '(') depth--
		else if (inner[i] === ',' && depth === 0) {
			splitIndex = i
			break
		}
	}

	if (splitIndex === -1) return { status: false }

	const pointStr = inner.slice(0, splitIndex)
	const rStr = inner.slice(splitIndex + 1)

	// (a,b) kontrolü
	const point = isPoint(pointStr)
	if (!point.status) return { status: false }

	// r kontrolü
	if (!isNumeric(rStr)) return { status: false }

	let r
	try {
		r = math.evaluate(rStr)
	} catch {
		return { status: false }
	}

	// yarıçap > 0 olmalı
	if (!isFinite(r) || r < 0) return { status: false }

	return {
		type: "circleR",
		a: point.a,
		b: point.b,
		r: r,
		status: true
	}
}

function isCircle2(input) {
	if (typeof input !== 'string') return { status: false }

	const str = input.replace(/\s+/g, '')

	const match = str.match(/^Çember\((.*)\)$/i)
	if (!match) return { status: false }

	const inner = match[1]

	// depth ile doğru virgülü bul
	let depth = 0
	let splitIndex = -1

	for (let i = 0; i < inner.length; i++) {
		if (inner[i] === '(') depth++
		else if (inner[i] === ')') depth--
		else if (inner[i] === ',' && depth === 0) {
			splitIndex = i
			break
		}
	}

	if (splitIndex === -1) return { status: false }

	const centerStr = inner.slice(0, splitIndex)
	const pointStr = inner.slice(splitIndex + 1)

	// merkez kontrolü
	const center = isPoint(centerStr)
	if (!center.status) return { status: false }

	// çember üzerindeki nokta kontrolü
	const point = isPoint(pointStr)
	if (!point.status) return { status: false }

	// yarıçap hesapla
	const dx = point.a - center.a
	const dy = point.b - center.b
	const r = Math.sqrt(dx * dx + dy * dy)

	// r > 0 olmalı
	if (!isFinite(r) || r < 0) return { status: false }

	return {
		type: "circle2",
		m: center.a,
		n: center.b,
		a: point.a,
		b: point.b,
		r: r,
		status: true
	}
}

function isCircle3(input) {
	if (typeof input !== 'string') return { status: false }

	const str = input.replace(/\s+/g, '')

	const match = str.match(/^Çember\((.*)\)$/i)
	if (!match) return { status: false }

	const inner = match[1]

	// depth ile virgülleri bul
	let depth = 0
	let splits = []

	for (let i = 0; i < inner.length; i++) {
		if (inner[i] === '(') depth++
		else if (inner[i] === ')') depth--
		else if (inner[i] === ',' && depth === 0) {
			splits.push(i)
		}
	}

	// tam 2 virgül olmalı
	if (splits.length !== 2) return { status: false }

	const p1Str = inner.slice(0, splits[0])
	const p2Str = inner.slice(splits[0] + 1, splits[1])
	const p3Str = inner.slice(splits[1] + 1)

	// noktaları parse et
	const p1 = isPoint(p1Str)
	const p2 = isPoint(p2Str)
	const p3 = isPoint(p3Str)

	if (!p1.status || !p2.status || !p3.status) return { status: false }

	// aynı noktalar olamaz
	if (
		(p1.a === p2.a && p1.b === p2.b) ||
		(p1.a === p3.a && p1.b === p3.b) ||
		(p2.a === p3.a && p2.b === p3.b)
	) {
		return { status: false }
	}

	// COLLINEAR KONTROLÜ (alan = 0)
	const area =
		p1.a * (p2.b - p3.b) +
		p2.a * (p3.b - p1.b) +
		p3.a * (p1.b - p2.b)

	if (Math.abs(area) < 1e-10) return { status: false }

	return {
		type: "circle3",
		ax: p1.a,
		ay: p1.b,
		bx: p2.a,
		by: p2.b,
		cx: p3.a,
		cy: p3.b,
		status: true
	}
}

function isAngle(input) {
	if (typeof input !== 'string') return { status: false }

	const str = input.replace(/\s+/g, '')

	const match = str.match(/^Açı\((.*)\)$/i)
	if (!match) return { status: false }

	const inner = match[1]

	// depth ile virgülleri bul
	let depth = 0
	let splits = []

	for (let i = 0; i < inner.length; i++) {
		if (inner[i] === '(') depth++
		else if (inner[i] === ')') depth--
		else if (inner[i] === ',' && depth === 0) {
			splits.push(i)
		}
	}

	// tam 2 virgül olmalı
	if (splits.length !== 2) return { status: false }

	const p1Str = inner.slice(0, splits[0])
	const p2Str = inner.slice(splits[0] + 1, splits[1])
	const p3Str = inner.slice(splits[1] + 1)

	// noktaları parse et
	const p1 = isPoint(p1Str)
	const p2 = isPoint(p2Str)
	const p3 = isPoint(p3Str)

	if (!p1.status || !p2.status || !p3.status) return { status: false }

	// köşe ile diğer noktalar aynı olamaz
	if (
		(p1.a === p2.a && p1.b === p2.b) ||
		(p3.a === p2.a && p3.b === p2.b)
	) {
		return { status: false }
	}

	return {
		type: "angle",
		ax: p1.a,
		ay: p1.b,
		bx: p2.a,
		by: p2.b,
		cx: p3.a,
		cy: p3.b,
		status: true
	}
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
		if (isPoint(str).status) {
			console.log('Nokta:', isPoint(str))

			let pt = new mPoint(isPoint(str).a, isPoint(str).b)
			arrObjects.push(pt)
			activeElementID = pt.id
			undoObjects = []
			delCount = 0
		} else if (isCircleR(str).status) {
			console.log('Çember((a,b),r):', isCircleR(str))

			let m = new mPoint(isCircleR(str).a, isCircleR(str).b)
			arrObjects.push(m)
			let c = new mCircleR(m, isCircleR(str).r)
			arrObjects.push(c)
			activeElementID = c.id
			undoObjects = []
			delCount = 0
		} else if (isCircle2(str).status) {
			console.log('Çember((m,n),(a,b)):', isCircle2(str))

			let A = new mPoint(isCircle2(str).m, isCircle2(str).n)
			arrObjects.push(A)
			let B = new mPoint(isCircle2(str).a, isCircle2(str).b)
			arrObjects.push(B)
			let c = new mCircle2(A, B)
			arrObjects.push(c)
			activeElementID = c.id
			undoObjects = []
			delCount = 0
		} else if (isCircle3(str).status) {
			console.log('Çember((a,b),(c,d),(e,f)):', isCircle3(str))
			let A = new mPoint(isCircle3(str).ax, isCircle3(str).ay)
			arrObjects.push(A)
			let B = new mPoint(isCircle3(str).bx, isCircle3(str).by)
			arrObjects.push(B)
			let C = new mPoint(isCircle3(str).cx, isCircle3(str).cy)
			arrObjects.push(C)
			let c = new mCircle3(A, B, C)
			arrObjects.push(c)
			activeElementID = c.id
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
			arrObjects.push(A)
			let B = new mPoint(isLineWithPoints(str).xB, isLineWithPoints(str).yB)
			arrObjects.push(B)
			let line = new mLineWithPoints(A, B)
			arrObjects.push(line)
			activeElementID = line.id
			undoObjects = []
			delCount = 0
		} else if (isLineSegment(str).status) {
			console.log('DoğruParçası:', isLineSegment(str))

			let A = new mPoint(isLineSegment(str).xA, isLineSegment(str).yA)
			arrObjects.push(A)
			let B = new mPoint(isLineSegment(str).xB, isLineSegment(str).yB)
			arrObjects.push(B)
			let lineSegment = new mLineSegment(A, B)
			arrObjects.push(lineSegment)
			activeElementID = lineSegment.id
			undoObjects = []
			delCount = 0
		} else if (isAngle(str).status) {
			console.log('Açı:', isAngle(str))

			let A = new mPoint(isAngle(str).ax, isAngle(str).ay)
			arrObjects.push(A)
			let B = new mPoint(isAngle(str).bx, isAngle(str).by)
			arrObjects.push(B)
			let C = new mPoint(isAngle(str).cx, isAngle(str).cy)
			arrObjects.push(C)
			let angle = new mAngle(A, B, C)
			arrObjects.push(angle)
			activeElementID = angle.id
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
		} else if (isTangent(str).status) {
			console.log('Teğet(x^2,1)', isTangent(str))

			let funcFound = true
			let names = arrObjects.map((item) => item.name)
			if (!isTangent(str).func.includes('x') && !Number.isFinite(Number(isTangent(str).func))) {
				if (!names.includes(isTangent(str).func)) funcFound = false
			}
			if (funcFound) {
				if (!isTangent(str).func.includes('x') && !Number.isFinite(Number(isTangent(str).func))) {
					str = str.replaceAll(isTangent(str).func, arrObjects.find(o => o.name === isTangent(str).func).func)
				}
				let tng = new mTangent(isTangent(str).func, isTangent(str).approachVal)
				arrObjects.push(tng)
				activeElementID = tng.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (girisKeyDown:Teğet içinde)')
			}

		} else if (isTangentHX(str).status) {
			console.log('TeğetH(x^2,1)', isTangentHX(str))

			let funcFound = true
			let names = arrObjects.map((item) => item.name)
			if (!isTangentHX(str).func.includes('x') && !Number.isFinite(Number(isTangentHX(str).func))) {
				if (!names.includes(isTangentHX(str).func)) funcFound = false
			}
			if (funcFound) {
				if (!isTangentHX(str).func.includes('x') && !Number.isFinite(Number(isTangentHX(str).func))) {
					str = str.replaceAll(isTangentHX(str).func, arrObjects.find(o => o.name === isTangentHX(str).func).func)
				}
				let tngHX = new mTangentHX(isTangentHX(str).func, isTangentHX(str).approachVal, isTangentHX(str).haveH)
				arrObjects.push(tngHX)
				activeElementID = tngHX.id
				undoObjects = []
				delCount = 0
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı. (girisKeyDown:TeğetH içinde)')
			}

		} else if (isDerivative(str).status) {
			console.log('Türev(x^2)', isDerivative(str))

			let funcFound = true
			let names = arrObjects.map((item) => item.name)
			if (funcFound) {
				let func = new mFunction(isDerivative(str).func, true)
				let derFunc = new mFunction(derivative(func.func.func), true)
				let der = new mDerivative(func, derFunc)
				func.id = func.func.id = derFunc.id = derFunc.func.id = der.id
				func.name = der.name
				derFunc.name = der.name + "'"
				arrObjects.push(der)
				activeElementID = der.id
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

				let funcComps = new mFunctionComposions(isFunctionCompositions(str).functions)
				arrObjects.push(funcComps)
				activeElementID = funcComps.id
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
						let line = new mLineWithEquation(isLineWithEquation(func).m, isLineWithEquation(func).n, false, isSectionalFunctions(str).ranges[i].from, isSectionalFunctions(str).ranges[i].to)
						secFuncs.push(line)
					} else if (isFunction(func).status) {
						let other = new mFunction(func, false, isSectionalFunctions(str).ranges[i].from, isSectionalFunctions(str).ranges[i].to)
						secFuncs.push(other)
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
	//canvas.style.cursor = 'pointer'
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
			item.a = Number(sliderA.value)
			labelB.innerHTML = 'b = ' + sliderB.value
			item.b = Number(sliderB.value)
			input.value = item.name + '(' + item.a + ',' + item.b + ')'

			let ownerS = arrObjects.filter(obj => {
				const validTypes = ['lineSegment', 'lineWithPoints', 'circle', 'circle2', 'circle3', 'angle'];
				if (!validTypes.includes(obj.type)) return false;
				return ["A", "B", "C"].some(key => obj[key]?.name === item.name);
			});

			ownerS.forEach(owner => {
				if (owner.A.name === item.name) {
					owner.A.a = item.a
					owner.A.b = item.b
				} else if (owner.B.name === item.name) {
					owner.B.a = item.a
					owner.B.b = item.b
				} else if (owner.C.name === item.name) {
					owner.C.a = item.a
					owner.C.b = item.b
				}
				let inputOwner = document.getElementById(owner.id + '-input')
				if (owner.type === 'lineWithPoints') {
					inputOwner.value = owner.name + ': Doğru((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '))'
				} else if (owner.type === 'lineSegment') {
					inputOwner.value = owner.name + ': DoğruParçası((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '))'
				} else if (owner.type === 'circleR') {
					inputOwner.value = owner.name + ': Çember((' + owner.A.a + ',' + owner.A.b + '),' + owner.r + ')'
				} else if (owner.type === 'circle2') {
					inputOwner.value = owner.name + ': Çember((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '))'
				} else if (owner.type === 'circle3') {
					inputOwner.value = owner.name + ': Çember((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '),(' + owner.C.a + ',' + owner.C.b + '))'
				} else if (owner.type === 'angle') {
					inputOwner.value = owner.name + ': Açı((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '),(' + owner.C.a + ',' + owner.C.b + '))'
				}
			});
		} else if (item.type == 'tangent') {
			input.value = 'Teğet(' + item.func + ',' + sliderA.value + ')'
			item.approachVal = Number(sliderA.value)
			output.value = item.name + ': y = ' + item.tngLine.func
			labelA.innerHTML = 'x = ' + sliderA.value
		} else if (item.type == 'tangentHX') {
			item.approachVal = Number(sliderA.value)
			item.h = Number(sliderB.value)

			let A = new mPoint(item.approachVal, math.evaluate(item.func, { x: item.approachVal }), true)
			let B = item.haveH ? new mPoint(item.approachVal + item.h, math.evaluate(item.func, { x: item.approachVal + item.h }), true) : new mPoint(item.h, math.evaluate(item.func, { x: item.h }), true)
			item.aodLine = new mLineWithPoints(A, B, true)

			let m = math.evaluate(derivative(item.func), { x: item.approachVal })
			let c = math.evaluate(item.func, { x: item.approachVal }) - m * item.approachVal
			item.tngLine = new mLineWithEquation(m, c, true)

			labelA.innerHTML = 'x₀ = ' + item.approachVal
			item.haveH ? labelB.innerHTML = 'h = ' + item.h : labelB.innerHTML = 'x = ' + item.h

			let tan, eq
			if (item.aodLine.A.a == item.aodLine.B.a && item.aodLine.A.b == item.aodLine.B.b) {
				eq = item.name + "'(" + item.approachVal + ")="
				tan = item.tngLine.m
			} else {
				eq = ''
				tan = tan = createLineEquation(item.aodLine.A, item.aodLine.B).m.toFixed(2)
			}

			let N = item.haveH ? 'H' : 'X'
			input.value = 'Teğet' + N + '(' + item.func + ',' + item.approachVal + ')'
			if (item.haveH) output.value = '[' + item.name + '(' + item.approachVal + '+h) - ' + item.name + '(' + item.approachVal + ')] / h = ' + eq + tan
			if (!item.haveH) output.value = '[' + item.name + '(' + item.h.toFixed(2) + ') - ' + item.name + '(x₀)] /(' + item.h.toFixed(2) + '-x₀)  = ' + eq + tan
		} else if (item.type == 'lineWithEquation') {
			item.m = Number(sliderA.value)
			item.n = Number(sliderB.value)
			labelA.innerHTML = 'm = ' + item.m
			labelB.innerHTML = 'n = ' + item.n
			input.value = 'y = ' + normalizeLine(Number(item.m), Number(item.n))
		} else if (item.type == 'verLine') {
			item.x = Number(sliderA.value)
			labelA.innerHTML = 'x = ' + item.x
			input.value = item.name + ': x = ' + item.x
		} else if (item.type == 'circleR') {
			item.r = Number(sliderA.value)
			labelA.innerHTML = 'r = ' + item.r
			input.value = item.name + ': Çember((' + item.A.a + ',' + item.A.b + '),' + item.r + ')'
		} else if (item.type == 'limit') {
			item.approachValRight = Number(sliderA.value)
			labelA.innerHTML = sliderA.min + '⁺ = ' + sliderA.value
			sliderA.innerHTML = item.approachValRight + '⁺ = ' + Number(sliderA.value).toFixed(2)
			item.approachValLeft = Number(sliderB.value)
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




function getHitObject(mousePos) {

	let hit = null
	let hitType = null

	const threshold = 0.1

	// =========================
	// 🔥 1. PASS → POINTLER (ÖNCELİK)
	// =========================
	for (const obj of arrObjects) {
		if (obj.type === 'point') {
			const dx = mousePos.x - obj.a
			const dy = mousePos.y - obj.b
			const distance = Math.sqrt(dx * dx + dy * dy)

			if (distance < threshold) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}
	}

	// =========================
	// 🔥 2. PASS → DİĞER TÜM OBJELER
	// =========================
	for (const obj of arrObjects) {

		if (obj.type === 'point') continue

		// ---- lineWithEquation ----
		if (obj.type === 'lineWithEquation') {
			let expectedY = math.evaluate(obj.func, { x: mousePos.x })
			if (Math.abs(mousePos.y - expectedY) < threshold) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}

		// ---- vertical line ----
		else if (obj.type === 'verLine') {
			if (Math.abs(mousePos.x - obj.x) < threshold) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}

		// ---- line segment ----
		else if (obj.type === 'lineSegment') {
			let lineEq = createLineEquation(obj.A, obj.B)
			let expectedY = lineEq.m * mousePos.x + lineEq.c

			let withinSegment =
				mousePos.x >= Math.min(obj.A.a, obj.B.a) - threshold &&
				mousePos.x <= Math.max(obj.A.a, obj.B.a) + threshold &&
				mousePos.y >= Math.min(obj.A.b, obj.B.b) - threshold &&
				mousePos.y <= Math.max(obj.A.b, obj.B.b) + threshold

			if (withinSegment && Math.abs(mousePos.y - expectedY) < threshold) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}

		// ---- lineWithPoints ----
		else if (obj.type === 'lineWithPoints') {
			let lineEq = createLineEquation(obj.A, obj.B)
			let expectedY = lineEq.m * mousePos.x + lineEq.c

			if (Math.abs(mousePos.y - expectedY) < threshold) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}

		// ---- sequence ----
		else if (obj.type === 'sequence') {
			let expectedY = math.evaluate(obj.func, { n: mousePos.x })

			if (Math.abs(mousePos.y - expectedY) < threshold) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}

		// ---- circle ----
		else if (obj.type === 'circleR' || obj.type === 'circle2' || obj.type === 'circle3') {

			let r, distance

			if (obj.type === 'circleR') {
				r = obj.r
				distance = Math.sqrt((mousePos.x - obj.A.a) ** 2 + (mousePos.y - obj.A.b) ** 2)
			}
			else if (obj.type === 'circle2') {
				r = Math.sqrt((obj.B.a - obj.A.a) ** 2 + (obj.B.b - obj.A.b) ** 2)
				distance = Math.sqrt((mousePos.x - obj.A.a) ** 2 + (mousePos.y - obj.A.b) ** 2)
			}
			else if (obj.type === 'circle3') {
				let data = getCircle3RA(obj)
				r = data.r
				distance = Math.sqrt((mousePos.x - data.m) ** 2 + (mousePos.y - data.n) ** 2)
			}

			if (Math.abs(distance - r) < threshold) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}

		// ---- angle ----
		else if (obj.type === 'angle') {
			let ab = Math.sqrt((obj.B.a - obj.A.a) ** 2 + (obj.B.b - obj.A.b) ** 2)
			let bc = Math.sqrt((obj.C.a - obj.B.a) ** 2 + (obj.C.b - obj.B.b) ** 2)
			let ac = Math.sqrt((obj.C.a - obj.A.a) ** 2 + (obj.C.b - obj.A.b) ** 2)

			let angle = Math.acos((ab ** 2 + bc ** 2 - ac ** 2) / (2 * ab * bc)) * (180 / Math.PI)

			let angleAtMouse = Math.acos(
				((mousePos.x - obj.B.a) * (obj.A.a - obj.B.a) +
					(mousePos.y - obj.B.b) * (obj.A.b - obj.B.b)) /
				(Math.sqrt((mousePos.x - obj.B.a) ** 2 + (mousePos.y - obj.B.b) ** 2) * ab)
			) * (180 / Math.PI)

			if (Math.abs(angleAtMouse - angle) < 5) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			}
		}
	}

	// =========================
	// ❌ HİÇBİR ŞEY YOK
	// =========================
	canvas.style.cursor = 'default'
	return { hit: null, hitType: null }
}


function gggggggetHitObject(mousePos) {
	let hit = null
	let hitType = null
	for (const obj of arrObjects) {
		if (obj.type === 'point') {
			let distance = Math.sqrt((mousePos.x - obj.a) ** 2 + (mousePos.y - obj.b) ** 2)
			if (distance < .1) {
				canvas.style.cursor = 'pointer'
				return { hit: obj, hitType: obj.type }
			} else {
				canvas.style.cursor = 'default'
			}
		} else if (obj.type === 'lineWithEquation') {
			let expectedY = math.evaluate(obj.func, { x: mousePos.x })
			if (Math.abs(mousePos.y - expectedY) < .1) {
				canvas.style.cursor = 'pointer'
				hit = obj
				hitType = obj.type
				break
			} else {
				canvas.style.cursor = 'default'
			}
		} else if (obj.type === 'verLine') {
			if (Math.abs(mousePos.x - obj.x) < .1) {
				canvas.style.cursor = 'pointer'
				hit = obj
				hitType = obj.type
				break
			} else {
				canvas.style.cursor = 'default'
			}
		} else if (obj.type === 'lineSegment') {
			let lineEq = createLineEquation(obj.A, obj.B)
			let expectedY = lineEq.m * mousePos.x + lineEq.c
			let withinSegment = (mousePos.x >= Math.min(obj.A.a, obj.B.a) - .1 && mousePos.x <= Math.max(obj.A.a, obj.B.a) + .1) &&
				(mousePos.y >= Math.min(obj.A.b, obj.B.b) - .1 && mousePos.y <= Math.max(obj.A.b, obj.B.b) + .1)
			if (withinSegment) {
				canvas.style.cursor = 'pointer'
				hit = obj
				hitType = obj.type
				break
			} else {
				canvas.style.cursor = 'default'
			}
		} else if (obj.type === 'lineWithPoints') {
			let lineEq = createLineEquation(obj.A, obj.B)
			let expectedY = lineEq.m * mousePos.x + lineEq.c
			if (Math.abs(mousePos.y - expectedY) < .1) {
				canvas.style.cursor = 'pointer'
				hit = obj
				hitType = obj.type
				break
			} else {
				canvas.style.cursor = 'default'
			}
		} else if (obj.type === 'sequence') {
			let expectedY = math.evaluate(obj.func, { n: mousePos.x })
			if (Math.abs(mousePos.y - expectedY) < .1) {
				canvas.style.cursor = 'pointer'
				hit = obj
				hitType = obj.type
				break
			} else {
				canvas.style.cursor = 'default'
			}
		} else if (obj.type == 'circleR' || obj.type == 'circle2' || obj.type == 'circle3') {



			let r
			let distance
			if (obj.type == 'circleR') {
				r = obj.r
				distance = Math.sqrt((mousePos.x - obj.A.a) ** 2 + (mousePos.y - obj.A.b) ** 2)
			} else if (obj.type == 'circle2') {
				r = Math.sqrt((obj.B.a - obj.A.a) ** 2 + (obj.B.b - obj.A.b) ** 2)
				distance = Math.sqrt((mousePos.x - obj.A.a) ** 2 + (mousePos.y - obj.A.b) ** 2)
			} else if (obj.type == 'circle3') {
				r = getCircle3RA(obj).r
				let m = getCircle3RA(obj).m
				let n = getCircle3RA(obj).n
				distance = Math.sqrt((mousePos.x - m) ** 2 + (mousePos.y - n) ** 2)
			}
			if (Math.abs(distance - r) < .1) {
				canvas.style.cursor = 'pointer'
				hit = obj
				hitType = obj.type
				break
			} else {
				canvas.style.cursor = 'default'
			}
		} else if (obj.type == 'angle') {
			let ab = Math.sqrt((obj.B.a - obj.A.a) ** 2 + (obj.B.b - obj.A.b) ** 2)
			let bc = Math.sqrt((obj.C.a - obj.B.a) ** 2 + (obj.C.b - obj.B.b) ** 2)
			let ac = Math.sqrt((obj.C.a - obj.A.a) ** 2 + (obj.C.b - obj.A.b) ** 2)
			let angle = Math.acos((ab ** 2 + bc ** 2 - ac ** 2) / (2 * ab * bc)) * (180 / Math.PI)
			let angleAtMouse = Math.acos(((mousePos.x - obj.B.a) * (obj.A.a - obj.B.a) + (mousePos.y - obj.B.b) * (obj.A.b - obj.B.b)) / (Math.sqrt((mousePos.x - obj.B.a) ** 2 + (mousePos.y - obj.B.b) ** 2) * ab)) * (180 / Math.PI)
			if (Math.abs(angleAtMouse - angle) < 5) {
				canvas.style.cursor = 'pointer'
				hit = obj
				hitType = obj.type
				break
			} else {
				canvas.style.cursor = 'default'
			}
		}
	}
	return { hit, hitType }
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
			//canvas.style.cursor = 'pointer'
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
			//canvas.style.cursor = 'pointer'
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
		/*
		return
		//console.log(arrObjects)
		let cp = arrObjects[2]
		let c = arrObjects[1]
		if (e.deltaY < 0) {
			// 1. çemberi taşı
			c.A.b += 0.1
			// 2. çembere bağlı noktaları güncelle
			c.updatePoints(arrObjects)
		} else {
			apsis += 5
			ordinat++
			movePoint(cp, apsis, ordinat, { circles: [c] })
		}
		drawAll()
					let cp = arrObjects[2] //çembere bağlı olan nokta
				let c = arrObjects[1] //Bu noktanın bağlı olduğu çember
				if (e.deltaY < 0) { //çember taşıma
					c.A.b += .1 // çember taşınıyor
				} else {
					movePoint(cp, cp.a + 1, cp.b + 1, { circles: [c] }) // nokta taşınıyor
				}
		
				drawAll() */

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


	/* 	let A = new mPoint(-2, 1)
		arrObjects.push(A)
		let c = new mCircleR(A, 1)
		arrObjects.push(c)
		let cA = new mPoint(-1.5, 0.5)
		cA.constraints.push({
			type: "onCircle",
			circleId: c.id
		})
		cA.applyConstraints({ circles: [c] })
		arrObjects.push(cA)
		let lsp = new mPoint(1, 1)
		arrObjects.push(lsp)
		let ls = new mLineSegment(cA, lsp)
		arrObjects.push(ls)
		drawAll() */


	canvas.addEventListener("mousemove", function (evt) {

		/* 		c.A.a = getMousePos(evt).x
				c.A.b = getMousePos(evt).y
				c.updatePoints(arrObjects)
				//apsis += 5
				//ordinat++
				//movePoint(cp, apsis, ordinat, { circles: [c] })
				drawAll()
				return */

		getHitObject(getMousePos(evt))
		if (activeObject === 'line') {
			drawAll()
			if (lineDrawing) {
				let lineB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
				drawLineWithPoints(new mLineWithPoints(lineA, lineB, true))
			}
		}
		if (activeObject === 'linesegment') {
			drawAll()
			if (lineSegmentDrawing) {
				let lineSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawAll()
				drawLineSegment(new mLineSegment(lineSegmentA, lineSegmentB, true))
			}
		}
		if (activeObject === 'angle') {
			drawAll()
			if (!angleDrawing && angleA && !angleB) {
				let angleB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawLineSegment(new mLineSegment(angleA, angleB, true))
			} else if (angleDrawing && angleA && angleB && !angleC) {
				let angleC = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawAngle(new mAngle(angleA, angleB, angleC, true))
			}
		}
		if (activeObject === 'circle2') {
			drawAll()
			if (circleDrawing) {
				let circleB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawAll()
				drawCircle2(new mCircle2(circleA, circleB, true))
			}
		}
		if (activeObject === 'circle3') {
			drawAll()
			if (!circleDrawing && circleA && !circleB) {
				let circleB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				//drawLineSegment(new mLineSegment(circleA, circleB, true))
			} else if (circleDrawing && circleA && circleB && !circleC) {
				let circleC = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawCircle3(new mAngle(circleA, circleB, circleC, true))
			}
		}

		if (grabbing && activeObject == 'choice' && hitObject) {
			canvas.style.cursor = 'grabbing'
			if (hitObject.hitType == 'point') {
				drawAll()
				hitObject.hit.a = getMousePos(evt).x
				hitObject.hit.b = getMousePos(evt).y
				reprojectAllOnOther()
				drawPoint(hitObject.hit)
			}
		}

	}, false)

	canvas.addEventListener("mousedown", function (evt) {

		/* 		return
				let A = new mPoint(-2, 1)
				let c = new mCircleR(A, 1)
		
				let cA = new mPoint(-1.5, 0.5)
		
				cA.constraints.push({
					type: "onCircle",
					circleId: c.id
				})
		
				cA.applyConstraints({ circles: [c] })
		
				let lsp = new mPoint(1, 1)
				arrObjects.push(lsp)
				let ls = new mLineSegment(cA, lsp)
		
				arrObjects.push(ls)
				arrObjects.push(A)
				arrObjects.push(c)
				arrObjects.push(cA)
				drawAll()
				return */


		hitObject = getHitObject(getMousePos(evt))
		if (evt.button == 0) {
			if (activeObject === 'point') {
				//let mousePos = getMousePos(evt)
				let ownObject = hitObject.hit
				let point
				if (!hitObject.hit) {
					point = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
				} else if (hitObject.hitType == 'circle2') {
					let r = distanceAB(ownObject.A, ownObject.B)
					let angle = Math.atan2(getMousePos(evt).y - ownObject.A.b, getMousePos(evt).x - ownObject.A.a)
					let pointX = ownObject.A.a + r * Math.cos(angle);
					let pointY = ownObject.A.b + r * Math.sin(angle);
					point = new mPoint(pointX.toFixed(2), pointY.toFixed(2))
					point.onOther.push({
						type: "onCircle",
						circleId: ownObject.id
					})
				} else if (hitObject.hitType == 'circle3') {
					let r = getCircle3RA(ownObject).r
					let angle = Math.atan2(getMousePos(evt).y - getCircle3RA(ownObject).n, getMousePos(evt).x - getCircle3RA(ownObject).m)
					let pointX = getCircle3RA(ownObject).m + r * Math.cos(angle);
					let pointY = getCircle3RA(ownObject).n + r * Math.sin(angle);
					point = new mPoint(pointX.toFixed(2), pointY.toFixed(2))
					point.onOther.push({
						type: "onCircle",
						circleId: ownObject.id
					})
				} else if (hitObject.hitType == 'circleR') {
					let r = ownObject.r
					let angle = Math.atan2(getMousePos(evt).y - ownObject.A.b, getMousePos(evt).x - ownObject.A.a)
					let pointX = ownObject.A.a + r * Math.cos(angle);
					let pointY = ownObject.A.b + r * Math.sin(angle);
					point = new mPoint(pointX.toFixed(2), pointY.toFixed(2))
					point.onOther.push({
						type: "onCircle",
						circleId: ownObject.id
					})
				} else {
					console.log('Type bulunamadı. mousedown içinde.')
				}

				//console.log(point)
				arrObjects.push(point)
				activeElementID = point.id
				undoObjects = []
				delCount = 0
				labelsCreator()
			}
			if (activeObject === 'line') {
				if (lineDrawing == false) {
					lineA
					hitObject.hitType == 'point' ? lineA = hitObject.hit : lineA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(lineA)
					lineDrawing = true
				} else {
					lineB
					hitObject.hitType == 'point' ? lineB = hitObject.hit : lineB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(lineB)
					let lwp = new mLineWithPoints(lineA, lineB)
					arrObjects.push(lwp)
					activeElementID = lwp.id
					lineDrawing = false
					lineA = lineB = null
				}
			}

			if (activeObject === 'linesegment') {
				if (lineSegmentDrawing == false) {
					lineSegmentA
					hitObject.hitType == 'point' ? lineSegmentA = hitObject.hit : lineSegmentA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(lineSegmentA)
					lineSegmentDrawing = true
				} else {
					lineSegmentB
					hitObject.hitType == 'point' ? lineSegmentB = hitObject.hit : lineSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(lineSegmentB)
					let ls = new mLineSegment(lineSegmentA, lineSegmentB)
					arrObjects.push(ls)
					activeElementID = ls.id
					lineSegmentDrawing = false
					lineSegmentA = lineSegmentB = null
				}
			}

			if (activeObject === 'circle2') {
				if (circleDrawing == false) {
					circleA
					hitObject.hitType == 'point' ? circleA = hitObject.hit : circleA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(circleA)
					circleDrawing = true
				} else {
					circleB
					hitObject.hitType == 'point' ? circleB = hitObject.hit : circleB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(circleB)
					let c2 = new mCircle2(circleA, circleB)
					arrObjects.push(c2)
					activeElementID = c2.id
					circleDrawing = false
					circleA = circleB = null
				}
			}
			if (activeObject === 'circle3') {
				if (!circleDrawing) {
					if (!circleA) {
						circleA
						hitObject.hit == 'point' ? circleA = hitObject.hit : circleA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
						if (!hitObject.hit) arrObjects.push(circleA)
					} else {
						circleB
						hitObject.hitType == 'point' ? circleB = hitObject.hit : circleB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
						if (!hitObject.hit) arrObjects.push(circleB)
						circleDrawing = true
					}
				} else {
					circleC
					hitObject.hitType == 'point' ? circleC = hitObject.hit : circleC = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(circleC)
					let c3 = new mCircle3(circleA, circleB, circleC)
					arrObjects.push(c3)
					activeElementID = c3.id
					circleDrawing = false
					circleA = circleB = circleC = null
				}
			}
			if (activeObject === 'angle') {
				if (!angleDrawing) {
					if (!angleA) {
						angleA
						hitObject.hitType == 'point' ? angleA = hitObject.hit : angleA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
						if (!hitObject.hit) arrObjects.push(angleA)
					} else {
						angleB
						hitObject.hitType == 'point' ? angleB = hitObject.hit : angleB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
						if (!hitObject.hit) arrObjects.push(angleB)
						angleDrawing = true
					}
				} else {
					angleC
					hitObject.hitType == 'point' ? angleC = hitObject.hit : angleC = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(angleC)
					let a = new mAngle(angleA, angleB, angleC)
					arrObjects.push(a)
					activeElementID = a.id
					angleDrawing = false
					angleA = angleB = angleC = null
				}
			}

			if (hitObject.hit) {
				activeElementID = hitObject.hit.id
				drawAll()
			}
		}

		if (activeObject == 'choice' && hitObject.hit) {

			//console.log(hitObject.hit)

			grabbing = true
			canvas.style.cursor = 'grabbing'
			firstMousePos = getMousePos(evt)
		}
		drawAll()
		labelsCreator()
	}, false)

	canvas.addEventListener("mouseup", function (evt) {
		canvas.style.cursor = 'default'
		lastMousePos = getMousePos(evt)

		if (grabbing && activeObject == 'choice') {

			if (hitObject.hitType == 'point') {
				hitObject.hit.a = lastMousePos.x
				hitObject.hit.b = lastMousePos.y
				reprojectAllOnOther()
			}

			grabbing = false
			lastMousePos = null
			drawAll()
			labelsCreator()
		}
		firstMousePos = lastMousePos = null

		/* 		if (activeObject == 'choice' && firstMousePos != undefined) {
					canvas.style.cursor = 'default'
					lastMousePos = getMousePos(evt)
					if (lastMousePos.x - firstMousePos.x >= 1 * unitY) minX--
					if (lastMousePos.x - firstMousePos.x <= -1 * unitY) minX++
					if (lastMousePos.y - firstMousePos.y >= 1 * unitX) minY++
					if (lastMousePos.y - firstMousePos.y <= -1 * unitX) minY--
					drawAll()
				} */
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
			if (circleDrawing == true) {
				circleDrawing = false
				circleA = circleB = null
				arrObjects.pop()
			}

			if (angleDrawing == true) {
				angleDrawing = false
				if (angleA && angleB) {
					arrObjects.pop()
					arrObjects.pop()
				}
				angleA = angleB = angleC = null
			} else {
				if (angleA) {
					arrObjects.pop()
				}
				angleA = null
			}
			activeElementID = null

			activeObject = 'choice'
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