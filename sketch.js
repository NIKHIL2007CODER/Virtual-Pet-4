  var database, foodS, foodStock;
  var fedTime, lastFed, feed, addFood, foodObj;
  var DeadDog , dogImg , dogImg2 , dogVaccination , dogFoodStock , garden , bedroom , happydog;
  var injection , lazydog , livingroom , milk , runningdog , leftrunningdog , vaccination , washroom ;
  var gameState ,readState ;
  var curretnTime ;
  function preload(){
 
    //images ⬇

        //activties of dog
        dogImg = loadImage("images/Dog.png");
        happydog = loadImage("images/happydog.png");
        lazydog = loadImage("images/Lazy.png");
        deadDog = loadImage("images/deadDog.png");
        runnningdog = loadImage("images/running.png");
        leftrunningdog = loadImage("images/runningLeft.png");
        
        // other activities
        vaccination = loadImage("images/vaccination.jpg");
        dogVaccination = loadImage("images/dogVaccination.png");
        
        //object
        dogFoodStock = loadImage("images/Food Stock.png");
        injection = loadImage("images/injection.png");
        milk = loadImage("images/milk.png");

        // places
        garden = loadImage("images/Garden.png");
        livingroom = loadImage("images/Living Room.png");
        washroom = loadImage("images/Wash Room.png");
        bedroom = loadImage("images/Bed Room.png");

    // images ^    
    }
  function setup() {
      createCanvas(600, 605);
      foodObj = new Food();

        database = firebase.database();
        dog = createSprite(width/2, 300, 60, 60);
        dog.addImage(dogImg);
        dog.scale = 0.8;

       

        foodStock = database.ref('Food');
        foodStock.on("value",readStock);

        readState = database.ref("gameState");
        readState.on("value",function(data){
            gameState = data.val();
        });

    }

    function draw() {  
        
      currentTime=hour();
      if(currentTime==(lastFed)){
       // update("play");
        foodObj.garden();
      }
      else if(currentTime==(lastFed+2)){
       // update("sleeping");
        foodObj.bedroom();
      }
      else if(currentTime>(lastFed+2) && currentTime<(lastFed+4)){
      //  update("bathing");
        foodObj.washroom();
      }
      else{
       // update("hungry");
        foodObj.livingroom();
      }
      
    

      fedTime = database.ref('fedTime');
      fedTime.on('value', function(data){
      lastFed = data.val();
    
      })

      if(foodS == 0){
        dog.addImage(happydog);
        foodObj.visisble = false ; 
      }

      else{
        dog.addImage(dogImg);
        foodObj.visisble = true;

      }

      if(gameState===1){
        dog.addImage(happydog);
        dog.visible = true;
        dog.scale = 0.8;
        dog.y = width/2 ; 
      }

      if(gameState===2){
        dog.addImage(dogImg);
        dog.visible = true;
        dog.scale = 0.8;
        foodObj.visible = false ; 
        dog.y = width/2 ; 
      }

      var Bath = createButton("【Ｉ　Ｗａｎｔ　ＴＯ　Ｔａｋｅ　Ｂａｔｈ　！】");
      Bath.position(1030,230);

      if(Bath.mousePressed(function(){
        gameState = 3;
        database.ref("/").update({"gameState" : gameState})
      }));

      if(gameState===3){
        dog.visible = false;
        foodObj.washroom();
        foodObj.visisble = false;
      }

      var Sleep = createButton("【Ｉ　ａｍ　ｖｅｒｙ　Ｓｌｅｅｐｙ　！】");
      Sleep.position(1030,110);

      if(Sleep.mousePressed(function(){
        gameState = 4;
        database.ref("/").update({
          gameState : gameState
        })
      }));

      if(gameState === 4){
        dog.visible = false;
        foodObj.bedroom();
        foodObj.visible = false;
      }

      var Play  = createButton("【Ｌｅｔ' s　Ｐｌａｙ　！】");
      Play.position(1030,150);

      if(Play.mousePressed(function(){
        gameState = 5 ; 
        database.ref("/").update({
          gameState : gameState
        })
      }));

      if(gameState === 5){
        dog.visible = false;
        foodObj.livingroom();
        foodObj.visible = false;
      }

      var PlayInGarden = createButton("【Ｌｅｔ＇ｓ　Ｐｌａｙ　Ｉｎ　Ｐａｒｋ ！】");
      PlayInGarden.position(1030,190);

      if(PlayInGarden.mousePressed(function(){
        gameState = 6 ; 
        database.ref("/").update({
          gameState : gameState
        })
      }));

      if(gameState === 6){
        dog.visible = false;
        foodObj.garden();
        dog.y = width/2;
        foodObj.visisble = false;
      }

      
      
      fill(137,36);
      stroke(10);
      strokeWeight(1.8)
      textFont("harrington") ;
      textSize(30);
        
      if(lastFed >=12){
        text("LAST FEED :" + lastFed % 12 + 'PM', 50, 40);
      }   
      else if(lastFed === 0){
        text("LAST FEED : 12 AM", 50, 40);
      } 
      else {
        text("LAST FEED :"+ lastFed+'AM', 50, 40);
      }

      

      foodObj.display();
        drawSprites();
        
      
    } 
 
    
  function readStock(data){
      foodS = data.val();
        foodObj.updateFoodStock(foodS);
    }
