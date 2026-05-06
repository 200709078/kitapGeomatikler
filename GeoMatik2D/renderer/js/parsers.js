function bileskeProcess(funcs) {
	return funcs.reduceRight((acc, f) => {
		return f.replace(/x/g, `(${acc})`)
	}, "x")
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

function isDistanceSegment(input) {
	if (typeof input !== 'string') return { status: false }

	let str = input.trim()
	const match = str.match(/^(uzaklık|distancesegment)\s*\((.*)\)$/i)
	if (!match) return { status: false }

	let lineSegmentData = isLineSegment('DoğruParçası(' + match[2] + ')')
	if (!lineSegmentData.status) return { status: false }

	return {
		type: 'distanceSegment',
		xA: lineSegmentData.xA,
		yA: lineSegmentData.yA,
		xB: lineSegmentData.xB,
		yB: lineSegmentData.yB,
		status: true,
	}
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

function splitTopLevelArgs(inner) {
	let args = []
	let current = ''
	let depth = 0

	for (let i = 0; i < inner.length; i++) {
		let ch = inner[i]
		if (ch === '(') depth++
		if (ch === ')') depth--
		if (ch === ',' && depth === 0) {
			args.push(current.trim())
			current = ''
		} else {
			current += ch
		}
	}
	if (current.trim()) args.push(current.trim())
	return args
}

function isCircleTangentInput(str) {
	const match = str.match(/^\s*TeğetC\s*\((.*)\)\s*$/i)
	if (!match) return { status: false }

	let args = splitTopLevelArgs(match[1])
	if (args.length !== 2) return { status: false }

	return {
		type: 'circleTangent',
		circleName: args[0],
		pointArg: args[1],
		status: true,
	}
}

function resolveCircleByName(name) {
	return arrObjects.find(item =>
		item.name === name &&
		(item.type == 'circleR' || item.type == 'circle2' || item.type == 'circle3')
	)
}

function resolveCircleTangentPoint(pointArg) {
	let pointByName = arrObjects.find(item => item.name === pointArg && item.type == 'point')
	if (pointByName) return { status: true, point: pointByName, created: false }

	let pointData = isPoint(pointArg)
	if (!pointData.status) return { status: false }

	let existingPoint = arrObjects.find(item =>
		item.type == 'point' &&
		Number(item.a) === Number(pointData.a) &&
		Number(item.b) === Number(pointData.b)
	)
	if (existingPoint) return { status: true, point: existingPoint, created: false }

	let point = new mPoint(pointData.a, pointData.b)
	arrObjects.push(point)
	return { status: true, point: point, created: true }
}

function isReflectPointInput(str) {
	const match = str.match(/^\s*YansıtNokta\s*\((.*)\)\s*$/i)
	if (!match) return { status: false }

	let args = splitTopLevelArgs(match[1])
	if (args.length !== 2) return { status: false }

	return {
		type: 'reflectPoint',
		sourceArg: args[0],
		centerArg: args[1],
		status: true,
	}
}

function resolvePointArgument(pointArg) {
	let pointByName = arrObjects.find(item => item.name === pointArg && item.type == 'point')
	if (pointByName) return { status: true, point: pointByName, created: false }

	let pointData = isPoint(pointArg)
	if (!pointData.status) return { status: false }

	let existingPoint = arrObjects.find(item =>
		item.type == 'point' &&
		Number(item.a) === Number(pointData.a) &&
		Number(item.b) === Number(pointData.b)
	)
	if (existingPoint) return { status: true, point: existingPoint, created: false }

	let point = new mPoint(pointData.a, pointData.b)
	arrObjects.push(point)
	return { status: true, point: point, created: true }
}

function isIntersectInput(str) {
	const match = str.match(/^\s*Kesiştir\s*\((.*)\)\s*$/i)
	if (!match) return { status: false }

	let args = splitTopLevelArgs(match[1])
	if (args.length !== 2) return { status: false }

	return {
		type: 'intersectLines',
		line1Name: args[0],
		line2Name: args[1],
		status: true,
	}
}

function resolveLineByName(name) {
	return arrObjects.find(item => item.name === name && isIntersectableObject(item))
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
			showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
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
			showToast('GİRİŞ', 'Hatalı giriş yaptınız. Fonksiyon bulunamadı.')
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
		return { status: false };
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
