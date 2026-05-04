/* SETUP FPS */
function setupFPS() {
	var lastTime = new Date();
	var hits = 0;
	var fps = "Waiting";
	var FPS = function () {
		hits++;
		var nowTime = new Date();
		if (nowTime.getTime() - lastTime.getTime() > 250) {
			var dt = nowTime.getTime() - lastTime.getTime();
			fps = "" + Math.round(hits * 1000 / dt);
			hits = 0;
			lastTime = nowTime;
		}
		return fps;
	};
	return FPS;
};
var FPS = setupFPS();

/* IE VERSION */
function getIE() { var rv = -1; if (navigator.appName == 'Microsoft Internet Explorer') { var ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); if (re.exec(ua) != null) rv = parseFloat(RegExp.$1); } else if (navigator.appName == 'Netscape') { var ua = navigator.userAgent; var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})"); if (re.exec(ua) != null) rv = parseFloat(RegExp.$1); } return rv; }

/* CREATE COOKIE */
function createCookie(name, value, seconds) {
	if (seconds) {
		var date = new Date();
		date.setTime(date.getTime() + (seconds * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

/* READING COOKIE */
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

/* REMOVE COOKIE */
function removeCookie(name) {
	createCookie(name, "", -1);
}

/* RANDOM NUMBER */
function rand(min, max, round) {
	if (round == 'round') {
		return Math.round(Math.random() * (max - min) + min);
	} else {
		return Math.random() * (parseInt(max) - parseInt(min)) + parseInt(min);
	}
}

/* CONVERTING CHAR TO CODE */
function convertChar(word, ari) {
	var arr = false;
	if (ari == 'array') { arr = word; }
	if (!word) { return false; } else {
		if (!arr) { arr = word.split(''); }
		for (var i = arr.length - 1; i >= 0; i--) {
			arr[i] = arr[i].charCodeAt(0);
		}
		return arr;
	}
}

/* GET DISTANCE - PITAGORA */
function distance(px1, py1, px2, py2) {
	xdis = px1 - px2;
	ydis = py1 - py2;
	return Math.sqrt((xdis * xdis) + (ydis * ydis));
}

/* GET ANGLES - RADIANS */
function getAngle(posx1, posy1, posx2, posy2) {
	if (posx1 == posx2) { if (posy1 > posy2) { return 90; } else { return 270; } }
	if (posy1 == posy2) { if (posy1 > posy2) { return 0; } else { return 180; } }

	var xDist = posx1 - posx2;
	var yDist = posy1 - posy2;

	if (xDist == yDist) { if (posx1 < posx2) { return 225; } else { return 45; } }
	if (-xDist == yDist) { if (posx1 < posx2) { return 135; } else { return 315; } }

	if (posx1 < posx2) {
		return Math.atan2(posy2 - posy1, posx2 - posx1);
	} else {
		return Math.atan2(posy2 - posy1, posx2 - posx1);
	}
}

/* MAKE TEXT */
function text(x, y, style, align, font, text) {
	ctx.fillStyle = style;
	ctx.textAlign = align;
	ctx.font = font;
	ctx.fillText(text, x, y);
	ctx.textAlign = 'left';
	ctx.font = '10px arial';
}

/* GET IMAGE'S W/H */
function getWH(img, w) {
	var imgt = new Image();
	imgt.src = img;
	if (w == 'w') { return imgt.naturalWidth; } else { return imgt.naturalHeight; }
}

/* CREATE IMAGE */
function createIMG(image, repeat, w, h, rect, posx, posy) {
	rect || (rect = 0); posx || (posx = 0); posy || (posy = 0);
	var imageObj = new Image();
	imageObj.src = image;
	if (rect == 0) { ctx.drawImage(imageObj, w, h); } else { var pattern = ctx.createPattern(imageObj, repeat); ctx.fillStyle = pattern; ctx.rect(posx, posy, w, h); }
	ctx.fill();
}

/* RECTIANGLES COLLISION */
function rect_collision(x_1, y_1, width_1, height_1, x_2, y_2, width_2, height_2) {
	return !(x_1 > x_2 + width_2 || x_1 + width_1 < x_2 || y_1 > y_2 + height_2 || y_1 + height_1 < y_2);
}

/* ARC COLLISION */
function arc_collision(x_1, y_1, radius_1, x_2, y_2, radius_2) {
	return !(distance(x_1, y_1, x_2, y_2) > radius_1 + radius_2);
}