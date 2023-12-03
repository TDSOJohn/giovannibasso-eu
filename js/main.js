var selection;
var selection_position = 0;
var selection_positions_array = [74, 179, 283, 387];
var selection_links = [
	'https://www.github.com/TDSOJohn',
	'https://www.linkedin.com/in/giovanni-basso-39712619b',
	'https://pixelfed.social/TDSOJohn',
	'https://mastodon.social/@TDSOJohn'
]

function moveUp() {
	selection_position = (selection_position + 4 - 1) % 4;
	selection.style.top = selection_positions_array[selection_position] + 'px';
}

function moveDown() {
	selection_position = (selection_position + 4 + 1) % 4;
	selection.style.top = selection_positions_array[selection_position] + 'px';
}

function select() {
	window.open(selection_links[selection_position]);
}

function goBack() {
	console.log("going back...");
}

function startup() {
	selection = document.getElementById("selection");

	document.getElementById("up_button").addEventListener('click', function() { moveUp(); });
	document.getElementById("down_button").addEventListener('click', function() { moveDown(); });
	document.getElementById("x_button").addEventListener('click', function() { select(); });
	document.getElementById("back_button").addEventListener('click', function() { goBack(); });
	
}

window.onload = startup();



/*

VTUBBBFX