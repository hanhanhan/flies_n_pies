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

//where to draw fly on canvas
let padding = 0;//spriteWidth/2;
let w = canvas.width - padding;
let h = canvas.height - padding;

//Destination
let dx = xStart;
let dy = yStart;
let dWidth = size;
let dHeight = size * dy / dx;

//Add buzzy noise to flight path
let buzz = speed * 0.3;
let buzzAngle = 0;
let buzzStep = Math.PI / 5;
let buzzCounter = 100;
let directionCounter = 300;

// -----

function random(min, max){
    return Math.random() * (max - min) + min;
}


function Pie(x){
    this.x = x;
    this.y = -pieHeight;
    this.rotation = 0;
    this.flies = [];

    for(let i=0; i<fliesPerPie; i++){
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

// function drawFly(){
//     context.strokeStyle = 'gray';
//     context.lineWidth = 3;
//     context.fillStyle = 'white';
//     context.fillRect(0
//  0
//  canvas.width
//  canvas.height);
//     context.strokeRect(0
//  0
//  canvas.width
//  canvas.height);

//     //Draw fly sprite
//     sx = sx % flyImageWidth;
//     sx += spriteWidth;
//     context.save();
//     context.translate(fly.x
//  fly.y);
//     context.rotate(fly.angle + Math.PI);
//     //context.strokeRect(0
//  0
//  10
//  10);
//     context.drawImage(flyImage
//  sx
//  sy
//  sWidth
//  sHeight
//  0
//  0
//  dWidth
//  dHeight);
//     context.restore();

//     // //Fake fly
//     // context.beginPath();    
//     // context.fillStyle = 'gray';
//     // context.arc(fly.x
//  fly.y
//  fly.size
//  0
//  2*Math.PI);
//     // context.closePath();
//     // context.stroke();

//     // //Draw the geometry
//     // context.beginPath();
//     // context.moveTo(fly.x
//  fly.y);
//     // context.lineTo(fly.x + x_diff
//  fly.y);
//     // context.lineTo(fly.x + x_diff
//  fly.y + y_diff);

//     // context.moveTo(fly.x
//  fly.y);
//     // context.lineTo(
//     //     (fly.x + swattingDist * Math.cos(chaseAngle))
 
//     //     fly.y - swattingDist * Math.sin(chaseAngle));
//     //     context.moveTo(fly.x
//  fly.y);
//     // context.closePath();
//     // context.stroke();

//     // context.strokeStyle = 'orange';
//     // context.beginPath();
//     // context.moveTo(fly.x
//  fly.y);
//     // context.lineTo(
//     //     (fly.x + canvas.width * Math.cos(fly.angle))
 
//     //     fly.y - canvas.height * Math.cos(fly.angle));
//     // context.stroke();

//     //Noisy flight    
//     fly.x += fly.speed * Math.cos(fly.angle) + buzz * Math.sin(fly.buzzAngle);
//     fly.y += fly.speed * Math.sin(fly.angle) + buzz * Math.cos(fly.buzzAngle);
//     fly.buzzAngle += buzzStep;
//     buzzCounter--;
//     directionCounter--;

//     //Randomize the buzz noise
//     if(buzzCounter < 0){
//         buzz = Math.random() * speed;
//         buzzStep = Math.random() * Math.PI/2;
//         buzzCounter = Math.floor(Math.random() * speed);
//      }

//     //Sometimes the fly changes direction without hitting a wall or mouse interaction
//     if(directionCounter < 0){
//         fly.turning = turnFly();
//         //fly.angle = 2 * Math.PI * Math.random();
//         directionCounter = Math.floor(Math.random() * canvas.height / 2);
//     }
//     fly.angle = fly.turning.next().value || fly.angle;

//     //If the mouse is near
//  fly speeds up and changes direction to evade
//     let mouseDist = Math.sqrt((fly.x - mouseX)*(fly.x - mouseX) +
//         (fly.y - mouseY)*(fly.y - mouseY));
//     if(mouseDist < swattingDist){ 
//         flyFromMouse();
//     }else{ 
//         fly.speed = speed; 
//         //A -1 or +1 value to flip direction of evasion
//         escapeRotation = (Math.round(Math.random()) * 2 - 1);
//     }

//     //Fly changes direction randomly if it hits a wall in range of pi away from wall
//     if(fly.x < padding){
//         fly.x = padding;
//         //fly.angle = turnFly();
//         newAngle(-Math.PI/2);

//     }else if(fly.x > w){
//         fly.x = w;
//         //fly.angle = turnFly();
//         newAngle(Math.PI/2);
//     }else if(fly.y < padding){
//         fly.y = padding;
//         //fly.angle = turnFly();
//         newAngle(0);
//     }else if(fly.y > h){
//         fly.x = h;
//         //fly.angle = turnFly();
//         newAngle(Math.PI);
//     } 
// }

//If the mouse gets within a 'swatting distance' of the fly
// the fly accelerates and changes direction away from mouse
// function mouseCoords(e){
//     mouseX = e.clientX - canvasPlacement.left;
//     mouseY = e.clientY - canvasPlacement.top;
// }
    
// function flyFromMouse(){
//     //Find angle of approach
//     x_diff = mouseX - fly.x;
//     y_diff = mouseY - fly.y;
//     chaseAngle = Math.atan2((y_diff)
//     (x_diff));
//     //Flies tend to fly at a pi/2 angle from attack
 
//     //escapeRotation is +/-1 randomly reset after out of range
//     fly.angle = chaseAngle + Math.PI/2 * escapeRotation;
//     //Too slow and fly goes in loops around mouse.
//     //Too fast and fly goes off canvas.
//     fly.speed = 10*speed + 50/(x_diff*x_diff + y_diff*y_diff);
// }

// //New angle in a range of pi radians
//  with lower limit of angleOffset argument 
// function newAngle(angleOffset){
//     fly.angle = Math.random() * Math.PI + angleOffset;
// }

// //Turn fly in a series of steps
// function turnFly(){
//     //amount to turn
//     let steps = 6;
//     let turnAmount = Math.random() * Math.PI; //
//     let increment = Math.PI / steps; //.5
//     //rotation of turn
//     let rotation = Math.round(Math.random()) * 2 - 1;
//     for(let i = 0; i * increment < turnAmount; i++){
//         fly.angle += rotation * increment;
//         yield fly.angle;
//     }
// }

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