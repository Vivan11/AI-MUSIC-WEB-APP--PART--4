song = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0 ;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(550,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose" , gotPoses);
}
function draw() {
    image(video,0,0,550,400);
    fill("#ff8e00");
   stroke("#ff8e00");
   if(scoreRightWrist > 0.2){

   circle(rightWristX,rightWristY,20);

   if(rightWristY > 0 && rightWristY <= 100){
     document.getElementById("speed").innerHTML = "Speed : 0.5x";
     song.rate(0.5);
   }

   else if(rightWristY > 100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML = "Speed : 1x";
    song.rate(1);
  }

  else if(rightWristY > 200 && rightWristY <= 300){
    document.getElementById("speed").innerHTML = "Speed : 1.5x";
    song.rate(1.5);
  }

  else if(rightWristY > 300 && rightWristY <= 400){
    document.getElementById("speed").innerHTML = "Speed : 2x";
    song.rate(2);
  }

  else if(rightWristY > 400) {
    document.getElementById("speed").innerHTML = "Speed : 2.5x";
    song.rate(2.5);
  }
}

    if(scoreLeftWrist > 0.2){
    circle(leftWristX , leftWristY , 20);
    in_number_left_wrist_y = Number(leftWristY);
    remove_decimals = floor(in_number_left_wrist_y);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume : " + volume ;
    song.setVolume(volume);
}
}
function play () {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log ("PoseNet Is Loaded");
}
function gotPoses(results) {
     if(results.length > 0) {
         console.log(results);
         scoreLeftWrist = results[0].pose.keypoints[9].score;
         console.log("Score Left Wrist = " + scoreLeftWrist);
         scoreRightWrist = results[0].pose.keypoints[10].score;
         console.log("Score Right Wrist = " + scoreRightWrist);
         leftWristX = results[0].pose.leftWrist.x;
         leftWristY = results[0].pose.leftWrist.y;
         console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
         rightWristX = results[0].pose.rightWrist.x;
         rightWristY = results[0].pose.rightWrist.y;
         console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
     }
}