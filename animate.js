var canvas = document.querySelector("canvas");
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
var minRadius = 2;
var colorArray =[
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
]
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    
})
window.addEventListener('resize',function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
})

//object to give every circle a random position
function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function(){
        // to draw a circle
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle =  this.color;
        c.fill(); 
    }
    this.update = function(){
      //condition to bounce the circle from both edges of screen horizontally ===>
        if(this.x + this.radius> innerWidth ||  this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        //condition to bounce the circle from both edges of screen vertically ===>
        if(this.y + this.radius> innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        //to change circle location 
        this.x += this.dx;
        this.y += this.dy; 
        // interactivity
        if(mouse.x - this.x< 50 && mouse.x - this.x> -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
            
        } else if(this.radius > this.minRadius){
            this.radius -=1;
        }


        //to draw the circle 
          this.draw();  
    }
} 

var circleArray = [];

function init(){
    circleArray = [];
    for(var i = 0; i < 100; i++ ){
        // getting random values for circle aspects
        var radius = Math.random() * 10 + 1;
        var x = Math.random() * (innerWidth -radius) +radius;
        var y = Math.random() * (innerWidth -radius) +radius;
        var dx = (Math.random() - 0.5) * 4;
        var dy = (Math.random() - 0.5) * 4; 
        
    
        circleArray.push(new Circle(x, y, dx, dy, radius));
    
    }
}

function animate(){
    // to refresh the frame > requestAnimationFrame(func)
    requestAnimationFrame(animate);
    // to clear the canvas every time the method is called 
    c.clearRect(0,0,innerWidth,innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

init();
animate();
