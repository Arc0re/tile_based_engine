// --- LOADING, SETUP --- //



// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Loading assets

/* Levels */
var map01Ready = false;
var map01Image = new Image();
map01Image.onload = function() {
	map01Ready = true;
};
map01Image.src = "assets/maps/map01.png";

var map02Ready = false;
var map02Image = new Image();
map02Image.onload = function() {
	map02Ready = true;
};
map02Image.src = "assets/maps/map02.png";

var bigmapReady = false;
var bigmapImage = new Image();
bigmapImage.onload = function() {
	bigmapReady = true;
};
bigmapImage.src = "assets/maps/bigmap.png";
var bigmapX = 0;
var bigmapY = 0;
var bigmapSpeed = /*150*/500;

/* Characters */
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
};
heroImage.src = "assets/hero.png";

/* Game objects */
var hero = {
	speed: 256,
	x: 0,
	y: 0
};

/* New Game */
var game = function() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
};



// --- INPUTS, CONTROLS, UPDATE --- //

// Get keyboard inputs
var keysDown = {};

addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
}, false);

addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode]; // Or = false
}, false);

// Update

var currentMap = "bigmap";
var update = function(modifier) {
	if (38 in keysDown) { // UP
		if (hero.y >= bigmapY) {
			bigmapY += bigmapSpeed * modifier;
		}
	}
	if (40 in keysDown) { // DOWN
		console.log(bigmapY);
		if (bigmapY > - 688) {
			bigmapY -= bigmapSpeed * modifier;			
		}
	}
	if (37 in keysDown) { // LEFT
		if (hero.x >= bigmapX) {
			bigmapX += bigmapSpeed * modifier;
		}
	}
	if (39 in keysDown) { // RIGHT
		//console.log(bigmapX);
		if (bigmapX > -740) {
			bigmapX -= bigmapSpeed * modifier;		
		}
	}
	
	// Map stuff
	if (hero.x >= canvas.width) {
		currentMap = "map02";
		hero.x = 0;
		console.log(currentMap);
	}
};



// --- RENDERING --- //

var render = function() {
	
	// Map loads
	if (map01Ready) {
		ctx.drawImage(map01Image, 0, 0);
	}
	if (currentMap === "map01") {
		if (map01Ready) {
			ctx.drawImage(map01Image, 0, 0);
		}
	} else if (currentMap === "map02") {
		if (map02Ready) {
			ctx.drawImage(map02Image, 0, 0);
		}
	} else if (currentMap === "bigmap") {
		if (bigmapReady) {
			ctx.drawImage(bigmapImage, bigmapX, bigmapY);
		}
	}
	
	// Character loads
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
};

// --- MAIN GAME LOOP --- //

var main = function() {
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000); // 1000 ms
	render();
	
	then = now;
	
	requestAnimationFrame(main);
};


// Starting the bloody game
var then = Date.now();
game();
main();