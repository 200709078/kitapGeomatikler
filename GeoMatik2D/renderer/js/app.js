let canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const clearSound = new Audio("sound/clear.mp3")
let activeObject = 'select'
let activeElementID = null
let lineDrawing = false
let lineA, lineB
let lineSegmentDrawing = false
let distanceSegmentDrawing = false
let reflectPointDrawing = false
let intersectDrawing = false
let circleDrawing = false
let angleDrawing = false
let lineSegmentA, lineSegmentB
let distanceSegmentA, distanceSegmentB
let reflectPointA, reflectPointB
let intersectLineA, intersectLineB
let reflectPointCreatedA = false
let circleA, circleB, circleC
let angleA, angleB, angleC
let circleTangentCircle = null
let scaleX = 100
let scaleY = 100
let minX = -5
let minY = -5

let horizontalUnits = [1 / 10, 1 / 5, 1 / 2, 1, 2, Math.E, Math.PI, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
let verticalUnits = [1 / 10, 1 / 5, 1 / 2, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]
let tickX = 3
let unitX = verticalUnits[tickX]
let tickY = 3
let unitY = horizontalUnits[tickY]
let firstMousePos, lastMousePos, findPointPos = null
let arrObjects = []
let undoStack = []
let redoStack = []
let lastHistoryKey = null
let bigNames = "ABCDEFG"
let smallNames = "abccdefg"
let lineNames = "fghpqr"
let angleNames = "αβθ"
let sliders = document.getElementById('sliders')

let grabbing = false
let hitObject = null
let panStartMouse = null
let panStartMinX = 0
let panStartMinY = 0
let axisUnitDrag = null
const axisDragThreshold = 8
const axisDragStep = 35

let idCount = -1
function idCounter() {
	idCount++
	return idCount
}

function cloneHistoryState(state = arrObjects) {
	return structuredClone(state)
}

function resetTransientDrawingState() {
	lineDrawing = false
	lineSegmentDrawing = false
	distanceSegmentDrawing = false
	reflectPointDrawing = false
	intersectDrawing = false
	circleDrawing = false
	angleDrawing = false
	lineA = lineB = null
	lineSegmentA = lineSegmentB = null
	distanceSegmentA = distanceSegmentB = null
	reflectPointA = reflectPointB = null
	intersectLineA = intersectLineB = null
	reflectPointCreatedA = false
	circleA = circleB = circleC = null
	angleA = angleB = angleC = null
	circleTangentCircle = null
}

function commitHistoryState() {
	let historyKey = JSON.stringify(arrObjects)
	if (historyKey === lastHistoryKey) return
	undoStack.push(cloneHistoryState())
	lastHistoryKey = historyKey
	redoStack = []
	updateHistoryControlsState()
}

function restoreHistoryState(state) {
	arrObjects = cloneHistoryState(state)
	lastHistoryKey = JSON.stringify(arrObjects)
	activeElementID = null
	activeObject = 'select'
	resetTransientDrawingState()
	document.querySelectorAll('.toolWrapper .button').forEach(b => b.classList.remove('active'))
	document.getElementById('btnSelect').classList.add('active')
	drawAll()
	labelsCreator()
	updateHistoryControlsState()
}

function undoHistoryState() {
	if (undoStack.length <= 1) return
	redoStack.push(undoStack.pop())
	restoreHistoryState(undoStack[undoStack.length - 1])
}

function redoHistoryState() {
	if (redoStack.length == 0) return
	let nextState = redoStack.pop()
	undoStack.push(cloneHistoryState(nextState))
	restoreHistoryState(nextState)
}

function updateHistoryControlsState() {
	let undoButton = document.getElementById('undo')
	let redoButton = document.getElementById('redo')
	let clearButton = document.getElementById('clear')
	if (!undoButton || !redoButton || !clearButton) return

	undoButton.disabled = undoStack.length <= 1
	redoButton.disabled = redoStack.length == 0
	clearButton.disabled = arrObjects.length == 0
}

function getCanvasPixelPos(evt) {
	let rect = canvas.getBoundingClientRect()
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top,
	}
}

function getAxisDragTarget(evt) {
	let pixelPos = getCanvasPixelPos(evt)
	let xAxisY = -minY * scaleX
	let yAxisX = -minX * scaleY
	let nearXAxis = xAxisY >= 0 && xAxisY <= canvas.height && Math.abs(pixelPos.y - xAxisY) <= axisDragThreshold
	let nearYAxis = yAxisX >= 0 && yAxisX <= canvas.width && Math.abs(pixelPos.x - yAxisX) <= axisDragThreshold

	if (nearXAxis && nearYAxis) {
		return Math.abs(pixelPos.y - xAxisY) <= Math.abs(pixelPos.x - yAxisX) ? 'xAxis' : 'yAxis'
	}
	if (nearXAxis) return 'xAxis'
	if (nearYAxis) return 'yAxis'
	return null
}

