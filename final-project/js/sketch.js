// Finds eyes from webcam and draws a representation of them on the canvas, with random colors for the irises.
// Click on the canvas to save an image
// Starting point: https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm 🙏

let capture = null;
let tracker = null;
let positions = null;
let w = 0,
  h = 0;
let eye = [];

function setup() {
  w = windowWidth;
  h = windowHeight;
  let canvas = createCanvas(w, h);
  canvas.parent("canvasContainer");
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
}

function draw() {
  background(0, 0.2);
  // Flip the canvas so that we get a mirror image
  translate(w, 0);
  scale(-1, 1);
  image(capture, 0, 0, w, h);

  positions = tracker.getCurrentPosition();

  if (positions.length > 0 && frameCount % 20 == 0) {
    // Eye points from clmtrackr:
    // https://www.auduno.com/clmtrackr/docs/reference.html
    eye.push(new Eye(positions));
  }

  // Eyes are attracted to the face if detected
  // Otherwise stop
  for (let i = 0; i < eye.length; i++) {
    eye[i].show();
    eye[i].move();
    eye[i].bounce();
    if (positions.length > 0) {
      eye[i].attractedTo(positions[33][0], positions[33][1]);
      eye[i].irisAttracted(positions[33][0], positions[33][1]);
    }
    eye[i].life(i);
  }
}

class Eye {
  constructor(positions) {
    this.positions = positions;
    this.trans = 1;
    this.color = color(random(360), 50, 100, 0.5);
    this.leftEye = {
      outline: [23, 63, 24, 64, 25, 65, 26, 66].map((i) => this.getPoint(i)),
      center: this.getPoint(27),
      top: this.getPoint(24),
      bottom: this.getPoint(26),
    };
    this.rightEye = {
      outline: [28, 67, 29, 68, 30, 69, 31, 70].map((i) => this.getPoint(i)),
      center: this.getPoint(32),
      top: this.getPoint(29),
      bottom: this.getPoint(31),
    };
    this.center = this.getPoint(33);
    this.speedX = 0;
    this.speedY = 0;
    this.age = 0;
  }

  show() {
    this.drawEye(this.leftEye);
    this.drawEye(this.rightEye);
  }

  move() {
    this.leftEye.center.x += this.speedX;
    this.rightEye.center.x += this.speedX;
    this.leftEye.center.y += this.speedY;
    this.rightEye.center.y += this.speedY;
    this.leftEye.top.x += this.speedX;
    this.rightEye.top.x += this.speedX;
    this.leftEye.top.y += this.speedY;
    this.rightEye.top.y += this.speedY;
    this.leftEye.bottom.x += this.speedX;
    this.rightEye.bottom.x += this.speedX;
    this.leftEye.bottom.y += this.speedY;
    this.rightEye.bottom.y += this.speedY;
    for (let i = 0; i <= this.leftEye.outline.length - 1; i++) {
      this.leftEye.outline[i].x += this.speedX;
      this.leftEye.outline[i].y += this.speedY;
    }
    for (let i = 0; i <= this.rightEye.outline.length - 1; i++) {
      this.rightEye.outline[i].x += this.speedX;
      this.rightEye.outline[i].y += this.speedY;
    }
  }

  attractedTo(targetX, targetY) {
    // By calculating "target position - this position"
    // we can get the direction to the target.
    // Then we will arbitrary decrease the acceleration to reach the target
    let xAcc = (targetX - this.center.x) * 0.0003;
    let yAcc = (targetY - this.center.y) * 0.0003;
    this.speedX += xAcc;
    this.speedY += yAcc;
  }
  
  irisAttracted(targetX, targetY) {
    // Irises attracted to the face as well
    let diffX = this.center.x - targetX;
    let offsetX = map(diffX, -width, width, -0.3, 0.3);
    let diffY = this.center.y - targetY;
    let offsetY = map(diffY, -height, height, -0.1, 0.1);
    this.leftEye.center.x += offsetX;
    this.rightEye.center.x += offsetX;
    this.leftEye.center.y += offsetY;
    this.rightEye.center.y += offsetY;
  }

  bounce() {
    if (this.leftEye.outline[0].x < 0 || this.rightEye.outline[0].x > width) {
      this.speedX = -this.speedX;
    }
    if (this.leftEye.top.y < 0 || this.leftEye.bottom.y > height) {
      this.speedY = -this.speedY;
    }
  }

  life(i) {
    if (this.age < 180) {
      this.age += 1;
    } else {
      eye.splice(i, 1);
    }
  }

  drawEye(eye) {
    noFill();
    stroke(255, 0.5);
    strokeWeight(3);
    this.drawEyeOutline(eye);

    const irisSize = eye.top.dist(eye.bottom);
    noStroke();
    fill(this.color);
    ellipse(eye.center.x, eye.center.y, irisSize, irisSize);

    const pupilSize = irisSize / 3;
    fill(0, 0.6);
    ellipse(eye.center.x, eye.center.y, pupilSize, pupilSize);
  }

  getPoint(index) {
    return createVector(this.positions[index][0], this.positions[index][1]);
  }

  drawEyeOutline(eye) {
    beginShape();
    const firstPoint = eye.outline[0];
    eye.outline.forEach((p, i) => {
      curveVertex(p.x, p.y);
      if (i == 0) {
        // Duplicate the initial point (see curveVertex documentation)
        curveVertex(firstPoint.x, firstPoint.y);
      }
      if (i == eye.outline.length - 1) {
        // Close the curve and duplicate the closing point
        curveVertex(firstPoint.x, firstPoint.y);
        curveVertex(firstPoint.x, firstPoint.y);
      }
    });
    endShape();
  }
}

function mouseClicked() {
  const timestamp = timestampString();
  saveCanvas("GAZE-" + timestamp, "png");
}

function timestampString() {
  return (
    year() +
    nf(month(), 2) +
    nf(day(), 2) +
    "-" +
    nf(hour(), 2) +
    nf(minute(), 2) +
    nf(second(), 2)
  );
}
