var players = [];
function Player(id, x, y, rotation, weapon, armor, rank, side){
	this.id = id;
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.weapon = weapon;
	this.armor = armor;
	this.rank = rank;
	this.side = side;
}

var express = require('express');
var app = express();
var server = app.listen(3000);//, listen

console.log("Server is running.");

app.use(express.static('public'));

var io = require('socket.io')(server);
setInterval(heartbeat,33);

function heartbeat(){
	io.sockets.emit('heartbeat',players);
}

io.sockets.on('connection',
	function(socket){
		console.log("New connection: "+socket.id);
		socket.on('start',
			function(data){
				var player = new Player(socket.id, data.x, data.y, data.rotation, data.weapon, data.armor, data.rank, data.side);
				players.push(player);
			}
		);
		socket.on('update',
			function(data){
				var player;
				for(var i = 0;i < players.length;i ++){
					if(socket.id == players[i].id){
						player = players[i];
						player.x = data.x;
						player.y = data.y;
						player.rotation = data.rotation;
						player.weapon = data.weapon;
						player.armor = data.armor;
						player.rank = data.rank;
						player.side = data.side;
					}
				}
			}
		);
		socket.on('disconnect',
			function(){
				console.log(socket.id+" has disconnected");
				players.splice(players.indexOf(socket.id),1);
			}
		);
	}
);