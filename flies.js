
let flyRange = 50;

let flyImage = new Image();
flyImage.src = 'images/fly-4.png';
let spriteCount = 4;
let spriteWidth = 100;
let spriteHeight = 100;
let dWidth = 40;
let dHeight = 40;
let flyImageWidth = 200;
let maxAcceleration = 0.0051;

//Add buzzy noise to flight path
let buzz = 5;
let buzzAngle = 0;
let buzzStep = Math.PI / 1.5;
let buzzCounter = 100;
let directionCounter = 300;

//Interactivity
let swattingDist = 200;
let chaseAngle;
let x_diff;
let y_diff;
let mouseX, mouseY;
let escapeRotation = 1;

function random(min, max){
    return Math.random() * (max - min) + min; 
}

function Fly(opt){
    this.pie = opt.pie;
    this.x = opt.xStart;
    this.y = opt.yStart;
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.offset = random(-10, 10);
    this.ax = maxAcceleration * random(0.5,1);
    this.ay = maxAcceleration * random(0.5,1);
    this.angle = 0;
    this.buzzAngle = random(-Math.PI, Math.PI);
    this.sprite = 0;
}

Fly.prototype.move = function(){

    if(this.y > canvas.height && this.pie.y < 0){
        this.y = this.y - canvas.height;
    }

    let dx = this.pie.x - this.x;
    let dy = this.pie.y - this.y;
    let d = Math.sqrt(dx * dx + dy * dy);

    if(d > flyRange){
        this.vx += this.ax * (dx) ;
        this.vy += this.ay * (dy);
    } 

    this.angle = Math.atan2(this.vy, this.vx);
    this.buzzAngle = (this.buzzAngle + buzzStep) % (2 * Math.PI)

    this.x += this.vx //+ buzz * Math.cos(this.buzzAngle);
    this.y += this.vy //+ buzz * Math.sin(this.buzzAngle);
}


Fly.prototype.draw = function(){
    // context.drawImage(flyImage, sx, sy, spriteWidth, spriteHeight, this.x, this.y, 40, 40);
    this.sprite = this.sprite % spriteCount;
    sx = this.sprite * spriteWidth;
    this.sprite += 1;
    
    let x = this.x + spriteWidth/2;
    let y = this.y + spriteHeight/2;
    let angle = this.angle + Math.PI;

    context.save();
    context.translate(x, y);
    context.rotate(angle);
    
    context.drawImage(flyImage, sx, 0, spriteWidth, spriteHeight, 0, 0, dWidth, dHeight);
    // context.translate(-x, -y)
    // context.rotate(-angle)
    context.restore();
}