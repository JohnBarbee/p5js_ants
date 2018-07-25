var startSize = 25; //number of ants to start with
var lifeSpan = 200; //number of frames to loop over
var mutation = 0.01; //percentage in decimal of mutation rate
var count = 0; //current frame count
var population = []; //list of all ants
var parentPool = [];
var screenW;
var screenH;
var endPointX;
var endPointY;
var killX;
var killY;
var killX2;
var killY2;

function setup() {
	screenH = screenW = 400;
	endPointX = screenW / 2;
	endPointY = 40;
	killX = (screenW / 2) - 80;
	killY = (screenH / 2) - 10;
	killX2 = killX + 160;
	killY2 = killY + 20;
	createCanvas(screenW, screenH);
	for(var i = 0; i < startSize; i++){
		var a = new ant();
		a.strand.create();
		population.push(a);
	}
}

function draw() {
	background(255, 10);
	fill(255);
	ellipse(endPointX, endPointY, 20, 20);
	fill(255,0,0);
	rect(killX, killY, 160, 20);
	if(count < lifeSpan){
		for(var j = 0; j < 5; j++){
			for(var i = 0; i < population.length; i++){
				population[i].update();
				population[i].show();
			}
		}
		count++;
	} else {
		evaluateParents();
		nextGeneration();
		count = 0;
		//set count to 0
		//go again
	}
}

function evaluateParents(){
	parentPool = [];
	for (var i = 0; i < population.length; i++){
		population[i].calculateFitness();
		var n = population[i].fitness * 10000;
		for(var j = 0; j < n; j++){
			parentPool.push(population[i]);
		}
	}
}

function nextGeneration(){
	population = [];
	var p1;
	var p2;
	var s;
	var a;
	if(parentPool.length > 0){
		for(var i = 0; i < startSize; i++){
			p1 = parentPool[floor(random(0, parentPool.length))];
			p2 = parentPool[floor(random(0, parentPool.length))];
			s = new DNA();
			s.crossOver(p1,p2);
			a = new ant();
			a.strand = s;
			population.push(a);
		}
	}
}

function ant(){
	this.strand = new DNA();
	this.x = screenW / 2;
	this.y = screenH - 1;
	this.fitness = 0;
	this.dead = false;

	this.update = function(){
		if(this.dead == true){
			return null;
		}
		var curDir = this.strand.read(count);
		switch(curDir){
			case 0:
				//going left
				if(this.x - 1 > 0){
					this.x--;
				}
				break;
			case 1:
				//going up
				if(this.y - 1 > 0){
					this.y--;
				}
				break;
			case 2:
				//going right
				if(this.x + 1 < screenW - 1){
					this.x++;
				}
				break;
			case 3:
				//going down
				if(this.y + 1 < screenH - 1){
					this.y++;
				}
				break;
		}

		if(this.x > killX && this.x < killX2 && this.y > killY && this.y < killY2){
			this.dead = true;
		}
	}

	this.show = function(){
		push();
		noStroke();
		fill(0);
		ellipse(this.x,this.y,3,3);
		pop();
	}

	this.calculateFitness = function(){
		this.fitness = 1 / dist(this.x, this.y, endPointX, endPointY);
		if(this.dead == true){
			this.fitness *= 0.5;
		}
	}
}

function DNA(){
	this.directions = [];

	this.create = function(){
		for(var i = 0; i < lifeSpan; i++){
			this.directions[i] = floor(random(0,3));
		}
	}

	this.read = function(index){
		return this.directions[index];
	}

	this.overwrite = function(index, data){
		this.directions[index] = data;
	}

	this.crossOver = function(parent1, parent2){
		var midPoint = random(0,lifeSpan);
		for(var i = 0; i < lifeSpan; i++){
			if(random(0,1) < mutation){
				var t = parent1.strand.read(i);
				var t2 = parent2.strand.read(i);
				var mutGene = floor(random(0,3));
				while(mutGene == t || mutGene == t2){
					mutGene = floor(random(0,3));
				}
				this.overwrite(i, mutGene);
			} else {
				if(i < midPoint)
				{
					this.overwrite(i, parent1.strand.read(i));
				} else {
					this.overwrite(i, parent2.strand.read(i));
				}
			}
		}
	}
}