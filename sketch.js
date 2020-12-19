var cloud,cloudImg;
var back,backImg;
var B1,B2;
var obstaclesGroup;
var restart,dead;
var restartImg,deadImg;
var canvas;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;

function preload(){
  cloudImg=loadImage("Cloud.jpeg");
  backImg=loadImage("ClB.jpg");
  B1=loadImage("Bird1.jpeg");
  deadImg=loadImage("deadcl.jpeg");
  restartImg=loadImage("restartcl.jpeg");

  
}
function setup(){
  canvas=createCanvas(displayWidth,displayHeight);
  // to create background.
  back=createSprite(displayWidth/2,displayHeight/2,displayWidth*2,displayHeight);
  back.shapeColor="skyblue"
  back.scale=1;
  back.velocityX=-3;
  
  cloud=createSprite(displayWidth/6,displayHeight/2);
  cloud.addImage(cloudImg);
  cloud.scale=0.2;
  
  restart = createSprite(displayWidth/2,displayHeight/2);
  restart.addImage(restartImg);
  restart.scale=0.4;
  restart.visible=false;
  
  groundDown=createSprite(displayWidth/2,displayHeight-5,displayWidth,20);
  groundDown.visible=false;
  
  groundUp=createSprite(displayWidth/2,displayHeight-730,displayWidth,20);
  groundUp.visible=false;
  
  obstaclesGroup=new Group();
}  
function draw(){
  background(255);
  console.log(cloud.y);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    back.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space")||keyWentDown("up") && cloud.y >= 159) {
      cloud.velocityY = -10;
    }
  
    cloud.velocityY = cloud.velocityY + 0.4
  
    if (back.x < 0){
      back.x = back.width/2;
    }
    
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(cloud)||groundUp.isTouching(cloud)||groundDown.isTouching(cloud)){
      gameState = END;
        
    }
    if(score>=400){
      gameState=END;
    }
    
  }
  else if (gameState === END) {

    restart.visible = true;
    obstaclesGroup.visible=false;
    
    //set velcity of each game object to 0
    back.velocityX = 0;
    cloud.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)||keyWentDown("space")||keyWentDown("up")) {
      reset();
    }
   
    //textSize(30);
    //fill("red")
    //text("😔😔Game Over😔😔",windowWidth+80,windowHeight-700);
  }
  
  
  drawSprites();

  if(score>=400){
  textSize(30);
  fill("blue");
  text("✨✨Wow you won✨✨",displayWidth/6,displayHeight-650);
  
  }

  fill(rgb(255,0,0));
  textSize(30);
  text("Score:-"+score,windowWidth/2,displayHeight-650);
}
function spawnObstacles(){
   if (frameCount % 50===0){
   var obstacles = createSprite(600,120,40,10);
   obstacles.y=Math.round(random(20,380));
   obstacles.addImage("bird",B1);
   obstacles.scale=0.3;
   obstacles.velocityX=-4;
   obstacles.lifetime=200;
   obstaclesGroup.add(obstacles);
    }
}
function reset(){
  gameState = PLAY;
  cloud.y=215;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  score = 0;
  
}
//function GameEnd(){
  
//}