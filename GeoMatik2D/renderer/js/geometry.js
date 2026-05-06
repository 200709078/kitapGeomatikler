function distanceAB(A, B) {
	return Math.sqrt(Math.pow(B.b - A.b, 2) + Math.pow(B.a - A.a, 2))
}

function getReflectedPoint(source, center) {
	return {
		a: 2 * Number(center.a) - Number(source.a),
		b: 2 * Number(center.b) - Number(source.b),
	}
}

function createPrimePointName(sourceName) {
	let baseName = sourceName + "'"
	let name = baseName
	let i = 1
	let names = arrObjects.map(item => item.name)

	while (names.includes(name)) {
		name = baseName + i
		i++
	}
	return name
}

function createReflectedPoint(source, center) {
	let reflected = getReflectedPoint(source, center)
	let point = new mPoint(reflected.a, reflected.b)
	point.name = createPrimePointName(source.name)
	point.onOther.push({
		type: 'reflectPoint',
		sourceId: source.id,
		centerId: center.id,
	})
	return point
}

function getReflectPointConstraint(point) {
	if (!point || point.type != 'point') return null
	return point.onOther.find(item => item.type == 'reflectPoint') || null
}

function isIntersectableLine(obj) {
	if (!obj) return false
	return obj.type == 'lineWithPoints' || obj.type == 'lineWithEquation' || obj.type == 'verLine' || obj.type == 'lineSegment'
}

function isIntersectableCircle(obj) {
	if (!obj) return false
	return obj.type == 'circleR' || obj.type == 'circle2' || obj.type == 'circle3'
}

function isIntersectableObject(obj) {
	return isIntersectableLine(obj) || isIntersectableCircle(obj)
}

function getLineDescriptor(line) {
	if (!isIntersectableLine(line)) return { status: false }

	if (line.type == 'verLine') {
		return { status: true, limited: false, vertical: true, x: Number(line.x) }
	}

	if (line.type == 'lineWithEquation') {
		return { status: true, limited: false, vertical: false, m: Number(line.m), c: Number(line.n) }
	}

	if (line.type == 'lineWithPoints' || line.type == 'lineSegment') {
		let limited = line.type == 'lineSegment'
		let A = { a: Number(line.A.a), b: Number(line.A.b) }
		let B = { a: Number(line.B.a), b: Number(line.B.b) }

		if (Number(line.A.a) == Number(line.B.a)) {
			if (Number(line.A.b) == Number(line.B.b)) return { status: false }
			return { status: true, limited: limited, vertical: true, x: Number(line.A.a), A: A, B: B }
		}

		let equation = createLineEquation(line.A, line.B)
		return { status: true, limited: limited, vertical: false, m: Number(equation.m), c: Number(equation.c), A: A, B: B }
	}

	return { status: false }
}

function isPointAttachableLine(obj) {
	if (!obj) return false
	return obj.type == 'lineWithPoints' || obj.type == 'lineWithEquation' || obj.type == 'verLine' || obj.type == 'lineSegment'
}

function getProjectionOnLine(line, a, b) {
	let desc = getLineDescriptor(line)
	if (!desc.status) return { status: false }

	a = Number(a)
	b = Number(b)
	if (!Number.isFinite(a) || !Number.isFinite(b)) return { status: false }

	if (desc.limited) {
		let dx = desc.B.a - desc.A.a
		let dy = desc.B.b - desc.A.b
		let lengthSquared = dx * dx + dy * dy
		if (lengthSquared == 0) return { status: false }

		let t = ((a - desc.A.a) * dx + (b - desc.A.b) * dy) / lengthSquared
		t = Math.max(0, Math.min(1, t))

		return {
			status: true,
			a: desc.A.a + t * dx,
			b: desc.A.b + t * dy,
		}
	}

	if (desc.vertical) {
		return { status: true, a: desc.x, b: b }
	}

	let denominator = desc.m * desc.m + 1
	let projectedA = (a + desc.m * (b - desc.c)) / denominator
	let projectedB = desc.m * projectedA + desc.c

	return { status: true, a: projectedA, b: projectedB }
}

