
var buttonColours=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern = [];
var started=false;
var level=0;

$(document).keypress(function() {
    if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started=true;
    }
});

$(".btn").click(function() {
    var user=$(this).attr("id");
    userClickedPattern.push(user);
    playSound(user);
    animatePress(user);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("#level-title").text("You're a Failure!!, Press any key.");
        document.querySelector("body").classList.add("game-over");
        setTimeout(function () {
        document.querySelector("body").classList.remove("game-over")
        },100);
        startOver();
        
    }

}

function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*3;
    randomNumber=Math.round(randomNumber);
    var g=buttonColours[randomNumber];
    gamePattern.push(g);

    $("#" + g).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(g);
}



function playSound(nam){
    var audio=new Audio("sounds/" + nam + ".mp3");
    audio.play();
}

function animatePress(x)
{
    document.querySelector("#"+x).classList.add("pressed");
    setTimeout(function () {
        document.querySelector("#"+x).classList.remove("pressed")
    },100);
}

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}