function updateAxisUnitDrag(evt) {
	if (!axisUnitDrag) return false

	if (axisUnitDrag.axis == 'xAxis') {
		let delta = Math.trunc((evt.clientX - axisUnitDrag.startX) / axisDragStep)
		let nextTick = Math.max(0, Math.min(horizontalUnits.length - 1, axisUnitDrag.startTick + delta))
		let appliedDelta = nextTick - axisUnitDrag.startTick
		tickY = nextTick
		unitY = horizontalUnits[tickY]
		scaleY = axisUnitDrag.startScale * (appliedDelta >= 0 ? Math.pow(.95, appliedDelta) : Math.pow(1.05, -appliedDelta))
		return true
	}

	let delta = Math.trunc((axisUnitDrag.startY - evt.clientY) / axisDragStep)
	let nextTick = Math.max(0, Math.min(verticalUnits.length - 1, axisUnitDrag.startTick + delta))
	let appliedDelta = nextTick - axisUnitDrag.startTick
	tickX = nextTick
	unitX = verticalUnits[tickX]
	scaleX = axisUnitDrag.startScale * (appliedDelta >= 0 ? Math.pow(.95, appliedDelta) : Math.pow(1.05, -appliedDelta))
	return true
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
							console.log('reProjectAllOnOther: Type bulunamadı.')
						}
					} else if (o.type == 'onLine') {
						let line = arrObjects.find(item => item.id == o.lineId)
						let projection = getProjectionOnLine(line, obj.a, obj.b)
						if (projection.status) {
							obj.a = projection.a
							obj.b = projection.b
						}
					} else if (o.type == 'onAngle') {
						let angle = arrObjects.find(item => item.id == o.angleId)
						let projection = getProjectionOnAngle(angle, obj.a, obj.b)
						if (projection.status) {
							obj.a = projection.a
							obj.b = projection.b
						}
					} else if (o.type == 'reflectPoint') {
						let source = arrObjects.find(item => item.id == o.sourceId)
						let center = arrObjects.find(item => item.id == o.centerId)
						if (source && center) {
							let reflected = getReflectedPoint(source, center)
							obj.a = reflected.a
							obj.b = reflected.b
						}
					} else if (o.type == 'intersectLines') {
						let line1 = arrObjects.find(item => item.id == o.line1Id)
						let line2 = arrObjects.find(item => item.id == o.line2Id)
						let intersection = getObjectIntersection(line1, line2)
						let point = intersection.points[o.pointIndex || 0]
						if (point) {
							obj.a = point.a
							obj.b = point.b
						} else {
							obj.a = NaN
							obj.b = NaN
						}
						obj.intersectionStatus = intersection.reason
						if (obj.intersectionOwner) {
							obj.intersectionPointIds = arrObjects
								.filter(item => getIntersectionPointConstraint(item)?.ownerId == obj.id || item.id == obj.id)
								.map(item => item.id)
						}
					}
				})
			}
		}
	});
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
	} else if (type == 'lineSegment' || type == 'distanceSegment' || type == 'sequence' || type == 'circleR') {
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

document.querySelector('.toolWrapper').addEventListener('click', e => {
	const btn = e.target.closest('button')
	if (!btn || !btn.dataset.action) return
	document.querySelectorAll('.toolWrapper .button').forEach(b => b.classList.remove('active'))
	btn.classList.add('active')
	switch (btn.dataset.action) {
		case 'select':
			activeObject = 'select'
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
		case 'distancesegment':
			activeObject = 'distancesegment'
			break
		case 'reflectpoint':
			activeObject = 'reflectpoint'
			reflectPointDrawing = false
			reflectPointA = reflectPointB = null
			reflectPointCreatedA = false
			break
		case 'intersect':
			activeObject = 'intersect'
			intersectDrawing = false
			intersectLineA = intersectLineB = null
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
		case 'circletangent':
			activeObject = 'circletangent'
			circleTangentCircle = null
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

let toogleMenuClickTimer = null
document.getElementById('toogleMenuButton').addEventListener('click', function () {
	clearTimeout(toogleMenuClickTimer)
	toogleMenuClickTimer = setTimeout(function () {
		document.getElementById('toolWrapper').classList.toggle('vertical')
		updateToolWrapperRight()
	}, 200)
})

document.getElementById('toogleMenuButton').addEventListener('dblclick', function () {
	clearTimeout(toogleMenuClickTimer)
	document.getElementById('toolWrapper').classList.toggle('tools-hidden')
	updateToolWrapperRight()
})

document.getElementById('btnCalc').addEventListener('click', function () {
	activeObject = 'select'
	document.querySelectorAll('.toolWrapper .button').forEach(b => b.classList.remove('active'))
	document.getElementById('btnSelect').classList.add('active')
	toggleCalcIcon(document.getElementById('btnimgCalc'))
	document.getElementById('rightWrapper').classList.toggle('hide')
	updateToolWrapperRight()
	drawAll()
})

function handleCircleTangentMouseDown(evt) {
	if (!circleTangentCircle) {
		if (hitObject.hitType == 'circleR' || hitObject.hitType == 'circle2' || hitObject.hitType == 'circle3') {
			circleTangentCircle = hitObject.hit
			activeElementID = circleTangentCircle.id
			showToast('Teğet', 'Şimdi teğet çizilecek noktayı seçiniz.')
		} else {
			showToast('Teğet', 'Önce teğet çizilecek çemberi seçiniz.')
		}
		return
	}

	if (hitObject.hitType == 'point' || !hitObject.hit) {
		let circleTangentPoint
		if (hitObject.hitType == 'point') {
			circleTangentPoint = hitObject.hit
		} else {
			circleTangentPoint = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
			arrObjects.push(circleTangentPoint)
			labelsCreator()
			drawAll()
		}

		let tangentData = getCircleTangentLines(circleTangentPoint, circleTangentCircle)
		if (tangentData.status) {
			let tangent = new mCircleTangent(circleTangentPoint, circleTangentCircle)
			arrObjects.push(tangent)
			activeElementID = tangent.id
			commitHistoryState()
			circleTangentCircle = null
			labelsCreator()
			drawAll()
		} else if (tangentData.reason == 'inside') {
			showToast('Teğet', 'Seçilen nokta çemberin içinde olduğu için teğet çizilemez.')
		} else {
			showToast('Teğet', 'Bu çember için teğet çizilemedi.')
		}
	} else {
		showToast('Teğet', 'Teğet çizilecek noktayı seçiniz.')
	}
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

function girisKeyDown(event) {
	handleParanthesis(event)
	let allowKeys = '(){}[],=-+.;<>*^/_abcçdefgğhıijklmnoöpqrsştuüvwxyzCÇEFGĞHIJKMNOPQTUVWXYZBackspaceArrowLeftArrowRightShiftDelete'
	if (isNaN(event.key) && !allowKeys.includes(event.key)) {
		event.preventDefault()
	}
	if (event.key === 'Enter' && event.target.value != '') {
		let str = event.target.value
		if (isPoint(str).status) {
			let pt = new mPoint(isPoint(str).a, isPoint(str).b)
			arrObjects.push(pt)
			activeElementID = pt.id
			commitHistoryState()
		} else if (isCircleR(str).status) {
			let m = new mPoint(isCircleR(str).a, isCircleR(str).b)
			arrObjects.push(m)
			let c = new mCircleR(m, isCircleR(str).r)
			arrObjects.push(c)
			activeElementID = c.id
			commitHistoryState()
		} else if (isCircle2(str).status) {
			let A = new mPoint(isCircle2(str).m, isCircle2(str).n)
			arrObjects.push(A)
			let B = new mPoint(isCircle2(str).a, isCircle2(str).b)
			arrObjects.push(B)
			let c = new mCircle2(A, B)
			arrObjects.push(c)
			activeElementID = c.id
			commitHistoryState()
		} else if (isCircle3(str).status) {
			let A = new mPoint(isCircle3(str).ax, isCircle3(str).ay)
			arrObjects.push(A)
			let B = new mPoint(isCircle3(str).bx, isCircle3(str).by)
			arrObjects.push(B)
			let C = new mPoint(isCircle3(str).cx, isCircle3(str).cy)
			arrObjects.push(C)
			let c = new mCircle3(A, B, C)
			arrObjects.push(c)
			activeElementID = c.id
			commitHistoryState()
		} else if (isVerLine(str).status) {
			let vl = new mVerLine(isVerLine(str).x)
			arrObjects.push(vl)
			activeElementID = vl.id
			commitHistoryState()
		} else if (isLineWithEquation(str).status) {
			let l = new mLineWithEquation(isLineWithEquation(str).m, isLineWithEquation(str).n)
			arrObjects.push(l)
			activeElementID = l.id
			commitHistoryState()
		} else if (isLineWithPoints(str).status) {
			let A = new mPoint(isLineWithPoints(str).xA, isLineWithPoints(str).yA)
			arrObjects.push(A)
			let B = new mPoint(isLineWithPoints(str).xB, isLineWithPoints(str).yB)
			arrObjects.push(B)
			let line = new mLineWithPoints(A, B)
			arrObjects.push(line)
			activeElementID = line.id
			commitHistoryState()
		} else if (isLineSegment(str).status) {
			let A = new mPoint(isLineSegment(str).xA, isLineSegment(str).yA)
			arrObjects.push(A)
			let B = new mPoint(isLineSegment(str).xB, isLineSegment(str).yB)
			arrObjects.push(B)
			let lineSegment = new mLineSegment(A, B)
			arrObjects.push(lineSegment)
			activeElementID = lineSegment.id
			commitHistoryState()
		} else if (isDistanceSegment(str).status) {
			let A = new mPoint(isDistanceSegment(str).xA, isDistanceSegment(str).yA)
			arrObjects.push(A)
			let B = new mPoint(isDistanceSegment(str).xB, isDistanceSegment(str).yB)
			arrObjects.push(B)
			let distanceSegment = new mDistanceSegment(A, B)
			arrObjects.push(distanceSegment)
			activeElementID = distanceSegment.id
			commitHistoryState()
		} else if (isReflectPointInput(str).status) {
			let reflectInput = isReflectPointInput(str)
			let sourceResult = resolvePointArgument(reflectInput.sourceArg)
			let centerResult = resolvePointArgument(reflectInput.centerArg)

			if (!sourceResult.status || !centerResult.status) {
				if (sourceResult.created) arrObjects = arrObjects.filter(item => item.id !== sourceResult.point.id)
				if (centerResult.created) arrObjects = arrObjects.filter(item => item.id !== centerResult.point.id)
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Nokta bulunamadı veya oluşturulamadı.')
			} else {
				let reflectedPoint = createReflectedPoint(sourceResult.point, centerResult.point)
				arrObjects.push(reflectedPoint)
				activeElementID = reflectedPoint.id
			commitHistoryState()
			}
		} else if (isIntersectInput(str).status) {
			let intersectInput = isIntersectInput(str)
			let line1 = resolveLineByName(intersectInput.line1Name)
			let line2 = resolveLineByName(intersectInput.line2Name)

			if (!line1 || !line2 || line1.id == line2.id) {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. İki farklı nesne bulunmalı.')
			} else {
				let points = createIntersectionPoints(line1, line2)
				points.forEach(point => arrObjects.push(point))
				activeElementID = points[0].id
			commitHistoryState()
			}
		} else if (isAngle(str).status) {
			let A = new mPoint(isAngle(str).ax, isAngle(str).ay)
			arrObjects.push(A)
			let B = new mPoint(isAngle(str).bx, isAngle(str).by)
			arrObjects.push(B)
			let C = new mPoint(isAngle(str).cx, isAngle(str).cy)
			arrObjects.push(C)
			let angle = new mAngle(A, B, C)
			arrObjects.push(angle)
			activeElementID = angle.id
			commitHistoryState()
		} else if (isSequence(str).status) {
			let seq = new mSequence(isSequence(str).func, isSequence(str).start, isSequence(str).end)
			arrObjects.push(seq)
			activeElementID = seq.id
			commitHistoryState()
		} else if (isCircleTangentInput(str).status) {
			let circleTangentInput = isCircleTangentInput(str)
			let circle = resolveCircleByName(circleTangentInput.circleName)

			if (!circle) {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Çember bulunamadı.')
			} else {
				let pointResult = resolveCircleTangentPoint(circleTangentInput.pointArg)
				if (!pointResult.status) {
					showToast('GİRİŞ', 'Hatalı giriş yaptınız. Nokta bulunamadı veya oluşturulamadı.')
					return
				}

				let tangentData = getCircleTangentLines(pointResult.point, circle)
				if (tangentData.status) {
					let tangent = new mCircleTangent(pointResult.point, circle)
					arrObjects.push(tangent)
					activeElementID = tangent.id
			commitHistoryState()
				} else if (tangentData.reason == 'inside') {
					showToast('TeğetC', 'Seçilen nokta çemberin içinde olduğu için teğet çizilemez.')
				} else {
					showToast('TeğetC', 'Bu çember için teğet çizilemedi.')
				}
			}
		} else if (isLimit(str).status) {
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
			commitHistoryState()
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}
		} else if (isTangent(str).status) {
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
			commitHistoryState()
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}

		} else if (isTangentHX(str).status) {
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
			commitHistoryState()
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}

		} else if (isDerivative(str).status) {
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
			commitHistoryState()
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}

		} else if (isFunctionCompositions(str).status) {
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
			commitHistoryState()
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}
		} else if (isFunctionOperations(str).status) {
			const hepsiVarMi = isFunctionOperations(str).functions.every(name => arrObjects.some(f => f.name === name));
			if (hepsiVarMi) {
				let comeWithFuncs = str
				isFunctionOperations(str).functions.forEach(f => {
					comeWithFuncs = comeWithFuncs.replaceAll(f, '(' + arrObjects.find(o => o.name === f).func + ')')
				});
				let fo = new mFunction(comeWithFuncs)
				arrObjects.push(fo)
				activeElementID = fo.id
			commitHistoryState()
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
			}
		} else if (isFunction(str).status) {
			let f = new mFunction(isFunction(str).func)
			arrObjects.push(f)
			activeElementID = f.id
			commitHistoryState()
		} else if (isSectionalFunctions(str).status) {
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
			commitHistoryState()
			} else {
				showToast('GİRİŞ', 'Hatalı giriş yaptınız.')
			}

		} else {
			showToast('Hata', 'Girdi tanınamadı. Lütfen doğru formatta girdiğinizden emin olun.')
		}
		drawAll()
		labelsCreator()
		event.target.value = null
	}
}

