function text2canvas(x, y, style, align, font, text) {
	ctx.fillStyle = style
	ctx.textAlign = align
	ctx.font = font
	ctx.fillText(text, x, y)
	ctx.textAlign = 'left'
	ctx.font = '10px arial'
}

function formatAxisLabel(n, unit, symbol = null) {
	if (symbol) {
		if (n == 0) return '0'
		if (n == 1) return symbol
		if (n == -1) return '-' + symbol
		return n + symbol
	}
	return formatDisplayNumber(n * unit)
}

function drawAll() {
	reprojectAllOnOther()
	ctx.strokeStyle = ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, innerWidth, innerHeight)

	const minorStep = 0.2
	const axisEpsilon = 0.000001
	const firstHorizontalGrid = Math.floor(minY / minorStep) * minorStep
	const lastHorizontalGrid = minY + canvas.height / scaleX
	for (let gridY = firstHorizontalGrid; gridY <= lastHorizontalGrid + axisEpsilon; gridY += minorStep) {
		gridY = Number(gridY.toFixed(10))
		let canvasY = (gridY - minY) * scaleX
		let majorGridY = Math.round(gridY)
		let isMajor = Math.abs(gridY - majorGridY) < axisEpsilon

		ctx.beginPath()
		ctx.lineWidth = isMajor ? .5 : .2
		ctx.strokeStyle = "black"
		if (Math.abs(gridY) < axisEpsilon) {
			ctx.lineWidth = 2
			ctx.strokeStyle = "red"
		}
		ctx.moveTo(0, canvasY)
		ctx.lineTo(canvas.width, canvasY)
		ctx.stroke()
		ctx.closePath()

		if (isMajor && Math.abs(majorGridY * unitX) >= axisEpsilon) {
			let txt = formatDisplayNumber(-majorGridY * unitX)
			text2canvas(-minX * scaleY + 10, canvasY + 15, 'black', 'center', '15px arial', txt)
		}
	}
	let xAxisSymbol = null
	if (Math.abs(unitY - Math.E) < 0.0001) xAxisSymbol = 'e'
	if (Math.abs(unitY - Math.PI) < 0.0001) xAxisSymbol = '\u03c0'
	const firstVerticalGrid = Math.floor(minX / minorStep) * minorStep
	const lastVerticalGrid = minX + canvas.width / scaleY
	for (let gridX = firstVerticalGrid; gridX <= lastVerticalGrid + axisEpsilon; gridX += minorStep) {
		gridX = Number(gridX.toFixed(10))
		let canvasX = (gridX - minX) * scaleY
		let majorGridX = Math.round(gridX)
		let isMajor = Math.abs(gridX - majorGridX) < axisEpsilon

		ctx.beginPath()
		ctx.lineWidth = isMajor ? .6 : .2
		ctx.strokeStyle = "black"
		if (Math.abs(gridX) < axisEpsilon) {
			ctx.lineWidth = 2
			ctx.strokeStyle = "red"
		}
		ctx.moveTo(canvasX, 0)
		ctx.lineTo(canvasX, canvas.height)
		ctx.stroke()
		ctx.closePath()

		if (isMajor) {
			let txt = formatAxisLabel(majorGridX, unitY, xAxisSymbol)
			text2canvas(canvasX + 10, -minY * scaleX + 15, 'black', 'center', '15px arial', txt)
		}
	}
	if (angleA && angleB) drawLineSegment(new mLineSegment(angleA, angleB, true))

	arrObjects.sort(function (a, b) { return a.id - b.id })
	for (let i = arrObjects.length - 1; i >= 0; i--) {
		const item = arrObjects[i]
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
		} else if (item.type === 'distanceSegment') {
			drawDistanceSegment(item)
		} else if (item.type === 'circleTangent') {
			drawCircleTangent(item)
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
		} else { console.log('drawAll: Type bulunamadÄ±.') }
	}
}