function getProjectionOnSegment(A, B, a, b) {
	A = { a: Number(A.a), b: Number(A.b) }
	B = { a: Number(B.a), b: Number(B.b) }
	a = Number(a)
	b = Number(b)

	let dx = B.a - A.a
	let dy = B.b - A.b
	let lengthSquared = dx * dx + dy * dy
	if (lengthSquared == 0 || !Number.isFinite(a) || !Number.isFinite(b)) return { status: false }

	let t = ((a - A.a) * dx + (b - A.b) * dy) / lengthSquared
	t = Math.max(0, Math.min(1, t))
	let projectedA = A.a + t * dx
	let projectedB = A.b + t * dy
	let distance = Math.sqrt((a - projectedA) ** 2 + (b - projectedB) ** 2)

	return {
		status: true,
		a: projectedA,
		b: projectedB,
		distance: distance,
	}
}

function getProjectionOnAngle(angle, a, b) {
	if (!angle || angle.type != 'angle') return { status: false }

	let projectionAB = getProjectionOnSegment(angle.A, angle.B, a, b)
	let projectionBC = getProjectionOnSegment(angle.B, angle.C, a, b)
	if (!projectionAB.status && !projectionBC.status) return { status: false }
	if (!projectionAB.status) return projectionBC
	if (!projectionBC.status) return projectionAB

	return projectionAB.distance <= projectionBC.distance ? projectionAB : projectionBC
}

