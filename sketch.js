var muffin, walking, start, Iground, IIground;
var bg, bgI;
var btI, btG;
var skI, skG;
var score, Iscore, gs;
var size=0, hit=0;

function preload(){
  walking=loadAnimation("Walk1.png","Walk2.png","Walk3.png","Walk4.png","Walk5.png");
  bgI=loadImage("bg.jpeg");
  btI=loadImage("biscuit.png");
  skI=loadImage("stick.png");
  start = loadAnimation("Start.png");
}

function setup(){
  createCanvas((window.width*2),window.height);
  muffin=createSprite(100,300,10,10);
  muffin.addAnimation("sleep",start);
  muffin.addAnimation("walking",walking);
  muffin.setCollider("rectangle",0,40,120,60);
  muffin.scale=0.4;

  bg=createSprite(400,164,10,10);
  bg.addImage("bg",bgI);
  bg.depth=0;

  Iground=createSprite(400,347,800,4);
  Iground.visible=0;
  IIground=createSprite(400,350,800,4);
  IIground.visible=0;

  btG = new Group();
  skG = new Group();

  gs=0;
  score=0;
  Iscore=0;
}

function draw(){
  background("green");
  drawSprites();
  console.log("Pointer Co-ordinates:- "+World.mouseX+" , "+World.mouseY);
  
  if(gs===0){
    bg.velocityX=0;
    muffin.changeAnimation("sleep",start);
    textSize(30);
    stroke(0);
    strokeWeight(2);
    fill("red");
    text("You are Muffin the Beagle. You NEED Biscuits.",90,125);
    text(" Collect them by jumping (spacebar) and avoid getting",10,160);
    text("beaten by the sticks (sotas).",195,195);
    stroke("green");
    fill(0);
    textSize(17);
    text("Press spacebar to start!",310,230);
    strokeWeight(0.4);
    stroke(0);
    textSize(16.35);
    text("Each biscuit will increase your size by 0.01 and the stick will reset your size. Two sticks and it's 'Game Over!'",10,385);
    stroke("blue");
    strokeWeight(2);
    textSize(23);
    fill("green");
    text("<--- Muffin ;)",191,290);
    if(keyWentDown("space")||touches.length>0){gs=1; touches=[]; }
  }
  
  else if(gs===1){
       muffin.changeAnimation("walking",walking);
       spawnBt();
       spawnSk();
       bg.velocityX=-6;
       if(bg.x<180){bg.x=bg.width/2;}
       if(keyDown("space")  &&muffin.y>(316-size*50*6)||touches.length>0 &&muffin.y>(316-size*50*6)){muffin.velocityY=-18; touches=[]; }
       muffin.velocityY=muffin.velocityY+0.8;
       muffin.collide(Iground);
       textSize(17);
       stroke(0);
       strokeWeight(1);
       fill(0);
       text("Score: "+score,375,20);
       if(muffin.isTouching(btG)){score=score+1;
                                 Iscore=Iscore+2; 
                                 btG.destroyEach(); }
       if(muffin.isTouching(skG)){skG.destroyEach();
                                 hit=hit+1;
                                 Iscore=0; } 
       muffin.collide(Iground);                                        
       if(Iscore<=12){size = Iscore/200; }                                                     
       muffin.scale=0.4+size;

       if(hit===2){gs=2; }
       console.log("Size of Muffin: "+muffin.scale);
       muffin.collide(Iground);

       if(muffin.isTouching(IIground)){muffin.y =300; }
       }

  else if(gs===2){
    skG.destroyEach();
    btK.destroyEach();
    score=0;
    Iscore=0;
    hit=0;
    size=0;
    background(0);
    textSize(50);
    fill("red");
    strokeWeight(2);
    stroke("red");
    text("You Lost! :(", 260, 185);
    text("Press space to restart.",160,205);
    if(keyWentDown("space")||touches.length>0){gs=0; touches=[]; }
  }

}

function spawnBt(){
  if(frameCount%60===0){
  var bt =createSprite(820, random(130, 300), 50, 50);
  bt.velocityX=-6;
  bt.addImage("nvln",btI);
  bt.scale=0.4;
  btG.add(bt);
  bt.setCollider("rectangle",-10,70,100,40);
  bt.lifetime=140;
  }
}

function spawnSk(){
  if(frameCount%160===0){
    var sk =createSprite(820, random(130, 300), 50, 50);
    sk.velocityX=-6;
    sk.addImage("nvn",skI);
    sk.scale=0.3;
    skG.add(sk);
    sk.setCollider("rectangle",-10,70,200,40);
    sk.lifetime=140;
    }
}
