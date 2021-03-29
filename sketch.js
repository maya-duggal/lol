var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg
var score=0;
var jumpSound, collidedSound;

var gameOver, restart;
var  backgroundImage;



function preload(){
  
  backgroundImage = loadImage("assets/space.png");
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  
  
 
  trex_running = loadAnimation("assets/trex_2.png","assets/trex_1.png","assets/trex_3.png");
  trex_collided = loadAnimation("assets/trex_collided.png");
  
  
  
  obstacle1 = loadImage("assets/earth.png");
  obstacle2 = loadImage("assets/mars.png");
  obstacle3 = loadImage("assets/asteroid.png");
  obstacle4 = loadImage("assets/jupiter.png");
  
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  background = createSprite(0,110,windowWidth,windowHeight);
  background.addImage(backgroundImage);
  background.scale = 2.5
  

  
  trex = createSprite(50,windowHeight-400,20,50);
  
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.08
  // trex.debug=true
  
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {

    textSize(20);
    fill("white")
    text("Score: "+ score,300,500);

    background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
    var select_obstacle = Math.round(random(1,4));
  
  if (World.frameCount % 50 == 0) {
    if (select_obstacle == 1) {
      planetAsteroid();
    } else if (select_obstacle == 2) {
      planetEarth();
    } else if (select_obstacle == 3) {
      planetMars();
    } else {
      planetJupiter();
    }
  }

    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
     
      
      if((touches.length > 0 || keyDown("SPACE"))) {
        jumpSound.play( )
        trex.velocityY = -10;
         touches = [];
      }
      
      trex.velocityY = trex.velocityY + 0.8
    
      if(obstaclesGroup.isTouching(trex)){
          collidedSound.play()
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      fill("white");
     
      //set velcity of each game object to 0
    
      trex.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      
      
      //change the trex animation
      trex.changeAnimation("collided",trex_collided);
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      
      
      if(touches.length>0 || keyDown("SPACE")) {      
        reset();
        touches = []
      }
    }
    
    
    drawSprites();
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

function planetEarth() {
  var  Earth= createSprite(600,Math.round(random(20, 370)), 10, 10);
  Earth.addImage(obstacle1);
  Earth.velocityX = -3;
  Earth.lifetime = 150;
  Earth.scale = 0.05;
  obstaclesGroup.add(Earth);

  return Earth
  
}

function planetMars() {
  var Mars = createSprite(600,Math.round(random(20, 370)), 10, 10);
  Mars.addImage(obstacle2);
  Mars.velocityX = -3;
  Mars.lifetime = 150;
  Mars.scale = 0.1;
  obstaclesGroup.add(Mars);

  return Mars;
}

function planetAsteroid() {
  var Asteroid = createSprite(600,Math.round(random(20, 370)), 10, 10);
  Asteroid.addImage(obstacle3);
  Asteroid.velocityX = -3;
  Asteroid.lifetime = 150;
  Asteroid.scale = 0.1;
  obstaclesGroup.add(Asteroid);

  return Asteroid;   
}

function planetJupiter() {
  var Jupiter = createSprite(600,Math.round(random(20, 370)), 10, 10);
  Jupiter.addImage(obstacle4);
  Jupiter.velocityX = -3;
  Jupiter.lifetime = 150;
  Jupiter.scale = 0.01
  obstaclesGroup.add(Jupiter);
  return Jupiter;
}

