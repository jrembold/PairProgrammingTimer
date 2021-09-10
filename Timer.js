let active;
let currsec;
let timer_length = 360;
let time = timer_length;
let tone;
let running = false;

function preload(){
	soundFormats("mp3");
	tone = loadSound("./shiphorn");
}


function setup() {
	createCanvas(windowWidth,windowHeight);
	background(40);
	noStroke();
	textSize(min(width, height) / 2);
	textAlign(CENTER, CENTER);

	active = true;
	currsec = second()
}

function draw() {
	background(40);
	noStroke();
	if (active) {
		fill("#FD971F");
		rect(0,0,width/2, height);
	} else {
		fill("#66D9EF");
		rect(width/2,0,width/2, height);
	}
	if (frameCount % 60 == 0 && time > 0 && running){
		time --;
	}
	if (time == 0) {
		time = timer_length;
		toggle_driver();
	}
	stroke(10);
	strokeWeight(10);
	fill(250,250,250);
	ptime = parse_time(time);
	text(String(ptime[0])+":"+String(ptime[1]).padStart(2,"0"), width/2, height/2);
}

function toggle_driver() {
	active = !active;
	tone.play();
}

function parse_time(t) {
	let minute = floor(t/60);
	let second = t % 60;
	return [minute, second]
}

function mouseClicked() {
	running = !running;
}

function mouseWheel(event) {
	if (!running) {
		if (event.delta > 0) {
			timer_length --;
		} else {
			timer_length ++;
		}
		time = timer_length;
	}
	return false;
}


