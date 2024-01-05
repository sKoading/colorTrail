const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

// Use event listeners to prevent stretching
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Helps you access the current coordinate of the last user click on
// the global scope
const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
  //drawCircle();
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
  //drawCircle();
});

//Draws a rectangle
//ctx.fillStyle = "white";
//ctx.fillRect(10, 10, 150, 50);

/*

function drawCircle() {
  // Fills the path with the color deceided
  ctx.fillStyle = "green";
  // Fills the countour with the color deceided
  ctx.strokeStyle = "lightgreen";
  ctx.lineWidth = 5;
  // Tells JS that you want to place your paintbrush on canvas and start a drawing
  // We have to do this because single shape can be made of multiple lines.
  // So beginPath let's js know we are starting a new shape that is not connected to
  // the previous lines if there are any.
  ctx.beginPath();
  // Creates a circular path at coordinates 100, 100 with a radius 50
  // This path will not start to draw in form the top left corner like rectangle did
  // It will take X and Y coordinates as a center point
  // Math.Pi * 2 converts to 360 degrees which is the entire circle
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.stroke();
  // ctx.fill() will fill the path with color
  ctx.fill();
}
*/

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    //this.x = Math.random() * canvas.width;
    //this.y = Math.random() * canvas.height;
    this.size = Math.random() * 11 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Make the particle shrink as they move arround
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      console.log(particlesArray.length);
      i--;
    }
  }
}

function animate() {
  // Clears old paints from canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //drawCircle();
  handleParticles();
  // This increses the hue variable which will then change the color
  hue += 0.5;
  // This function just calls the function we pass it as an argument, iot calls it only once
  // Here by passing it animate which is the function it will create a loop
  requestAnimationFrame(animate);
}
animate();
