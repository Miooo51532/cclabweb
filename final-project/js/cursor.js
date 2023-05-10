// let cursorSketch;

// function setup() {
//     let canvas = createCanvas(windowWidth, windowHeight);
//     canvas.parent("cursorcontainer");
//     noCursor();
//     cursorSketch = new CursorSketch();
//     noStroke();
// }

// function draw() {
//     background(226, 226, 226);
//     cursorSketch.update(mouseX, mouseY);
//     if(mouseIsPressed){
//       cursorSketch.close();
//     }else{
//       cursorSketch.open();
//     }
// }

// class CursorSketch {
//     constructor() {
//         this.x = 0;
//         this.y = 0;
//     }

//     update(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     open() {   
//        // Draw the eye
//        fill(255);
//        ellipse(this.x, this.y, 40, 25);


//        // Draw the pupil
//        fill(0);
//        ellipse(this.x, this.y, 12, 20);
//     }

//     close() {
//         // Draw the eye
//        fill(255);
//        ellipse(this.x, this.y, 40, 10);

//        // Draw the pupil
//        fill(0);
//        ellipse(this.x, this.y, 12, 10);
//     }
// }

let cursorSketch;
let eyebg = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    // canvas.parent("cursorcontainer");
    noCursor();
    cursorSketch = new CursorSketch(255, 1);
    noStroke();
    for (let i = 0; i < random(1, 10); i++) {
        eyebg[i] = new CursorSketch(100, random(1, 3));
        eyebg[i].update(random(width), random(height));
    }
}

function draw() {
    background(226, 226, 226);
    for (let i = 0; i < eyebg.length; i++) {
        // go to new positions
        if (frameCount % 120 == 0) {
            eyebg[i].update(random(width), random(height));
        }

        // blink
        if (frameCount % 120 > 60 && frameCount % 120 < 80) {
            eyebg[i].close();
        } else {
            eyebg[i].open();
        }
    }

    cursorSketch.update(mouseX, mouseY);
    if (mouseIsPressed) {
        cursorSketch.close();
    } else {
        cursorSketch.open();
    }
}

class CursorSketch {
    constructor(t, s) {
        this.x = 0;
        this.y = 0;
        this.trans = t;
        this.s = s;
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }

    open() {
        // Draw the eye
        fill(255, 255, 255, this.trans);
        ellipse(this.x, this.y, 40 * this.s, 25 * this.s);

        // Draw the pupil
        fill(0, 0, 0, this.trans);
        ellipse(this.x, this.y, 12 * this.s, 20 * this.s);
    }

    close() {
        // Draw the eye
        fill(255, 255, 255, this.trans);
        ellipse(this.x, this.y, 40 * this.s, 10 * this.s);

        // Draw the pupil
        fill(0, 0, 0, this.trans);
        ellipse(this.x, this.y, 12 * this.s, 10 * this.s);
    }
}
