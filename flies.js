
let flyRange = 20;

let flyImage = new Image();
flyImage.src = 'fly-4.png';
let spriteCount = 4;
let spriteWidth = 100;
let spriteHeight = 100;
let dWidth = 40;
let dHeight = 40;
let flyImageWidth = 200;

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
    this.sprite = 0;
    // this.turning = turnFly();
}

Fly.prototype.move = function(){
    // random motion with pie as attractor, and shooing with mouse
    this.x += this.vx;
    this.y += this.vy;

    let dx = this.pie.x - this.x;
    let dy = this.pie.y - this.y;
    let d = Math.sqrt(dx * dx + dy * dy);

    // fast random motion within radius of pie
    // attracted motion outside radius of pie

    if(this.y > canvas.height){
        this.y = this.pie.y;
    }

    if(d > flyRange){
        this.vx += 0.01 * dx;
        this.vy += 0.01 * dy;
    } 

    this.vx = this.vx;
    this.vy = this.vy; 

    this.angle = Math.atan2(this.vy, this.vx);
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
    //context.translate(-x, -y)
    // context.rotate(-angle)
    context.restore();
}