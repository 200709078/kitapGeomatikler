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
let delPointCount = 0
let scaleX = 100
let scaleY = 100
let minX = -8
let minY = -3
let units = [1 / 10, 1 / 5, 1 / 2, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
let tickX = 3
let unitX = units[tickX]
let tickY = 3
let unitY = units[tickY]
let firstMousePos, lastMousePos, findPointPos = null
let arrObjects = []
let undoObjects = []
let pointNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let sequenceNames = "abcdefghijklmopqrstuvwxyz"
let lineNames = "fghijklmnpqrstuvwz"
class mPoint {
	constructor(xpoint, ypoint, come = null) {
		if (come == null) come = '(' + xpoint + ',' + ypoint + ')'
		this.name = createName('point')
		this.id = arrObjects.length
		this.xpoint = xpoint
		this.ypoint = ypoint
		this.color = getRandomColor()
		this.visibility = true
		this.size = 3
		this.type = 'point'
		this.inputView = come
	}
}
class mLine {
	constructor(a, b, come = null) {
		if (come == null) come = a + 'x+' + b
		come = come.replace('1x', 'x')
		come = come.replace('0x+', '')
		come = come.replace('+0', '')
		come = come.replace('+-', '-')
		this.name = createName('line')
		this.id = arrObjects.length
		this.a = a
		this.b = b
		if (Math.sign(b) == -1) {
			this.graph = a + '*x-' + Math.abs(b)
		} else {
			this.graph = a + '*x+' + b
		}
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'line'
		this.inputView = come
	}
}
class mFunction {
	constructor(newCome, come) {
		this.name = createName('other')
		this.id = arrObjects.length
		this.graph = newCome
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
		this.start = s
		this.end = e
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.type = 'sequence'
		this.inputView = come
	}
}

function getRandomColor() {
	var lum = -0.25;
	var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}
	var rgbColor = "#",
		c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgbColor += ("00" + c).substr(c.length);
	}
	return rgbColor;
}

