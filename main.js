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
var map02X = 0;
var map02Y = 0;
var map02Speed = 500;

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
	
	// Controls when in world map
	var worldControls = function() {
		if (38 in keysDown) { // UP
			if (hero.y >= bigmapY) {
				bigmapY += bigmapSpeed * modifier;
			}
		}
		if (40 in keysDown) { // DOWN
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
			if (bigmapX > -740) {
				bigmapX -= bigmapSpeed * modifier;
			}
		}
	};
	
	// Controls when inside a house, cave, etc.
	var houseControls = function() {
		if (38 in keysDown) { // UP
			//houseY += houseSpeed * modifier;
			if (hero.y >= map02Y) {
				map02Y += map02Speed * modifier;	
			}
		}
		/*if (40 in keysDown) { // DOWN
			if (houseY > - 688) {
				houseY -= houseSpeed * modifier;			
			}
		}
		if (37 in keysDown) { // LEFT
			if (hero.x >= houseX) {
				houseX += houseSpeed * modifier;
			}
		}
		if (39 in keysDown) { // RIGHT
			if (houseX > -740) {
				houseX -= houseSpeed * modifier;
			}
		}*/
	};
	
	/*console.log("map02X: " + map02X);
	console.log("map02Y: " + map02Y);*/
	
	if (currentMap == "bigmap") {
		worldControls();
	} else if (currentMap == "map02") {
		houseControls();
	}
	
	//console.log(bigmapX + " " + bigmapY);
	if ( (bigmapX < 258 && bigmapX > 40) && (bigmapY < 246 && bigmapY > 92) ) {
		currentMap = "map02";
	}
	
	
};



// --- RENDERING --- //


var render = function() {
	
	// Map loads
	
	/* Permanent black tile */
	if (map01Ready) {
		ctx.drawImage(map01Image, 0, 0);
	}
	
	/* Houses, caves */
	if (currentMap === "map01") {
		if (map01Ready) {
			ctx.drawImage(map01Image, 0, 0);
		}
	} else if (currentMap === "map02") {
		if (map02Ready) {
			ctx.drawImage(map02Image, map02X, map02Y);
		}
	} else if (currentMap === "bigmap") { /* World Map */
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