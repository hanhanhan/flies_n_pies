let sx = 0; // position in sprite sheet
let sy = 0;
let sWidth = 100;//200;
let sHeight = 100;//260;
let kAcceleration = 3;

let flyImage = new Image()
flyImage.src = 'fly-4.png'

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