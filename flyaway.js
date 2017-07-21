"use strict";

//Canvas setup
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = 0.9 * document.documentElement.clientWidth;
canvas.height = 0.8 * document.documentElement.clientHeight;
let canvasPlacement = canvas.getBoundingClientRect();

// canvas.onmousemove = mouseCoords;
context.fillStyle = 'gray';

//Fly initialization
let xStart = 100;
let yStart = 100;
let angle = Math.random() * 2 * Math.PI;
let speed = 15; 
let size = 50;
let kAcceleration = 3;

//Fly image drawing
let flyImage = new Image();
flyImage.src = 'fly-4.png';//'drosophilia6sprites-nobg.png';

let spriteWidth = 100;//200; //amount to increment through sprite sheet
let flyImageWidth = 200; //1200;

let pieImage = new Image();
pieImage.src = 'cherrypie.jpg';

let pieWidth = 30;
let pieHeight = 10;
let pies = [];
// let numberPies = 7;
let pieSpacing = pieWidth * 3;
let fliesPerPie = 10;
let flyStartAngle = 2 * Math.PI / fliesPerPie;
let flyStartRadius = 10;
let flyStartOffsetX = flyStartRadius * Math.cos(flyStartAngle);
let flyStartOffsetY = flyStartRadius * Math.sin(flyStartAngle);
let pieFallVel = 5;
let pieRotateVel = 2;

//Source image info
let sx = 0; // position in sprite sheet
let sy = 0;
let sWidth = 100;//200;
let sHeight = 100;//260;


function random(min, max){
    return Math.random() * (max - min) + min;
}


function Pie(x){
    this.x = x;
    this.y = -pieHeight;
    this.rotation = 0;
    this.flies = [];

    for(let i = 0; i < fliesPerPie; i++){
        let fly = new Fly({
            pie: this,
            xStart: this.x + flyStartOffsetX * Math.random(),
            yStart: this.y + flyStartOffsetY * Math.random(),
            rotate: 0
        })
        this.flies.push(fly);
    }
}


Pie.prototype.move = function(){
    this.y += pieFallVel;
    if(this.y > canvas.height + pieHeight/2){
        //this.y = -3 * pieHeight;
        this.y = -pieHeight;
    }
    // add rotation

    this.flies.forEach(function(fly){
        fly.move()
    })

    // this.flies.forEach(fly => fly.move())
}


Pie.prototype.draw = function(){
    context.rotate(this.rotation)
    context.drawImage(pieImage, this.x, this.y)
    context.rotate(-this.rotation)

    this.flies.forEach(function(fly){
        fly.draw()
    })
}


function Fly(opt){
    this.pie = opt.pie;
    this.x = opt.xStart;
    this.y = opt.yStart;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.angle = angle;
    this.size = size;
    this.buzzAngle = buzzAngle;
    this.rotation = 0;
    // this.turning = turnFly();
}

Fly.prototype.move = function(){
    // random motion with pie as attractor, and shooing with mouse
    this.x += this.vx;
    this.y += this.vy;

    let dx = this.pie.x - this.x
    let dy = this.pie.y - this.y
    let d = Math.sqrt(dx * dx + dy * dy)

    // depends on how close to pie + random factor
    // inversely proportionate to distance after certain distance
    // previous acceleration
    // random factor    
    this.ax = kAcceleration * random(-1,1)/(d + 1)
    this.ay = kAcceleration * random(-1,1)/(d + 1)

    this.vx += this.ax;
    this.vy += this.ay
}

// Fly.prototype.shoo = function(){
    
// }

Fly.prototype.draw = function(){
    context.rotate(this.rotate)
    context.drawImage(flyImage, this.x, this.y)
    context.rotate(-this.rotate)

    // //Draw fly sprite
    // sx = sx % flyImageWidth;
    // sx += spriteWidth;
    // context.save();
    // context.translate(fly.x + sWidth/2, fly.y + sHeight/2);
    // context.rotate(fly.angle + Math.PI);
    // context.drawImage(flyImage, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
    // context.restore();
}

// initialize pie and associated flies
// does it make more sense to put in 3rd constructor? 
// or just initialize in loop?

 // differing x value for each pie
 // flies associated
 // x and y values of flies based on associated pie "attractor"

function Swarm(){


}

// -------------------------

//Animation speed
let drawTime = Date.now();
let elapsed;
let interval = 30;

//Interactivity
let swattingDist = 200;
let chaseAngle;
let x_diff;
let y_diff;
let mouseX
let mouseY;
let escapeRotation = 1;

function animateCallback(){

    elapsed = Date.now() - drawTime;

    if(elapsed > interval){
        pies.forEach(function(pie){ pie.move() })
        pies.forEach(function(pie){ pie.draw() })
        drawTime = Date.now();
        // context.clearRect(0, 0, canvas.width, canvas.height)
    }

    window.requestAnimationFrame(animateCallback);
}


let numberPies = Math.floor(canvas.width / pieSpacing) - 1;
numberPies = numberPies < 1 ? 1 : numberPies

let piePosition = pieSpacing / 2
numberPies = 1
for(let i = 0; i < numberPies; i++){
    let pie = new Pie(piePosition)
    piePosition += pieSpacing
    pies.push(pie)
}

animateCallback();