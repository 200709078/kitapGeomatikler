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
	let displayM = formatDisplayNumber(m)
	let displayN = formatDisplayNumber(n)
	let numericM = Number(displayM)
	let numericN = Number(displayN)
	if (numericM === 0) {
		return displayN;
	}

	let result = '';

	if (numericM === 1) {
		result = 'x';
	} else if (numericM === -1) {
		result = '-x';
	} else {
		result = `${displayM}x`;
	}

	if (numericN === 0) {
		return result;
	}

	if (numericN > 0) {
		result += `+${displayN}`;
	} else {
		result += `${displayN}`;
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

class mDistanceSegment {
	constructor(A, B, temp = false) {
		this.type = 'distanceSegment'
		this.name = createName('distanceSegment')
		temp ? this.id = null : this.id = idCounter()
		this.A = A
		this.B = B
		this.color = getRandomColor()
		this.visibility = true
		this.size = 2
		this.temp = temp
	}
}

class mCircleTangent {
	constructor(A, circle, temp = false) {
		this.type = 'circleTangent'
		temp ? this.name = null : this.name = createName('line')
		temp ? this.id = null : this.id = idCounter()
		this.A = A
		this.circle = circle
		this.color = getRandomColor()
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
