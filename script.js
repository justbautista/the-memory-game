//declaring variables to make it cleaner and easier to reference elements in the document
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const buttonContainer = document.querySelector(".button-container");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const button4 = document.querySelector(".button4");
const button5 = document.querySelector(".button5");
const button6 = document.querySelector(".button6");
const button7 = document.querySelector(".button7");
const button8 = document.querySelector(".button8");
const button9 = document.querySelector(".button9");
const easyButton = document.querySelector(".easy");
const mediumButton = document.querySelector(".medium");
const hardButton = document.querySelector(".hard");
const statusScreen = document.querySelector(".status-screen");
const status = document.querySelector(".status");
const livesCount = document.querySelector(".lives");
const currRound = document.querySelector(".curr-round");
const totalRounds = document.querySelector(".total-rounds");
const timer = document.querySelector(".time");
const wrongAnswer = document.getElementById("wrong-answer");
const loseSound = document.getElementById("lose");
const winSound = document.getElementById("win");

var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0;
var totRounds = 8;
var lives = 3;
var timeLeft = 5; //gives user 5 seconds to make one guess
var timerFunc; //variable declared that will hold setInterval() for the countdown timer
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var clueHoldTime = 1000; //time holding each clue light/sound
var clueHoldTimeSpeed = 20; //how much playback is sped up after each round 
const cluePauseTime = 333; //pause between clues
const nextClueWaitTime = 1000; //wait before starting clue sequence

//generates a new random pattern each time the pages loads
window.addEventListener("load", () => {
  generatePattern(totRounds);
});

startButton.addEventListener("click", () => {
  startGame();
});
stopButton.addEventListener("click", () => {
  stopGame();
});

//easy difficulty is the default selected when page loads/reloads
easyButton.addEventListener("click", () => {
  //changes total rounds to easy difficulty (8 rounds) and changes speed to account for amount of rounds
  //resets timer, current round, and lives to default values
  totRounds = 8;
  clueHoldTimeSpeed = 20;
  statusScreen.style.display = "none";
  totalRounds.innerHTML = totRounds;
  currRound.innerHTML = 1;
  livesCount.innerHTML = 3;
  resetTimer();

  //changes number of game buttons to easy difficulty (4 game buttons)
  buttonContainer.style.gridTemplateRows = "1fr 1fr";
  buttonContainer.style.gridTemplateColumns = "1fr 1fr";
  button5.style.display = "none";
  button7.style.display = "none";
  button8.style.display = "none";
  button9.style.display = "none";

  //highlights easy button when selected and changes medium and hard buttons to default colors
  easyButton.style.background = "black";
  easyButton.style.color = "white";
  easyButton.style.borderRight = "1px solid rgba(0,0,0,0.2)";
  mediumButton.style.background = "lightgray";
  mediumButton.style.color = "black";
  mediumButton.style.borderRight = "0px";
  mediumButton.style.borderLeft = "0px";
  hardButton.style.background = "lightgray";
  hardButton.style.color = "black";
  hardButton.style.borderLeft = "1px solid rgba(0,0,0,0.2)";
});

mediumButton.addEventListener("click", () => {
  totRounds = 12;
  clueHoldTimeSpeed = 12;
  statusScreen.style.display = "none";
  totalRounds.innerHTML = totRounds;
  currRound.innerHTML = 1;
  livesCount.innerHTML = 3;
  resetTimer();

  buttonContainer.style.gridTemplateRows = "1fr 1fr";
  buttonContainer.style.gridTemplateColumns = "1fr 1fr 1fr";
  button5.style.display = "block";
  button6.style.display = "block";
  button7.style.display = "none";
  button8.style.display = "none";
  button9.style.display = "none";

  easyButton.style.background = "lightgray";
  easyButton.style.color = "black";
  easyButton.style.borderRight = "0px";
  mediumButton.style.background = "black";
  mediumButton.style.color = "white";
  mediumButton.style.borderRight = "1px solid rgba(0,0,0,0.2)";
  mediumButton.style.borderLeft = "1px solid rgba(0,0,0,0.2)";
  hardButton.style.background = "lightgray";
  hardButton.style.color = "black";
  hardButton.style.borderLeft = "0px";
});

hardButton.addEventListener("click", () => {
  totRounds = 18;
  clueHoldTimeSpeed = 7;
  statusScreen.style.display = "none";
  totalRounds.innerHTML = totRounds;
  currRound.innerHTML = 1;
  livesCount.innerHTML = 3;
  resetTimer();

  buttonContainer.style.gridTemplateRows = "1fr 1fr 1fr";
  buttonContainer.style.gridTemplateColumns = "1fr 1fr 1fr";
  button5.style.display = "block";
  button6.style.display = "block";
  button7.style.display = "block";
  button8.style.display = "block";
  button9.style.display = "block";

  easyButton.style.background = "lightgray";
  easyButton.style.color = "black";
  easyButton.style.borderRight = "1px solid rgba(0,0,0,0.2)";
  mediumButton.style.background = "lightgray";
  mediumButton.style.color = "black";
  mediumButton.style.borderRight = "0px";
  mediumButton.style.borderLeft = "0px";
  hardButton.style.background = "black";
  hardButton.style.color = "white";
  hardButton.style.borderLeft = "1px solid rgba(0,0,0,0.2)";
});

button1.addEventListener("mousedown", () => {
  startTone(1);
});
button1.addEventListener("mouseup", () => {
  stopTone();
});
button1.addEventListener("click", () => {
  guess(1);
});