function createLineEquation(A, B) {
	let m = (B.b - A.b) / (B.a - A.a)
	let c = A.b - m * A.a
	return {
		m: m,
		c: c
	}
}

function isMouseNearLineWithPoints(mousePos, A, B, threshold = 0.1) {
	if (A.a == B.a) {
		return Math.abs(mousePos.x - A.a) < threshold
	}

	let lineEq = createLineEquation(A, B)
	let expectedY = lineEq.m * mousePos.x + lineEq.c
	return Math.abs(mousePos.y - expectedY) < threshold
}

function isMouseNearLineSegment(mousePos, A, B, threshold = 0.1) {
	let withinSegment =
		mousePos.x >= Math.min(A.a, B.a) - threshold &&
		mousePos.x <= Math.max(A.a, B.a) + threshold &&
		mousePos.y >= Math.min(A.b, B.b) - threshold &&
		mousePos.y <= Math.max(A.b, B.b) + threshold

	if (!withinSegment) return false
	if (A.a == B.a) return Math.abs(mousePos.x - A.a) < threshold

	let lineEq = createLineEquation(A, B)
	let expectedY = lineEq.m * mousePos.x + lineEq.c
	return Math.abs(mousePos.y - expectedY) < threshold
}

function isMobile() {
	return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}




function hitPoint(mousePos, threshold) {
	for (const obj of arrObjects) {
		if (obj.type === 'point') {
			if (!Number.isFinite(Number(obj.a)) || !Number.isFinite(Number(obj.b))) continue
			const dx = mousePos.x - obj.a
			const dy = mousePos.y - obj.b
			const distance = Math.sqrt(dx * dx + dy * dy)

			if (distance < threshold) {
				return obj
			}
		}
	}
	return null
}

