var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//crea aquí las variables feed y lastFed 

var feed;
var lastFed;
var feedTime;




function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro



  feed=createButton("alimenta perro");
  feed.position(900,95);
  feed.mousePressed(feedDog);



  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  
 feedTime=database.ref('FeedTime');
 feedTime.on("value",function(data){
   lastfeed=data.val();
 })
  //escribe el código para mostrar el texto lastFed time aquí


  fill("blue")
  textSize(15);

  if(lastFed =>12){

      text("ultima hora en la que alimento: "+lastFed%12+" pm ",350,30);

  }else if(lastFed==0){
    tetx(" ultima hora en la que se alimento:12am ",350,30);
  }else{
    text("ultima hora en la que alimento: "+lastFed+" am ",350,30);

  }


 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro

if (foodObj.getFoodStock()<=0) {
  foodObj.updateFoodStock(foodObj.getFoodStock()*0);
} else{

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

}

database.ref('/').update({
  Food:foodObj.getFoodStock(),


    FeedTime:hour()


})

}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
