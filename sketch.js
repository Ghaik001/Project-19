var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Man_1,Man_2,Man_3;
var Woman_1,Woman_2,Woman_3;
var ground;

var cloud;
var Rocks;

var score;
var Gameover,Restart


function preload(){
  Man_1 = loadAnimation("Man 1.PNG","Man 2.PNG","Man 3.PNG");
  
  ground = loadImage("ground.PNG");
  
  cloud = loadImage("cloud.PNG");
  
  Rocks = loadImage("Rocks.PNG");

  
  Restart = loadImage("Restart.PNG")
  Gameover = loadImage("Gameover.PNG")
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  Man_1 = createSprite(50,160,20,50);
  Man_1.addAnimation("running",Man_2 );
  trex.addAnimation("collided",Man_3);
  

  Man_1.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  Gameover = createSprite(300,100);
  Gameover.addImage(Gameover.PNG);
  
  Restart = createSprite(300,140);
  Restart.addImage(restart.PNG);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  Rocks = createGroup();
  cloud = createGroup();

  
  Man_1.setCollider("rectangle",0,0,Man_1.width,Man_1.height);
 
  
  score = 0;
  
}

function draw() {
  
  background(180);

  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    Gameover.visible = false;
    Restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
  
    score = score + Math.round(getFrameRate()/60)
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& trex.y >= 100) {
        Man_1.velocityY = -12;
        jumpSound.play();
    }
    

    Man_1.velocityY = Man_1.velocityY + 0.8
    
    spawncloud();
  
    
    spawnRocks();
    
    if(Rocks.isTouching(Man_1)){
        Man_1.velocityY = -12;
        gameState = END;
      
    }
  }
   else if (gameState === END) {
      Gameover.visible = true;
      Restart.visible = true;
     
    
      Man_1.changeAnimation("collided",Man_2);
    
     
     
      ground.velocityX = 0;
      Man_1.velocityY = 0
      
     
      
    Rocks.setLifetimeEach(-1);
    cloud.setLifetimeEach(-1);
     
     Rocks.setVelocityXEach(0);
     cloud.setVelocityXEach(0);
     
     if(mousePressedOver(restart)) {
      reset();
    }

   }
  
 
  

  drawSprites();
}

function reset(){
  gameState=PLAY
  Gameover.visible=false;
  Restart.visible=false;
  Rocks.destroyEach();
  cloud.destroyEach();
  score=0
   Man_1.changeAnimation("running",Man_3);
}


function spawnRocks(){
 if (frameCount % 60 === 0){
   var Rocks = createSprite(600,165,10,40);
   Rocks.velocityX = -(6 + score/100);

    }
   
            
    Rocks.scale = 0.5;
    Rocks.lifetime = 300;
   
  
    Rocks.add(Rocks);
 }
}

function spawncloud() {
  
  if (frameCount % 50 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
 
    cloud.depth = Man_1.depth;
    Man_1.depth = Man_1.depth + 1;
    
    cloud.add(cloud);
  }
}

