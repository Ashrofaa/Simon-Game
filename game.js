
////////////////////////  VARIABLES DECLARATION  ////////////////////////
var start = 0;  // this variable is used to lock game upon first keyboard press until game over
var clicksCount = 0;    // this variable is used to count the player clicks on the buttons
var colors = ["red", "blue", "green", "yellow"];
var buttonsSequence = [];   // this variable is used to push in an array any new flashing pattern
var blue = new Audio("sounds/blue.mp3");
var red = new Audio("sounds/red.mp3");
var green = new Audio("sounds/green.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");



////////////////////////  START WHEN KEYBOARD KEYS ARE PRESSED  ////////////////////////
$(window).on("keydown", function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90 && start === 0) {    // the condition is used to limit the keys pressed to only letters
        flashSequence();
        start++;
    }
});


////////////////////////  START THE FLASHING SEQUENCE  ////////////////////////
function flashSequence() {
    clicksCount = 0;    // at the start of each flashing sequence, restart the clicks counter
    nextSequence();
    $("#level-title").text("Level " + buttonsSequence.length);      // display the level number on screen
    $("." + buttonsSequence[buttonsSequence.length - 1]).fadeOut(100).fadeIn(100);      // flash the chosen random button
}



////////////////////////  CHOOSE A RANDOM BUTTON  ////////////////////////
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);    // generates a random number between 0-3
    buttonsSequence.push(colors[randomNumber]);     // choose a random button based on the IDs in the colors array
}



///////////////////////////////////  MAIN FUNCTION  ///////////////////////////////////
////////////////////////  CHECKS IF PLAYER'S CLICKS ARE RIGHT  ////////////////////////
$(".btn").on("click", function (event) {
    playSounds(event);      
    // add press animation via css selectors to the pressed button //
    $("#" + event.target.id).addClass("pressed");       
    setTimeout(function() { $("#" + event.target.id).removeClass("pressed");}, 70);
    //////////////////////////////////////////////////////////////////
    clicksCount += 1;   
    
    if (event.target.id === buttonsSequence[clicksCount-1]) {     // compare the pressed button to what it should be from the buttonsSequence array via the clicks counter
        
        if (clicksCount === buttonsSequence.length) {       // if player clicked all buttons sequence correctly, play next sequence
            setTimeout(function() {flashSequence() }, 150)
        }
    }
    
    // when player gets it wrong
    else {      
        $("body").addClass("game-over");        // make screen turn red 
        $("#level-title").text("Game Over");    // display "game over" on the screen 
        setTimeout(function() {
            $("body").removeClass("game-over"); 
            $("#level-title").text("Press A Key to Start");
        }, 1500);
        start = 0;                              // restart the interock so that the player may restart the game
        wrong.play();
        buttonsSequence = [];                   // restart the sequence
    }
});



////////////////////////  PLAY SOUNDS OF BUTTONS AND GAME OVER  ////////////////////////
function playSounds(event) {                // the event is passed from the clicking event and contains the ID of the clicked button
    if (event.target.id === "red") {
        red.play();
    }
    else if (event.target.id === "yellow") {
        yellow.play();
    }
    else if (event.target.id === "blue") {
        blue.play();
    }
    else if (event.target.id === "green") {
        green.play();
    }
}
