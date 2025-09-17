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
let delPointCount = 0
let scaleX = 100
let scaleY = 100


let minX = -8
let minY = -3
/* if (innerWidth < innerHeight) {
	minX = -2
	toggleCalcIcon(document.getElementById('btnimgCalc'))
	document.getElementById('leftWrapper').classList.toggle('hide')
} */

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

class mPoint {
	constructor(x, y, come = null) {
		if (come == null) come = '(' + x + ',' + y + ')'
		this.name = createName('point')
		this.id = arrObjects.length
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
	constructor(A, B, come = null) {
		if (come == null) come = 'DoğruParçası(' + A.inputView + ',' + B.inputView + ')'
		this.name = createName('linesegment')
		this.id = arrObjects.length
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
	constructor(a, b, A, B, come = null, startX = null, endX = null) {
		if (come == null) come = 'y=' + a + 'x+' + b
		if (classify(come).subtype == 'vertical') {
			const denkCount = arrObjects.filter(f => f.name.includes("denk")).length + 1
			this.name = 'denk' + denkCount
		} else {
			this.name = createName('line')
		}
		this.id = arrObjects.length
		this.a = a
		this.b = b
		this.A = A
		this.B = B
		if (Math.sign(b) == -1) {
			this.graph = a + '*x-' + Math.abs(b)
		} else {
			this.graph = a + '*x+' + b
		}
		this.graphParse = null
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
		this.id = arrObjects.length
		this.graph = newCome
		this.graphParse = null
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
		this.id = arrObjects.length
		this.graph = seq
		this.graphParse = null
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
		this.id = arrObjects.length
		this.graph = lim
		this.graphParse = null
		this.approachVal = a
		this.color = getRandomColor()
		this.lineDash = []
		this.visibility = true
		this.size = 2
		this.type = 'limit'
		this.inputView = come
	}
}
class mSectionalFunctions {
	constructor(come) {
		this.name = createName('other')
		this.id = arrObjects.length
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

createName = function (type) {
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

drawCoordinates = function () {
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

	objectsContainer.innerHTML = null
	let input = document.createElement('input')
	input.id = -1
	input.placeholder = 'Giriş'
	input.title = 'Giriş'
	input.addEventListener('click', (e) => inputClick(e, input.id))
	input.addEventListener('keydown', (e) => inputKeyDown(e, input.id))
	objectsContainer.appendChild(input)

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
		} else if (item.type === 'other') {
			drawFunction(item)
		} else if (item.type === 'linesegment') {
			drawLineSegment(item)
		} else if (item.type === 'sectionalfunctions') {
			drawSectionalFunctions(item)
		} else { console.log('Type bulunamadı.') }
	})
	if (activeElementID != null) {
		document.getElementById(activeElementID).style.background = 'lightgreen'
		setActiveInput(activeElementID)
	} else {
		setActiveInput(-1)
	}
}

fillSetWindow = function () {
	if (activeElementID != null) {
		document.getElementById('name').value = arrObjects[activeElementID].name
		if (arrObjects[activeElementID].type == 'sequence') document.getElementById('name').value = arrObjects[activeElementID].name + 'ₓ'
		document.getElementById('name').disabled = false
		document.getElementById('defination').value = arrObjects[activeElementID].inputView
		document.getElementById('defination').disabled = false
		document.getElementById('color').value = arrObjects[activeElementID].color
		document.getElementById('color').disabled = false
		document.getElementById('size').value = arrObjects[activeElementID].size
		document.getElementById('size').disabled = false
		document.getElementById('sizeLabel').innerHTML = 'Boyut: ' + arrObjects[activeElementID].size
		document.getElementById('sizeLabel').disabled = false
	} else {
		document.getElementById('name').value = null
		document.getElementById('name').disabled = true
		document.getElementById('defination').value = null
		document.getElementById('defination').disabled = true
		document.getElementById('color').value = "#000000"
		document.getElementById('color').disabled = true
		document.getElementById('size').value = null
		document.getElementById('size').disabled = true
		document.getElementById('sizeLabel').innerHTML = 'Boyut:'
		document.getElementById('sizeLabel').disabled = true
		document.getElementById('set-popup').style.display = 'none'
	}
}

function drawPoint(point) {
	if (point.inputView) labelCreator(point)
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
	if (line.id != null) labelCreator(line)
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
		if (classify(line.inputView).subtype == 'vertical') { // Drawing Vertical Lines
			//console.log('vertical denklem girildi')
			verticalNumber = classify(line.inputView).x
			ctx.beginPath()
			ctx.strokeStyle = ctx.fillStyle = line.color
			ctx.lineWidth = lineSize
			ctx.moveTo((-minX + verticalNumber / unitY) * scaleY, canvas.height + 100)
			ctx.lineTo((-minX + verticalNumber / unitY) * scaleY, -canvas.height - 100)
			text((-minX + verticalNumber / unitY) * scaleY + 10, 15, line.color, 'center', 'bold 15px arial', line.name)
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
			y = line.graphParse(x)
			ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			x = endX
			y = line.graphParse(x)
			ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			if (line.a != 0) {
				text((-minX + (-minY - line.b) / line.a) * scaleY + 5, 20, line.color, 'center', 'bold 15px arial', line.name)
			} else {
				text(canvas.width - 10, -minY * scaleX - (y * scaleX) / unitX - 10, line.color, 'center', 'bold 15px arial', line.name)
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
			text((-minX + verticalNumber / unitY) * scaleY + 10, 15, line.color, 'center', 'bold 15px arial', line.name)
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
		} else {
			//console.log('noktalar girildi A.x!=B.x')
			line.a = createLineEquation(line.A, line.B).m
			line.b = createLineEquation(line.A, line.B).c
			line.graph = normalizeExpr(createLineEquation(line.A, line.B).m + 'x+' + createLineEquation(line.A, line.B).c)
			line.graphParse = getDrawableFunction(line.graph).parsedFunc

			let x, y
			ctx.beginPath()
			ctx.strokeStyle = ctx.fillStyle = line.color
			ctx.lineWidth = lineSize
			x = startX
			y = line.graphParse(x)
			ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			x = endX
			y = line.graphParse(x)
			ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
			if (line.a != 0) {
				text((-minX + (-minY - line.b) / line.a) * scaleY + 5, 20, line.color, 'center', 'bold 15px arial', line.name)
			} else {
				text(canvas.width - 10, -minY * scaleX - (y * scaleX) / unitX - 10, line.color, 'center', 'bold 15px arial', line.name)
			}
			ctx.fill()
			ctx.stroke()
			ctx.closePath()
		}
	}
}

function drawFunction(func) {
	if (func.id != null) labelCreator(func)
	if (!func.visibility) return
	let f = func.graphParse

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
		let y = f(x)
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
	labelCreator(seq)
	if (!seq.visibility) return
	let f = seq.graphParse

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
		let y = f(x)
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
		y = f(x)
		ctx.arc((-minX + x / unitY) * scaleY, (-minY - y / unitX) * scaleX, seq.size, 0, 2 * Math.PI)
		text((-minX + x / unitY) * scaleY - 10, (-minY - y / unitX) * scaleX - 5, seq.color, 'center', 'bold 15px arial', seq.name + x)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
	}
}

function drawLimit(lim) {
	labelCreator(lim)
	if (!lim.visibility) return
	let f = lim.graphParse
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
		let y = f(x)
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
	let B = new mPoint(Number(lim.approachVal), lim.graphParse(A.x))
	let C = new mPoint(0, lim.graphParse(A.x))
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
}

function drawLineSegment(ls) {
	if (ls.inputView) labelCreator(ls)
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
	if (sf.inputView) labelCreator(sf)
	if (!sf.visibility) return

	let sfSize
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

function labelCreator(item) {
	if (item.id == null) return
	let label = document.createElement('label')
	let input = document.createElement('input')
	let buttonDelete = document.createElement('button')
	let buttonSetting = document.createElement('button')
	let buttonVisibility = document.createElement('button')
	input.id = arrObjects.length - objectsContainer.childNodes.length
	label.htmlFor = input.id

	input.title = 'Değiştir'
	buttonDelete.title = 'Sil'
	buttonSetting.title = 'Düzenle'
	item.visibility ? buttonVisibility.title = 'Gizle' : buttonVisibility.title = 'Göster'

	if (item.type == 'point') {
		input.value = item.name + item.inputView
	} else if (item.type == 'line') {
		if (item.A == null) {
			input.value = item.name + ':' + item.inputView
		} else {
			input.value = item.name + '(x)=Doğru(' + item.A.inputView + ',' + item.B.inputView + ')=' + item.graph
			if (item.graph == null) input.value = item.name + '=Doğru(' + item.A.inputView + ',' + item.B.inputView + ')=x=' + item.A.x
		}
	} else if (item.type == 'linesegment') {
		input.value = item.name + '=' + item.inputView
	} else if (item.type == 'sequence') {
		input.value = item.name + 'ₓ=' + item.inputView
	} else if (item.type == 'limit') {
		input.value = item.name + '=' + item.inputView
	} else if (item.type == 'sectionalfunctions') {
		input.value = item.name + '(x)={' + item.inputView + '}'
	} else if (item.type == 'other') {
		input.value = item.name + ':' + item.inputView
	}

	buttonDelete.classList = 'buttonDel'
	buttonSetting.classList = 'buttonSet'
	buttonVisibility.classList = 'buttonVisibility'
	buttonVisibility.style.borderColor = item.color
	item.visibility ? buttonVisibility.style.background = item.color : buttonVisibility.style.background = 'transparent'


	/* 	input.setAttribute("onclick", "inputClick(event,id)")
		input.setAttribute("onkeydown", "inputKeyDown(event,id)")
		buttonDelete.setAttribute("onclick", "delClick(event)")
		buttonSetting.setAttribute("onclick", "setClick(event)")
		buttonVisibility.setAttribute("onclick", "visibilityClick(event)") */

	input.addEventListener('click', (e) => inputClick(e, input.id));
	input.addEventListener('keydown', (e) => inputKeyDown(e, input.id));
	buttonDelete.addEventListener('click', (e) => delClick(e));
	buttonSetting.addEventListener('click', (e) => setClick(e));
	buttonVisibility.addEventListener('click', (e) => visibilityClick(e));


	label.appendChild(input)
	label.appendChild(buttonVisibility)
	label.appendChild(buttonSetting)
	label.appendChild(buttonDelete)
	objectsContainer.appendChild(label)
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

function inputClick(evt, id) {
	clearSliders()
	if (id != -1) {
		if (activeElementID != null) {
			document.getElementById(activeElementID).style.background = 'white'
		}
		activeElementID = id
		setActiveInput(activeElementID)
		document.getElementById(activeElementID).style.background = 'lightgreen'
		document.getElementById('-1').value = null
		let item = arrObjects[id]
		setSlider(item)
		fillSetWindow()
	} else {
		setActiveInput(-1)
	}
}

/* CLASSIFY METHOD PROCESS */
function classify(inputRaw) {
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
	const arrayMatch = norm.match(diziRe)
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
	const compMatch = norm.match(funcCompRe)
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
	const limitMatch = norm.match(limitRe)
	if (limitMatch) {
		const func = limitMatch[1] // f
		const approachVal = limitMatch[2] // 2
		return {
			type: "limit",
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

	// ---- SectionalFunctions ----
	if (/,/.test(norm)) { // en az bir ',' varsa işle
		const segments = norm.split(";").map(s => s.trim()).filter(s => s.length > 0);
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
	return { type: 'unknown' }
}
/* CLASSIFY METHOD END */

function capitalizeName(str) {
	const specialMap = {
		"dizi": "Dizi",
		"bileşke": "Bileşke",
		"limit": "Limit",
		"doğruparçası": "DoğruParçası"
	}

	for (const word in specialMap) {
		const re = new RegExp(word, "gi")
		if (re.test(str)) {
			return str.replace(re, specialMap[word])
		}
	}
	return str
}

function bileskeProcess(funcs) {
	return funcs.reduceRight((acc, f) => {
		return f.replace(/x/g, `(${acc})`)
	}, "x")
}

function inputKeyDown(evt, id) {
	clearSliders()
	handleParanthesis(evt)
	let allowKeys = '(){}[],=-+.;<>*^/bçdğjımnşquvxyzCÇEFGĞHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(evt.key) && !allowKeys.includes(evt.key)) {
		evt.preventDefault()
	}
	if (evt.key === 'Enter') {
		let come = document.getElementById(id).value
		if (come == '') return
		come = come.replaceAll('y=', '')
		come = come.replaceAll('=y', '')
		if (id == -1) { //Giriş input
			//console.log('Giriş')
			if (classify(come).type == 'point') {
				console.log('inputKeyDown point çalıştı', come)

				let point = new mPoint(classify(come).x, classify(come).y, come)
				arrObjects.push(point)
				activeElementID = point.id
				undoObjects = []
				delCount = 0
				objectsContainer.innerHTML = null
				setSlider(point)
				//drawCoordinates()
			} else if (classify(come).type == 'line') {
				console.log('inputKeyDown line çalıştı', come)

				comeLine = normalizeExpr(come)
				let line
				if (classify(come).subtype == 'vertical') {
					line = new mLine(classify(comeLine).m, classify(comeLine).n, null, null, 'x=' + classify(comeLine).x)
					line.graph = null
					line.a = null
					line.b = null
				} else {
					line = new mLine(classify(comeLine).m, classify(comeLine).n, null, null, 'y=' + come)
				}
				if (getDrawableFunction(line.graph).status = true) {
					line.graphParse = getDrawableFunction(line.graph).parsedFunc
					arrObjects.push(line)
					activeElementID = line.id
					undoObjects = []
					delCount = 0
					objectsContainer.innerHTML = null
					setSlider(line)
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(line.graph).reason)
				}
			} else if (classify(come).type == 'sequence') {
				console.log('inputKeyDown sequence çalıştı', come, classify(come))

				if (come.split(",").length - 1 !== 2) {
					showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
					return
				}

				come = capitalizeName(come)
				newCome = normalizeExpr(come)
				let funcFound = true
				let names = arrObjects.map((item) => item.name)

				if (!classify(newCome).func.includes('x') && !Number.isFinite(Number(classify(newCome).func))) {
					if (!names.includes(classify(newCome).func)) funcFound = false
				}
				if (funcFound) {
					if (!classify(newCome).func.includes('x') && !Number.isFinite(Number(classify(newCome).func))) {
						newCome = newCome.replaceAll(classify(newCome).func, arrObjects.find(o => o.name === classify(newCome).func).graph)
					}
					let comeFunc = classify(newCome).func
					if (getDrawableFunction(comeFunc).status) {
						let seq = new mSequence(comeFunc, classify(come).start, classify(come).end, come)
						seq.graphParse = getDrawableFunction(comeFunc).parsedFunc
						arrObjects.push(seq)
						activeElementID = seq.id
						undoObjects = []
						delCount = 0
						objectsContainer.innerHTML = null
						setSlider(seq)
					} else {
						showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(newCome).reason)
					}
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
				}
			} else if (classify(come).type == 'functionOperations') {
				console.log('inputKeyDown functionOperations çalıştı', come)

				newCome = normalizeExpr(come)
				const hepsiVarMi = classify(newCome).functions.every(name => arrObjects.some(f => f.name === name));
				if (hepsiVarMi) {
					let comeWithFuncs = newCome
					classify(newCome).functions.forEach(f => {
						comeWithFuncs = comeWithFuncs.replaceAll(f, '(' + arrObjects.find(o => o.name === f).graph + ')')
					});

					if (getDrawableFunction(comeWithFuncs).status) {
						let func = new mFunction(comeWithFuncs, come + '=y=' + comeWithFuncs)
						func.graphParse = getDrawableFunction(comeWithFuncs).parsedFunc
						arrObjects.push(func)
						activeElementID = func.id
						undoObjects = []
						delCount = 0
						objectsContainer.innerHTML = null
						drawCoordinates()
					} else {
						showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(comeWithFuncs).reason)
					}

				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
				}
			} else if (classify(come).type == 'functionCompositions') {
				console.log('inputKeyDown functionCompositions çalıştı', come)

				if (come.split(",").length - 1 < 1) {
					showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
					return
				}

				come = capitalizeName(come)
				newCome = normalizeExpr(come)
				let funcsFound = true
				let names = arrObjects.map((item) => item.name)
				classify(newCome).functions.forEach(f => {
					if (!f.includes('x') && !Number.isFinite(Number(f))) {
						if (!names.includes(f)) funcsFound = false
					}
				});
				if (funcsFound) {
					classify(newCome).functions.forEach(f => {
						if (!f.includes('x') && !Number.isFinite(Number(f))) {
							newCome = newCome.replaceAll(f, arrObjects.find(o => o.name === f).graph)
						}
					})
					let cometoBileske = bileskeProcess(classify(newCome).functions)
					if (getDrawableFunction(cometoBileske).status) {
						let func = new mFunction(cometoBileske, come + '=' + cometoBileske)
						func.graphParse = getDrawableFunction(cometoBileske).parsedFunc
						arrObjects.push(func)
						activeElementID = func.id
						undoObjects = []
						delCount = 0
						objectsContainer.innerHTML = null
						drawCoordinates()
					} else {
						showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(cometoBileske).reason)
					}
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
				}
			} else if (classify(come).type == 'limit') {
				console.log('Limit çalıştı', come)

				if (come.split(",").length - 1 !== 1) {
					showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
					return
				}

				come = capitalizeName(come)
				newCome = normalizeExpr(come)
				let funcFound = true
				let names = arrObjects.map((item) => item.name)

				if (!classify(newCome).func.includes('x') && !Number.isFinite(Number(classify(newCome).func))) {
					if (!names.includes(classify(newCome).func)) funcFound = false
				}
				if (funcFound) {
					if (!classify(newCome).func.includes('x') && !Number.isFinite(Number(classify(newCome).func))) {
						newCome = newCome.replaceAll(classify(newCome).func, arrObjects.find(o => o.name === classify(newCome).func).graph)
					}
					let comeFunc = classify(newCome).func
					if (getDrawableFunction(comeFunc).status) {
						let lim = new mLimit(comeFunc, classify(come).approachVal, come)
						lim.graphParse = getDrawableFunction(comeFunc).parsedFunc
						arrObjects.push(lim)
						activeElementID = lim.id
						undoObjects = []
						delCount = 0
						objectsContainer.innerHTML = null
						setSlider(lim)
					} else {
						showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(newCome).reason)
					}
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
				}
			} else if (classify(come).type == 'linesegment') {
				console.log('inputKeyDown linesegment çalıştı', come)

				if (come.split(",").length - 1 !== 3) {
					showToast('GİRİŞ', 'Hatalı parametre girişi yaptınız.')
					return
				}

				let A = new mPoint(classify(come).points[0].x, classify(come).points[0].y)
				arrObjects.push(A)
				let B = new mPoint(classify(come).points[1].x, classify(come).points[1].y)
				arrObjects.push(B)
				let ls = new mLineSegment(A, B, capitalizeName(come))
				arrObjects.push(ls)
				activeElementID = ls.id
				undoObjects = []
				delCount = 0
				objectsContainer.innerHTML = null
				drawCoordinates()


			} else if (classify(come).type == 'linewithpoints') {
				console.log('inputKeyDown linewithpoints çalıştı', come)

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
					line.graphParse = getDrawableFunction(line.graph).parsedFunc
				}
				arrObjects.push(line)
				activeElementID = line.id
				objectsContainer.innerHTML = null
				drawCoordinates()
			} else if (classify(come).type == 'sectionalfunctions') {
				console.log('inputKeyDown sectionalfunctions çalıştı', come)

				let allFuncsDrawable = true
				classify(come).functions.forEach(func => {
					if (!getDrawableFunction(normalizeExpr(func)).status) {
						allFuncsDrawable = false
					}
				})
				if (allFuncsDrawable) {
					let secFuncs = []
					classify(come).functions.forEach((func, i) => {
						if (classify(func).type == 'line') {
							let line = new mLine(classify(normalizeExpr(func)).m, classify(normalizeExpr(func)).n, null, null, null, classify(come).ranges[i].from, classify(come).ranges[i].to)
							line.graphParse = getDrawableFunction(line.graph).parsedFunc
							line.id = null
							secFuncs.push(line)
						} else if (classify(func).type == 'unknown') {
							let other = new mFunction(func, func, classify(come).ranges[i].from, classify(come).ranges[i].to)
							other.graph = normalizeExpr(func)
							other.graphParse = getDrawableFunction(other.graph).parsedFunc
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
					objectsContainer.innerHTML = null
					drawCoordinates()

				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.')
				}
			} else if (classify(come).type == 'unknown') {
				console.log('inputKeyDown unknown çalıştı', come)

				let comeFunc = normalizeExpr(come)
				if (getDrawableFunction(comeFunc).status) {
					let func = new mFunction(comeFunc, 'y=' + come)
					func.graphParse = getDrawableFunction(comeFunc).parsedFunc
					arrObjects.push(func)
					activeElementID = func.id
					undoObjects = []
					delCount = 0
					objectsContainer.innerHTML = null
					drawCoordinates()
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.')
				}
			} else {
				console.log('Type bulunamadı.')
			}
		} else if (id == 'name') {
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
				arrObjects[activeElementID].graphParse = getDrawableFunction(normalizeExpr(newDef)).parsedFunc
				arrObjects[activeElementID].inputView = 'y=' + newDef
			} else if (classify(newDef).type == 'sequence' && getDrawableFunction(normalizeExpr(classify(newDef).func))) {
				//console.log('dizi değişecek', classify(newDef))
				arrObjects[activeElementID].start = classify(newDef).start
				arrObjects[activeElementID].end = classify(newDef).end
				arrObjects[activeElementID].graph = normalizeExpr(classify(newDef).func)
				arrObjects[activeElementID].graphParse = getDrawableFunction(normalizeExpr(classify(newDef).func)).parsedFunc
				arrObjects[activeElementID].inputView = capitalizeName(newDef)
			} else if (classify(newDef).type == 'limit' && getDrawableFunction(normalizeExpr(classify(newDef).func))) {
				//console.log('Limit değişecek', classify(newDef))
				arrObjects[activeElementID].approachVal = classify(newDef).approachVal
				arrObjects[activeElementID].graph = normalizeExpr(classify(newDef).func)
				arrObjects[activeElementID].graphParse = getDrawableFunction(normalizeExpr(classify(newDef).func)).parsedFunc
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
		} else {
			console.log('cebir arr list')
		}
		fillSetWindow()
	}
}

function normalizeExpr(expr) {
	expr = expr.replaceAll('y=', '')
	expr = expr.replaceAll('+-', '-')
	expr = expr.replace(/\s+/g, "")
	expr = expr.replace(/(^|[^\w])\-x/g, "$1-1*x") // -x → -1*x, +x → +1*x
	expr = expr.replace(/(^|[^\w])\+x/g, "$1+1*x")
	expr = expr.replace(/-\(/g, "-1*(") // 2) -(...) → -1*(...)
	expr = expr.replace(/(\d)\(/g, "$1*(") // sayı + ( → sayı*( 
	expr = expr.replace(/\)(\d)/g, ")*$1") // )sayı → )*sayı
	expr = expr.replace(/(\d)([a-zA-Z])/g, "$1*$2") // sayıharf (ör: 2x → 2*x)
	expr = expr.replace(/\^/g, "**") // üs işareti ^ → **
	return expr;
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

function getDrawableFunction(expr) {
	const validPattern = /^[0-9x+\-*/().,^ \t\nA-Za-z,]*$/ // izin verilen karakterler
	if (!validPattern.test(expr)) {
		return { status: false, reason: "Geçersiz karakter" }
	}
	try {
		// parse işlemi
		const parsedFunc = new Function("x", `
  with (Math) {
    const ln = Math.log;             // ln(x)
    const log10 = (y) => Math.log10(y);
    const exp = Math.exp;            // e^x
    const E = Math.E;                // sabit e
    const log = (val, base) => Math.log(val)/Math.log(base); // özel tabanlı log
    return ${expr};
      }
    `)
		const testValues = [-10, -5, -2, -1, 0.1, 1, 2, 5, 10, 20, 50]
		let validCount = 0

		for (let v of testValues) {
			let y = parsedFunc(v)
			if (typeof y === "number" && isFinite(y)) validCount++
		}

		if (validCount >= 5) {
			return { status: true, parsedFunc }
		} else {
			return { status: false, reason: "Çoğu noktada tanımsız" }
		}

	} catch (e) {
		return { status: false, reason: "Yazım yanlışı var." }
	}
}

let delCount = 0
function delClick(evt) {
	delCount++
	let idDel = evt.target.parentNode.childNodes[0].id
	if (arrObjects[idDel].type == 'point') delPointCount++
	undoObjects.push(arrObjects.splice(idDel, 1))
	activeElementID = null
	drawCoordinates()

	activeObject = 'choice'
	canvas.style.cursor = 'pointer'
	document.getElementById('btnChoice').classList.remove('active')
	document.getElementById('btnPoint').classList.remove('active')
	document.getElementById('btnLine').classList.remove('active')
	document.getElementById('btnLineSegment').classList.remove('active')
	document.getElementById('btnCalc').classList.remove('active')
	document.getElementById('btnChoice').classList.add('active')
	clearSliders()
	fillSetWindow()
}

function clearSliders() {
	document.getElementById('m').innerHTML = 'a'
	document.getElementById('n').innerHTML = 'b'
	let sliderM = document.getElementById('sliderM')
	let sliderN = document.getElementById('sliderN')
	sliderM.disabled = true
	sliderN.disabled = true
	sliderM.value = (sliderM.min + sliderM.max) / 2
	sliderN.value = (sliderN.min + sliderN.max) / 2
}

function setClick(evt) {
	let setForm = document.getElementById("set-popup")
	if (setForm.style.display != 'block') { setForm.style.display = 'block' }

	let idSet = evt.target.parentNode.childNodes[0].id
	if (activeElementID != null) {
		document.getElementById(activeElementID).style.background = 'white'
	}
	activeElementID = idSet
	document.getElementById(activeElementID).style.background = 'lightgreen'
	fillSetWindow()
}
function visibilityClick(evt) {
	let idVis = evt.target.parentNode.childNodes[0].id
	if (arrObjects[idVis].visibility == true) {
		arrObjects[idVis].visibility = false
	} else {
		arrObjects[idVis].visibility = true
	}
	drawCoordinates()
}
function closeSetClick(evt) {
	document.getElementById('set-popup').style.display = 'none'
}
function rangeChanged() {
	arrObjects[activeElementID].size = document.getElementById('size').value
	document.getElementById('sizeLabel').innerHTML = 'Boyut: ' + arrObjects[activeElementID].size
	drawCoordinates()
}
function colorClick() {
	arrObjects[activeElementID].color = document.getElementById('color').value
	drawCoordinates()
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

function crossSlider(name) {
	let slider = document.getElementById('slider' + name.toUpperCase())
	let sliderLabel = document.getElementById(name)
	if (activeElementID != null) {
		//drawCoordinates()
		if (arrObjects[activeElementID].type == 'point') {
			if (name == 'm') {
				sliderLabel.innerHTML = 'a = ' + slider.value
				arrObjects[activeElementID].x = slider.value
			} else {
				sliderLabel.innerHTML = 'b = ' + slider.value
				arrObjects[activeElementID].y = slider.value
			}
			arrObjects[activeElementID].inputView = '(' + arrObjects[activeElementID].x + ',' + arrObjects[activeElementID].y + ')'
			drawCoordinates()
		} else if (arrObjects[activeElementID].type == 'line' && classify(arrObjects[activeElementID].inputView).subtype != 'vertical') {
			if (name == 'm') {
				sliderLabel.innerHTML = 'm = ' + slider.value
				arrObjects[activeElementID].a = slider.value
				arrObjects[activeElementID].b = document.getElementById('sliderN').value
				arrObjects[activeElementID].graph = slider.value + '*x+' + document.getElementById('sliderN').value
			} else {
				sliderLabel.innerHTML = 'n = ' + slider.value
				arrObjects[activeElementID].a = document.getElementById('sliderM').value
				arrObjects[activeElementID].b = slider.value
				arrObjects[activeElementID].graph = document.getElementById('sliderM').value + '*x+' + slider.value
			}
			arrObjects[activeElementID].inputView = 'y=' + normalizeExpr(arrObjects[activeElementID].a + 'x+' + arrObjects[activeElementID].b)
			arrObjects[activeElementID].graphParse = getDrawableFunction(normalizeExpr(arrObjects[activeElementID].inputView)).parsedFunc
			drawCoordinates()
		} else if (arrObjects[activeElementID].type == 'line' && classify(arrObjects[activeElementID].inputView).subtype == 'vertical') {
			if (name == 'm') {
				sliderLabel.innerHTML = 'x= ' + Number(slider.value)
				arrObjects[activeElementID].inputView = 'x= ' + Number(slider.value)
				drawCoordinates()
			}
		} else if (arrObjects[activeElementID].type == 'limit') {
			drawCoordinates()
			let sliderM = document.getElementById('sliderM')
			let sliderN = document.getElementById('sliderN')
			if (name == 'm') {
				sliderLabel.innerHTML = arrObjects[activeElementID].approachVal + '⁺ = ' + Number(slider.value).toFixed(2)
			} else {
				sliderLabel.innerHTML = arrObjects[activeElementID].approachVal + '⁻ = ' + Number(slider.value).toFixed(2)
			}

			// Limit noktasının sağında
			let A = new mPoint(Number(sliderM.value), 0)
			let B = new mPoint(Number(sliderM.value), arrObjects[activeElementID].graphParse(A.x))
			let C = new mPoint(0, arrObjects[activeElementID].graphParse(A.x))
			A.inputView = B.inputView = C.inputView = null
			let vls = new mLineSegment(A, B)
			let hls = new mLineSegment(B, C)
			A.color = B.color = C.color = vls.color = hls.color = arrObjects[activeElementID].color
			vls.lineDash = hls.lineDash = [2, 5]
			vls.inputView = hls.inputView = null
			drawLineSegment(vls)
			drawLineSegment(hls)
			drawPoint(A)
			drawPoint(B)
			drawPoint(C)

			//limit noktasının solunda
			A = new mPoint(Number(sliderN.value), 0)
			B = new mPoint(Number(sliderN.value), arrObjects[activeElementID].graphParse(A.x))
			C = new mPoint(0, arrObjects[activeElementID].graphParse(A.x))
			A.inputView = B.inputView = C.inputView = null
			vls = new mLineSegment(A, B)
			hls = new mLineSegment(B, C)
			A.color = B.color = C.color = vls.color = hls.color = arrObjects[activeElementID].color
			vls.lineDash = hls.lineDash = [2, 5]
			vls.inputView = hls.inputView = null
			drawLineSegment(vls)
			drawLineSegment(hls)
			drawPoint(A)
			drawPoint(B)
			drawPoint(C)
		} else {
			console.log('Tür bulunamadı.')
		}
	}
}

setSlider = function (item) {
	drawCoordinates()
	let sliderM = document.getElementById('sliderM')
	let labelM = document.getElementById('m')
	let sliderN = document.getElementById('sliderN')
	let labelN = document.getElementById('n')

	if (classify(item.inputView).subtype == 'vertical') {
		sliderN.style.display = 'none'
		labelN.style.display = 'none'
	} else {
		sliderN.style.display = 'flex'
		labelN.style.display = 'flex'
	}

	sliderM.min = minX * unitY - 1
	sliderM.max = (minX + Math.round(canvas.width / scaleY) + 1) * unitY

	sliderN.max = minY * -unitX + 1
	sliderN.min = (minY + Math.round(canvas.height / scaleX) + 1) * -unitX

	sliderM.disabled = false
	sliderN.disabled = false

	if (item.type == 'point') {
		sliderM.value = item.x
		labelM.innerHTML = 'a = ' + item.x
		sliderN.value = item.y
		labelN.innerHTML = 'b = ' + item.y
	} else if (item.type == 'line') {
		if (item.A != null) {
			clearSliders()
			return
		}
		sliderM.value = item.a
		labelM.innerHTML = 'm = ' + item.a
		sliderN.value = item.b
		labelN.innerHTML = 'n = ' + item.b
		if (classify(item.inputView).subtype == 'vertical') {
			labelM.innerHTML = 'x=' + classify(item.inputView).x
			sliderM.value = Number(classify(item.inputView).x)
		}
	} else if (item.type == 'limit') {
		let verticalMNumberRight = Number(item.approachVal * 1 + 0.4).toFixed(2)
		let verticalMNumberLeft = Number(item.approachVal * 1 - 0.4).toFixed(2)
		let mostLeft = minX * unitY
		let mostRight = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
		sliderM.min = item.approachVal * 1
		sliderM.max = mostRight
		sliderM.step = '0.1'
		sliderM.value = verticalMNumberRight
		labelM.innerHTML = sliderM.min + '⁺ = ' + verticalMNumberRight

		// Limit noktasının sağında
		let A = new mPoint(Number(item.approachVal) + 0.4, 0)
		let B = new mPoint(Number(item.approachVal) + 0.4, item.graphParse(A.x))
		let C = new mPoint(0, item.graphParse(A.x))
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

		sliderN.min = mostLeft
		sliderN.max = item.approachVal * 1
		sliderN.step = '0.1'
		sliderN.value = verticalMNumberLeft
		labelN.innerHTML = sliderN.max + '⁻ = ' + verticalMNumberLeft

		//limit noktasının solunda
		A = new mPoint(Number(item.approachVal) - 0.4, 0)
		B = new mPoint(Number(item.approachVal) - 0.4, item.graphParse(A.x))
		C = new mPoint(0, item.graphParse(A.x))
		A.inputView = B.inputView = C.inputView = null
		vls = new mLineSegment(A, B)
		hls = new mLineSegment(B, C)
		A.color = B.color = C.color = vls.color = hls.color = item.color
		vls.lineDash = hls.lineDash = [2, 5]
		vls.inputView = hls.inputView = null
		drawLineSegment(vls)
		drawLineSegment(hls)
		drawPoint(A)
		drawPoint(B)
		drawPoint(C)
	}
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
	drawCoordinates()
}
function buttonMove(evt) {
	document.getElementById('coor').innerHTML = evt.name
}

/* function checkDirection() {
	if (innerHeight < innerWidth) {
		changeCSS("styleVertical.css")
		document.getElementById('btnimgCalc').src = "img/left.svg"
		minX = -8
		minY = -3
	} else {
		changeCSS("styleHorizontal.css")
		document.getElementById('btnimgCalc').src = "img/down.svg"
		minX = -3
		minY = -3
	}
} */
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
	drawCoordinates()
	fillSetWindow()
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
function createLineSegment(lineSegmentA, lineSegmentB) {
	arrObjects.pop()
	arrObjects.pop()
	let A = new mPoint(lineSegmentA.x, lineSegmentA.y)
	arrObjects.push(A)
	let B = new mPoint(lineSegmentB.x, lineSegmentB.y)
	arrObjects.push(B)
	let ls = new mLineSegment(A, B)
	arrObjects.push(ls)
	activeElementID = ls.id
	undoObjects = []
	delCount = 0
	objectsContainer.innerHTML = null
	drawCoordinates()
}






// Odaklanmasını istediğin input'u kontrol et
function setActiveInput(id) {
	activeElementID = id;
	let el = document.getElementById(id);
	if (el) {
		el.focus(); // sadece seçtiğin input odaklanır
	}
}

function isMobile() {
	return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}




$(document).ready(function () {
	let objectsContainer = document.getElementById('objectsContainer')
	//checkDirection()
	drawCoordinates()

	// document.addEventListener('contextmenu', event => event.preventDefault())

	window.onresize = function () {
		canvas.width = innerWidth
		canvas.height = innerHeight
		//checkDirection()
		drawCoordinates()
	}

	document.getElementById('undo').addEventListener('click', function (evt) {
		activeElementID = null
		if (arrObjects.length != 0) {
			if (delCount == 0) {
				undoObjects.push(arrObjects.pop())
			} else {
				arrObjects.push(undoObjects.pop()[0])
				delCount--
			}
			drawCoordinates()
		}
		if (arrObjects.length == 0) {
			activeElementID = null
			activeObject = 'choice'
			canvas.style.cursor = 'pointer'
			document.getElementById('m').innerHTML = 'a'
			document.getElementById('n').innerHTML = 'b'
			document.getElementById('sliderM').disabled = true
			document.getElementById('sliderN').disabled = true
		}
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
			fillSetWindow()
			clearSliders()
			drawCoordinates()
		}
	}, false)

	document.getElementById('redo').addEventListener('click', function (evt) {
		if (undoObjects.length != 0 && delCount == 0) {
			arrObjects.push(undoObjects.pop())
			drawCoordinates()
		}
	}, false)

	document.getElementById('left').addEventListener('click', function (evt) {
		minX--
		drawCoordinates()
	}, false)

	document.getElementById('right').addEventListener('click', function (evt) {
		minX++
		drawCoordinates()
	}, false)

	document.getElementById('up').addEventListener('click', function (evt) {
		minY--
		drawCoordinates()
	}, false)

	document.getElementById('down').addEventListener('click', function (evt) {
		minY++
		drawCoordinates()
	}, false)

	document.getElementById('minusX').addEventListener('click', function (evt) {
		if (tickY < units.length - 1) {
			scaleY *= .95
			tickY++
			unitY = units[tickY]
			drawCoordinates()
		}
	}, false)

	document.getElementById('plusX').addEventListener('click', function (evt) {
		if (0 < tickY) {
			scaleY *= 1.05
			tickY--
			unitY = units[tickY]
			drawCoordinates()
		}
	}, false)

	document.getElementById('minusY').addEventListener('click', function (evt) {
		if (tickX < units.length - 1) {
			scaleX *= .95
			tickX++
			unitX = units[tickX]
			drawCoordinates()
		}
	}, false)

	document.getElementById('plusY').addEventListener('click', function (evt) {
		if (0 < tickX) {
			scaleX *= 1.05
			tickX--
			unitX = units[tickX]
			drawCoordinates()
		}
	}, false)

	canvas.addEventListener("wheel", (e) => {
		if (e.deltaY < 0) {
			if (0 < tickY) {
				scaleY *= 1.05
				tickY--
				unitY = units[tickY]
				drawCoordinates()
			}
			if (0 < tickX) {
				scaleX *= 1.05
				tickX--
				unitX = units[tickX]
				drawCoordinates()
			}
		}
		if (e.deltaY > 0) {
			if (tickY < units.length - 1) {
				scaleY *= .95
				tickY++
				unitY = units[tickY]
				drawCoordinates()
			}
			if (tickX < units.length - 1) {
				scaleX *= .95
				tickX++
				unitX = units[tickX]
				drawCoordinates()
			}
		}
	})

	canvas.addEventListener("click", function (evt) {
		if (activeObject === 'point') {
			let mousePos = getMousePos(evt)
			let point = new mPoint(mousePos.x, mousePos.y)
			setSlider(point)
			arrObjects.push(point)
			activeElementID = point.id
			undoObjects = []
			delCount = 0
			drawCoordinates()
			fillSetWindow()
		}
	}, false)

	canvas.addEventListener("mousemove", function (evt) {
		let line
		if (activeObject === 'line' && lineDrawing == true) {
			let lineB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
			if (createLineEquation(lineA, lineB).x) {
				line = new mLine(createLineEquation(lineA, lineB).m, createLineEquation(lineA, lineB).c, lineA, lineB, 'x=' + createLineEquation(lineA, lineB).x)
				line.graph = null
			} else {
				line = new mLine(createLineEquation(lineA, lineB).m, createLineEquation(lineA, lineB).c, lineA, lineB)
				line.graphParse = getDrawableFunction(line.graph).parsedFunc
			}
			drawCoordinates()

			line.B.id = null
			line.id = null
			drawPoint(line.B)
			drawLine(line)
		}
		let ls
		if (activeObject === 'linesegment' && lineSegmentDrawing == true) {
			let lineSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
			drawCoordinates()

			lineSegmentB.id = null
			drawPoint(lineSegmentB)

			ls = new mLineSegment(lineSegmentA, lineSegmentB)
			ls.id = null
			drawLineSegment(ls)
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
				activeElementID = lineA.id
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
					line.graphParse = getDrawableFunction(line.graph).parsedFunc
				}
				arrObjects.push(line)
				activeElementID = line.id
				canvas.style.cursor = 'default'
				objectsContainer.innerHTML = null

				lineDrawing = false
				lineA = lineB = null
			}
			fillSetWindow()
		}

		if (activeObject === 'linesegment' && evt.button == 0) {
			if (lineSegmentDrawing == false) {
				lineSegmentA = getMousePos(evt)
				let point = new mPoint(lineSegmentA.x, lineSegmentA.y)
				arrObjects.push(point)
				lineSegmentDrawing = true
			} else {
				lineSegmentB = getMousePos(evt)
				let point = new mPoint(lineSegmentB.x, lineSegmentB.y)
				arrObjects.push(point)
				lineSegmentDrawing = false
			}
			if (lineSegmentA != null && lineSegmentB != null) {
				createLineSegment(lineSegmentA, lineSegmentB)
				lineSegmentA = lineSegmentB = null
			}
			fillSetWindow()
		}
		drawCoordinates()
	}, false)

	canvas.addEventListener("mouseup", function (evt) {
		if (activeObject == 'choice' && firstMousePos != undefined) {
			lastMousePos = getMousePos(evt)
			if (lastMousePos.x - firstMousePos.x >= 1 * unitY) minX--
			if (lastMousePos.x - firstMousePos.x <= -1 * unitY) minX++
			if (lastMousePos.y - firstMousePos.y >= 1 * unitX) minY++
			if (lastMousePos.y - firstMousePos.y <= -1 * unitX) minY--
			canvas.style.cursor = 'pointer'
			drawCoordinates()
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
			drawCoordinates()
			fillSetWindow()

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

	/* 	document.addEventListener('focusin', (e) => {
			// Eğer odaklanan elemanın id'si bizim istediğimiz değilse -> blur yap
			if (e.target.id !== activeElementID) {
				e.preventDefault();
				e.target.blur();
			}
			console.log("Odaklandı:", e.target.id);
		}, true); */
	setActiveInput('-1')

	/* 	document.addEventListener("focusout", (e) => {
			console.log("Input odak kaybetti:", e.target.id);
		}); */

})