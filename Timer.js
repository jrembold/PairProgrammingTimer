let active;
let currsec;
let timer_length = 360;
let time = timer_length;
let tone;
let running = false;
let swap = false;
let swaptime;
let box_x = 0;
let box_color;

let orange;
let blue;

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
	orange = color("#FD971F");
	blue = color("#66D9EF");
	box_color = orange;
}

function draw() {
	background(40);
	noStroke();
	fill(box_color);
	rect(box_x,0,width/2, height);
	if (frameCount % 60 == 0 && time > 0 && running){
		time --;
	}
	if (time == 0) {
		time = timer_length;
		toggle_driver();
	}
	if (swap) {
		push();
		stroke(10);
		strokeWeight(10);
		fill(250,0,0);
		textSize(min(width, height) / 3);
		text("SWAP!", width/2, height/2);
		pop();
		if (active) {
			box_x = map(frameCount - swaptime, 0, 180, width/2, 0);
			box_color = lerpColor(blue, orange, map(frameCount - swaptime, 0, 60, 0, 1));
		} else {
			box_x = map(frameCount - swaptime, 0, 180, 0, width/2);
			box_color = lerpColor(orange, blue, map(frameCount - swaptime, 0, 60, 0, 1));
		}
		// Check if time to change out of swap mode
		if (frameCount - swaptime > 60*3) {
			swap = false;
		}
	} else {
		stroke(10);
		strokeWeight(10);
		fill(250,250,250);
		ptime = parse_time(time);
		text(String(ptime[0])+":"+String(ptime[1]).padStart(2,"0"), width/2, height/2);
	}
}

function toggle_driver() {
	active = !active;
	tone.play();
	swap = true;
	swaptime = frameCount
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
	let step = 15;
	if (!running) {
		if (event.delta > 0) {
			if (timer_length > step) {
				timer_length -= step;
			}
		} else {
			timer_length += step;
		}
		time = timer_length;
	}
	return false;// disables other scroll effects
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	textSize(min(width, height) / 2);
}


