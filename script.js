var btns = document.getElementsByClassName('btn');

var count  = 1;

var gameStarted = false;

var pattern = [];

var user_pattern = [];

function checkPattern(index){

    if(user_pattern[index] === pattern[index])
    {
        if(pattern.length == user_pattern.length)
        {
                setTimeout(function()
                {
                    user_pattern = [];
                    count++;
                    $("#level-title").html("Level " + count);
                    continueGame();

                },800);            
        }

        else if(user_pattern.length < pattern.length)
        {
            performClicks();
        }
    }

    else 
       {
            var audio = new Audio('./sounds/wrong.mp3');
            audio.play();

            gameStarted = false;
            $('body')[0].classList.add('game-over');

            setTimeout(function(){
                $('body')[0].classList.remove('game-over');
            },200);

            $("#level-title").html("Game Over , Press A Key To Play Again !");
            user_pattern = [];
            pattern = [];
            return;
        }
}


function performClicks(){

    for (let i=0; i < btns.length; i++){
        btns[i].addEventListener('click',function(){

            let clicked = $(this);

            user_pattern.push(clicked.attr("id"));
            clicked[0].classList.add('pressed');

            setTimeout(function(){
                clicked[0].classList.remove("pressed");
            },100);

            checkPattern(user_pattern.length - 1);                        

        });
    }
}

function continueGame(){

    let num = Math.floor(Math.random()*4);
    btns[num].classList.add("pressed");

    let file = btns[num].id;
    let url  = "./sounds/" + file + ".mp3";
    
    var audio = new Audio(url);
    audio.play();

    pattern.push(btns[num].id);
    
    setTimeout(function(){
        btns[num].classList.remove("pressed");
    },100);

    performClicks();
    
  
}
   

function startGame(event){

   if(gameStarted == false)
   {
     if(event.keyCode == 97 || event.keyCode == 65)
     {
        count = 1;
        $("#level-title").html("Level " + count);
        gameStarted = true;

        for(let i = 0; i < btns.length; i++)
        {
            btns[i].addEventListener('click',function(){
        
            let file = btns[i].id;
            let url  = "./sounds/" + file + ".mp3";
            
            var audio = new Audio(url);
            audio.play();        
            });
        
        }

            continueGame(); 
        
     }   
   }
         
}

document.addEventListener('keypress',startGame);


   