function hitLine(mousePos, obj, threshold) {
	if (obj.type === 'lineWithEquation') {
		let expectedY = math.evaluate(obj.func, { x: mousePos.x })
		return Math.abs(mousePos.y - expectedY) < threshold
	}
	if (obj.type === 'verLine') {
		return Math.abs(mousePos.x - obj.x) < threshold
	}
	if (obj.type === 'lineSegment' || obj.type === 'distanceSegment') {
		return isMouseNearLineSegment(mousePos, obj.A, obj.B, threshold)
	}
	if (obj.type === 'lineWithPoints') {
		return isMouseNearLineWithPoints(mousePos, obj.A, obj.B, threshold)
	}
	if (obj.type === 'circleTangent') {
		let tangentData = getCircleTangentLines(obj.A, obj.circle)
		return tangentData.status && tangentData.lines.some(line => isMouseNearLineWithPoints(mousePos, line.A, line.B, threshold))
	}
	if (obj.type === 'sequence') {
		let expectedY = math.evaluate(obj.func, { n: mousePos.x })
		return Math.abs(mousePos.y - expectedY) < threshold
	}
	return false
}

function hitCircle(mousePos, obj, threshold) {
	if (obj.type !== 'circleR' && obj.type !== 'circle2' && obj.type !== 'circle3') return false

	let r, distance
	if (obj.type === 'circleR') {
		r = obj.r
		distance = Math.sqrt((mousePos.x - obj.A.a) ** 2 + (mousePos.y - obj.A.b) ** 2)
	} else if (obj.type === 'circle2') {
		r = Math.sqrt((obj.B.a - obj.A.a) ** 2 + (obj.B.b - obj.A.b) ** 2)
		distance = Math.sqrt((mousePos.x - obj.A.a) ** 2 + (mousePos.y - obj.A.b) ** 2)
	} else if (obj.type === 'circle3') {
		let data = getCircle3RA(obj)
		r = data.r
		distance = Math.sqrt((mousePos.x - data.m) ** 2 + (mousePos.y - data.n) ** 2)
	}

	return Math.abs(distance - r) < threshold
}

