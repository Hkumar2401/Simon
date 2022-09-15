var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


// Starting the Game on key press
$(document).on("keydown", function () {
    if(!started){
        $("#level-title").text("Level : " + level);
        started = true;
        nextSequence();
    }
})

// Starting the Game on Clicking a button
$("button").on("click", function () {
    if(!started){
        $("#level-title").text("Level : " + level);
        started = true;
        nextSequence();
    }
})


// Getting user chosen Color
$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1)

})

// Checking the answer
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press A key to Start");
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);


        startOver();
    }
}

// Getting random chosen color
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level : " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

// Playing Sound
function playSound(chosenColor) {
    var sound = new Audio("sounds/" + chosenColor + ".mp3");
    sound.play();
}

// Animating on Click
function animatePress(chosenColor) {
    $("#" + chosenColor).addClass("pressed");

    setTimeout(() => {
        $("#" + chosenColor).removeClass("pressed");
    }, 100);
}

// Startover function
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
