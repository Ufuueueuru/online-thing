var world = {
	x: {
		low: -600;
		high: 600;
	}
	y: {
		low: -600;
		high: 600;
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
		if(this.velX < 5 && keys[RIGHT_ARROW]){
			this.velX += 1;
		}
		this.x += this.velX;
		this.y += this.velY;
		this.velX = floor(10*(this.velX*0.9))/10;
		this.velY = floor(10*(this.velY*0.9))/10;
		this.x = constrain(this.x,world.x.low,world.x.high);
		this.y = constrain(this.y,world.y.low,world.y.high);
	}
	
	this.attack = function(other){
		if(this.weapon === "Wooden Sword"){
			
		}
		if(this.weapon === "Wooden Spear"){
			
		}
		if(this.weapon === "Fire Magic"){
			
		}
	}
	
	this.show = function(){
		pushMatrix();
		rotate(atan(mouseX-500,mouseY-500));
		pushMatrix();
		translate(this.x,this.y);
		fill(239, 238, 146);
		arc(0,0,100,100,180,360);
		if(this.rank === "general"){
			fill(8, 79, 19);
		}
		if(this.rank === "soldier"){
			fill(138, 229, 41);
		}
		arc(0,0,100,100,0,180);
		popMatrix();
		popMatrix();
	}
}