// alert('Hello!');
function setup() {
    let canvas = createCanvas(700, 500);
    canvas.parent("myContainer");
    background(255);
    colorMode(HSB);
    noStroke();
}
function draw() {
    fill(random(150, 350), 100, 100, 0.05);
    if (keyIsPressed) {
        if (keyCode == BACKSPACE) {
            background(255);
        }
    }
}

function mouseDragged() {
    circle(mouseX, mouseY, 100);
}