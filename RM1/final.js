/*
COLOR TRACKING
Jeff Thompson | 2017/21 | jeffreythompson.org

Adapted by Jake Tan for DM2007 Tutorial
*/

// how much wiggle-room is allowed when matching the color?
let tolerance = 15;

// color to look for (set with mouse click)
let colorToMatch;

let video;

let clicked = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // an initial color to look for
    colorToMatch = color(255, 255, 255, 255);

    // webcam capture
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
}


function draw() {
    translate(640,0);
    scale(-1,1);
    if (clicked == false){
        image(video, 0, 0);
    } else {
        background(0,5);
    }

    // get the first matching pixel
    // in the image
    let firstPx = findColor(video, colorToMatch, tolerance);

    // if we got a result (is not undefined)
    // then draw a circle in that location
    if (firstPx !== undefined) {
        fill(colorToMatch, 150);
        // stroke(255);
        strokeWeight(0);
        circle(firstPx.x, firstPx.y, 30);
    }
}


// use the mouse to select a color to track
function mouseClicked() {
    loadPixels();
    colorToMatch = get(mouseX, mouseY);
    console.log(colorToMatch);
    // note we use get() here, which is probably
    // ok since it's one pixel – could def do this
    // with pixels[index] too

    if (clicked === false) {
        clicked = true;
        projectionMode();
        console.log(clicked);
    }
}


// find the first instance of a color 
// in an image and return the location
function findColor(input, c, tolerance) {

    // if we don't have video yet (ie the sketch
    // just started), then return undefined
    if (input.width === 0 || input.height === 0) {
        return undefined;
    }

    // grab rgb from color to match
    let matchR = c[0];
    let matchG = c[1];
    let matchB = c[2];

    // look for the color!
    // in this case, we look across each row 
    // working our way down the image – depending 
    // on your project, you might want to scan 
    // across instead
    input.loadPixels();
    for (let y = 0; y < input.height; y++) {
        for (let x = 0; x < input.width; x++) {

            // current pixel color
            let index = (y * video.width + x) * 4;
            let r = video.pixels[index];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];

            // if our color detection has no wiggle-room 
            // (either the color matches perfectly or isn't 
            // seen at all) then it won't work very well in 
            // real-world conditions to overcome this, we 
            // check if the rgb values are within a certain 
            // range – if they are, we consider it a match
            if (r >= matchR - tolerance && r <= matchR + tolerance &&
                g >= matchG - tolerance && g <= matchG + tolerance &&
                b >= matchB - tolerance && b <= matchB + tolerance) {

                // send back the x/y location immediately
                // (faster, since we stop the loop)
                return createVector(x, y);
            }
        }
    }

    // if no match was found, return 'undefined'
    return undefined;
}

function projectionMode(){
    background(0);
}

