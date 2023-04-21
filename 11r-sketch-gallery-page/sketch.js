let NUM_OF_PARTICLES = 100; // Decide the initial number of particles.
let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  background(45, 49, 51);
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  colorMode(RGB);
  background(45, 49, 51);
  colorMode(HSB, 100);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.slowDown();
    p.bounce();
    p.rotate();
    p.shrink();
    p.attractedTo(mouseX, mouseY);
    p.display();
    p.delete(i);
  }
}

function mouseDragged() {
  particles.push(new Particle(mouseX, mouseY));
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 10;
    this.xSpd = random(-2, 2);
    this.ySpd = random(-2, 2);
    this.pX = [];
    this.pY = [];
    this.rotAngle = random(TWO_PI); // radians
    this.rotSpd = random(0.05);
    this.s = 1;
    this.hue = random(50, 90);
    this.brightness = 100;
    this.sides = int(random(3, 8));
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.s);
    rotate(this.rotAngle);
    stroke(this.hue, 30, this.brightness);
    fill(this.hue, 30, this.brightness);
    circle(0, 0, this.dia);
    for (let i = 0; i < this.sides; i++) {
      let angle = ((i + 1) * 2 * PI) / this.sides;
      this.pX[i] = 50 * cos(angle);
      this.pY[i] = 50 * sin(angle);
      for (let j = 1; j < this.sides; j++) {
        line(this.pX[i], this.pY[i], this.pX[j], this.pY[j]);
      }
    }
    pop();
    this.brightness -= 1;
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  slowDown() {
    this.xSpd = this.xSpd * 0.999;
    this.ySpd = this.ySpd * 0.999;
    this.rotSpd = this.rotSpd * 0.999;
  }

  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -1;
    } else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpd = this.ySpd * -1;
    } else if (this.y > height) {
      this.y = height;
      this.ySpd = this.ySpd * -1;
    }
  }

  rotate() {
    this.rotAngle += this.rotSpd;
  }

  shrink() {
    this.s -= 0.01;
  }
  attractedTo(targetX, targetY) {
    // By calculating "target position - this position"
    // we can get the direction to the target.
    // Then we will arbitrary decrease the acceleration to reach the target
    let xAcc = (targetX - this.x) * 0.0005;
    let yAcc = (targetY - this.y) * 0.0005;
    this.xSpd += xAcc;
    this.ySpd += yAcc;
  }
  delete(i) {
    if (this.s < 0.1) {
      particles.splice(i, 1);
    }
  }
}
