// --- LOADING, SETUP --- //

// Creating the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
ctx.imageSmoothingEnabled = false; // FOR PIXEL SCALING YEAH
document.body.appendChild(canvas);


// Creating and loading assets
function Tile(src) {
	this.image = new Image();
	this.image.src = src;
}

black_tile = new Tile('assets/tiles/black_tile.png');
forest_tile = new Tile('assets/tiles/forest_tile.png');
grass_tile = new Tile('assets/tiles/grass_tile.png');
town_tile = new Tile('assets/tiles/town_tile.png');
water_tile = new Tile('assets/tiles/water_tile.png');
hero_tile = new Tile('assets/hero.png');

var worldMap = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,1,2,1,2,1,1,1,1,1,1,1,1,0,0],
	[0,0,1,1,1,1,1,1,3,1,1,1,1,1,0,0],
	[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
	[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
	[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
	[0,0,3,1,1,2,1,1,1,1,1,1,1,1,1,0],
	[0,0,1,2,1,2,1,1,1,1,1,1,1,1,0,0],
	[0,0,1,2,1,2,1,1,1,1,1,1,1,1,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,2,2,2,2,2,2,2,2,2,2,2,2,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];


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
var update = function(modifier) {
	
	/*var worldControls = function() {
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
	*/
	
};


// --- RENDERING --- //

var render = function() {
		
	for (var i = 0; i < worldMap.length; i++) {
		for (var j = 0; j < worldMap[i].length; j++) {
			if (worldMap[i][j] === 0) {
				ctx.drawImage(water_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
			}
			if (worldMap[i][j] === 1) {
				ctx.drawImage(grass_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
			}
			if (worldMap[i][j] === 2) {
				ctx.drawImage(forest_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
			}
			if (worldMap[i][j] === 3) {
				ctx.drawImage(town_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
			}
		}
	}
	// for (var i = 0; i < canvas.width; i++) {
	// 	for (var j = 0; j < canvas.height; j++) {
	// 		// ctx.drawImage(grass_tile.image, (i * 32), (j * 32));
	// 		ctx.drawImage(town_tile.image, 0, 0, 32, 32, i*64, j*64, 64, 64);
	// 	}
	// }
	ctx.drawImage(hero_tile.image, 0, 0, 32, 32, (canvas.width/2)-32, (canvas.height/2)-32, 64, 64);
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
main();
