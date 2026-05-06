function isObjectUsedByOther(target) {
	if (target.onOther && target.onOther.length > 0) return true

	return arrObjects.some(obj => {
		if (obj.id === target.id) return false
		if (obj.A?.id === target.id) return true
		if (obj.B?.id === target.id) return true
		if (obj.C?.id === target.id) return true
		if (obj.circle?.id === target.id) return true

		return obj.onOther?.some(dep =>
			dep.circleId === target.id ||
			dep.lineId === target.id ||
			dep.angleId === target.id ||
			dep.sourceId === target.id ||
			dep.centerId === target.id ||
			dep.line1Id === target.id ||
			dep.line2Id === target.id ||
			dep.ownerId === target.id
		)
	})
}

function labelsCreator() {
	reprojectAllOnOther()
	objectsContainer.innerHTML = ""
	arrObjects.forEach(item => {
		if (item.hideInLabels) return
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

		let btnSil = document.createElement('button')
		btnSil.classList = 'btn sil'
		btnSil.title = 'Sil'
		btnSil.hidden = isObjectUsedByOther(item)

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
		btnGizle.addEventListener('click', (e) => visibilityBtnClick(e))

		sliderA.addEventListener('input', () => crossSlider())
		sliderB.addEventListener('input', () => crossSlider())

		input.style.height = '24px'
		output.innerHTML = ''
		if (item.type == 'point') {
			let reflectConstraint = getReflectPointConstraint(item)
			let intersectionConstraint = getIntersectionPointConstraint(item)
			if (reflectConstraint) {
				let source = arrObjects.find(obj => obj.id == reflectConstraint.sourceId)
				let center = arrObjects.find(obj => obj.id == reflectConstraint.centerId)
				labelA.hidden = true
				sliderA.hidden = true
				labelB.hidden = true
				sliderB.hidden = true
				input.value = 'YansıtNokta(' + (source ? source.name : '?') + ',' + (center ? center.name : '?') + ')'
				output.value = item.name + '=(' + getPointDisplayCoordinate(item.a) + ',' + getPointDisplayCoordinate(item.b) + ')'
			} else if (intersectionConstraint) {
				let line1 = arrObjects.find(obj => obj.id == intersectionConstraint.line1Id)
				let line2 = arrObjects.find(obj => obj.id == intersectionConstraint.line2Id)
				labelA.hidden = true
				sliderA.hidden = true
				labelB.hidden = true
				sliderB.hidden = true
				input.value = item.name + '=Kesiştir(' + (line1 ? line1.name : '?') + ',' + (line2 ? line2.name : '?') + ')'
				output.innerHTML = getIntersectionOutput(item)
			} else {
				input.value = item.name + "=(" + Number(item.a).toFixed(2) + "," + Number(item.b).toFixed(2) + ")"
			}
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
			input.value = item.name + ': Açı(' + item.A.name + ',' + item.B.name + ',' + item.C.name + ')'
			output.value = item.name + '=' + formatAngleValue(getAngleMeasure(item)) + '°'
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
		} else if (item.type == 'distanceSegment') {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': Uzaklık((' + item.A.a + ',' + item.A.b + '), ' + '(' + item.B.a + ',' + item.B.b + '))'
		} else if (item.type == 'circleTangent') {
			labelA.hidden = true
			sliderA.hidden = true
			labelB.hidden = true
			sliderB.hidden = true
			input.value = item.name + ': Teğet(' + item.A.name + ',' + item.circle.name + ')'
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
			console.log('labelsCreator: Type bulunamadı.')
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
		exprDiv.appendChild(btnSil)
		emptyDiv.appendChild(exprDiv)
		emptyDiv.appendChild(sliderDiv)
		emptyDiv.appendChild(document.createElement('hr'))
		objectsContainer.prepend(emptyDiv)
	})
}

function toggleCalcIcon(imgEl) {
	imgEl.classList.toggle('panel-hidden')
}

function updateCalcButtonPosition() {
	let calcButton = document.getElementById('btnCalc')
	let rightWrapper = document.getElementById('rightWrapper')
	if (!calcButton || !rightWrapper) return

	calcButton.style.right = rightWrapper.classList.contains('hide') ? '0px' : rightWrapper.getBoundingClientRect().width + 'px'
}

function observeRightWrapperSize() {
	let rightWrapper = document.getElementById('rightWrapper')
	if (!rightWrapper || typeof ResizeObserver === 'undefined') return

	let rightWrapperObserver = new ResizeObserver(updateToolWrapperRight)
	rightWrapperObserver.observe(rightWrapper)
	rightWrapper.addEventListener('transitionend', updateToolWrapperRight)
}

function updateToolWrapperRight() {
	let toolWrapper = document.getElementById('toolWrapper')
	let rightWrapper = document.getElementById('rightWrapper')
	if (!toolWrapper || !rightWrapper) return

	updateCalcButtonPosition()

	if (toolWrapper.classList.contains('vertical')) {
		toolWrapper.style.right = ''
		return
	}

	toolWrapper.style.right = rightWrapper.classList.contains('hide') ? '0px' : rightWrapper.offsetWidth + 'px'
}

function closeHelp() {
	activeObject = 'select'
	document.querySelectorAll('.toolWrapper .button').forEach(b => b.classList.remove('active'))
	document.getElementById('btnSelect').classList.add('active')
	document.getElementById('help-popup').style.display = 'none';
}

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
	if (getReflectPointConstraint(activeitem) || getIntersectionPointConstraint(activeitem) || activeitem.type == 'sequence' || activeitem.type == 'lineSegment' || activeitem.type == 'distanceSegment' || activeitem.type == 'circleTangent' || activeitem.type == 'lineWithPoints' || activeitem.type == 'sectionalFunctions' || activeitem.type == 'function' || activeitem.type == 'circle2' || activeitem.type == 'circle3' || activeitem.type == 'angle' || activeitem.type == 'functioncomposition' || activeitem.type == 'derivative') {
		document.getElementById(activeElementID + '-labelA').hidden = true
		document.getElementById(activeElementID + '-sliderA').hidden = true
		document.getElementById(activeElementID + '-labelB').hidden = true
		document.getElementById(activeElementID + '-sliderB').hidden = true
	}
	drawAll()
}

