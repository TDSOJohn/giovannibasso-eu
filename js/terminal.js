/*
Images used in the canvas
*/
var device = new Image();
var controls_background = new Image();
var down_normal = new Image();
var down_pressed = new Image();
var up_normal = new Image();
var up_pressed = new Image();
var o_normal = new Image();
var o_pressed = new Image();
var x_normal = new Image();
var x_pressed = new Image();

// when it reaches 10, all the images are loaded
// 100% hacky and it smells
var loadCounter = 0;

var isLandscape = true;

let drawAllInterval;

var selection_position = 0;
var selection_links = [
	'https://www.github.com/TDSOJohn',
	'https://www.linkedin.com/in/giovanni-basso-39712619b',
	'https://pixelfed.social/TDSOJohn',
	'https://mastodon.social/@TDSOJohn'
]

// font-related variables
const font_url = 'https://tdsojohn.github.io/giovannibasso-eu/fonts/SAIBA-45.otf';
const saiba_font = new FontFace('SAIBA', `url(${font_url})`);

// correct to match is aspect ratio is leq or geq than aspect ratio of terminal
function getScreenRatio() {
	if ((window.innerWidth * 2) > window.innerHeight)
		isLandscape = true;
	else
		isLandscape = false;
	resizeCanvasToScreen();
}

// compares terminal aspect ratio to window inner aspect ratio and
// changes width/height accordingly
function resizeCanvasToScreen() {
	if(loadCounter >= 10) {
		const canvas = document.getElementById("terminal");
		if(isLandscape == true) {
			canvas.width = 256 * (window.innerHeight / 512.0);
			canvas.height = window.innerHeight;
		} else {
			canvas.width = window.innerWidth;
			canvas.height = 512 * (window.innerWidth / 256.0);
		}
		drawAll();
	}
}

function getMouseClick(event) {
	const canvas = document.getElementById("terminal");
	var canvasLeft = canvas.offsetLeft;
	var canvasTop = canvas.offsetTop;
	var x = event.pageX - canvasLeft;
	var y = event.pageY - canvasTop;
	if (x > (144 * canvas.width / 256.0) &&
		x < (210 * canvas.width / 256.0) &&
		y > (286 * canvas.height / 512.0) &&
		y < (364 * canvas.height / 512.0)) {
		moveUp();
		drawAllInterval = setTimeout(drawAll, 200);
	} else if (x > (144 * canvas.width / 256.0) &&
			x < (210 * canvas.width / 256.0) &&
			y > (364 * canvas.height / 512.0) &&
			y < (454 * canvas.height / 512.0)) {
		moveDown();
		drawAllInterval = setTimeout(drawAll, 200);
	} else if (x > (46 * canvas.width / 256.0) &&
			x < (114 * canvas.width / 256.0) &&
			y > (287 * canvas.height / 512.0) &&
			y < (359 * canvas.height / 512.0)) {
		select();
		drawAllInterval = setTimeout(drawAll, 200);
	} else if (x > (46 * canvas.width / 256.0) &&
			x < (114 * canvas.width / 256.0) &&
			y > (384 * canvas.height / 512.0) &&
			y < (456 * canvas.height / 512.0)) {
		pressBack();
		drawAllInterval = setTimeout(drawAll, 200);
	}
}

// update selection_position, draw everything with updated UI
function moveUp() {
	selection_position = (selection_position + 4 - 1) % 4;
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		drawBackground();
		if(isLandscape == true) {
			ctx.drawImage(up_pressed, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);
		} else {
			ctx.drawImage(up_pressed, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);
		}
		drawText();
	}
	drawSelectionRect();
}

// update selection_position, draw everything with updated UI
function moveDown() {
	selection_position = (selection_position + 4 + 1) % 4;
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		drawBackground();
		if(isLandscape == true) {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_pressed, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);
		} else {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_pressed, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);
		}
		drawText();
	}
	drawSelectionRect();
}

function pressSelect() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		drawBackground();
		if(isLandscape == true) {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_pressed, 0, 0, canvas.width, canvas.height);
		} else {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_pressed, 0, 0, canvas.width, canvas.height);
		}
		drawText();
	}
	drawSelectionRect();
}

