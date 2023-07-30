var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = [1];
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  userClickedPattern = [];
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  $("h1").text("Level " + level);
  level++;
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}
$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
$("body").one("keydown", function () {
  nextSequence();
});
function checkAnswer(currentLevel) {
  if (
    userClickedPattern[currentLevel] === gamePattern[currentLevel]
  ) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 500);
    $("h1").text("Game Over, Press Any Key to Restart");
    startover();
  }
}
function startover() {
  level = 1;
  gamePattern = [];
  $("body").one("keydown", function(){
    nextSequence();
  })
}
