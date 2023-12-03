/*
Images used in the canvas
*/
var device = null;
var controls_background = null;
var down_normal = null;
var down_pressed = null;
var up_normal = null;
var up_pressed = null;
var o_normal = null;
var o_pressed = null;
var x_normal = null;
var x_pressed = null;

var isLandscape = true;

var selection_position = 0;
var selection_links = [
	'https://www.github.com/TDSOJohn',
	'https://www.linkedin.com/in/giovanni-basso-39712619b',
	'https://pixelfed.social/TDSOJohn',
	'https://mastodon.social/@TDSOJohn'
]

// font-related variables
const font_url = './../fonts/SAIBA-45.woff';
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

// run on window load
addEventListener("load", (event) => {
	device = document.getElementById("device");
	controls_background = document.getElementById("controls_background");
	down_normal = document.getElementById("down_normal");
	down_pressed = document.getElementById("down_pressed");
	up_normal = document.getElementById("up_normal");
	up_pressed = document.getElementById("up_pressed");
	o_normal = document.getElementById("o_normal");
	o_pressed = document.getElementById("o_pressed");
	x_normal = document.getElementById("x_normal");
	x_pressed = document.getElementById("x_pressed");

	getScreenRatio();
	
	addEventListener("resize", getScreenRatio);
	
	drawAll();

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
