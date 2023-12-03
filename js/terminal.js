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

function getScreenRatio() {
	if (window.innerWidth > window.innerHeight)
		isLandscape = true;
	else
		isLandscape = false;
	console.log(isLandscape);
}

function resizeCanvas() {

}

function getMouseClick(event) {
	const canvas = document.getElementById("terminal");
	var canvasLeft = canvas.offsetLeft;
	var canvasTop = canvas.offsetTop;
	var x = event.pageX - canvasLeft;
	var y = event.pageY - canvasTop;
	if (x > 144 && x < 210 && y > 286 && y < 364) {
		moveUp();
		drawAllInterval = setTimeout(drawAll, 200);
	} else if (x > 144 && x < 210 && y > 364 && y < 454) {
		moveDown();
		drawAllInterval = setTimeout(drawAll, 200);
	} else if (x > 46 && x < 114 && y > 287 && y < 359) {
		select();
		drawAllInterval = setTimeout(drawAll, 200);
	} else if (x > 46 && x < 114 && y > 384 && y < 456) {
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
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackground();
		ctx.drawImage(up_pressed, 0, 0);
		ctx.drawImage(down_normal, 0, 0);
		ctx.drawImage(o_normal, 0, 0);
		ctx.drawImage(x_normal, 0, 0);
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
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackground();
		ctx.drawImage(up_normal, 0, 0);
		ctx.drawImage(down_pressed, 0, 0);
		ctx.drawImage(o_normal, 0, 0);
		ctx.drawImage(x_normal, 0, 0);
		drawText();
	}
	drawSelectionRect();
}

function pressSelect() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackground();
		ctx.drawImage(up_normal, 0, 0);
		ctx.drawImage(down_normal, 0, 0);
		ctx.drawImage(o_normal, 0, 0);
		ctx.drawImage(x_pressed, 0, 0);
		drawText();
	}
	drawSelectionRect();
}

function pressBack() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackground();
		ctx.drawImage(up_normal, 0, 0);
		ctx.drawImage(down_normal, 0, 0);
		ctx.drawImage(o_pressed, 0, 0);
		ctx.drawImage(x_normal, 0, 0);
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
		ctx.drawImage(controls_background, 0, 0);
		ctx.drawImage(device, 0, 0);
	}
}

function drawAll() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		ctx.drawImage(controls_background, 0, 0);
		ctx.drawImage(device, 0, 0);
		ctx.drawImage(up_normal, 0, 0);
		ctx.drawImage(down_normal, 0, 0);
		ctx.drawImage(o_normal, 0, 0);
		ctx.drawImage(x_normal, 0, 0);
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
		ctx.font = "28px SAIBA";
		ctx.fillStyle = 'blue';
		ctx.fillText("GitHub", 74, 72);
		ctx.fillText("LinkedIn", 60, 117);
		ctx.fillText("PixelFed", 56, 162);
		ctx.fillText("Mastodon", 48, 207);
	}	
}

function drawSelectionRect() {
	const canvas = document.getElementById("terminal");
	if (canvas.getContext) {
		const ctx = canvas.getContext("2d");
		ctx.strokeStyle = 'blue';
		var x = 35;
		var y = 36 + (45 * selection_position);
		ctx.strokeRect(x, y, 186, 50);
	}	
}

function resizeCanvas() {

}

function drawAfterImageLoad() {
	loadCounter++;
	if (loadCounter == 10) {
		drawAll();
	}
}

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
	console.log("waited for resources!");
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
