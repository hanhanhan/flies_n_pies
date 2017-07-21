// (function(){
// why doesn't the canvas need to be cleared?
// how do I wait for BOTH the fly and the pie images to load?

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

// Pie Initialization
let pieWidth = 30;
let pieHeight = 10;
let pies = [];
// let numberPies = 7;
let pieSpacing = pieWidth * 3;
let pieFallVel = 5;
let pieRotateVel = 2;

let pieImage = new Image();
pieImage.src = 'cherrypie.jpg';
pieImage.onload = function(){
    animateCallback();
}

function Pie(x){
    this.x = x;
    this.y = -pieHeight;
    this.rotation = 0;
}


Pie.prototype.move = function(){
    this.y += pieFallVel;
    if(this.y > canvas.height + pieHeight/2){
        this.y = -2 * pieHeight;
    }

}


Pie.prototype.draw = function(){
    context.rotate(this.rotation)
    context.drawImage(pieImage, this.x, this.y)
    context.rotate(-this.rotation)
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



// })()
