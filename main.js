song = "";

    LWX = 0;
    LWY = 0;

    RWX = 0;
    RWY = 0;

    scoreLW = 0;
    scoreRW = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    
    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
if (results.length > 0) {
    console.log(results);
    LWX = results[0].pose.leftWrist.x;
    LWY = results[0].pose.leftWrist.y;
    console.log("left wrist X = " + LWX + "left wrist Y" + LWY);
    
    scoreRW = results[0].pose.keypoints[10].score;
    scoreLW = results[0].pose.keypoints[9].score;
    console.log("Score RW = " + scoreRW + ", Score LW = " + scoreLW)

    RWX = results[0].pose.rightWrist.x;
    RWY = results[0].pose.rightWrist.y;
    console.log("right wrist X = " + RWX + "right wrist Y" + RWY);
}
}

function modelLoaded(){
    console.log("model loaded")
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill ("#FF0000");
    stroke("#FF0000");
    

    if(scoreRW > 0.2){
        circle(RWX, RWY, 20);
        if(RWY > 0 && RWY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x"
            song.rate(0.5)
        }
        else if(RWY > 100 && RWY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x"
            song.rate(1)
        }

        else if(RWY > 200 && RWY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x"
            song.rate(1.5)
        }

        else if(RWY > 300 && RWY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x"
            song.rate(2)
        }

        else if(RWY > 400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x"
        }
    }


    if(scoreLW > 0.2){
    circle(LWX, LWY, 20);
    InNumberLWY=Number(LWY);
    removeDecimals=floor(InNumberLWY);
    
    volume=removeDecimals/500;
    document.getElementById("volume").innerHTML  = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}