function pressBack() {
	drawBackground();
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		if(isLandscape == true) {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_pressed, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);
		} else {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_pressed, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);
		}
		drawText();
	}
	drawSelectionRect();
}

function select() {
	window.open(selection_links[selection_position]);
}

function goBack() {
	console.log("going back...");
}

function drawBackground() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(isLandscape == true) {
			ctx.drawImage(controls_background, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(device, 0, 0, canvas.width, canvas.height);
		} else {
			ctx.drawImage(controls_background, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(device, 0, 0, canvas.width, canvas.height);
			
		}
	}
}

function drawAll() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		drawBackground();
		const ctx = canvas.getContext("2d");
		if(isLandscape == true) {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);
		} else {
			ctx.drawImage(up_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(down_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(o_normal, 0, 0, canvas.width, canvas.height);
			ctx.drawImage(x_normal, 0, 0, canvas.width, canvas.height);

		}
		drawText();
		drawSelectionRect();
	}
}

async function drawText() {
	document.fonts.add(saiba_font);
	// I need a separate async function to have await
	// https://stackoverflow.com/questions/5586845/how-to-import-font-file-using-javascript
	await saiba_font.load();

	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		ctx.font = ((canvas.width / 256.0) * 28) + "px SAIBA";
		ctx.fillStyle = 'blue';
		ctx.fillText("GitHub", 74 * (canvas.width / 256.0), 72 * (canvas.height / 512.0));
		ctx.fillText("LinkedIn", 60 * (canvas.width / 256.0), 117 * (canvas.height / 512.0));
		ctx.fillText("PixelFed", 56 * (canvas.width / 256.0), 162 * (canvas.height / 512.0));
		ctx.fillText("Mastodon", 48 * (canvas.width / 256.0), 207 * (canvas.height / 512.0));
	}	
}

function drawSelectionRect() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		ctx.strokeStyle = 'blue';
		var x = 35 * (canvas.width / 256.0);
		var y = (40 + (45 * selection_position)) * (canvas.height / 512.0);
		ctx.strokeRect(x, y, 186 * (canvas.width / 256.0), 44 * (canvas.height / 512.0));
	}
}

function resizeCanvas() {

}

// count all loaded resources. If all are loaded, draw all in canvas
function drawAfterImageLoad() {
	loadCounter++;
	if (loadCounter == 10) {
		resizeCanvasToScreen();
	}
}

// get all external images and draw all
async function getResources() {
	device.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/device.png";
	await device.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	controls_background.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/controls_background.png";
	await controls_background.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	down_normal.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/down_normal.png";
	await down_normal.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	down_pressed.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/down_pressed.png";
	await down_pressed.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	up_normal.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/up_normal.png";
	await up_normal.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	up_pressed.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/up_pressed.png";
	await up_pressed.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	o_normal.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/o_normal.png";
	await o_normal.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	o_pressed.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/o_pressed.png";
	await o_pressed.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	x_normal.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/x_normal.png";
	await x_normal.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
	x_pressed.src = "https://tdsojohn.github.io/giovannibasso-eu/media/terminal/x_pressed.png";
	await x_pressed.addEventListener("load", () => {
		drawAfterImageLoad();
	}, false);
}

window.addEventListener("load", () => {
	getResources().then(drawAll);
}, false);

// run on window load
addEventListener("load", (event) => {

	getScreenRatio();
	
	addEventListener("resize", getScreenRatio);

	const canvas = document.getElementById("terminal");
	canvas.addEventListener('click', (event) => {
		getMouseClick(event);
	});

	document.addEventListener(
	"keydown",
	(event) => {
		switch(event.key) {
			case "ArrowDown":
				moveDown();
				break;
			case "ArrowUp":
				moveUp();
				break;
			case "Enter":
			case " ":
				pressSelect();
				break;
			case "Escape":
				pressBack();
				break;
		}
		event.preventDefault();
	});
	document.addEventListener(
	"keyup",
	(event) => {
		switch(event.key) {
			case "ArrowDown":
				drawAll();
				break;
			case "ArrowUp":
				drawAll();
				break;
			case "Enter":
			case " ":
				select();
				drawAll();
				break;
			case "Escape":
				goBack();
				drawAll();
				break;
			
		}
		event.preventDefault();
	});
});
