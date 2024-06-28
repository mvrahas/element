var capture;
var tiles = [];
tileSize = 100;
var videoWidth = 700;
var videoHeight = 500;
var imageX = 0;
var imageY = 5000;
var canvasWidth = 1080;
var canvasHeight = 720;
var gridX = 280;
var gridY = 110;
var menu = true;
var gameStart = false;
var score = 0;
var tileBeingDragged


function setup() {
  createCanvas(1080, 5500);
  capture = createCapture(VIDEO);
  for(var i = 0; i < 25; i++){
    tiles [i] = new Tile((i%5)*tileSize,int(i/5)*tileSize);
  }
}

function draw() {
  background(255);
  if(menu){
    menuScreen();
  }
  if(gameStart){
  var score = 0;
  for(var i = 0; i < 25; i++){
    tiles[i].display();
    if(!mouseIsPressed){
      tileBeingDragged = null
    } else {
      if(tiles[i].isIntersected() && (tileBeingDragged==i || tileBeingDragged==null)){
        tiles[i].drag();
        tiles[i].snap();
        tileBeingDragged = i
      }
    }
    score += tiles[i].isInPlace()
  }
  graphics(score);
}
if(score == 25){
  textSize(200);
  text('You win!',350,300);
}
}

function menuScreen(){
  fill(230);
  stroke(230);
  textSize(100);
  text('Element', 350,170);
  textSize(200);
  text('Me',410,470);
  textSize(65);
  text("25", 360,270);
  if((second())%2 == 0){
    textSize(50);
    text('[Press Enter]',400,670);
  }
  
  
  noFill();
  rect(340,190,400,400);
  
  
  noStroke();
  fill(230);
  rect(0,0,20,canvasHeight);
  rect(0,0,canvasWidth,20);
  rect(canvasWidth-20,0,canvasWidth,canvasHeight);
  rect(0,canvasHeight-20,canvasWidth,20);
  
}

function keyPressed() {
  if (keyCode === ENTER) {
    menu = false;
    gameStart = true;
  } else if (keyCode === ESCAPE) {
    remove();
  }
}

function graphics(score){
  noStroke();
  fill(230);
  rect(0,0,20,canvasHeight);
  rect(0,0,canvasWidth,20);
  rect(canvasWidth-20,0,canvasWidth,canvasHeight);
  rect(0,canvasHeight-20,canvasWidth,20);
  
  for(var i = 0; i < 25; i++){
    noFill();
    strokeWeight(5);
    stroke(230);
    rect(gridX + (i%5)*tileSize, gridY + int(i/5)*tileSize,tileSize,tileSize);
  }
  
  fill(230);
  noStroke();
  textSize(30);
  text(score + '/25 tiles matched correctly',830,60);
  text('Press [ESC] to quit',40,60);
  
}

//tile class
function Tile(desiredX, desiredY){

  this.currentX = random(0,canvasWidth-tileSize);
  this.currentY = random(0,canvasHeight-tileSize);

  this.display = function(){
    var c;
    image(capture,imageX,imageY,videoWidth,videoHeight);
    c = get(imageX + desiredX,imageY + desiredY,tileSize,tileSize);
    image(c,this.currentX,this.currentY);
  }

  this.isIntersected = function(){
    if(mouseX > this.currentX && mouseX < (this.currentX + tileSize) && mouseY > this.currentY && mouseY < (this.currentY + tileSize)){
      return true
    }
  }

  this.drag = function(){
      this.currentX = mouseX - tileSize/2;
      this.currentY = mouseY - tileSize/2;
  }

  this.snap = function(){
    if(abs(this.currentX - (gridX + desiredX)) < 15 && abs(this.currentY - (gridY + desiredY)) < 15){
      this.currentX = gridX + desiredX;
      this.currentY = gridY + desiredY;
    }
  }

  this.isInPlace = function(){
    if(this.currentX == (gridX + desiredX) && this.currentY == (gridY + desiredY)){
      return true
    }else{
      return false
    }
  }

}