function hitAngle(mousePos, obj, threshold) {
	return obj.type === 'angle' && (
		isMouseNearLineSegment(mousePos, obj.A, obj.B, threshold) ||
		isMouseNearLineSegment(mousePos, obj.B, obj.C, threshold)
	)
}

function getHitObject(mousePos) {
	const threshold = 0.1
	let point = hitPoint(mousePos, threshold)
	if (point) {
		canvas.style.cursor = 'pointer'
		return { hit: point, hitType: point.type }
	}

	for (const obj of arrObjects) {
		if (obj.type === 'point') continue
		if (hitLine(mousePos, obj, threshold) || hitCircle(mousePos, obj, threshold) || hitAngle(mousePos, obj, threshold)) {
			canvas.style.cursor = 'pointer'
			return { hit: obj, hitType: obj.type }
		}
	}

	canvas.style.cursor = 'default'
	return { hit: null, hitType: null }
}

document.addEventListener('DOMContentLoaded', function () {

	// document.addEventListener('contextmenu', event => event.preventDefault())

	let objectsContainer = document.getElementById('objectsContainer')
	drawAll()
	window.onresize = function () {
		canvas.width = innerWidth
		canvas.height = innerHeight
		updateToolWrapperRight()
		drawAll()
	}

	if (isMobile()) {
		document.getElementById('rightWrapper').classList.toggle('hide')
		toggleCalcIcon(document.getElementById('btnimgCalc'))
		updateToolWrapperRight()
		minX = -2
		minY = -3
		drawAll()
	}
	updateToolWrapperRight()
	observeRightWrapperSize()
	commitHistoryState()


	document.getElementById('undo').addEventListener('click', function (evt) {
		undoHistoryState()
	}, false)

	document.getElementById('clear').addEventListener('click', function (evt) {
		if (arrObjects.length != 0) {
			arrObjects = []
			commitHistoryState()
			activeElementID = null
			clearSound.play()
			activeObject = 'select'
			lineDrawing = false
			distanceSegmentDrawing = false
			reflectPointDrawing = false
			intersectDrawing = false
			reflectPointA = reflectPointB = null
			intersectLineA = intersectLineB = null
			reflectPointCreatedA = false
			circleTangentCircle = null
			document.querySelectorAll('.toolWrapper .button').forEach(b => b.classList.remove('active'))
			document.getElementById('btnSelect').classList.add('active')
			drawAll()
			objectsContainer.innerHTML = ''
		}
	}, false)

	document.getElementById('redo').addEventListener('click', function (evt) {
		redoHistoryState()
	}, false)

	canvas.addEventListener("wheel", (e) => {
		if (e.deltaY < 0) {
			if (0 < tickY) {
				scaleY *= 1.05
				tickY--
				unitY = horizontalUnits[tickY]
				drawAll()
			}
			if (0 < tickX) {
				scaleX *= 1.05
				tickX--
				unitX = verticalUnits[tickX]
				drawAll()
			}
		}
		if (e.deltaY > 0) {
			if (tickY < horizontalUnits.length - 1) {
				scaleY *= .95
				tickY++
				unitY = horizontalUnits[tickY]
				drawAll()
			}
			if (tickX < verticalUnits.length - 1) {
				scaleX *= .95
				tickX++
				unitX = verticalUnits[tickX]
				drawAll()
			}
		}
	})
	canvas.addEventListener("mousemove", function (evt) {
		let hoverHitObject = getHitObject(getMousePos(evt))
		if (activeObject == 'select' && !grabbing && !hoverHitObject.hit) {
			let axisTarget = getAxisDragTarget(evt)
			if (axisTarget == 'xAxis') canvas.style.cursor = 'ew-resize'
			if (axisTarget == 'yAxis') canvas.style.cursor = 'ns-resize'
		}
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
		if (activeObject === 'distancesegment') {
			drawAll()
			if (distanceSegmentDrawing) {
				let distanceSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawDistanceSegment(new mDistanceSegment(distanceSegmentA, distanceSegmentB, true))
			}
		}
		if (activeObject === 'reflectpoint') {
			drawAll()
			if (reflectPointDrawing) {
				let reflectPointB = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				let reflected = getReflectedPoint(reflectPointA, reflectPointB)
				drawPoint(reflectPointB)
				drawPoint(new mPoint(reflected.a, reflected.b, true))
			}
		}
		if (activeObject === 'intersect') {
			drawAll()
			if (intersectDrawing) {
				let hovered = getHitObject(getMousePos(evt)).hit
				if (isIntersectableObject(hovered) && hovered.id != intersectLineA.id) {
					let intersection = getObjectIntersection(intersectLineA, hovered)
					intersection.points.forEach(point => drawPoint(new mPoint(point.a, point.b, true)))
				}
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
			} else if (circleDrawing && circleA && circleB && !circleC) {
				let circleC = new mPoint(getMousePos(evt).x, getMousePos(evt).y, true)
				drawCircle3(new mAngle(circleA, circleB, circleC, true))
			}
		}

		if (grabbing && activeObject == 'select' && hitObject) {
			canvas.style.cursor = 'grabbing'
			if (axisUnitDrag) {
				canvas.style.cursor = axisUnitDrag.axis == 'xAxis' ? 'ew-resize' : 'ns-resize'
				updateAxisUnitDrag(evt)
				drawAll()
			} else if (hitObject.hitType == 'point') {
				hitObject.hit.a = getMousePos(evt).x
				hitObject.hit.b = getMousePos(evt).y
				reprojectAllOnOther()
				drawAll()
				labelsCreator()
			} else if (!hitObject.hit && panStartMouse) {
				let dx = evt.clientX - panStartMouse.x
				let dy = evt.clientY - panStartMouse.y
				minX = panStartMinX - dx / scaleY
				minY = panStartMinY - dy / scaleX
				drawAll()
				labelsCreator()
			}
		}

	}, false)

	canvas.addEventListener("mousedown", function (evt) {
		hitObject = getHitObject(getMousePos(evt))
		if (evt.button == 0) {
			if (activeObject === 'circletangent') {
				handleCircleTangentMouseDown(evt)
				hitObject = { hit: null, hitType: null }
				return
			}
			if (activeObject === 'intersect') {
				if (!intersectDrawing) {
					if (isIntersectableObject(hitObject.hit)) {
						intersectLineA = hitObject.hit
						intersectDrawing = true
						showToast('Kesiştir', 'Şimdi ikinci nesneyi seçiniz.')
					} else {
						showToast('Kesiştir', 'Önce kesiştirilecek nesneyi seçiniz.')
					}
				} else {
					if (isIntersectableObject(hitObject.hit) && hitObject.hit.id != intersectLineA.id) {
						intersectLineB = hitObject.hit
						let points = createIntersectionPoints(intersectLineA, intersectLineB)
						points.forEach(point => arrObjects.push(point))
						activeElementID = points[0].id
			commitHistoryState()
						intersectDrawing = false
						intersectLineA = intersectLineB = null
					} else {
						showToast('Kesiştir', 'Farklı bir nesne seçiniz.')
					}
				}
				hitObject = { hit: null, hitType: null }
			}
			if (activeObject === 'circletangent') {
				if (!circleTangentPoint) {
					if (hitObject.hitType == 'point' || !hitObject.hit) {
						if (hitObject.hitType == 'point') {
							circleTangentPoint = hitObject.hit
						} else {
							circleTangentPoint = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
							arrObjects.push(circleTangentPoint)
			commitHistoryState()
							labelsCreator()
							drawAll()
						}
						activeElementID = circleTangentPoint.id
						showToast('Teğet', 'Şimdi teğet çizilecek çemberi seçiniz.')
					} else {
						showToast('Teğet', 'Önce teğetin çizileceği noktayı seçiniz.')
					}
				} else {
					if (hitObject.hitType == 'circleR' || hitObject.hitType == 'circle2' || hitObject.hitType == 'circle3') {
						let tangentData = getCircleTangentLines(circleTangentPoint, hitObject.hit)
						if (tangentData.status) {
							let tangent = new mCircleTangent(circleTangentPoint, hitObject.hit)
							arrObjects.push(tangent)
							activeElementID = tangent.id
			commitHistoryState()
							circleTangentPoint = null
						} else if (tangentData.reason == 'inside') {
							showToast('Teğet', 'Seçilen nokta çemberin içinde olduğu için teğet çizilemez.')
						} else {
							showToast('Teğet', 'Bu çember için teğet çizilemedi.')
						}
					} else {
						showToast('Teğet', 'Teğet çizilecek çemberi seçiniz.')
					}
				}
				hitObject = { hit: null, hitType: null }
			}
			if (activeObject === 'point') {
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
				} else if (isPointAttachableLine(ownObject)) {
					let projection = getProjectionOnLine(ownObject, getMousePos(evt).x, getMousePos(evt).y)
					if (projection.status) {
						point = new mPoint(Number(projection.a).toFixed(2), Number(projection.b).toFixed(2))
						point.onOther.push({
							type: "onLine",
							lineId: ownObject.id
						})
					}
				} else {
					console.log('Mouse Down: Type bulunamadı.')
				}

				if (!point) return
				arrObjects.push(point)
				activeElementID = point.id
			commitHistoryState()
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
					commitHistoryState()
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
					commitHistoryState()
					lineSegmentDrawing = false
					lineSegmentA = lineSegmentB = null
				}
			}

			if (activeObject === 'distancesegment') {
				if (distanceSegmentDrawing == false) {
					distanceSegmentA
					hitObject.hitType == 'point' ? distanceSegmentA = hitObject.hit : distanceSegmentA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(distanceSegmentA)
					distanceSegmentDrawing = true
				} else {
					distanceSegmentB
					hitObject.hitType == 'point' ? distanceSegmentB = hitObject.hit : distanceSegmentB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
					if (!hitObject.hit) arrObjects.push(distanceSegmentB)
					let ds = new mDistanceSegment(distanceSegmentA, distanceSegmentB)
					arrObjects.push(ds)
					activeElementID = ds.id
					commitHistoryState()
					distanceSegmentDrawing = false
					distanceSegmentA = distanceSegmentB = null
				}
			}

			if (activeObject === 'reflectpoint') {
				if (reflectPointDrawing == false) {
					if (hitObject.hitType == 'point') {
						reflectPointA = hitObject.hit
						reflectPointCreatedA = false
					} else {
						reflectPointA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
						arrObjects.push(reflectPointA)
						reflectPointCreatedA = true
					}
					reflectPointDrawing = true
				} else {
					if (hitObject.hitType == 'point') {
						reflectPointB = hitObject.hit
					} else {
						reflectPointB = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
						arrObjects.push(reflectPointB)
					}

					let reflectedPoint = createReflectedPoint(reflectPointA, reflectPointB)
					arrObjects.push(reflectedPoint)
					activeElementID = reflectedPoint.id
			commitHistoryState()
					reflectPointDrawing = false
					reflectPointA = reflectPointB = null
					reflectPointCreatedA = false
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
					commitHistoryState()
					circleDrawing = false
					circleA = circleB = null
				}
			}
			if (activeObject === 'circle3') {
				if (!circleDrawing) {
					if (!circleA) {
						circleA
						hitObject.hitType == 'point' ? circleA = hitObject.hit : circleA = new mPoint(getMousePos(evt).x, getMousePos(evt).y)
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
					commitHistoryState()
					circleDrawing = false
					circleA = circleB = circleC = null
				}
			}
			if (activeObject === 'angle') {
				let mousePos = getMousePos(evt)
				if (!angleDrawing) {
					if (!angleA) {
						let pointResult = createPointFromHitOrMouse(hitObject, mousePos)
						angleA = pointResult.point
						if (pointResult.created) arrObjects.push(angleA)
					} else {
						let pointResult = createPointFromHitOrMouse(hitObject, mousePos)
						angleB = pointResult.point
						if (pointResult.created) arrObjects.push(angleB)
						angleDrawing = true
					}
				} else {
					let pointResult = createPointFromHitOrMouse(hitObject, mousePos)
					angleC = pointResult.point
					if (pointResult.created) arrObjects.push(angleC)
					let a = new mAngle(angleA, angleB, angleC)
					arrObjects.push(a)
					activeElementID = a.id
					commitHistoryState()
					angleDrawing = false
					angleA = angleB = angleC = null
				}
			}

			if (hitObject.hit) {
				activeElementID = hitObject.hit.id
				drawAll()
			}
		}

		if (activeObject == 'select') {
			grabbing = true
			canvas.style.cursor = 'grabbing'
			firstMousePos = getMousePos(evt)
			if (!hitObject.hit) {
				let axisTarget = getAxisDragTarget(evt)
				if (axisTarget) {
					axisUnitDrag = {
						axis: axisTarget,
						startX: evt.clientX,
						startY: evt.clientY,
						startTick: axisTarget == 'xAxis' ? tickY : tickX,
						startScale: axisTarget == 'xAxis' ? scaleY : scaleX,
					}
					canvas.style.cursor = axisTarget == 'xAxis' ? 'ew-resize' : 'ns-resize'
				} else {
					panStartMouse = { x: evt.clientX, y: evt.clientY }
					panStartMinX = minX
					panStartMinY = minY
				}
			}
		}
		drawAll()
		labelsCreator()
	}, false)

	canvas.addEventListener("mouseup", function (evt) {
		canvas.style.cursor = 'default'
		lastMousePos = getMousePos(evt)

		if (grabbing && activeObject == 'select') {

			if (hitObject.hitType == 'point') {
				hitObject.hit.a = lastMousePos.x
				hitObject.hit.b = lastMousePos.y
				reprojectAllOnOther()
				commitHistoryState()
			}

			grabbing = false
			panStartMouse = null
			axisUnitDrag = null
			lastMousePos = null
			drawAll()
			labelsCreator()
		}
		firstMousePos = lastMousePos = panStartMouse = axisUnitDrag = null
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
			if (distanceSegmentDrawing == true) {
				distanceSegmentDrawing = false
				distanceSegmentA = distanceSegmentB = null
				arrObjects.pop()
			}
			if (reflectPointDrawing == true) {
				reflectPointDrawing = false
				if (reflectPointCreatedA) arrObjects.pop()
				reflectPointA = reflectPointB = null
				reflectPointCreatedA = false
			}
			if (intersectDrawing == true) {
				intersectDrawing = false
				intersectLineA = intersectLineB = null
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
			circleTangentCircle = null
			activeElementID = null

			activeObject = 'select'
			document.querySelectorAll('.toolWrapper .button').forEach(b => b.classList.remove('active'))
			document.getElementById('btnSelect').classList.add('active')

			drawAll()
			labelsCreator()
		}
	}, false)

	let reSizer = document.querySelector(".reSizer")
	let rightWrapper = document.querySelector(".rightWrapper")

	function initResizerFunction(reSizer, rightWrapper) {
		let x, w
		function mouseDownHand(e) {
			let calcButton = document.getElementById('btnCalc')
			rightWrapper.style.transition = "all 0s"
			if (calcButton) calcButton.style.transition = "right 0s"
			x = e.clientX
			let sbWidth = window.getComputedStyle(rightWrapper).width
			w = parseInt(sbWidth, 10)
			document.addEventListener('mousemove', mouseMoveHand)
			document.addEventListener('mouseup', mouseUpHand)
		}

		function mouseMoveHand(evt) {
			let dx = evt.clientX - x
			let cw = w - dx
			let minWidth = 260
			let maxWidth = Math.min(700, innerWidth - 90)
			cw = Math.max(minWidth, Math.min(maxWidth, cw))
			rightWrapper.style.width = cw + "px"
			updateToolWrapperRight()
		}
		function mouseUpHand() {
			let calcButton = document.getElementById('btnCalc')
			rightWrapper.style.transition = "all 1s"
			if (calcButton) calcButton.style.transition = ""
			document.removeEventListener('mouseup', mouseUpHand)
			document.removeEventListener('mousemove', mouseMoveHand)
		}
		reSizer.addEventListener('mousedown', mouseDownHand)
	}

	initResizerFunction(reSizer, rightWrapper)
})
