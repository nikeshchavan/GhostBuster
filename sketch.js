var tower, towerImage;
var door,doorImage,doorGroup;
var climber, climberImage,climberGroup;
var ghost, ghostImage;
var gameState = "play";
var invisibleBlock,invisibleBlockGroup;
var spookySound;

function preload (){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound ("spooky.wav");
  
}
function setup (){
  createCanvas (600,600);
  tower = createSprite(300,300,600,600);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  //spookySound.loop();
  
  ghost = createSprite(205,190,100,100);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
}
function draw (){
  background ("black");
  
if( gameState === "play"){
  if(tower.y > 400){
    tower.y=300;
  }
  if(keyDown("left_arrow"))
  
 { 
   ghost.x = ghost.x - 3;
 }
  if(keyDown("right_arrow"))
  { 
    ghost.x = ghost.x + 3;
  }
  if(keyDown("space")){
    ghost.velocityY = - 6;
  
  }
  ghost.velocityY = ghost.velocityY + 0.5;
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
 if(invisibleBlockGroup.isTouching(ghost) || ghost.Y >600) {
   ghost.destroy();
   gameState = "end";
 }
 spawnDoors();
  drawSprites();
}
  if(gameState === "end"){
    textSize(35);
    text("GAME  OVER",300,500)
  }
  
  
  
}
function spawnDoors(){
  if (frameCount % 250 === 0){
    door = createSprite(89,0,50,90);
    
    climber = createSprite(89,65,50,90);
    invisibleBlock  = createSprite( 89,70,50,2);
    
    door.x = random (100,400);
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImage);
    climber.addImage(climberImage);
    invisibleBlock.width = climber.width;
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
     
    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;
  }
}