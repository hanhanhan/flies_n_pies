"use strict";

//Canvas setup
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = 0.9 * document.documentElement.clientWidth;
canvas.height = 0.8 * document.documentElement.clientHeight;
let canvasPlacement = canvas.getBoundingClientRect();

// canvas.onmousemove = mouseCoords;
context.fillStyle = 'gray';



// //Fly image drawing
// let flyImage = new Image();
// flyImage.src = 'fly-4.png';//'drosophilia6sprites-nobg.png';






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