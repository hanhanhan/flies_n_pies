function Pie(x, y){
    this.x = x;
    this.y = y;
   
    this.angle = random(-pieMaxAngle, pieMaxAngle);
    this.angleIncrement = random(0.6 * angleIncrement, 1.4 * angleIncrement)

    this.flies = []
    for(let i = 0; i < fliesPerPie; i++){
        let fly = new Fly({
            pie: this,
            xStart: this.x + random(-pieWidth/2, pieWidth/2),//this.x + pieWidth * Math.random(),
            yStart: this.y + random(-pieWidth/2, pieWidth/2)//this.y + pieHeight * Math.random(),
        })
        this.flies.push(fly)
    }
}


Pie.prototype.move = function(){
    // Falling
    this.y += pieFallVel;
    if(this.y > canvas.height + pieHeight/3){
        this.y = -pieHeight;
    }

    // Rotating
    if(this.angle > pieMaxAngle){
        this.angleIncrement = - Math.abs(this.angleIncrement);
    }else if(this.angle < - pieMaxAngle){
        this.angleIncrement = Math.abs(this.angleIncrement);
    }

    this.angle += this.angleIncrement; 

    // Drifting
    this.x += 10 * Math.cos(this.angle + Math.PI * 3/2) 
    this.y += 10 * Math.sin(this.angle + Math.PI * 3/2)

    // Flies
    this.flies.forEach(function(fly){
        fly.move()
    })
}


Pie.prototype.draw = function(){
    context.save();
    context.translate(this.x + pieWidth / 2, this.y + pieHeight / 2);
    context.rotate(this.angle);
    context.translate(-this.x - pieWidth / 2, -this.y - pieHeight / 2);
    context.drawImage(pieImage, this.x, this.y, pieWidth, pieHeight);
    context.restore();  

    // Flies
    this.flies.forEach(function(fly){
        fly.draw()
    })
}