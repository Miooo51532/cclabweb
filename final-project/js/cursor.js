let cursorSketch;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("cursorcontainer");
    noCursor();
    cursorSketch = new CursorSketch();
    noStroke();
}

function draw() {
    background(226, 226, 226);
    cursorSketch.update(mouseX, mouseY);
    if(mouseIsPressed){
      cursorSketch.close();
    }else{
      cursorSketch.open();
    }
}

class CursorSketch {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }

    open() {   
       // Draw the eye
       fill(255);
       ellipse(this.x, this.y, 40, 25);
       

       // Draw the pupil
       fill(0);
       ellipse(this.x, this.y, 12, 20);
    }

    close() {
        // Draw the eye
       fill(255);
       ellipse(this.x, this.y, 40, 10);
       
       // Draw the pupil
       fill(0);
       ellipse(this.x, this.y, 12, 10);
    }
}
