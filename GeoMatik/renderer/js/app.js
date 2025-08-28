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
let units = [1 / 10, 1 / 5, 1 / 2, 1, 2, 5, 10, 20]
let tickX = 3
let unitX = units[tickX]
let tickY = 3
let unitY = units[tickY]
let firstMousePos, lastMousePos, findPointPos = null
let arrObjects = []
let undoObjects = []
let pointNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let sequenceNames = "abcdefghijklmopqrstuvwxyz"
let lineNames = "fghpqr"
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
		/* 		come = come.replace('1x', 'x')
				come = come.replace('0x+', '')
				come = come.replace('+0', '')
				come = come.replace('+-', '-') */
		if (classify(come).subtype == 'vertical') {
			const denkCount = arrObjects.filter(f => f.name.includes("denk")).length + 1;
			this.name = 'denk' + denkCount
		} else {
			this.name = createName('line')
		}
		this.id = arrObjects.length
		this.a = a
		this.b = b
		if (Math.sign(b) == -1) {
			this.graph = a + '*x-' + Math.abs(b)
		} else {
			this.graph = a + '*x+' + b
		}
		this.graphParse = null
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
		this.graphParse = null
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
	y = line.graphParse(x)
	ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	x = (minX + Math.round(canvas.width / scaleY) + 1) * unitY
	y = line.graphParse(x)
	ctx.lineTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)
	if (line.a != 0) {
		text((-minX + (-minY - line.b) / line.a) * scaleY + 5, 20, line.color, 'center', 'bold 15px arial', line.name)
	} else {
		x = 0
		text(-minX * scaleY * 2 - 100, (-minY - y) * scaleX - 10, line.color, 'center', 'bold 15px arial', line.name)
	}
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function drawFunction(func) {
	labelCreator(func)
	if (!func.visibility) return

	let f = func.graphParse

	ctx.beginPath()
	ctx.strokeStyle = func.color
	ctx.lineWidth = func.size

	let step = 0.01;

	let firstPoint = true;
	let x = minX * unitY

	while (x < (minX + Math.round(canvas.width / scaleY) + 1) * unitY) {
		let y = f(x);
		if (!isFinite(y)) {
			firstPoint = true;
			x += step;
			continue;
		}

		let canvasX = -minX * scaleY + (x * scaleY) / unitY;
		let canvasY = -minY * scaleX - (y * scaleX) / unitX;

		if (firstPoint) {
			ctx.moveTo(canvasX, canvasY);
			firstPoint = false;
		} else {
			ctx.lineTo(canvasX, canvasY);
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
	ctx.strokeStyle = 'black'
	ctx.lineWidth = seq.size - 1
	ctx.setLineDash([2, 5])

	let step = 0.01;

	let firstPoint = true;
	let x = minX * unitY

	while (x < (minX + Math.round(canvas.width / scaleY) + 1) * unitY) {
		let y = f(x);
		if (!isFinite(y)) {
			firstPoint = true;
			x += step;
			continue;
		}

		let canvasX = -minX * scaleY + (x * scaleY) / unitY;
		let canvasY = -minY * scaleX - (y * scaleX) / unitX;

		if (firstPoint) {
			ctx.moveTo(canvasX, canvasY);
			firstPoint = false;
		} else {
			ctx.lineTo(canvasX, canvasY);
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
			setSlider(item)
		}
		if (arrObjects[activeElementID].type == 'line') {
			activeObject = 'line'
			setSlider(item)
		}
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
	const lineXConstRe = /^\s*(?:x\s*=\s*([+-]?\d+(?:\.\d+)?)|([+-]?\d+(?:\.\d+)?)\s*=\s*x)\s*$/i;
	const xcMatch = norm.match(lineXConstRe);
	if (xcMatch) {
		const val = xcMatch[1] !== undefined ? xcMatch[1] : xcMatch[2];
		return { type: 'line', subtype: 'vertical', x: Number(val) };
	}

	// ---- EĞİMLİ DOĞRULAR ----
	// ---- YATAY DOĞRU: sadece sayı (x eksenine paralel) ----
	const horizRe = /^\s*([+-]?\d+(?:\.\d+)?)\s*$/;
	const hMatch = norm.match(horizRe);
	if (hMatch) return { type: 'line', subtype: 'horizontal', m: 0, n: Number(hMatch[1]) };

	// Normalize: -x => -1*x, +x => 1*x, x => 1*x
	let expr = norm.replace(/(^|\s)-\s*([a-z])/gi, "$1-1*$2");
	expr = expr.replace(/(^|\s)\+\s*([a-z])/gi, "$11*$2");
	expr = expr.replace(/(^|\s)([a-z])/gi, "$11*$2");

	// mx + n
	let slopeMatch = expr.match(/^\s*([+-]?\d*\.?\d*)\*?([a-z])([+-]\d+(?:\.\d+)?)?\s*$/i);
	if (slopeMatch) {
		const m = Number(slopeMatch[1] || 1);
		const n = slopeMatch[3] ? Number(slopeMatch[3].replace(/\s+/g, "")) : 0;
		return { type: 'line', subtype: 'slope', m, n };
	}

	// n + mx
	slopeMatch = expr.match(/^\s*([+-]?\d+(?:\.\d+)?)?([+-]?\d*\.?\d*)\*?([a-z])\s*$/i);
	if (slopeMatch) {
		const n = slopeMatch[1] ? Number(slopeMatch[1]) : 0;
		const m = Number(slopeMatch[2] || 1);
		return { type: 'line', subtype: 'slope', m, n };
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

	// ---- FONKSİYON BİLEŞKE (Bileşke(...)) ----
	const funcCompRe = /^\s*Bileşke\s*\((.+)\)\s*$/i;  // <-- i flag var
	const compMatch = norm.match(funcCompRe);
	if (compMatch) {
		const inside = compMatch[1];
		const functions = inside.split(/\s*,\s*/).map(p => p.trim());
		return {
			type: "functionCompositions",
			functions
		};
	}

	// ---- FONKSİYON İŞLEMLERİ (f+g, 2f-3g, -f, -3g+1) 1----
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
			coefficients.push(coeffStr) // işaretli string
		}

		return { type: "functionOperations", functions, coefficients }
	}
	return { type: 'unknown' }
}
/* CLASSIFY METHOD END */

function capitalizeDizi(str) {
	return str.replace(/dizi/gi, match => {
		return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
	});
}
function capitalizeBileske(str) {
	return str.replace(/bileşke/gi, match => {
		return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
	});
}
function bileskeProcess(funcs) {
	return funcs.reduceRight((acc, f) => {
		return f.replace(/x/g, `(${acc})`);
	}, "x");
}

function inputKeyDown(evt, id) {
	resetSliders()
	handleParanthesis(evt)
	let allowKeys = '(){}[],=-+.*^/bdjmnşquvxyzCEFGHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(evt.key) && !allowKeys.includes(evt.key)) {
		evt.preventDefault()
	}
	if (evt.key === 'Enter') {
		let come = document.getElementById(id).value.toLowerCase()
		come = come.replaceAll('y=', '')
		come = come.replaceAll('=y', '')
		if (id == -1) { //Giriş input
			if (classify(come).type == 'point') {
				console.log('point çalıştı', come)

				let point = new mPoint(classify(come).x, classify(come).y, come)
				arrObjects.push(point)
				activeElementID = point.id
				setSlider(point)
				undoObjects = []
				delCount = 0
				objectsContainer.innerHTML = null
			} else if (classify(come).type == 'line') {
				console.log('line çalıştı', come)

				comeLine = normalizeExpr(come)
				let line
				if (classify(come).subtype == 'vertical') {
					line = new mLine(classify(comeLine).m, classify(comeLine).n, 'x=' + classify(comeLine).x)
					line.graph = null
					line.a = null
					line.b = null
				} else {
					line = new mLine(classify(comeLine).m, classify(comeLine).n, 'y=' + come)
				}
				if (getDrawableFunction(line.graph).status = true) {
					line.graphParse = getDrawableFunction(line.graph).parsedFunc
					arrObjects.push(line)
					activeElementID = line.id
					setSlider(line)
					undoObjects = []
					delCount = 0
					objectsContainer.innerHTML = null
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(line.graph).reason)
				}
			} else if (classify(come).type == 'sequence') {
				console.log('sequence çalıştı', come)

				come = capitalizeDizi(come)
				comeFunc = normalizeExpr(classify(come).expr)

				if (getDrawableFunction(comeFunc).status) {
					let seq = new mSequence(comeFunc, classify(come).start, classify(come).end, come)
					seq.graphParse = getDrawableFunction(comeFunc).parsedFunc
					arrObjects.push(seq)
					activeElementID = seq.id
					resetSliders()
					undoObjects = []
					delCount = 0
					objectsContainer.innerHTML = null
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(comeFunc).reason)
				}
			} else if (classify(come).type == 'functionOperations') {
				console.log('functionOperations çalıştı', come)

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
					} else {
						showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(comeWithFuncs).reason)
					}

				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
				}
			} else if (classify(come).type == 'functionCompositions') {
				console.log('functionCompositions çalıştı', come)

				come = capitalizeBileske(come)
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
					} else {
						showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(cometoBileske).reason)
					}
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
				}
			} else if (classify(come).type == 'unknown') {
				console.log('unknown çalıştı', come)
				let comeFunc = normalizeExpr(come)
				if (getDrawableFunction(comeFunc).status) {
					let func = new mFunction(comeFunc, 'y=' + come)
					func.graphParse = getDrawableFunction(comeFunc).parsedFunc
					arrObjects.push(func)
					activeElementID = func.id
					undoObjects = []
					delCount = 0
					objectsContainer.innerHTML = null
				} else {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız.' + getDrawableFunction(comeFunc).reason)
				}
			}
		} else {
			showToast('GİRİŞ', 'Giriş inputunda değilsin...')
		}
		drawCoordinates()
		fillSetWindow()
	}
}

