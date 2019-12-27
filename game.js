var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

document.addEventListener('keydown',keyDownHandler);
document.addEventListener('keyup',keyUpHandler);


//check for level; if reached add another ball using same function


//player object position
var x = canvas.width/2;
var y = canvas.height-20;
var radius = 10;

var coordX = 6;
var coordY = -0.6;

//first cpu object position
var ccx = Math.floor((Math.random()*canvas.width-23)+23);
var ccy = Math.floor((Math.random()*canvas.height-23)+23);

var cpuX = 0.5;
var cpuY = -0.3;

//cpu radius measures

var cpu_radius = 20;
var enemy_radius = 20;

//second cpu object position

var Xpos = Math.floor((Math.random()*canvas.width-23)+23);
var Ypos = Math.floor((Math.random()*canvas.height-23)+23);

var espdX = -1;
var espdY = -1;

//third cpu object position

var Xpos1 = Math.floor((Math.random()*canvas.width-23)+23);
var Ypos1 = Math.floor((Math.random()*canvas.height-23)+23);

var espdX1 = -1;
var espdY1 = -1;

//game navigation

var level_up = 1;

	//keyboard controls
	function left_control(){
			x -= coordX;

			if(x <= 10){
				x += coordX; //prevents ball from going off teh screen
			}
			console.log("KEY PRESSED LEFT");
	}

	function right_control(){
			console.log("KEY PRESSED RIGHT");
			x += coordX;

			if(x >= canvas.width-10){
				x -= coordX;
			}
	}

	function keyDownHandler(event){
		if(event.keyCode == 65){
			//left
			left_control();
			console.log("KEY PRESSED LEFT");		
		}else if (event.keyCode == 68) {
			//right
			right_control();
			console.log("KEY PRESSED RIGHT");
		}else if (event.keyCode == 32) {
			//space
			alert("Game Paused");
			console.log("KEY PRESSED SPACE");
		}else{
			console.log("Key Not Pressed");
		}
	}

	function keyUpHandler(event){
		if(event.keyCode == 65){
			//left	
			console.log("KEY OFF LEFT");
		}else if (event.keyCode == 68) {
			//right
			console.log("KEY OFF RIGHT");
		}else if (event.keyCode == 32) {
			//space
			console.log("KEY OFF SPACE");
		}else{
			console.log("Key Not Pressed");
		}
	}


	function check_collision(){
		//circles externally touching
		//distance formula and radius 
		//sqrt((x2-x1)^2 + (y2 - y1)^2) == radius1 + radius2 
		//means two circles are externally touching
		var disX = x - ccx;
		var disY = y - ccy;
		var distanceX = Math.pow(disX,2);
		var distanceY = Math.pow(disY,2);
		var total_dis = Math.sqrt(distanceX+distanceY);

		var tdistance1 = Math.sqrt(Math.pow(x - Xpos,2) + Math.pow(y - Ypos,2));
		var tdistance2 = Math.sqrt(Math.pow(x - Xpos1,2) + Math.pow(y - Ypos1,2));

		//< is used for 0.2 increments
		//< is used for if radius is greater than total distance
		//means circle goes through and intersects internally
		if(total_dis <= (radius+cpu_radius)){
			game_restart();
			console.log("Collided");
		}
		if(tdistance1 <= (radius+enemy_radius)){
			game_restart();
			console.log("Collided");
		}
		if(tdistance2 <= (radius+enemy_radius)){
			game_restart();
			console.log("Collided");
		}
	}

	//first cpu 
	function cpu(){
		ctx.beginPath();
		ctx.arc(ccx,ccy,cpu_radius,0,Math.PI*2);
		ctx.fillStyle = "#8AA2C1";
		ctx.fill();
		ctx.closePath();
	}
	//player ball
	function drawball (){
		ctx.beginPath();
		ctx.arc(x,y,radius,0,Math.PI*2);
		ctx.fillStyle = "#FFFFFF";
		ctx.fill();
		ctx.closePath();
	}
	//game restarts after completion of level while incrementing speeds
	function restart(){
		if (y <= (radius)) {
			x = canvas.width/2;
			y = canvas.height-30;
			level_up++;
			var level = document.getElementById('level');
			level.innerHTML = "Level "+level_up; 
			coordY -= 0.2;
			coordX += 0.2;
			cpuX += 0.2;
			cpuY += 0.2;
			if(level_up >= 10){
				espdX += 0.2;
				espdY += 0.2;
			}
			
			if(level_up >= 20){
				espdX1 += 0.2;
				espdY1 += 0.2;
			}
		}
	}
	//game restarts after hitting an object
	function game_restart(){
		x = canvas.width/2;
		y = canvas.height-30;
		level_up = 1;
		level.innerHTML = "Level "+level_up;
		coordY = -0.6;
		coordX = 6;
		cpuX = 0.2;
		Xpos = 0.2;
		Xpos1 = 0.2;
	}
	//first cpu bounce algorithim
	function check_bounce(){
		if (ccx >= canvas.width - cpu_radius || ccx <= 0 + cpu_radius) {
			cpuX = -(cpuX);
		}else if(ccy >= canvas.height - cpu_radius || ccy <= 0 + cpu_radius){
			cpuY = -(cpuY);
		}	
	}

	//second cpu spawn
	function enemy_spawn(){
		
        ctx.beginPath();
		ctx.arc(Xpos,Ypos,enemy_radius,0,Math.PI*2);
		ctx.fillStyle = "#8AA2C1";
		ctx.fill();
		ctx.closePath();
	}

	//second cpu bounce algorithim
	function enemy_bounce(){
		if (Xpos >= canvas.width - enemy_radius || Xpos <= 0 + enemy_radius) {
			espdX = -(espdX);
		}else if(Ypos >= canvas.height - enemy_radius || Ypos <= 0 + enemy_radius){
			espdY = -(espdY);
		}	
	}
	//third cpu spawn
	function enemy_spawn1(){
		
        ctx.beginPath();
		ctx.arc(Xpos1,Ypos1,enemy_radius,0,Math.PI*2);
		ctx.fillStyle = "#8AA2C1";
		ctx.fill();
		ctx.closePath();
	}
	//third cpu bounce algorithim
	function enemy_bounce1(){
		if (Xpos1 >= canvas.width - enemy_radius || Xpos1 <= 0 + enemy_radius) {
			espdX1 = -(espdX1);
		}else if(Ypos1 >= canvas.height - enemy_radius || Ypos1 <= 0 + enemy_radius){
			espdY1 = -(espdY1);
		}	
	}

	//main loop to animate the objects and run the game controls
	function game_main_loop(){
		//resets the screen to prevent smearing
		ctx.clearRect(0,0,canvas.width, canvas.height);

		//player
		drawball();
		y += coordY;
		restart();

		//cpu 1
		cpu();
		ccx += cpuX;
		ccy += cpuY;
		check_bounce();	
		check_collision();

		//cpu 2
		if(level_up >= 10){
			enemy_spawn();
			console.log("New Enemy Spawned");
			enemy_bounce();
			Xpos += espdX;
			Ypos += espdY;
		}
		//cpu 3
		if(level_up >= 20){
			enemy_spawn1();
			enemy_bounce1();
			console.log("New Enemy Spawned");
			Xpos1 += espdX1;
			Ypos1 += espdY1;
		}
		//game completion notification
		if(level_up >= 30){
			alert("You have Successfully Completed The Possible Game");
		}
	}

	setInterval(game_main_loop,10);