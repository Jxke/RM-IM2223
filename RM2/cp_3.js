let faceapi; // variable to store faceapi
let detections = []; // returns from faceapi

let video;
let canvas;

function setup() {
  canvas = createCanvas(480, 360);
  canvas.id("canvas");

  video = createCapture(VIDEO);// Create the video
  video.id("video"); 
  video.size(width, height); 
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: true,
    minConfidence: 0.5 //threshold for result
  };

  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);// Start detecting faces
}

// Get faces
function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result; //Now all the data in this detections
  // console.log(detections);
}

function draw(){
  clear();
  if (detections.length > 0) {//If at least 1 face is detected
    for (f=0; f < detections.length; f++){
      let x = detections[f].alignedRect._box._x;
      let y = detections[f].alignedRect._box._y;
      let rectWidth = detections[f].alignedRect._box._width;
      let rectHeight = detections[f].alignedRect._box._height;
      stroke(44, 169, 225);
      strokeWeight(1);
      noFill();
      rect(x, y, rectWidth, rectHeight);
    }
  }
}