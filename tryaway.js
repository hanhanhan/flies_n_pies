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
let interval = 10;

// Pie Settings
let pieWidth = 140;
let pieHeight = pieWidth * 0.9;
let pies = [];

// Fly Settings
let fliesPerPie = 10;
let flyStartRadius = pieWidth * 2;

let pieXSpacing = pieWidth * 2.5;
let pieYSpacing = pieHeight * 2;
let pieRows = Math.round(canvas.height / pieYSpacing);
let pieColumns = Math.round(canvas.width / pieXSpacing);
pieColumns = pieColumns < 1 ? 1 : pieColumns

let pieFallVel = 12;
let pieMaxAngle = Math.PI / 5;
let angleIncrement = pieMaxAngle / 30;
let pieRotateVel = 2;

let pieImage = new Image();
pieImage.src = 'images/cherrypie.png';
pieImage.onload = function(){
    animateCallback();
}


function random(min, max){
    return Math.random() * (max - min) + min 
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
