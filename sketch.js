//Create variables here
var foodStock1,foodObj,lastFed, database
function preload()
{
	//load images here
  dog=loadImage("images/dogImg.png")
  dog_happy=loadImage("images/dogImg1.png")
  bottleimage=loadImage("images/Milk.png")
}

function setup() {
  

	createCanvas(800,800);

  database = firebase.database();  

  foodStockDB=database.ref('FoodStock')
  lastFedDB=database.ref('LastFed')
    
  foodStockDB.on("value",readStock)
  lastFedDB.on("value",readLastFed)

  feed=createButton('Feed the dog')
  feed.position(400,100)
  feed.mousePressed(feedDog)

  feed=createButton('Add the food')
  feed.position(500,100);
  feed.mousePressed(addFoods)
  
  dog2=createSprite(500,400,20,20);
  dog2.addImage(dog);
  dog.resize(100,100)

}


function draw() {  
  background(0,0,83)
  
  drawSprites();
  //add styles here

  textSize(15);

  foodObj = new Food(foodStock1, lastFed, bottleimage);

  foodObj.display();
  if(foodObj.lastFed>12){
    text("Last Feed:"+foodObj.lastFed%12+" PM",400,30)
  }
  else if(foodObj.lastFed==0){
    text("Last Feed :12 AM",400,30)
  }
  else if(foodObj.lastFed==12){
    text("Last Feed :12 PM",400,30)
  }
  else{
    text("Last Feed:"+foodObj.lastFed+" AM",400,30)
  }
  // textColor("gray");
  text("Remaining Stock="+""+foodObj.foodStock,200,30)
}

function readStock(data){  
  foodStock1=data.val();
}

function readLastFed(data){
  lastFed=data.val();
}

function feedDog(){
  dog2.addImage(dog_happy);
  dog_happy.resize(100,100)
  if (foodObj.getFoodStock() > 1)
  {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      FoodStock:foodObj.getFoodStock(),
      LastFed:hour()
    })
  }
}

function addFoods(){
  foodStock1++
  database.ref('/').update({
    FoodStock:foodStock1   
  }
  )}
  