createName = function (type) {
	let nm
	let iFound = false
	let i = 0
	if (type == 'point') {
		if (arrObjects.length == 0) return pointNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < 26) {
				if (!names.includes(pointNames[i])) {
					iFound = true
					nm = pointNames[i]
				}
			}
			if (i >= 26) {
				if (!(names.includes(pointNames[i % 26] + ((i / 26) - ((i / 26) % 1))))) {
					iFound = true
					nm = pointNames[i % 26] + ((i / 26) - ((i / 26) % 1))
				}
			}
			i++
		}
	} else if (type == 'sequence') {
		if (arrObjects.length == 0) return sequenceNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < 25) {
				if (!names.includes(sequenceNames[i])) {
					iFound = true
					nm = sequenceNames[i]
				}
			}
			if (i >= 25) {
				if (!(names.includes(sequenceNames[i % 25] + ((i / 25) - ((i / 25) % 1))))) {
					iFound = true
					nm = sequenceNames[i % 25] + ((i / 25) - ((i / 25) % 1))
				}
			}
			i++
		}
	} else {
		if (arrObjects.length == 0) return lineNames[0]
		let names = arrObjects.map((item) => item.name)
		while (!iFound) {
			if (i < 18) {
				if (!names.includes(lineNames[i])) {
					iFound = true
					nm = lineNames[i]
				}
			}
			if (i >= 18) {
				if (!(names.includes(lineNames[i % 18] + ((i / 18) - ((i / 18) % 1))))) {
					iFound = true
					nm = lineNames[i % 18] + ((i / 18) - ((i / 18) % 1))
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
	let label = document.createElement('label')
	let input = document.createElement('input')
	input.id = -1
	label.htmlFor = input.id
	input.placeholder = 'Giriş'
	input.title = 'Giriş'
	input.setAttribute('onclick', 'inputClick(event,id)')
	input.setAttribute('onkeydown', 'inputKeyDown(event,id)')
	label.appendChild(input)
	objectsContainer.appendChild(label)
	arrObjects.sort(function (a, b) { return a.id - b.id })

	arrObjects.findLast((item) => {
		if (item.type === 'point') {
			drawPoint(item)
		} else if (item.type === 'line') {
			drawLine(item)
		} else if (item.type === 'sequence') {
			drawSequence(item)
		} else {
			drawFunction(item)
		}
	})

	if (activeElementID != null) {
		document.getElementById(activeElementID).style.background = 'lightgreen'
	}
}
fillSetWindow = function () {
	if (activeElementID != null) {
		document.getElementById('name').value = arrObjects[activeElementID].name
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
		document.getElementById('set-popup').style.display = 'none'
	}
}

function drawPoint(point) {
	labelCreator(point)
	if (!point.visibility) return
	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.fillStyle = point.color
	ctx.arc((-minX + point.xpoint / unitY) * scaleY, (-minY - point.ypoint / unitX) * scaleX, point.size, 0, 2 * Math.PI)
	ctx.lineWidth = 1
	//ctx.fillRect(400, 400, 20, 20)
	text((-minX + point.xpoint / unitY) * scaleY - 10, (-minY - point.ypoint / unitX) * scaleX - 5, point.color, 'center', 'bold 15px arial', point.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()

	if (findPointPos != null) {
		let distance =
			Number((findPointPos.x - point.xpoint) * (findPointPos.x - point.xpoint) +
				(findPointPos.y - point.ypoint) * (findPointPos.y - point.ypoint)).toFixed(2)
		if (distance == 0) {
			console.log(point.name, distance)
		}
	}
}

function drawLine(line) {
	labelCreator(line)
	if (!line.visibility) return
	if (classify(line.inputView).subtype == 'vertical') { // Drawing Vertical Lines
		let verticalNumber = classify(line.inputView).x

		ctx.beginPath()
		ctx.strokeStyle = ctx.fill.style = line.color
		ctx.lineWidth = line.size
		ctx.moveTo((-minX + verticalNumber / unitY) * scaleY, canvas.height + 100)
		ctx.lineTo((-minX + verticalNumber / unitY) * scaleY, -canvas.height - 100)
		text((-minX + verticalNumber / unitY) * scaleY + 10, 15, line.color, 'center', 'bold 15px arial', line.name)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
		resetSliders()
		return
	}

	let x, y
	ctx.beginPath()
	ctx.strokeStyle = ctx.fill.style = line.color
	ctx.lineWidth = line.size
	x = minX * unitY
	y = eval(line.graph)
	ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	x = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
	y = eval(line.graph)
	ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	if (line.a != 0) {
		text((-minX + (-minY - line.b) / line.a) * scaleY + 5, 20, line.color, 'center', 'bold 15px arial', line.name)
	} else {
		x = 0
		text(-minX * scaleY * 2 - 100, (-minY - eval(line.graph)) * scaleX - 10, line.color, 'center', 'bold 15px arial', line.name)
	}
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function drawFunction(func) {
	labelCreator(func)
	if (!func.visibility) return
	let y
	ctx.beginPath()
	ctx.strokeStyle = func.color
	ctx.lineWidth = func.size

	for (let x = minX * unitY; x < (minX + Math.round(canvas.width / scaleY) + 1) * unitY; x += .01) {
		y = eval(func.graph)
		if (x === minX * unitY) {
			ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
		} else {
			ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
		}
	}

	ctx.stroke()
	ctx.closePath()
}
function drawSequence(seq) {
	labelCreator(seq)
	if (!seq.visibility) return
	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.lineWidth = seq.size - 1
	ctx.setLineDash([2, 5])
	let y
	for (let x = minX * unitY; x < (minX + Math.round(canvas.width / scaleY) + 1) * unitY; x += .01) {
		y = eval(seq.graph)
		if (x === minX * unitY) {
			ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
		} else {
			ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
		}
	}
	ctx.stroke()
	ctx.setLineDash([])
	ctx.closePath()

	if (!seq.visibility) return
	for (let x = seq.start; x <= seq.end; x++) {
		ctx.beginPath()
		ctx.strokeStyle = 'black'
		ctx.fillStyle = seq.color
		ctx.lineWidth = 1
		y = eval(seq.graph)
		ctx.arc((-minX + x / unitY) * scaleY, (-minY - y / unitX) * scaleX, seq.size, 0, 2 * Math.PI)
		text((-minX + x / unitY) * scaleY - 10, (-minY - y / unitX) * scaleX - 5, seq.color, 'center', 'bold 15px arial', seq.name + x)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
	}
}

function labelCreator(item) {
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
	} else if (item.type == 'sequence') {
		input.value = item.name + 'ₓ=' + item.inputView
	} else {
		input.value = item.name + ':' + item.inputView
	}

	buttonDelete.classList = 'buttonDel'
	buttonSetting.classList = 'buttonSet'
	buttonVisibility.classList = 'buttonVisibility'
	buttonVisibility.style.borderColor = item.color
	item.visibility ? buttonVisibility.style.background = item.color : buttonVisibility.style.background = 'transparent'
	input.setAttribute("onclick", "inputClick(event,id)")
	input.setAttribute("onkeydown", "inputKeyDown(event,id)")
	buttonDelete.setAttribute("onclick", "delClick(event)")
	buttonSetting.setAttribute("onclick", "setClick(event)")
	buttonVisibility.setAttribute("onclick", "visibilityClick(event)")

	label.appendChild(input)
	label.appendChild(buttonVisibility)
	label.appendChild(buttonSetting)
	label.appendChild(buttonDelete)
	objectsContainer.appendChild(label)
}

function choiceClick() {
	showToast('Taşı', 'Düzlemi tutarak kaydırınız.')
	activeObject = 'choice'
	canvas.style.cursor = 'pointer'
	document.getElementById('btnChoice').classList.remove('active')
	document.getElementById('btnPoint').classList.remove('active')
	document.getElementById('btnLine').classList.remove('active')
	document.getElementById('btnCalc').classList.remove('active')
	document.getElementById('btnHelp').classList.remove('active')
	document.getElementById('btnChoice').classList.add('active')
}
function pointClick() {
	showToast('Nokta', 'Konum seçiniz.')
	activeObject = 'point'
	canvas.style.cursor = 'crosshair'
	document.getElementById('btnChoice').classList.remove('active')
	document.getElementById('btnPoint').classList.remove('active')
	document.getElementById('btnLine').classList.remove('active')
	document.getElementById('btnCalc').classList.remove('active')
	document.getElementById('btnHelp').classList.remove('active')
	document.getElementById('btnPoint').classList.add('active')
}
function lineClick() {
	showToast('Doğru', 'Farklı iki nokta seçiniz.')
	activeObject = 'line'
	canvas.style.cursor = 'crosshair'
	document.getElementById('btnChoice').classList.remove('active')
	document.getElementById('btnPoint').classList.remove('active')
	document.getElementById('btnLine').classList.remove('active')
	document.getElementById('btnCalc').classList.remove('active')
	document.getElementById('btnHelp').classList.remove('active')
	document.getElementById('btnLine').classList.add('active')
}
function calcClick() {
	activeObject = 'choice'
	canvas.style.cursor = 'pointer'
	document.getElementById('btnChoice').classList.remove('active')
	document.getElementById('btnPoint').classList.remove('active')
	document.getElementById('btnLine').classList.remove('active')
	document.getElementById('btnCalc').classList.remove('active')
	document.getElementById('btnHelp').classList.remove('active')
	document.getElementById('btnCalc').classList.add('active')

	if (document.getElementById('btnimgCalc').getAttribute('src') == "img/left.svg") {
		document.getElementById('btnimgCalc').src = "img/right.svg"
	} else if (document.getElementById('btnimgCalc').getAttribute('src') == "img/right.svg") {
		document.getElementById('btnimgCalc').src = "img/left.svg"
	} else if (document.getElementById('btnimgCalc').getAttribute('src') == "img/down.svg") {
		document.getElementById('btnimgCalc').src = "img/up.svg"
	} else {
		document.getElementById('btnimgCalc').src = "img/down.svg"
	}
	document.getElementById('leftWrapper').classList.toggle('hide')
}

function helpClick() {
	activeObject = 'choice'
	canvas.style.cursor = 'pointer'
	document.getElementById('btnChoice').classList.remove('active')
	document.getElementById('btnPoint').classList.remove('active')
	document.getElementById('btnLine').classList.remove('active')
	document.getElementById('btnCalc').classList.remove('active')
	document.getElementById('btnHelp').classList.remove('active')
	document.getElementById('btnHelp').classList.add('active')

	showToast('GEOMATİK', 'HENÜZ YAPIM AŞAMASINDA...')
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
	resetSliders()
	if (id != -1) {
		if (activeElementID != null) {
			document.getElementById(activeElementID).style.background = 'white'
		}
		activeElementID = id
		document.getElementById(activeElementID).style.background = 'lightgreen'
		document.getElementById(-1).value = null
		let item = arrObjects[id]

		if (arrObjects[activeElementID].type == 'point') {
			activeObject = 'point'
		} else {
			activeObject = 'line'
		}
		if (item.type != 'other') setSlider(item)
		fillSetWindow()
	}
}

/* CLASSIFY METHOD PROCESS */
function classify(inputRaw) {
	const norm = inputRaw.trim()
	// ---- NOKTA: (x,y) ----
	const pointRe = /^\s*\(\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/
	const pMatch = norm.match(pointRe)

	if (pMatch) {
		const [, xStr, yStr] = pMatch
		return {
			type: 'point',
			x: Number(xStr),
			y: Number(yStr)
		};
	}

	// ---- DİKEY DOĞRU: x = sabit veya sabit = x ----
	const lineXConstRe = /^\s*(?:x\s*=\s*([+-]?\d+(?:\.\d+)?)|([+-]?\d+(?:\.\d+)?)\s*=\s*x)\s*$/i
	const xcMatch = norm.match(lineXConstRe)
	if (xcMatch) {
		// hangi grup dolu ise onu al
		const val = xcMatch[1] !== undefined ? xcMatch[1] : xcMatch[2]
		return { type: 'line', subtype: 'vertical', x: Number(val) }
	}

	// ---- YATAY DOĞRU: y = sabit veya sabit = y ----
	const lineYConstRe1 = /^\s*y\s*=\s*([+-]?\d+(?:\.\d+)?)\s*$/i
	const lc1Match = norm.match(lineYConstRe1)
	if (lc1Match) return { type: 'line', subtype: 'horizontal', m: 0, n: Number(lc1Match[1]) }

	const lineYConstRe2 = /^\s*([+-]?\d+(?:\.\d+)?)\s*=\s*y\s*$/i
	const lc2Match = norm.match(lineYConstRe2)
	if (lc2Match) return { type: 'line', subtype: 'horizontal', m: 0, n: Number(lc2Match[1]) }

	// ---- EĞİMLİ DOĞRULAR: y = mx + n veya mx + n = y ----
	const slopeReYLeft = /^\s*y\s*=\s*([+-]?(?:\d+(?:\.\d+)?|)?)x(?:\s*([+-]\s*\d+(?:\.\d+)?))?\s*$/i
	const slopeReYRight = /^\s*([+-]?(?:\d+(?:\.\d+)?|)?)x(?:\s*([+-]\s*\d+(?:\.\d+)?))?\s*=\s*y\s*$/i

	let m, n
	// y = ...
	let mMatch = norm.match(slopeReYLeft)
	if (mMatch) {
		const mPart = mMatch[1]
		m = mPart === '' || mPart === '+' ? 1 : (mPart === '-' ? -1 : Number(mPart))
		n = mMatch[2] ? Number(mMatch[2].replace(/\s+/g, '')) : 0
		return { type: 'line', subtype: 'slope', m, n }
	}

	// ... = y
	mMatch = norm.match(slopeReYRight)
	if (mMatch) {
		const mPart = mMatch[1]
		m = mPart === '' || mPart === '+' ? 1 : (mPart === '-' ? -1 : Number(mPart))
		n = mMatch[2] ? Number(mMatch[2].replace(/\s+/g, '')) : 0
		return { type: 'line', subtype: 'slope', m, n }
	}

	// ---- DİZİ: Dizi(expr, start, end) ----
	const arrayRe = /^\s*Dizi\s*\(\s*([^,]+)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*,\s*([+-]?\d+(?:\.\d+)?)\s*\)\s*$/i
	const arrayMatch = norm.match(arrayRe)
	if (arrayMatch) {
		let [, expr, startStr, endStr] = arrayMatch

		expr = expr.trim()
		// Sadece x ve izin verilen matematik fonksiyon/sabitleri kontrol et
		const allowedFunctions = ['sin', 'cos', 'tan', 'log', 'exp', 'sqrt', 'pi', 'e']
		const letters = expr.match(/[a-zA-Z]+/g) || []
		for (let l of letters) {
			if (l.toLowerCase() !== 'x' && !allowedFunctions.includes(l.toLowerCase())) {
				return { type: 'unknown' };
			}
		}
		return {
			type: 'sequence',
			expr,
			start: Number(startStr),
			end: Number(endStr)
		};
	}
	return { type: 'unknown' }
}
function capitalizeDizi(str) {
	return str.replace(/dizi/gi, match => {
		return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
	});
}
/* CLASIFY PROCESS END */
function inputKeyDown(evt, id) {
	resetSliders()
	addParanthesis(evt)
	/* 	let changeName = true
		if (id == 'defination') {
			come = document.getElementById(id).value
			id = activeElementID
			changeName = false
		} else {
			come = document.getElementById(id).value
		} */

	let allowKeys = '(){}[],=-+.*^/bdjmnquvxyzCEFGHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(evt.key) && !allowKeys.includes(evt.key)) {
		evt.preventDefault()
	}
	if (evt.key === 'Enter') {
		let come = document.getElementById(id).value.toLowerCase()
		if (!come.includes('y') && classify(come).type != 'sequence' && classify(come).type != 'point' && classify(come).subtype != 'vertical') {
			come = 'y=' + come
		}
		if (id == -1) { //Giriş input
			if (classify(come).type == 'point') {
				let point = new mPoint(classify(come).x, classify(come).y, come)
				arrObjects.push(point)
				activeElementID = point.id
				setSlider(point)
				undoObjects = []
				delCount = 0
				objectsContainer.innerHTML = null
			} else if (classify(come).type == 'line') {
				let line
				if (classify(come).subtype == 'vertical') {
					line = new mLine(classify(come).m, classify(come).n, 'x=' + classify(come).x)
				} else {
					line = new mLine(classify(come).m, classify(come).n, come)
				}
				arrObjects.push(line)
				activeElementID = line.id
				setSlider(line)
				undoObjects = []
				delCount = 0
				objectsContainer.innerHTML = null
			} else if (classify(come).type == 'sequence') {
				let newCome = convertFunction(classify(come).expr)
				if (!newCome) {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.')
				} else {
					let seq = new mSequence(newCome, classify(come).start, classify(come).end, capitalizeDizi(come))
					arrObjects.push(seq)
					activeElementID = seq.id
					undoObjects = []
					delCount = 0
					objectsContainer.innerHTML = null
				}
			} else if (classify(come).type == 'unknown') {
				let newCome = convertFunction(come)
				if (!newCome) {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.')
				} else {
					let func = new mFunction(newCome, come)
					arrObjects.push(func)
					activeElementID = func.id
					undoObjects = []
					delCount = 0
					objectsContainer.innerHTML = null
				}
			}
		} else {
			alert('Giriş inputunda değilsin...')
		}



		/*		const commasCount = [...come].filter(c => c === ',').length
				//POINT CHECK
				if (come.indexOf('(') == 0 && come.includes('(') && come.includes(')') && commasCount == 1) {
					let nName = come.substring(0, come.indexOf('('))
					come = come.substring(come.indexOf('('))
					let m = isPoint(come).m
					let n = isPoint(come).n
					if (m === undefined || n === undefined || isNaN(m) || isNaN(n)) {
						showToast('NOKTA GİRİŞ', 'Hatalı nokta girişi yaptınız.')
						return
					} else {
						document.getElementById(id).style.background = 'aquamarine'
						if (id == -1) {
							let point = new mPoint(m, n, come)
							arrObjects.push(point)
							activeElementID = point.id
							setSlider(point)
							undoObjects = []
							delCount = 0
							objectsContainer.innerHTML = null
						} else {
							activeElementID = id
							arrObjects[id].xpoint = m
							arrObjects[id].ypoint = n
							arrObjects[id].inputView = come
							if (changeName) nameChange(nName)
							setSlider(arrObjects[id])
						}
					}
					//SEQUENCE CHECK
				} else if (come.indexOf('(') == 0 && come.includes('(') && come.includes(')') && commasCount == 2) {
					let nName = come.substring(0, come.indexOf('=') - 1)
					come = come.substring(come.indexOf('('))
					let seqFunc = isSequence(come).seqFunc
					let m = isSequence(come).m
					let n = isSequence(come).n
		
					if (m === undefined || n === undefined || isNaN(m) || isNaN(n) || !seqFunc) {
						showToast('DİZİ GİRİŞ', 'Hatalı dizi girişi yaptınız.')
						return
					} else {
						document.getElementById(id).style.background = 'aquamarine'
						if (id == -1) {
							let seq = new mSequence(seqFunc, m, n, come)
							arrObjects.push(seq)
							activeElementID = seq.id
							undoObjects = []
							delCount = 0
							objectsContainer.innerHTML = null
						} else {
							activeElementID = id
							arrObjects[id].graph = seqFunc
							arrObjects[id].start = m
							arrObjects[id].end = n
							if (changeName) nameChange(nName)
							arrObjects[id].inputView = come
						}
					}
				} else {
					if (activeElementID == null) activeElementID = -1
					let nName = come.substring(0, come.indexOf(':'))
					come = come.substring(come.indexOf('=') + 1)
					let newCome = convertFunction(come)
					if (newCome != false) {
						console.log(isLine(newCome))
						//LINE CHECK
						if (isLine(newCome) != false) {
							let m, n
							m = isLine(newCome).a
							n = isLine(newCome).b
							if (id == -1) {
								let line = new mLine(m, n, come)
								arrObjects.push(line)
								activeElementID = line.id
								undoObjects = []
								delCount = 0
								objectsContainer.innerHTML = null
								setSlider(line)
							} else {
								activeElementID = id
								arrObjects[id].a = m
								arrObjects[id].b = n
								if (Math.sign(n) < 0) {
									arrObjects[id].graph = m + '*x-' + Math.abs(n)
								} else {
									arrObjects[id].graph = m + '*x+' + n
								}
								if (changeName) nameChange(nName)
								arrObjects[id].inputView = come
								setSlider(arrObjects[id])
							}
							//OTHER FUNCTION CHECK
						} else {
							if (id == -1) {
								let func = new mFunction(newCome, come)
								let nCome = come.replace('=', '')
								nCome = nCome.replace('y', '')
								arrObjects.push(func)
								activeElementID = func.id
								undoObjects = []
								delCount = 0
								objectsContainer.innerHTML = null
							} else {
								activeElementID = id
								arrObjects[id].graph = newCome
								if (changeName) nameChange(nName)
								arrObjects[id].inputView = come
							}
						}
						drawCoordinates()
						fillSetWindow()
						return
					}
					//FUNCTION OPERATIONS CHECK
					if (!newCome.includes('x')) {
						let newComeWithFuncs = ''
						for (let i = 0; i < come.length; i++) {
							newComeWithFuncs += come[i]
							arrObjects.forEach(arr => {
								if (come[i] == arr.name) {
									newComeWithFuncs = newComeWithFuncs.replace(come[i], '(' + arr.graph + ')')
								}
							})
						}
						if (come.includes('o') && !come.includes('x')) {
							let funcs = newComeWithFuncs.split('o')
							for (let i = funcs.length - 1; i > 0; i--) {
								funcs[i - 1] = funcs[i - 1].replaceAll('x', funcs[i])
							}
							newComeWithFuncs = funcs[0]
						}
						newComeWithFuncs = newComeWithFuncs.substring(1, newComeWithFuncs.length - 1)
						let func = new mFunction(newComeWithFuncs, convertView(newComeWithFuncs))
						func.name = come
						arrObjects.push(func)
						activeElementID = func.id
						undoObjects = []
						delCount = 0
						objectsContainer.innerHTML = null
		
						//showToast('FONKSİYON GİRİŞİ', 'Hatalı fonksiyon girişi yaptınız.')
						//return
					}
				}*/
		drawCoordinates()
		fillSetWindow()
	}
}

function addParanthesis(e) {
	const el = e.target;
	const pairs = {
		'(': ')',
		'[': ']',
		'{': '}'
	};

	if (pairs[e.key]) {
		e.preventDefault();
		const start = el.selectionStart;
		const end = el.selectionEnd;
		const value = el.value;
		const open = e.key;
		const close = pairs[e.key];
		const selectedText = value.slice(start, end);
		el.value = value.slice(0, start) + open + selectedText + close + value.slice(end);

		if (selectedText) {
			el.selectionStart = start + 1;
			el.selectionEnd = end + 1;
		} else {
			el.selectionStart = el.selectionEnd = start + 1;
		}
	}
}

function baseL(a, b) {
	return Math.log10(b) / Math.log10(a)
}

function convertView(come) {
	come = come.replaceAll('**', '^')
	come = come.replaceAll('1*', '')
	come = come.replaceAll('*x', 'x')
	come = come.replaceAll('Math.sin', 'sin')
	come = come.replaceAll('Math.cos', 'cos')
	come = come.replaceAll('Math.tan', 'tan')
	come = come.replaceAll('Math.cot', 'cot')
	come = come.replaceAll('Math.PI', 'pi')
	come = come.replaceAll('Math.E', 'e')
	come = come.replaceAll('baseL(e,', 'ln(')
	come = come.replaceAll('baseL', 'log')
	come = come.replaceAll('+0', '')
	return come
}

function convertFunction(func) {
	func = func.replace(/([-+])([a-z])/g, "$11$2")
	func = func.replace(/(\d+(\.\d+)?)\s*([a-zA-Z])/g, "$1*$3")
	func = func.replaceAll('^', '**')
	func = func.replaceAll('sin', 'Math.sin')
	func = func.replaceAll('cos', 'Math.cos')
	func = func.replaceAll('tan', 'Math.tan')
	func = func.replaceAll('cot', 'Math.cot')
	func = func.replaceAll('pi', 'Math.PI')
	func = func.replaceAll('E', 'Math.E')
	func = func.replaceAll('e', 'Math.E')
	func = func.replaceAll('log', 'baseL')
	func = func.replaceAll('ln(', 'baseL(Math.E,')
	func = func.replaceAll('y=', '')
	func = func.replaceAll('=y', '')
	func = func.replaceAll('{', '(')
	func = func.replaceAll('}', ')')
	func = func.replaceAll('[', '(')
	func = func.replaceAll(']', ')')
	let x = 8 //Math.random()
	let y
	try {
		y = eval(func)
		if (y === undefined || isNaN(y)) return false
	} catch (error) {
		return false
	}
	return func
}

function isPoint(come) {
	let m, n
	if (!isNaN(come.substring(come.indexOf('(') + 1, come.indexOf(',')))) {
		m = Number(come.substring(come.indexOf('(') + 1, come.indexOf(',')))
	}
	if (!isNaN(come.substring(come.indexOf(',') + 1, come.indexOf(')')))) {
		n = Number(come.substring(come.indexOf(',') + 1, come.indexOf(')')))
	}
	return { m: m, n: n }
}
function isLine(come) {
	let a, b, x, y, m1, m2, x1, y1, x2, y2, x3, y3
	x = 2
	y = eval(come)
	x1 = x
	y1 = y
	x = 3
	y = eval(come)
	x2 = x
	y2 = y
	x = 4
	y = eval(come)
	x3 = x
	y3 = y

	if ((y2 - y1) / (x2 - x1) == (y3 - y2) / (x3 - x2)) {
		x = 0
		b = eval(come)
		x = 1
		a = eval(come) - b
	} else {
		return false
	}
	return { a: a, b: b }
}
function isSequence(come) {
	if (come.includes('=')) {
		come = come.substring(come.indexOf('=') + 1, come.length)
	}
	let txt = come.substring(1, come.length - 1)
	txt = txt.split(',')
	let seq, m, n
	seq = convertFunction(txt[0])
	if (!isNaN(txt[1])) {
		m = txt[1]
	}
	if (!isNaN(txt[2])) {
		n = txt[2]
	}
	return { seqFunc: seq, m: m, n: n }
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
	document.getElementById('btnCalc').classList.remove('active')
	document.getElementById('btnChoice').classList.add('active')
	resetSliders()
	fillSetWindow()
}

function resetSliders() {
	document.getElementById('m').innerHTML = 'a'
	document.getElementById('n').innerHTML = 'b'
	let sliderM = document.getElementById('sliderM')
	let sliderN = document.getElementById('sliderN')
	sliderM.disabled = true
	sliderN.disabled = true
	sliderM.value = sliderM.min
	sliderN.value = sliderN.min

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
		if (arrObjects[activeElementID].type == 'point') {
			if (name == 'm') {
				sliderLabel.innerHTML = 'a = ' + slider.value
				arrObjects[activeElementID].xpoint = slider.value
			} else {
				sliderLabel.innerHTML = 'b = ' + slider.value
				arrObjects[activeElementID].ypoint = slider.value
			}
		}
		if (arrObjects[activeElementID].type == 'line') {
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
		}
		drawCoordinates()
	}
}

setSlider = function (item) {
	let sliderM = document.getElementById('sliderM')
	let labelM = document.getElementById('m')
	let sliderN = document.getElementById('sliderN')
	let labelN = document.getElementById('n')

	sliderM.disabled = false
	sliderN.disabled = false

	if (item.type == 'point') {
		sliderM.max = sliderN.max = 10 * Math.round(Math.min(Math.abs(item.xpoint), Math.abs(item.ypoint)))
		sliderM.min = sliderN.min = -10 * Math.round(Math.min(Math.abs(item.xpoint), Math.abs(item.ypoint)))
		if (Math.min(Math.abs(item.xpoint), Math.abs(item.ypoint)) == 0) {
			sliderM.max = sliderN.max = 10 * Math.round(Math.max(Math.abs(item.xpoint), Math.abs(item.ypoint)))
			sliderM.min = sliderN.min = -10 * Math.round(Math.max(Math.abs(item.xpoint), Math.abs(item.ypoint)))
		}
		if (Math.min(Math.abs(item.xpoint), Math.abs(item.ypoint)) == 0 && Math.max(Math.abs(item.xpoint), Math.abs(item.ypoint)) == 0) {
			sliderM.max = sliderN.max = 10
			sliderM.min = sliderN.min = -10
		}
		sliderM.value = item.xpoint
		labelM.innerHTML = 'a = ' + item.xpoint
		sliderM.title = "a sürgüsü"
		sliderN.value = item.ypoint
		labelN.innerHTML = 'b = ' + item.ypoint
		sliderN.title = "b sürgüsü"
	} else if (item.type == 'line') {
		sliderM.max = sliderN.max = 10 * Math.round(Math.min(Math.abs(item.a), Math.abs(item.b)))
		sliderM.min = sliderN.min = -10 * Math.round(Math.min(Math.abs(item.a), Math.abs(item.b)))
		if (Math.min(Math.abs(item.a), Math.abs(item.b)) == 0) {
			sliderM.max = sliderN.max = 10 * Math.round(Math.max(Math.abs(item.a), Math.abs(item.b)))
			sliderM.min = sliderN.min = -10 * Math.round(Math.max(Math.abs(item.a), Math.abs(item.b)))
		}
		if (Math.min(Math.abs(item.a), Math.abs(item.b)) == 0 && Math.max(Math.abs(item.a), Math.abs(item.b)) == 0) {
			sliderM.max = sliderN.max = 10
			sliderM.min = sliderN.min = -10
		}
		sliderM.value = item.a
		labelM.innerHTML = 'm = ' + item.a
		sliderM.title = "m sürgüsü"
		sliderN.value = item.b
		labelN.innerHTML = 'n = ' + item.b
		sliderN.title = "n sürgüsü"
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

function checkDirection() {
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
}
showToast = function (title, msg) {
	let x = document.getElementById("snackbar");
	document.getElementById('snackTitle').innerHTML = title
	document.getElementById('snackContent').innerHTML = msg
	x.className = "show";
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000)
}

function nameChange(newName) {
	let hasNameid = null
	arrObjects.forEach(item => {
		if (item.name == newName) hasNameid = item.id
	})
	if (hasNameid != null && arrObjects[hasNameid] != newName) {
		let i = 1
		let names = arrObjects.map((item) => item.name)
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

nameFocusOut = function (evt) {
	let newName = document.getElementById('name').value
	nameChange(newName)
}

nameKeyDown = function (evt) {
	if (evt.key === 'Enter') {
		let newName = document.getElementById('name').value
		nameChange(newName)
	}
}

$(document).ready(function () {
	let objectsContainer = document.getElementById('objectsContainer')
	checkDirection()
	drawCoordinates()

	// document.addEventListener('contextmenu', event => event.preventDefault())

	window.onresize = function () {
		canvas.width = innerWidth
		canvas.height = innerHeight
		checkDirection()
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
			resetSliders()
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
		if (activeObject === 'line') {
			if (lineDrawing == true) {
				lineB = getMousePos(evt)
				if ((lineB.x - lineA.x) != 0) {
					drawCoordinates()
					let m = parseFloat((lineB.y - lineA.y) / (lineB.x - lineA.x)).toFixed(2)
					let c = parseFloat(lineA.y - m * lineA.x).toFixed(2)
					line = new mLine(m, c)

					let x, y
					ctx.beginPath()
					ctx.strokeStyle = ctx.fill.style = line.color
					ctx.lineWidth = 2
					x = minX * unitY
					y = eval(line.graph)
					ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)

					x = (minX + Math.round(canvas.width / scaleX) + 1) * unitY
					y = eval(line.graph)
					ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
					ctx.stroke()
					ctx.fill()
					ctx.closePath()
				}
			}
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
				lineA = getMousePos(evt)
				let point = new mPoint(lineA.x, lineA.y)
				arrObjects.push(point)
				undoObjects = []
				delCount = 0
				lineDrawing = true
			} else {
				lineB = getMousePos(evt)
				let point = new mPoint(lineB.x, lineB.y)
				arrObjects.push(point)
				undoObjects = []
				delCount = 0
				lineDrawing = false
			}
			if (lineA != null && lineB != null) {
				createEquation(lineA, lineB)
				lineA = lineB = null
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
			drawCoordinates()
		}
	}, false)

	function createEquation(lineA, lineB) {
		if ((lineB.x - lineA.x) != 0) {
			let m = (lineB.y - lineA.y) / (lineB.x - lineA.x)
			let c = lineA.y - m * lineA.x

			if (!Number.isInteger(m)) {
				m = Number((lineB.y - lineA.y) / (lineB.x - lineA.x)).toFixed(2)
			}
			if (!Number.isInteger(c)) {
				c = Number(lineA.y - m * lineA.x).toFixed(2)
			}

			let line = new mLine(m, c)
			setSlider(line)
			arrObjects.push(line)
			activeElementID = line.id
			objectsContainer.innerHTML = null
			drawCoordinates()
		}
	}

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