function digerKeyDown(evt, id) {
	let allowKeys = '(){}[],=-+.;<>*^/_abcçdefgğhıijklmnoöpqrsştuüvwxyzCÇEFGĞHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(evt.key) && !allowKeys.includes(evt.key)) {
		evt.preventDefault()
	}
	if (evt.key === 'Enter') {
		console.log(id, ' id li giriş.')
	}
}

function handleParanthesis(e) {
	const el = e.target
	const pairs = {
		'(': ')',
		'[': ']',
		'{': '}'
	}
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
	let elementid = e.target.closest("div").children[0].id
	let delid = elementid.substring(0, elementid.indexOf("-"))

	arrObjects = arrObjects.filter(item => item.id !== Number(delid));
	commitHistoryState()

	activeElementID = null
	activeObject = 'select'
	document.querySelectorAll('.toolWrapper .button').forEach(b => b.classList.remove('active'))
	document.getElementById('btnSelect').classList.add('active')

	drawAll()
	labelsCreator()
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
	commitHistoryState()
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

		if (getReflectPointConstraint(item) || getIntersectionPointConstraint(item)) {
			labelsCreator()
			drawAll()
			return
		}

		if (item.type == 'point') {
			labelA.innerHTML = 'a = ' + sliderA.value
			item.a = Number(sliderA.value)
			labelB.innerHTML = 'b = ' + sliderB.value
			item.b = Number(sliderB.value)
			input.value = item.name + '(' + item.a + ',' + item.b + ')'

			let ownerS = arrObjects.filter(obj => {
				const validTypes = ['lineSegment', 'distanceSegment', 'lineWithPoints', 'circle', 'circle2', 'circle3', 'angle'];
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
				} else if (owner.type === 'distanceSegment') {
					inputOwner.value = owner.name + ': Uzaklık((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '))'
				} else if (owner.type === 'circleR') {
					inputOwner.value = owner.name + ': Çember((' + owner.A.a + ',' + owner.A.b + '),' + owner.r + ')'
				} else if (owner.type === 'circle2') {
					inputOwner.value = owner.name + ': Çember((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '))'
				} else if (owner.type === 'circle3') {
					inputOwner.value = owner.name + ': Çember((' + owner.A.a + ',' + owner.A.b + '),(' + owner.B.a + ',' + owner.B.b + '),(' + owner.C.a + ',' + owner.C.b + '))'
				} else if (owner.type === 'angle') {
					inputOwner.value = owner.name + ': Açı(' + owner.A.name + ',' + owner.B.name + ',' + owner.C.name + ')'
					document.getElementById(owner.id + '-output').value = owner.name + '=' + formatAngleValue(getAngleMeasure(owner)) + '°'
				}
			});
			reprojectAllOnOther()
			updateReflectPointRows()
			updateIntersectionPointRows()
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
			console.log('crossSlider: Type bulunamadı.')
		}
	}
	reprojectAllOnOther()
	updateReflectPointRows()
	updateIntersectionPointRows()
	drawAll()
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