function createPointFromHitOrMouse(hit, mousePos) {
	if (hit.hitType == 'point') {
		return { point: hit.hit, created: false }
	}

	if (isIntersectableCircle(hit.hit)) {
		let circle = hit.hit
		let circleData = getCircleDescriptor(circle)
		if (circleData.status) {
			let angle = Math.atan2(mousePos.y - circleData.n, mousePos.x - circleData.m)
			let point = new mPoint(
				Number(circleData.m + circleData.r * Math.cos(angle)).toFixed(2),
				Number(circleData.n + circleData.r * Math.sin(angle)).toFixed(2)
			)
			point.onOther.push({
				type: "onCircle",
				circleId: circle.id
			})
			return { point: point, created: true }
		}
	}

	if (isPointAttachableLine(hit.hit)) {
		let projection = getProjectionOnLine(hit.hit, mousePos.x, mousePos.y)
		if (projection.status) {
			let point = new mPoint(Number(projection.a).toFixed(2), Number(projection.b).toFixed(2))
			point.onOther.push({
				type: "onLine",
				lineId: hit.hit.id
			})
			return { point: point, created: true }
		}
	}

	if (hit.hitType == 'angle') {
		let projection = getProjectionOnAngle(hit.hit, mousePos.x, mousePos.y)
		if (projection.status) {
			let point = new mPoint(Number(projection.a).toFixed(2), Number(projection.b).toFixed(2))
			point.onOther.push({
				type: "onAngle",
				angleId: hit.hit.id
			})
			return { point: point, created: true }
		}
	}

	return { point: new mPoint(mousePos.x, mousePos.y), created: true }
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

function getCircleCenterRadius(circle) {
	if (circle.type == 'circleR') {
		return {
			m: Number(circle.A.a),
			n: Number(circle.A.b),
			r: Number(circle.r),
			status: true,
		}
	}
	if (circle.type == 'circle2') {
		return {
			m: Number(circle.A.a),
			n: Number(circle.A.b),
			r: distanceAB(circle.A, circle.B),
			status: true,
		}
	}
	if (circle.type == 'circle3') {
		let data = getCircle3RA(circle)
		return {
			m: Number(data.m),
			n: Number(data.n),
			r: Number(data.r),
			status: data.status !== false,
		}
	}
	return { status: false }
}

function getCircleTangentLines(point, circle) {
	let circleData = getCircleCenterRadius(circle)
	if (!circleData.status) return { status: false, reason: 'invalidCircle', lines: [] }

	let px = Number(point.a)
	let py = Number(point.b)
	let cx = circleData.m
	let cy = circleData.n
	let r = circleData.r
	let dx = px - cx
	let dy = py - cy
	let d = Math.sqrt(dx * dx + dy * dy)
	let eps = 1e-7

	if (d < r - eps) return { status: false, reason: 'inside', lines: [] }
	if (d < eps) return { status: false, reason: 'inside', lines: [] }

	if (Math.abs(d - r) <= eps) {
		let tangentPoint = new mPoint(px - dy, py + dx, true)
		return {
			status: true,
			lines: [new mLineWithPoints(point, tangentPoint, true)],
		}
	}

	let ex = dx / d
	let ey = dy / d
	let baseDistance = (r * r) / d
	let height = (r * Math.sqrt(d * d - r * r)) / d
	let baseX = cx + baseDistance * ex
	let baseY = cy + baseDistance * ey
	let perpX = -ey
	let perpY = ex

	let T1 = new mPoint(baseX + height * perpX, baseY + height * perpY, true)
	let T2 = new mPoint(baseX - height * perpX, baseY - height * perpY, true)

	return {
		status: true,
		lines: [
			new mLineWithPoints(point, T1, true),
			new mLineWithPoints(point, T2, true),
		],
	}
}

function getCircleDescriptor(circle) {
	if (!isIntersectableCircle(circle)) return { status: false }

	if (circle.type == 'circleR') {
		return {
			status: true,
			m: Number(circle.A.a),
			n: Number(circle.A.b),
			r: Number(circle.r),
		}
	}

	if (circle.type == 'circle2') {
		return {
			status: true,
			m: Number(circle.A.a),
			n: Number(circle.A.b),
			r: distanceAB(circle.A, circle.B),
		}
	}

	let circleData = getCircle3RA(circle)
	return {
		status: true,
		m: Number(circleData.m),
		n: Number(circleData.n),
		r: Number(circleData.r),
	}
}

function isPointOnLimitedLine(desc, a, b, epsilon = 0.0000001) {
	if (!desc.limited) return true

	return a >= Math.min(desc.A.a, desc.B.a) - epsilon &&
		a <= Math.max(desc.A.a, desc.B.a) + epsilon &&
		b >= Math.min(desc.A.b, desc.B.b) - epsilon &&
		b <= Math.max(desc.A.b, desc.B.b) + epsilon
}

function getCollinearIntersection(l1, l2, epsilon = 0.0000001) {
	if (!l1.limited && !l2.limited) return { status: false, reason: 'infinite' }
	if (l1.limited && !l2.limited) return { status: false, reason: 'infinite' }
	if (!l1.limited && l2.limited) return { status: false, reason: 'infinite' }

	let axis = Math.abs(l1.A.a - l1.B.a) >= Math.abs(l1.A.b - l1.B.b) ? 'a' : 'b'
	let l1Start = Math.min(l1.A[axis], l1.B[axis])
	let l1End = Math.max(l1.A[axis], l1.B[axis])
	let l2Start = Math.min(l2.A[axis], l2.B[axis])
	let l2End = Math.max(l2.A[axis], l2.B[axis])
	let overlapStart = Math.max(l1Start, l2Start)
	let overlapEnd = Math.min(l1End, l2End)

	if (overlapEnd < overlapStart - epsilon) return { status: false, reason: 'empty' }
	if (Math.abs(overlapEnd - overlapStart) < epsilon) {
		let candidates = [l1.A, l1.B, l2.A, l2.B]
		let point = candidates.find(p => Math.abs(p[axis] - overlapStart) < epsilon)
		if (point) return { status: true, reason: 'point', a: point.a, b: point.b }
	}
	return { status: false, reason: 'infinite' }
}

function getLineIntersection(line1, line2) {
	let l1 = getLineDescriptor(line1)
	let l2 = getLineDescriptor(line2)
	const epsilon = 0.0000001

	if (!l1.status || !l2.status) return { status: false, reason: 'empty' }
	if (l1.vertical && l2.vertical) {
		if (Math.abs(l1.x - l2.x) < epsilon) return getCollinearIntersection(l1, l2, epsilon)
		return { status: false, reason: 'empty' }
	}

	let a, b
	if (l1.vertical) {
		a = l1.x
		b = l2.m * a + l2.c
	} else if (l2.vertical) {
		a = l2.x
		b = l1.m * a + l1.c
	} else {
		if (Math.abs(l1.m - l2.m) < epsilon) {
			if (Math.abs(l1.c - l2.c) < epsilon) return getCollinearIntersection(l1, l2, epsilon)
			return { status: false, reason: 'empty' }
		}
		a = (l2.c - l1.c) / (l1.m - l2.m)
		b = l1.m * a + l1.c
	}

	if (!Number.isFinite(a) || !Number.isFinite(b)) return { status: false, reason: 'empty' }
	if (!isPointOnLimitedLine(l1, a, b, epsilon) || !isPointOnLimitedLine(l2, a, b, epsilon)) {
		return { status: false, reason: 'empty' }
	}
	return { status: true, reason: 'point', a: a, b: b }
}

function dedupeIntersectionPoints(points, epsilon = 0.0000001) {
	let uniquePoints = []
	points.forEach(point => {
		if (!Number.isFinite(point.a) || !Number.isFinite(point.b)) return
		let exists = uniquePoints.some(item =>
			Math.abs(item.a - point.a) < epsilon &&
			Math.abs(item.b - point.b) < epsilon
		)
		if (!exists) uniquePoints.push(point)
	})
	return uniquePoints
}

function getLineCircleIntersection(lineObj, circleObj) {
	let line = getLineDescriptor(lineObj)
	let circle = getCircleDescriptor(circleObj)
	const epsilon = 0.0000001

	if (!line.status || !circle.status || circle.r < 0) return { status: false, reason: 'empty', points: [] }

	let points = []
	if (line.vertical) {
		let dx = line.x - circle.m
		let delta = circle.r * circle.r - dx * dx
		if (delta < -epsilon) return { status: false, reason: 'empty', points: [] }
		if (Math.abs(delta) < epsilon) {
			points.push({ a: line.x, b: circle.n })
		} else {
			let root = Math.sqrt(delta)
			points.push({ a: line.x, b: circle.n + root })
			points.push({ a: line.x, b: circle.n - root })
		}
	} else {
		let denominator = line.m * line.m + 1
		let footX = (circle.m + line.m * (circle.n - line.c)) / denominator
		let footY = line.m * footX + line.c
		let distanceToLine = Math.abs(line.m * circle.m - circle.n + line.c) / Math.sqrt(denominator)
		let delta = circle.r * circle.r - distanceToLine * distanceToLine
		if (delta < -epsilon) return { status: false, reason: 'empty', points: [] }
		if (Math.abs(delta) < epsilon) {
			points.push({ a: footX, b: footY })
		} else {
			let offset = Math.sqrt(delta)
			let dirLength = Math.sqrt(denominator)
			let ux = 1 / dirLength
			let uy = line.m / dirLength
			points.push({ a: footX + ux * offset, b: footY + uy * offset })
			points.push({ a: footX - ux * offset, b: footY - uy * offset })
		}
	}

	points = dedupeIntersectionPoints(points).filter(point => isPointOnLimitedLine(line, point.a, point.b, epsilon))
	return points.length > 0 ? { status: true, reason: 'points', points: points } : { status: false, reason: 'empty', points: [] }
}

function getCircleCircleIntersection(circleObj1, circleObj2) {
	let c1 = getCircleDescriptor(circleObj1)
	let c2 = getCircleDescriptor(circleObj2)
	const epsilon = 0.0000001

	if (!c1.status || !c2.status || c1.r < 0 || c2.r < 0) return { status: false, reason: 'empty', points: [] }

	let dx = c2.m - c1.m
	let dy = c2.n - c1.n
	let d = Math.sqrt(dx * dx + dy * dy)

	if (d < epsilon && Math.abs(c1.r - c2.r) < epsilon) return { status: false, reason: 'infinite', points: [] }
	if (d < epsilon) return { status: false, reason: 'empty', points: [] }
	if (d > c1.r + c2.r + epsilon) return { status: false, reason: 'empty', points: [] }
	if (d < Math.abs(c1.r - c2.r) - epsilon) return { status: false, reason: 'empty', points: [] }

	let a = (c1.r * c1.r - c2.r * c2.r + d * d) / (2 * d)
	let hSquared = c1.r * c1.r - a * a
	if (hSquared < -epsilon) return { status: false, reason: 'empty', points: [] }

	let xm = c1.m + a * dx / d
	let ym = c1.n + a * dy / d
	if (Math.abs(hSquared) < epsilon) return { status: true, reason: 'points', points: [{ a: xm, b: ym }] }

	let h = Math.sqrt(hSquared)
	let rx = -dy * (h / d)
	let ry = dx * (h / d)
	return {
		status: true,
		reason: 'points',
		points: dedupeIntersectionPoints([
			{ a: xm + rx, b: ym + ry },
			{ a: xm - rx, b: ym - ry },
		]),
	}
}

function getObjectIntersection(obj1, obj2) {
	if (isIntersectableLine(obj1) && isIntersectableLine(obj2)) {
		let lineIntersection = getLineIntersection(obj1, obj2)
		return lineIntersection.status
			? { status: true, reason: 'points', points: [{ a: lineIntersection.a, b: lineIntersection.b }] }
			: { status: false, reason: lineIntersection.reason, points: [] }
	}

	if (isIntersectableLine(obj1) && isIntersectableCircle(obj2)) return getLineCircleIntersection(obj1, obj2)
	if (isIntersectableCircle(obj1) && isIntersectableLine(obj2)) return getLineCircleIntersection(obj2, obj1)
	if (isIntersectableCircle(obj1) && isIntersectableCircle(obj2)) return getCircleCircleIntersection(obj1, obj2)

	return { status: false, reason: 'empty', points: [] }
}

function createReservedName(type, reservedNames = []) {
	let existingNames = arrObjects.map(item => item.name)
	let oldArrObjects = arrObjects
	arrObjects = reservedNames.map(name => ({ name: name }))
	arrObjects = arrObjects.concat(oldArrObjects)
	let name = createName(type)
	arrObjects = oldArrObjects
	if (existingNames.includes(name)) return createName(type)
	return name
}

function createIntersectionPoints(obj1, obj2) {
	let intersection = getObjectIntersection(obj1, obj2)
	let points = []
	let ownerPointData = intersection.points[0] || { a: NaN, b: NaN }
	let ownerPoint = new mPoint(ownerPointData.a, ownerPointData.b)
	ownerPoint.intersectionStatus = intersection.reason
	ownerPoint.intersectionOwner = true
	ownerPoint.onOther.push({
		type: 'intersectLines',
		line1Id: obj1.id,
		line2Id: obj2.id,
		pointIndex: 0,
	})
	points.push(ownerPoint)

	let secondPointData = intersection.points[1] || { a: NaN, b: NaN }
	let secondPoint = new mPoint(secondPointData.a, secondPointData.b)
	secondPoint.name = createReservedName('point', [ownerPoint.name])
	secondPoint.intersectionStatus = intersection.reason
	secondPoint.hideInLabels = true
	secondPoint.onOther.push({
		type: 'intersectLines',
		line1Id: obj1.id,
		line2Id: obj2.id,
		pointIndex: 1,
		ownerId: ownerPoint.id,
	})
	points.push(secondPoint)

	ownerPoint.intersectionPointIds = points.map(point => point.id)
	return points
}

function createIntersectionPoint(line1, line2) {
	return createIntersectionPoints(line1, line2)[0]
}

function getIntersectionPointConstraint(point) {
	if (!point || point.type != 'point') return null
	return point.onOther.find(item => item.type == 'intersectLines') || null
}

function getIntersectionOutput(point) {
	let relatedPoints = arrObjects.filter(item => {
		if (item.id == point.id) return true
		let constraint = getIntersectionPointConstraint(item)
		return constraint && constraint.ownerId == point.id
	})

	let visiblePoints = relatedPoints.filter(item =>
		Number.isFinite(Number(item.a)) &&
		Number.isFinite(Number(item.b))
	)

	if (visiblePoints.length > 0) {
		return visiblePoints
			.map(item => item.name + '=(' + getPointDisplayCoordinate(item.a) + ',' + getPointDisplayCoordinate(item.b) + ')')
			.join('<br>')
	}
	if (point.intersectionStatus == 'infinite') return '∞'
	return '∅'
}

function formatDisplayNumber(value) {
	let numberValue = Number(value)
	if (!Number.isFinite(numberValue)) return String(value)
	let roundedValue = Math.round(numberValue)
	if (Math.abs(numberValue - roundedValue) < 0.000001) return String(roundedValue)
	return numberValue.toFixed(2)
}

function getPointDisplayCoordinate(value) {
	return formatDisplayNumber(value)
}

function formatPointPair(point) {
	return '(' + getPointDisplayCoordinate(point.a) + ',' + getPointDisplayCoordinate(point.b) + ')'
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

function getAngleMeasure(ag) {
	let angles = calculateAngle(ag)
	return angles.angleBC - angles.angleBA < 0 ? angles.angleBC - angles.angleBA + 360 : angles.angleBC - angles.angleBA
}

function normalizeDegree(deg) {
	return ((deg % 360) + 360) % 360
}

function getPointAngleOnCircle(point, circleData) {
	return normalizeDegree(Math.atan2(Number(point.b) - circleData.n, Number(point.a) - circleData.m) * 180 / Math.PI)
}

function isPointAtCircleCenter(point, circleData, epsilon = 0.0001) {
	return Math.abs(Number(point.a) - circleData.m) < epsilon && Math.abs(Number(point.b) - circleData.n) < epsilon
}

function isPointOnCircleData(point, circleData, epsilon = 0.01) {
	let distance = Math.sqrt((Number(point.a) - circleData.m) ** 2 + (Number(point.b) - circleData.n) ** 2)
	return Math.abs(distance - circleData.r) < epsilon
}

function isAngleInCcwArc(angle, start, span, epsilon = 0.0001) {
	let relative = normalizeDegree(angle - start)
	return relative > epsilon && relative < span - epsilon
}

function getAngleArcInfo(ag, angleBetween) {
	for (const circle of arrObjects) {
		if (!isIntersectableCircle(circle)) continue

		let circleData = getCircleDescriptor(circle)
		if (!circleData.status) continue

		let aOnCircle = isPointOnCircleData(ag.A, circleData)
		let bOnCircle = isPointOnCircleData(ag.B, circleData)
		let cOnCircle = isPointOnCircleData(ag.C, circleData)
		if (!aOnCircle || !cOnCircle) continue

		let angleA = getPointAngleOnCircle(ag.A, circleData)
		let angleB = getPointAngleOnCircle(ag.B, circleData)
		let angleC = getPointAngleOnCircle(ag.C, circleData)
		let spanAC = normalizeDegree(angleC - angleA)
		let spanCA = normalizeDegree(angleA - angleC)

		if (isPointAtCircleCenter(ag.B, circleData)) {
			let useAC = Math.abs(spanAC - angleBetween) <= Math.abs(spanCA - angleBetween)
			return {
				circleData: circleData,
				startAngle: useAC ? angleA : angleC,
				span: useAC ? spanAC : spanCA,
			}
		}

		if (bOnCircle) {
			let bInAC = isAngleInCcwArc(angleB, angleA, spanAC)
			return {
				circleData: circleData,
				startAngle: bInAC ? angleC : angleA,
				span: bInAC ? spanCA : spanAC,
			}
		}
	}

	return null
}

function updateReflectPointRows() {
	arrObjects.forEach(item => {
		let reflectConstraint = getReflectPointConstraint(item)
		if (!reflectConstraint) return

		let input = document.getElementById(item.id + '-input')
		let output = document.getElementById(item.id + '-output')
		if (!input || !output) return

		let source = arrObjects.find(obj => obj.id == reflectConstraint.sourceId)
		let center = arrObjects.find(obj => obj.id == reflectConstraint.centerId)
		input.value = 'YansıtNokta(' + (source ? source.name : '?') + ',' + (center ? center.name : '?') + ')'
		output.value = item.name + '=(' + getPointDisplayCoordinate(item.a) + ',' + getPointDisplayCoordinate(item.b) + ')'
	})
}

function updateIntersectionPointRows() {
	arrObjects.forEach(item => {
		let intersectionConstraint = getIntersectionPointConstraint(item)
		if (!intersectionConstraint) return

		let input = document.getElementById(item.id + '-input')
		let output = document.getElementById(item.id + '-output')
		if (!input || !output) return

		let line1 = arrObjects.find(obj => obj.id == intersectionConstraint.line1Id)
		let line2 = arrObjects.find(obj => obj.id == intersectionConstraint.line2Id)
		input.value = item.name + '=Kesiştir(' + (line1 ? line1.name : '?') + ',' + (line2 ? line2.name : '?') + ')'
		output.innerHTML = getIntersectionOutput(item)
	})
}
