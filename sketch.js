var hypnoticballoon,balloonImage1,balloonImage2;
var database,position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  hypnoticballoon=createSprite(250,450,150,150);
  hypnoticballoon.addAnimation("hotAirBalloon",balloonImage1);
  hypnoticballoon.scale=0.5;

  var hypnoticballoonPosition = database.ref('balloon/position');
  hypnoticballoonPosition.on("value",readPosition,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(position!==undefined){
  if(keyDown(LEFT_ARROW)){
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    hypnoticballoon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,1);
  }
}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  hypnoticballoon.x = position.x;
  hypnoticballoon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}