function normalizeExpr(expr) {

	expr = expr.replace(/\s+/g, "") // boşlukları temizleyelim
	expr = expr.replace(/(^|[^\w])\-x/g, "$1-1*x") // -x → -1*x, +x → +1*x
	expr = expr.replace(/(^|[^\w])\+x/g, "$1+1*x")
	expr = expr.replace(/-\(/g, "-1*(") // 2) -(...) → -1*(...)
	expr = expr.replace(/(\d)\(/g, "$1*(") // sayı + ( → sayı*( 
	expr = expr.replace(/\)(\d)/g, ")*$1") // )sayı → )*sayı
	expr = expr.replace(/(\d)([a-zA-Z])/g, "$1*$2") // sayıharf (ör: 2x → 2*x)
	expr = expr.replace(/\^/g, "**") // üs işareti ^ → **
	return expr;
}


function normalizeExpr2(expr) { // neredeyse düzgün çalışıyor.
	expr = expr.replaceAll('-x', '-1x')
	expr = expr.replaceAll('+x', '+1x')
	let result = expr;
	result = result.replace(/-\s*\(/g, "-1*("); // -(...) → -1*(...)
	result = result.replace(/(\d)\s*\(/g, "$1*("); // sayı( → sayı*( 
	result = result.replace(/\)(\d)/g, ")*$1"); // 3) )sayı → )*sayı
	result = result.replace(/(\d)([a-zA-Z])/g, "$1*$2"); // 4) sayıharf (ör: 2x → 2*x)
	return result;
}

function handleParanthesis(e) {
	const el = e.target;
	const pairs = {
		'(': ')',
		'[': ']',
		'{': '}'
	};
	const closePairs = Object.fromEntries(Object.entries(pairs).map(([o, c]) => [c, o]));

	// --- Açılış parantezi yazma ---
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

	// --- Backspace ile silme kontrolü ---
	if (e.key === "Backspace") {
		const start = el.selectionStart;
		const end = el.selectionEnd;
		const value = el.value;

		// Seçim varsa normal silmeye izin ver
		if (start !== end) return;

		// Sol karakter bir açılış parantezi mi?
		const prevChar = value[start - 1];
		const nextChar = value[start];

		if (pairs[prevChar] && nextChar === pairs[prevChar]) {
			e.preventDefault();
			el.value = value.slice(0, start - 1) + value.slice(start + 1);
			el.selectionStart = el.selectionEnd = start - 1;
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
					line.graphParse = getDrawableFunction(line.graph).parsedFunc
					let x, y
					ctx.beginPath()
					ctx.strokeStyle = ctx.fill.style = line.color
					ctx.lineWidth = 2
					x = minX * unitY
					y = line.graphParse(x)
					ctx.moveTo(-minX * scaleY + (x * scaleY) / unitY, -minY * scaleX - (y * scaleX) / unitX)

					x = (minX + Math.round(canvas.width / scaleX) + 1) * unitY
					y = line.graphParse(x)
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
			line.graphParse = getDrawableFunction(line.graph).parsedFunc
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