function drawPoint(point) {
	if (!point.visibility) return
	if (!Number.isFinite(Number(point.a)) || !Number.isFinite(Number(point.b))) return
	ctx.beginPath()

	let pSize
	point.id == activeElementID ? pSize = point.size + 2 : pSize = point.size
	let pColor = point.color
	if (point.temp) pColor = '#000000'

	ctx.strokeStyle = 'black'
	ctx.fillStyle = pColor
	ctx.arc((-minX + point.a / unitY) * scaleY, (-minY - point.b / unitX) * scaleX, pSize, 0, 2 * Math.PI)
	ctx.lineWidth = 1
	if (!point.temp) text2canvas((-minX + point.a / unitY) * scaleY - 10, (-minY - point.b / unitX) * scaleX - 5, pColor, 'center', 'bold 15px arial', point.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function getCircleCanvasRadii(r) {
	return {
		x: Math.abs((r / unitY) * scaleY),
		y: Math.abs((r / unitX) * scaleX),
	}
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
	let canvasR = getCircleCanvasRadii(circle.r)
	ctx.beginPath()
	ctx.strokeStyle = cColor
	ctx.ellipse((-minX + circle.A.a / unitY) * scaleY, (-minY - circle.A.b / unitX) * scaleX, canvasR.x, canvasR.y, 0, 0, 2 * Math.PI)
	ctx.lineWidth = cSize
	if (!circle.temp) text2canvas((-minX + circle.A.a / unitY) * scaleY - canvasR.x * 0.75, (-minY - circle.A.b / unitX) * scaleX - canvasR.y * 0.75, cColor, 'center', 'bold 15px arial', circle.name)
	text2canvas((-minX + (circle.A.a + sp.a) / 2 / unitY) * scaleY, (-minY - (circle.A.b + sp.b) / 2 / unitX) * scaleX, cColor, 'center', 'bold 15px arial', 'r = ' + formatDisplayNumber(circle.r))
	ctx.stroke()
	ctx.closePath()
}

function drawCircle2(circle) {
	if (!circle.visibility) return

	let r = math.sqrt(math.pow(circle.B.a - circle.A.a, 2) + math.pow(circle.B.b - circle.A.b, 2))
	let cSize
	circle.id == activeElementID ? cSize = circle.size + 1 : cSize = circle.size
	let cColor = circle.color
	if (circle.temp) cColor = '#000000'
	let canvasR = getCircleCanvasRadii(r)
	ctx.beginPath()
	ctx.strokeStyle = cColor
	ctx.ellipse((-minX + circle.A.a / unitY) * scaleY, (-minY - circle.A.b / unitX) * scaleX, canvasR.x, canvasR.y, 0, 0, 2 * Math.PI)
	ctx.lineWidth = cSize
	if (!circle.temp) text2canvas((-minX + circle.A.a / unitY) * scaleY - canvasR.x * 0.75, (-minY - circle.A.b / unitX) * scaleX - canvasR.y * 0.75, cColor, 'center', 'bold 15px arial', circle.name)
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
	let canvasR = getCircleCanvasRadii(mr.r)
	ctx.beginPath()
	ctx.strokeStyle = cColor
	ctx.ellipse((-minX + mr.m / unitY) * scaleY, (-minY - mr.n / unitX) * scaleX, canvasR.x, canvasR.y, 0, 0, 2 * Math.PI)
	ctx.lineWidth = cSize
	if (!circle.temp) text2canvas((-minX + mr.m / unitY) * scaleY - canvasR.x * 0.75, (-minY - mr.n / unitX) * scaleX - canvasR.y * 0.75, cColor, 'center', 'bold 15px arial', circle.name)
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
	text2canvas((-minX + vline.x / unitY) * scaleY + 10, 15, vlColor, 'center', 'bold 15px arial', vline.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function drawLineWithEquation(line) {
	if (!line.visibility) return

	let mostLeft = minX * unitY
	let mostRight = (minX + canvas.width / scaleY) * unitY
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
	if (!line.temp) text2canvas((-minX + (-minY - line.n) / line.m) * scaleY + 5, 20, lColor, 'center', 'bold 15px arial', line.name)
	ctx.fill()
	ctx.stroke()
	ctx.closePath()
}

function drawLineWithPoints(pl, useOwnColorForTemp = false) {
	if (!pl.visibility) return

	let plSize
	pl.id == activeElementID ? plSize = pl.size + 1 : plSize = pl.size
	let plColor = pl.color
	if (pl.temp && !useOwnColorForTemp) plColor = '#000000'

	if (pl.A.a == pl.B.a && pl.A.b != pl.B.b) {
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
		if (!pl.temp) text2canvas((-minX + (-minY - createLineEquation(pl.A, pl.B).c) / createLineEquation(pl.A, pl.B).m) * scaleY + 5, 20, plColor, 'center', 'bold 15px arial', pl.name)
		ctx.fill()
		ctx.stroke()
		ctx.closePath()
	}
}

function drawCircleTangent(tangent) {
	if (!tangent.visibility) return

	let tangentData = getCircleTangentLines(tangent.A, tangent.circle)
	if (!tangentData.status) return

	tangentData.lines.forEach(line => {
		line.color = tangent.color
		line.size = tangent.id == activeElementID ? tangent.size + 1 : tangent.size
		line.visibility = tangent.visibility
		drawLineWithPoints(line, true)
	})

	if (!tangent.temp) {
		let labelX = (-minX + tangent.A.a / unitY) * scaleY + 12
		let labelY = (-minY - tangent.A.b / unitX) * scaleX - 12
		text2canvas(labelX, labelY, tangent.color, 'center', 'bold 15px arial', tangent.name)
	}
}

function getFunctionPoint(funcStr, x) {
	let y = math.evaluate(funcStr, { x: x })
	if (!isFinite(y)) return null

	return {
		x: x,
		y: y,
		canvasX: -minX * scaleY + (x * scaleY) / unitY,
		canvasY: -minY * scaleX - (y * scaleX) / unitX,
	}
}

function isCanvasYVisible(canvasY) {
	return canvasY >= 0 && canvasY <= canvas.height
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
	let firstPoint = true
	let startCanvasX = Math.max(0, Math.ceil((-minX + startX / unitY) * scaleY))
	let endCanvasX = Math.min(canvas.width, Math.floor((-minX + endX / unitY) * scaleY))
	let lastInvalidCanvasX = null

	for (let canvasX = startCanvasX; canvasX <= endCanvasX; canvasX++) {
		let x = (canvasX / scaleY + minX) * unitY
		let point = getFunctionPoint(lastFunc, x)
		if (!point) {
			firstPoint = true
			prevCanvasY = null
			lastInvalidCanvasX = canvasX
			continue
		}

		let startPoint = null
		if (firstPoint && lastInvalidCanvasX !== null && isCanvasYVisible(point.canvasY)) {
			startPoint = {
				canvasX: lastInvalidCanvasX,
				canvasY: point.canvasY > canvas.height / 2 ? canvas.height + 100 : -100,
			}
		}

		// ASIMPTOT KONTROLÃœ
		if (prevCanvasY !== null && Math.abs(point.canvasY - prevCanvasY) > jumpThreshold) {
			firstPoint = true
			prevCanvasY = point.canvasY
			continue
		}

		if (firstPoint) {
			if (startPoint) {
				ctx.moveTo(startPoint.canvasX, startPoint.canvasY)
				ctx.lineTo(point.canvasX, point.canvasY)
			} else {
				ctx.moveTo(point.canvasX, point.canvasY)
			}
			firstPoint = false
		} else {
			ctx.lineTo(point.canvasX, point.canvasY)
		}

		lastInvalidCanvasX = null
		prevCanvasY = point.canvasY
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
		text2canvas((-minX + n / unitY) * scaleY - 10, (-minY - y / unitX) * scaleX - 5, seqColor, 'center', 'bold 15px arial', seq.name + n)
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
	// TÃ¼rev (.)
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

	//TeÄŸet DoÄŸrusu
	let m = math.evaluate(derivative(tur.func), { x: tur.approachVal })
	let c = math.evaluate(tur.func, { x: tur.approachVal }) - m * tur.approachVal
	tur.tngLine = new mLineWithEquation(m, c, true)
	if (tur.id == activeElementID) drawLineWithEquation(tur.tngLine)

}

function drawTangentHX(turHX) {
	if (!turHX.visibility) return
	drawFunction(turHX)

	// TÃ¼revH (.)
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

	// TÃ¼revH (+h)
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

	//AnlÄ±k DeÄŸiÅŸim OranÄ±
	drawLineWithPoints(new mLineWithPoints(turHX.aodLine.A, turHX.aodLine.B, true))

	//TeÄŸet DoÄŸrusu
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
	if (!ls.temp) text2canvas((-minX + ((ls.A.a + ls.B.a) / 2) / unitY) * scaleY - 10, (-minY - ((ls.A.b + ls.B.b) / 2) / unitX) * scaleX - 10, lsColor, 'center', 'bold 15px arial', ls.name)
	ctx.stroke()
	ctx.setLineDash([])
	ctx.closePath()
}

function formatDistanceValue(value) {
	return formatDisplayNumber(value)
}

function formatAngleValue(value) {
	return formatDisplayNumber(value)
}

function drawDistanceSegment(ds) {
	if (!ds.visibility) return

	let dsColor = ds.temp ? '#000000' : ds.color
	let distance = distanceAB(ds.A, ds.B)
	let midX = (-minX + ((Number(ds.A.a) + Number(ds.B.a)) / 2) / unitY) * scaleY
	let midY = (-minY - ((Number(ds.A.b) + Number(ds.B.b)) / 2) / unitX) * scaleX
	let label = ds.temp ? formatDistanceValue(distance) + ' br' : ds.name + '=' + formatDistanceValue(distance) + ' br'
	text2canvas(midX, midY - 10, dsColor, 'center', 'bold 15px arial', label)
}

function drawMeasuredArc(arcInfo, color, lineWidth) {
	if (!arcInfo || arcInfo.span <= 0) return

	let circleData = arcInfo.circleData
	let steps = Math.max(16, Math.ceil(arcInfo.span / 6))
	let radius = circleData.r

	ctx.beginPath()
	ctx.strokeStyle = color
	ctx.lineWidth = lineWidth
	for (let i = 0; i <= steps; i++) {
		let angle = (arcInfo.startAngle + arcInfo.span * i / steps) * Math.PI / 180
		let x = (-minX + (circleData.m + radius * Math.cos(angle)) / unitY) * scaleY
		let y = (-minY - (circleData.n + radius * Math.sin(angle)) / unitX) * scaleX
		if (i == 0) ctx.moveTo(x, y)
		else ctx.lineTo(x, y)
	}
	ctx.stroke()
	ctx.closePath()

	let midAngle = (arcInfo.startAngle + arcInfo.span / 2) * Math.PI / 180
	let labelRadius = radius + 0.2
	let labelX = (-minX + (circleData.m + labelRadius * Math.cos(midAngle)) / unitY) * scaleY
	let labelY = (-minY - (circleData.n + labelRadius * Math.sin(midAngle)) / unitX) * scaleX
	text2canvas(labelX, labelY, color, 'center', 'bold 15px arial', formatAngleValue(arcInfo.span) + '\u00b0')
}

function drawScaledAngleArc(cx, cy, startAngle, span, radius, color, lineWidth) {
	let steps = Math.max(16, Math.ceil(span / 6))
	let radiusX = radius * scaleY / unitY
	let radiusY = radius * scaleX / unitX

	ctx.beginPath()
	ctx.strokeStyle = color
	ctx.lineWidth = lineWidth
	for (let i = 0; i <= steps; i++) {
		let angle = (startAngle + span * i / steps) * Math.PI / 180
		let x = cx + radiusX * Math.cos(angle)
		let y = cy + radiusY * Math.sin(angle)
		if (i == 0) ctx.moveTo(x, y)
		else ctx.lineTo(x, y)
	}
	ctx.stroke()
	ctx.closePath()
}


function drawAngle(ag) {
	if (!ag.visibility) return
	let agSize
	ag.id == activeElementID ? agSize = ag.size + 1 : agSize = ag.size
	let agColor = ag.color
	if (ag.temp) agColor = '#000000'
	// AÃ§Ä±
	ctx.beginPath()
	ctx.strokeStyle = agColor
	ctx.lineWidth = agSize
	ctx.moveTo((-minX + ag.A.a / unitY) * scaleY, (-minY - ag.A.b / unitX) * scaleX)
	ctx.lineTo((-minX + ag.B.a / unitY) * scaleY, (-minY - ag.B.b / unitX) * scaleX)
	ctx.lineTo((-minX + ag.C.a / unitY) * scaleY, (-minY - ag.C.b / unitX) * scaleX)
	ctx.stroke()
	ctx.closePath()

	//Sembol ve Ã¶lÃ§Ã¼
	let angles = calculateAngle(ag)
	let angleBetween = getAngleMeasure(ag)
	let cx = (-minX + ag.B.a / unitY) * scaleY
	let cy = (-minY - ag.B.b / unitX) * scaleX
	let startAngle = 360 - angles.angleBC
	let endAngle = startAngle + angleBetween

	drawScaledAngleArc(cx, cy, startAngle, angleBetween, 0.2, agColor, agSize + 1)
	let textAngle = (startAngle + angleBetween / 2) * Math.PI / 180
	let textRadiusX = 0.35 * scaleY / unitY
	let textRadiusY = 0.35 * scaleX / unitX
	text2canvas(cx + textRadiusX * Math.cos(textAngle), cy + textRadiusY * Math.sin(textAngle), agColor, 'center', 'bold 15px arial', ag.name + '=' + formatAngleValue(angleBetween) + '\u00b0')
	drawMeasuredArc(getAngleArcInfo(ag, angleBetween), agColor, agSize + 1)
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
