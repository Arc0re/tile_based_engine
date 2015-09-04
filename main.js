// --- LOADING, SETUP --- //

// Creating the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 512;
ctx.imageSmoothingEnabled = false; // FOR PIXEL SCALING YEAH
ctx.mozImageSmoothingEnabled = false;
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

function Entity(src, speed) {
	this.tile = new Tile(src);
	this.x = 0;
	this.y = 0;
	this.speed = speed;
}

hero = new Entity('assets/hero.png', 250);

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

var garden = [
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,2,2,1,2,2,2],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1],
	[1,1,2,2,1,2,2,2],
	[1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1]
];


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
function update(modifier) {
	
	if (38 in keysDown) { // UP
		hero.y -= hero.speed*modifier;
	}
	if (40 in keysDown) { // DOWN
		hero.y += hero.speed*modifier;
	}
	if (37 in keysDown) { // LEFT
		hero.x -= hero.speed*modifier;
	}
	if (39 in keysDown) { // RIGHT
		hero.x += hero.speed*modifier;
	}
}


// --- RENDERING --- //

function render() {

	function drawMap(map) {
		for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			switch (map[i][j]) {
				case 0:
					ctx.drawImage(water_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
					break;
				case 1:
					ctx.drawImage(grass_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
					break;
				case 2:
					ctx.drawImage(forest_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
					break;
				case 3:
					ctx.drawImage(town_tile.image, 0, 0, 32, 32, i*32, j*32, 32, 32);
					break;
				}
			}
		}
	}

	function drawMapScale(map, scaling) {
		for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			switch (map[i][j]) {
				case 0:
					ctx.drawImage(water_tile.image, 0, 0, 32, 32, i*scaling, j*scaling, scaling, scaling);
					break;
				case 1:
					ctx.drawImage(grass_tile.image, 0, 0, 32, 32, i*scaling, j*scaling, scaling, scaling);
					break;
				case 2:
					ctx.drawImage(forest_tile.image, 0, 0, 32, 32, i*scaling, j*scaling, scaling, scaling);
					break;
				case 3:
					ctx.drawImage(town_tile.image, 0, 0, 32, 32, i*scaling, j*scaling, scaling, scaling);
					break;
				}
			}
		}
	}

	drawMap(worldMap);
	//drawMapScale(garden, 32*2);

	ctx.drawImage(hero.tile.image, 0, 0, 32, 32, hero.x, hero.y, 32, 32);
}

// --- MAIN GAME LOOP --- //

function main() {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000); // 1000 ms
	render();
	then = now;
	requestAnimationFrame(main);
}


// Starting the bloody game
var then = Date.now();
main();