button2.addEventListener("mousedown", () => {
  startTone(2);
});
button2.addEventListener("mouseup", () => {
  stopTone();
});
button2.addEventListener("click", () => {
  guess(2);
});

button3.addEventListener("mousedown", () => {
  startTone(3);
});
button3.addEventListener("mouseup", () => {
  stopTone();
});
button3.addEventListener("click", () => {
  guess(3);
});

button4.addEventListener("mousedown", () => {
  startTone(4);
});
button4.addEventListener("mouseup", () => {
  stopTone();
});
button4.addEventListener("click", () => {
  guess(4);
});

button5.addEventListener("mousedown", () => {
  startTone(5);
});
button5.addEventListener("mouseup", () => {
  stopTone();
});
button5.addEventListener("click", () => {
  guess(5);
});

button6.addEventListener("mousedown", () => {
  startTone(6);
});
button6.addEventListener("mouseup", () => {
  stopTone();
});
button6.addEventListener("click", () => {
  guess(6);
});

button7.addEventListener("mousedown", () => {
  startTone(7);
});
button7.addEventListener("mouseup", () => {
  stopTone();
});
button7.addEventListener("click", () => {
  guess(7);
});

button8.addEventListener("mousedown", () => {
  startTone(8);
});
button8.addEventListener("mouseup", () => {
  stopTone();
});
button8.addEventListener("click", () => {
  guess(8);
});

button9.addEventListener("mousedown", () => {
  startTone(9);
});
button9.addEventListener("mouseup", () => {
  stopTone();
});
button9.addEventListener("click", () => {
  guess(9);
});

//generates a random pattern with a length depending on the amount of total rounds (the difficulty selected)
function generatePattern(totRounds) {
  pattern = [];
  for (let i = 0; i < totRounds; i++) {
    pattern.push(Math.floor(Math.random() * (totRounds / 2)) + 1);
  }
}

//resets game values, progress, and hold time back to default values and starts game
//disables difficulty buttons
function startGame() {
  lives = 3;
  livesCount.innerHTML = lives;
  currRound.innerHTML = 1;
  progress = 0;
  clueHoldTime = 1000;
  gamePlaying = true;
  generatePattern(totRounds); //generates a random pattern (length depending on total rounds) before starting the game
  resetTimer();
  startButton.style.display = "none";
  stopButton.style.display = "block";
  statusScreen.style.display = "none";
  easyButton.disabled = true;
  mediumButton.disabled = true;
  hardButton.disabled = true;
  playClueSequence();
}

//stops timer and game
//enables difficulty buttons
function stopGame() {
  stopTimer();
  startButton.style.display = "block";
  stopButton.style.display = "none";
  gamePlaying = false;
  easyButton.disabled = false;
  mediumButton.disabled = false;
  hardButton.disabled = false;
}

//updates the timer value
function updateTimer() {
  timer.innerHTML = timeLeft;
  timeLeft--;
  if (timeLeft < 0) { //once time is up, user loses
    loseGame();
  }
}


function startTimer() {
  if (gamePlaying) { //starts timer only if the game is playing
    timerFunc = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timerFunc);
}

function resetTimer() {
  timeLeft = 5;
  timer.innerHTML = timeLeft;
}

function lightButton(btn) {
  document.querySelector(`.button${btn}`).classList.add("lit");
}

function clearButton(btn) {
  document.querySelector(`.button${btn}`).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    if (progress == i) { //calls setTimeout at the last element in progress to get the full delay and start the timer when sequence playback finishes
      setTimeout(startTimer, delay);
    }
    delay += clueHoldTime;
    delay += cluePauseTime;
    clueHoldTime -= clueHoldTimeSpeed; //lowers clueHoldTime to increase speed as game progresses
  }
}

function guess(btn) {
  if (!gamePlaying) {
    return;
  }

  //Guess was correct!
  if (pattern[guessCounter] == btn) {
    resetTimer(); //resets timer each time a user makes a guess

    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        winGame();
      } else {
        //Pattern correct. Add next segment
        stopTimer(); //stops timer so sequence playback can be played
        progress++;
        currRound.innerHTML = progress + 1; //increases current round after user guesses correct sequence
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else if (lives != 1) { //handles lives
    playWrongAnswer(); //lets user know they lost a life by playing an audio file
    resetTimer(); 
    lives--;
    livesCount.innerHTML = lives;
  } else {
    livesCount.innerHTML = 0;
    //Guess was incorrect
    //GAME OVER: LOSE!
    loseGame();
  }
}

function loseGame() {
  stopGame();
  loseSound.play(); //plays lose audio file
  
  //displays a losing screen
  status.style.color = "red";
  status.innerHTML = "YOU LOST";
  statusScreen.style.display = "grid";

  startButton.style.display = "block";
  stopButton.style.display = "none";
}

function winGame() {
  stopGame();
  winSound.play(); //plays win audio file
  
  //displays a winning screen
  status.style.color = "limegreen";
  status.innerHTML = "YOU WON!";
  statusScreen.style.display = "grid";

  startButton.style.display = "block";
  stopButton.style.display = "none";
}

//plays wrong audio file
function playWrongAnswer() {
  wrongAnswer.play();
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 500,
  6: 550,
  7: 300,
  8: 600,
  9: 650
};

function playTone(btn, len) {
  context.resume(); //added this as sound wasn't playing without it
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    context.resume(); //added this as sound wasn't playing without it
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
