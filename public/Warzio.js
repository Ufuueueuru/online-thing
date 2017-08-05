var socket;
var player;
var players = [];
var world = {
	x: {
		low: -600,
		high: 600
	},
	y: {
		low: -600,
		high: 600
	}
}
var keys = [];
function keyPressed(){
	keys[keyCode] = true;
}
function keyReleased(){
	keys[keyCode] = false;
}
function Player(x,y,rotation,weapon,armor,rank,side){
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.weapon = weapon;
	this.armor = armor;
	this.rank = rank;
	this.side = side;
	this.velX = 0;
	this.velY = 0;
	
	this.update = function(){
		if(this.velX < 10 && keys[RIGHT_ARROW]){
			this.velX += 2;
		}
		if(this.velX > -10 && keys[LEFT_ARROW]){
			this.velX -= 2;
		}
		if(this.velY < 10 && keys[DOWN_ARROW]){
			this.velY += 2;
		}
		if(this.velY > -10 && keys[UP_ARROW]){
			this.velY -= 2;
		}
		this.x += this.velX;
		this.y += this.velY;
		if(this.velX > 0){
			this.velX -= 1;
		}
		if(this.velX < 0){
			this.velX += 1;
		}
		if(this.velY > 0){
			this.velY -= 1;
		}
		if(this.velY < 0){
			this.velY += 1;
		}
		if(this.x > world.x.high){
			this.velX -= 3;
		}
		if(this.x < world.x.low){
			this.velX += 3;
		}
		if(this.y > world.y.high){
			this.velY -= 3;
		}
		if(this.y < world.y.low){
			this.velY += 3;
		}
	}
	
	this.attack = function(){
		if(this.weapon === "Wooden Sword"){
			
		}
		if(this.weapon === "Wooden Spear"){
			
		}
		if(this.weapon === "Fire Magic"){
			
		}
	}
	
	this.show = function(){
		this.rotation = atan2(mouseY-height/2,mouseX-width/2)+PI/2;
		push();
		translate(width/2,height/2);
		push();
		rotate(this.rotation);
		fill(239, 238, 146);
		arc(0,0,100,100,PI,2*PI);
		if(this.rank === "general"){
			fill(8, 79, 19);
		}
		if(this.rank === "soldier"){
			fill(138, 229, 41);
		}
		arc(0,0,100,100,0,PI);
		pop();
		pop();
	}
}
function setup(){
	createCanvas(windowWidth,windowHeight);
	angleMode(radians);
	socket = io.connect('http://localhost:3000');
	player = new Player(random(-600,600),random(-600,600),0,0,0,"soldier",1);
	var data = {
		x: player.x,
		y: player.y,
		rotation: player.rotation,
		weapon: player.weapon,
		armor: player.armor,
		rank: player.rank,
		side: player.side
	}
	socket.emit('start',data);
	socket.on('heartbeat',
		function(data){
		console.log(data);
			players = data;
		}
	);
}

function draw(){
	noStroke();
	background(0,0,0);
	push();
	translate(width/2,height/2);
	push();
	translate(-player.x,-player.y);
	stroke(255,255,255);
	for(var i = -6;i < 12;i ++){
		for(var u = -6;u < 12;u ++){
			fill(0,255,50);
			rect(i*100,u*100,100,100);
		}
	}
	noStroke();
	for(var i = 0;i < players.length; i ++){
		var id = players[i].id;
		if(id !== socket.id){
			push();
			translate(players[i].x,players[i].y);
			push();
			rotate(players[i].rotation);
			fill(239, 238, 146);
			arc(0,0,100,100,PI,2*PI);
			if(players[i].rank === "general"){
				fill(8, 79, 19);
			}
			if(players[i].rank === "soldier"){
				fill(138, 229, 41);
			}
			arc(0,0,100,100,0,PI);
			pop();
			pop();
			if(dist(players[i].x,players[i].y,player.x,player.y) < 100){
				player.x += 5*cos(atan2(player.y-players[i].y,player.x-players[i].x));
				player.y += 5*sin(atan2(player.y-players[i].y,player.x-players[i].x));
			}
		}
	}
	pop();
	pop();
	player.show();
	player.update();
	var data = {
		x: player.x,
		y: player.y,
		rotation: player.rotation,
		weapon: player.weapon,
		armor: player.armor,
		rank: player.rank,
		side: player.side
	}
	socket.emit('update',data);
}
function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}