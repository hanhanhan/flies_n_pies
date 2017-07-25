let sx = 0; // position in sprite sheet
let sy = 0;
let sWidth = 100;
let sHeight = 100;
let kAcceleration = 3;
// let flyRange = pieWidth * 1.5;
let flyRange = 20

let flyImage = new Image()
flyImage.src = 'fly-4.png'
let spriteWidth = 100
let flyImageWidth = 200

//Add buzzy noise to flight path
let buzz = 10;
let buzzAngle = 0;
let buzzStep = Math.PI / 5;
let buzzCounter = 100;
let directionCounter = 300;

//Interactivity
let swattingDist = 200;
let chaseAngle;
let x_diff;
let y_diff;
let mouseX, mouseY;
let escapeRotation = 1;

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

    if(this.y > canvas.height){
        this.y = this.pie.y;
    }

    if(d > flyRange){
        this.vx += 0.01 * dx
        this.vy += 0.01 * dy
    } 

    this.vx = this.vx
    this.vy = this.vy 
}


Fly.prototype.draw = function(){
    context.drawImage(flyImage, sx, sy, sWidth, sHeight, this.x, this.y, 40, 40);
}