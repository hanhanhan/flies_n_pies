"use strict"

//Canvas setup
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = 0.9*document.documentElement.clientWidth;
canvas.height = 0.7*document.documentElement.clientHeight;
let padding = 5;
let w = canvas.width - padding;
let h = canvas.height - padding;

canvas.onmousemove = flyFromMouse;

context.fillStyle = 'gray';

//Fly initialization
let xStart = 250;
let yStart = 250;
let angle = Math.random() * 2 * Math.PI;
let speed = 5; 
let size = 6;

//Add buzzy noise to flight path
let buzz = speed * 0.2;
let buzzAngle = 0;
let buzzStep = Math.PI / 5;
let buzzCounter = 100;
let directionCounter = 300;

let fly = { x: xStart, y: yStart, angle: angle, speed: speed, size: size, buzzAngle: buzzAngle };

//Animation speed
let drawTime = Date.now();
let elapsed;
let interval = 5;

function drawFly(){
    context.strokeStyle = 'gray';
    context.lineWidth = 3;
    context.fillStyle = 'white';
    context.fillRect(padding, padding, w, h);
    context.strokeRect(padding, padding, w, h);

    context.beginPath();    
    context.fillStyle = 'gray';
    context.arc(fly.x, fly.y, fly.size, 0, 2*Math.PI);
    context.closePath();
    context.stroke();

    if(fly.x < padding && Math.cos(fly.angle) < 0){
        newAngle(-Math.PI/2);
    }else if(fly.x > w && Math.cos(fly.angle) > 0){
        newAngle(Math.PI/2);
    }else if(fly.y < padding && Math.sin(fly.angle) < 0){
        newAngle(0);
    }else if(fly.y > h && Math.sin(fly.angle) > 0){
        newAngle(Math.PI);
    } 

    fly.buzzAngle += buzzStep;
    fly.x += speed * Math.cos(fly.angle) + buzz * Math.sin(fly.buzzAngle);
    fly.y += speed * Math.sin(fly.angle) + buzz * Math.cos(fly.buzzAngle);
    buzzCounter--;
    directionCounter--;

    //Randomize the buzz noise
    if(buzzCounter < 0){
        buzz = Math.random() * speed;
        buzzStep = Math.random() * Math.PI/2;
        buzzCounter = Math.floor(Math.random() * speed);
     }

    if(directionCounter < 0){
        fly.angle = Math.random() * Math.PI * 2;
        directionCounter = Math.floor(Math.random() * canvas.height / 2);
    }
}

function flyFromMouse(){
    
}

//New angle based on lower limit of angle 
function newAngle(angleOffset){
    fly.angle = Math.random() * Math.PI + angleOffset;
}

function animateCallback(){

    elapsed = Date.now() - drawTime;

    if(elapsed > interval){
        drawFly();
        drawTime = Date.now();
    }
    window.requestAnimationFrame(animateCallback);
}

animateCallback();