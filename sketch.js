//Create variables here
var dog, happyDog, database, foodStock, foodS
var gameState="hungry"

var bedroomImg, gardenImg, washroomImg


function preload()
{
	//load images here
  dog1=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")

  bedroomImg=loadImage("images/Bed Room.png")
  gardenImg=loadImage("images/Garden.png")
  washroomImg=loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);
  database=firebase.database()
  dog=createSprite(700,400,50,50)
  dog.addImage(dog1)
  dog.scale=0.3

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  bathButton= createButton("I want to take a bath")
  bathButton.position(400,200)

  sleepButton= createButton("I am very sleepy")
  sleepButton.position(600,200)

  playButton= createButton("Lets play!")
  playButton.position(750,200)

  hungryButton= createButton("I am hungry")
  hungryButton.position(850,200)

  
  milk1=new Food()
  milk1.getfeedtime()

  database.ref('gameState').on("value",(data)=>{
    gameState=data.val()
  })
}


function draw() {  
  background(46,139,87)
    
  milk1.buttons()
  milk1.milkImg()

  bathButton.mousePressed(()=>{
    gameState="bathing"
  })
  sleepButton.mousePressed(()=>{
    gameState="sleeping"
  })
  playButton.mousePressed(()=>{
    gameState="playing"
  })
  hungryButton.mousePressed(()=>{
    gameState="hungry"
  })

  currentTime=hour()

  if(gameState==="playing"){
    milk1.updateState("playing")
    milk1.garden()
  } else if(gameState==="hungry"){
    milk1.updateState("hungry")
    
  } else if(gameState==="sleeping"){
    milk1.updateState("sleeping")
    milk1.bedRoom()
  } else if(gameState==="bathing"){
    milk1.updateState("bathing")
    milk1.washRoom()
  }




  if(gameState !== "hungry"){
    milk1.button1.hide()
    milk1.button2.hide()
    dog.remove()
  }else{
    milk1.button1.show()
    milk1.button2.show()

    dog.addImage(happyDog)
    dog.scale=0.2
  }

  if(foodS===0){
    dog.addImage(happyDog)
  }

  fill(1000)
  textSize(20)
  if(milk1.feedtime<11){
    text("Last Fed: " + milk1.feedtime +" AM", 200,50)
  } else if(milk1.feedtime>=12){
    text("Last Fed: " + milk1.feedtime + " PM", 200,50)
  }

  drawSprites();

}

function writeStock(x){

  

  database.ref('/').set({
    Food:x,
    feedtime:hour()
  })
  if(x<=0){
    x=0
  } else{
    x=x-1
  }
}
function readStock(data){
  foodS=data.val()
}

function happy(){
  dog.addImage(happyDog)
}

function normal(){
  dog.addImage(dog1)
}