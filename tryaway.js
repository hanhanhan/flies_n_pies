// (function(){
// why doesn't the canvas need to be cleared when the damn pie image was too big? weird.
// how do I wait for BOTH the fly and the pie images to load?
// how should I cover the 'bald spot' for the number of rows?

"use strict";

//Canvas setup
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = 0.9 * document.documentElement.clientWidth;
canvas.height = 0.8 * document.documentElement.clientHeight;

//Animation speed
let drawTime = Date.now();
let elapsed;
let interval = 30;

// Pie Settings
let pieWidth = 140;
let pieHeight = pieWidth * 0.9;
let pies = [];

let pieXSpacing = pieWidth * 3;
let pieYSpacing = pieHeight * 2;
let pieRows = Math.round(canvas.height / pieYSpacing);
let pieColumns = Math.round(canvas.width / pieXSpacing);
pieColumns = pieColumns < 1 ? 1 : pieColumns

let pieFallVel = 12;
let pieMaxAngle = Math.PI / 5;
let angleIncrement = pieMaxAngle / 30;
let pieRotateVel = 2;

let pieImage = new Image();
pieImage.src = 'cherrypie.png';
pieImage.onload = function(){
    animateCallback();
}

// Fly Settings
let fliesPerPie = 10;
let flyStartRadius = pieWidth * 2;

let sx = 0; // position in sprite sheet
let sy = 0;
let sWidth = 100;//200;
let sHeight = 100;//260;
let kAcceleration = 3;

let flyImage = new Image()
flyImage.src = 'fly-4.png'


function random(min, max){
    return Math.random() * (max - min) + min 
}


function Pie(x, y){
    this.x = x;
    this.y = y;
   
    this.angle = random(-pieMaxAngle, pieMaxAngle);
    this.angleIncrement = random(0.6 * angleIncrement, 1.4 * angleIncrement)

    this.flies = []
    for(let i = 0; i < fliesPerPie; i++){
        let fly = new Fly({
            pie: this,
            xStart: this.x + pieWidth * Math.random(),
            yStart: this.y + pieHeight * Math.random(),
        })
        this.flies.push(fly)
    }
}


Pie.prototype.move = function(){
    // Falling
    this.y += pieFallVel;
    if(this.y > canvas.height + pieHeight/2){
        this.y = -2 * pieHeight;
    }

    // Rotating
    if(this.angle > pieMaxAngle){
        this.angleIncrement = - Math.abs(this.angleIncrement);
    }else if(this.angle < - pieMaxAngle){
        this.angleIncrement = Math.abs(this.angleIncrement);
    }

    this.angle += this.angleIncrement; 

    // Drifting
    this.x += 10 * Math.cos(this.angle + Math.PI * 3/2) 
    this.y += 10 * Math.sin(this.angle + Math.PI * 3/2)

    // Flies
    this.flies.forEach(function(fly){
        fly.move()
    })
}


Pie.prototype.draw = function(){
    context.save();
    context.translate(this.x + pieWidth / 2, this.y + pieHeight / 2);
    context.rotate(this.angle);
    context.translate(-this.x - pieWidth / 2, -this.y - pieHeight / 2);
    context.drawImage(pieImage, this.x, this.y, pieWidth, pieHeight);
    context.restore();  

    // Flies
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
    this.angle = 0;
    this.buzzAngle = 0;
    this.frame = 0;
    // this.turning = turnFly();
}

Fly.prototype.move = function(){
    // random motion with pie as attractor, and shooing with mouse
    this.x += this.vx;
    this.y += this.vy;

    let dx = this.pie.x - this.x
    let dy = this.pie.y - this.y
    let d = Math.sqrt(dx * dx + dy * dy)

    // fast random motion within radius of pie
    // attracted motion outside radius of pie
    
    this.ax = kAcceleration * random(-1,1)/(d + 1)
    this.ay = kAcceleration * random(-1,1)/(d + 1)

    this.vx = this.vx + this.vx / dx + this.ax //* 0.02 * Math.random(-0.02,0.02);
    this.vy = this.vy + this.vy / dy + this.ay//* 0.02 * Math.random(-0.02,0.02);
}


Fly.prototype.draw = function(){
    context.drawImage(flyImage, sx, sy, sWidth, sHeight, this.x, this.y, 40, 40);
}


for(let row = 0; row < pieRows; row++){

    let pieX;
    if(row % 2 == 0){
        pieX = random(0.5 * pieXSpacing, pieXSpacing);  
    }else{
        pieX = random(0 * pieXSpacing, 0.5 * pieXSpacing);
    }
        
    for(let col = 0; col < pieColumns; col++){
        let pieY = - random(row * pieYSpacing, (row + 1) * pieYSpacing)
        let pie = new Pie(pieX, pieY)
        pieX += pieXSpacing
        pies.push(pie)
    }
}
function animateCallback(){

    elapsed = Date.now() - drawTime;

    if(elapsed > interval){
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.rect(0, 0, canvas.width, canvas.height)
        context.stroke()
        pies.forEach(function(pie){ pie.move() })
        pies.forEach(function(pie){ pie.draw() })
        drawTime = Date.now();
    }

    window.requestAnimationFrame(animateCallback);
}



// })()
