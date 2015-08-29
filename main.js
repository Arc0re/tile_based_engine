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
	isGoingDown: false,
	jumpLimit: (canvas.height - 64),
	x: 0,
	y: 0
};

/* New Game */
var game = function() {
	hero.x = 0;
	hero.y = (canvas.height - 32);
}



// --- INPUTS, CONTROLS, UPDATE --- //

// Get keyboard inputs
var keysDown = {};

addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
}, false);

addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
}, false);

// Update

var jumping;

var jump = function(entity) {
	if (entity.y > entity.jumpLimit && !entity.isGoingDown) {
		entity.y -= 10;
	} else {
		entity.isGoingDown = true;
		entity.y += 64;
		console.log(entity.y);
		if (entity.y < (canvas.height - 32)) {
			clearInterval(jumping);
			entity.isGoingDown = false;
		}
	}
}

var currentMap = "map01";
var update = function(modifier) {
	/* Jump ! */
	if (38 in keysDown) { // UP
		//hero.y -= hero.speed * modifier;
		jumping = setInterval(jump(hero), 100);
	}
	if (40 in keysDown) { // DOWN
		if (hero.y >= (canvas.height + 64)) {
			hero.y += hero.speed * modifier;
		}
	}
	if (37 in keysDown) { // LEFT
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // RIGHT
		hero.x += hero.speed * modifier;
	}
	
	// Map stuff
	if (hero.x >= canvas.width) {
		currentMap = "map02";
		hero.x = 0;
		console.log(currentMap);
	}
}



// --- RENDERING --- //

var render = function() {
	
	// Map loads
	if (currentMap === "map01") {
		if (map01Ready) {
			ctx.drawImage(map01Image, 0, 0);
		}
	} else if (currentMap === "map02") {
		if (map02Ready) {
			ctx.drawImage(map02Image, 0, 0);
		}
	}
	
	// Character loads
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
}

// --- MAIN GAME LOOP --- //

var main = function() {
	var now = Date.now();
	var delta = now - then;
	
	update(delta / 1000); // 1000 ms
	render();
	
	then = now;
	
	requestAnimationFrame(main);
}


// Starting the bloody game
var then = Date.now();
game();
main();