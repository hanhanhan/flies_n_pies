"use strict";

//Canvas setup
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = 0.9*document.documentElement.clientWidth;
canvas.height = 0.7*document.documentElement.clientHeight;
let canvasPlacement = canvas.getBoundingClientRect();
let padding = 5;
let w = canvas.width - padding;
let h = canvas.height - padding;

canvas.onmousemove = mouseCoords;

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

//Interactivity
let swattingDist = speed * 30;
let chaseAngle;
let x_diff;
let y_diff;
let mouseX, mouseY;
let escapeRotation = 1;

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

    // context.beginPath();
    // context.moveTo(fly.x, fly.y);
    // context.lineTo(fly.x + x_diff, fly.y);
    // context.lineTo(fly.x + x_diff, fly.y + y_diff);

    // context.moveTo(fly.x, fly.y);
    // context.lineTo(
    //     (fly.x + swattingDist * Math.cos(chaseAngle)), 
    //     fly.y - swattingDist * Math.sin(chaseAngle));
    //     context.moveTo(fly.x, fly.y);
    // context.closePath();
    // context.stroke();

    // context.strokeStyle = 'orange';
    // context.beginPath();
    // context.moveTo(fly.x, fly.y);
    // context.lineTo(
    //     (fly.x + canvas.width * Math.cos(fly.angle)), 
    //     fly.y - canvas.height * Math.cos(fly.angle));
    // context.stroke();

    //Noisy flight    
    fly.x += fly.speed * Math.cos(fly.angle) + buzz * Math.sin(fly.buzzAngle);
    fly.y += fly.speed * Math.sin(fly.angle) + buzz * Math.cos(fly.buzzAngle);
    fly.buzzAngle += buzzStep;
    buzzCounter--;
    directionCounter--;
    console.log(directionCounter);

    //Randomize the buzz noise
    if(buzzCounter < 0){
        buzz = Math.random() * speed;
        buzzStep = Math.random() * Math.PI/2;
        buzzCounter = Math.floor(Math.random() * speed);
     }

    //Sometimes the fly changes direction without hitting a wall or mouse interaction
    if(directionCounter < 0){
        fly.angle = Math.random() * Math.PI * 2;
        directionCounter = Math.floor(Math.random() * canvas.height / 2);
    }

    //If the mouse is near, fly speeds up and changes direction to evade
    let dist = ((fly.x - mouseX)**2 + (fly.y - mouseY)**2)**(1/2);
    if(dist < swattingDist){ 
        flyFromMouse();
    }else{ 
        fly.speed = speed; 
        //A -1 or +1 value to flip direction of evasion
        escapeRotation = (Math.round(Math.random()) * 2 - 1);
    }

    //Fly changes direction randomly if it hits a wall in range of pi away from wall
    if(fly.x < padding && Math.cos(fly.angle) < 0){
        newAngle(-Math.PI/2);
    }else if(fly.x > w && Math.cos(fly.angle) > 0){
        newAngle(Math.PI/2);
    }else if(fly.y < padding && Math.sin(fly.angle) < 0){
        newAngle(0);
    }else if(fly.y > h && Math.sin(fly.angle) > 0){
        newAngle(Math.PI);
    } 
}

//If the mouse gets within a 'swatting distance' of the fly, the fly accelerates and changes direction away from mouse
function mouseCoords(e){
    mouseX = e.clientX - canvasPlacement.left;
    mouseY = e.clientY - canvasPlacement.top;
}
    
function flyFromMouse(){
    //Find angle of approach
    x_diff = mouseX - fly.x;
    y_diff = mouseY - fly.y;
    chaseAngle = Math.atan2((y_diff),(x_diff));
    //Flies tend to fly at a pi/2 angle from attack
    //
    fly.angle = chaseAngle + Math.PI/2 * escapeRotation;
    //Too slow and fly goes in loops around mouse.
    //Too fast and fly goes off canvas.
    fly.speed = 10*speed + 100/(x_diff**2 + y_diff**2);
    buzz = 0;
    buzzAngle = 0;
    //have reset to keep these from winding up?
    //have a pause on the counters?
    buzzCounter++;
    directionCounter++;
}

//New angle in a range of pi radians, with lower limit of angleOffset argument 
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