// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBDAs7D67M_T1d3f72oInIxE-GyVegbmjA",
    authDomain: "the-memory-game.firebaseapp.com",
    projectId: "the-memory-game",
    storageBucket: "the-memory-game.appspot.com",
    messagingSenderId: "597412317401",
    appId: "1:597412317401:web:90462e635a68e83f3756c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

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
const drpSignUpButton = document.querySelector('.sign-up');
const drpLoginButton = document.querySelector('.login');
const drpSignOutButton = document.querySelector('.sign-out');
const signLogScreen = document.querySelector('.sign-log-screen');
const closeButton = document.querySelector('.close');
const formScreen = document.querySelector('.form-screen');
const signUpButton = document.getElementById('sign-up-scrn-btn');
const loginButton = document.getElementById('login-scrn-btn');
const displayName = document.getElementById('name');
const dropdown = document.querySelector('.dropdown');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const totalGamesPlayedTag = document.querySelector('.tot-games-played-tag');
const totalWinsTag = document.querySelector('.tot-wins-tag');
const totalLossesTag = document.querySelector('.tot-losses-tag');
const totalGamesPlayed = document.querySelector('.tot-games-played');
const totalWins = document.querySelector('.tot-wins');
const totalLosses = document.querySelector('.tot-losses');
const totalMistakes = document.querySelector('.tot-mistakes');
const totalGuesses = document.querySelector('.tot-guesses');
const totalEasyWins = document.querySelector('.tot-easy-wins');
const totalEasyLosses = document.querySelector('.tot-easy-losses');
const totalMediumWins = document.querySelector('.tot-medium-wins');
const totalMediumLosses = document.querySelector('.tot-medium-losses');
const totalHardWins = document.querySelector('.tot-hard-wins');
const totalHardLosses = document.querySelector('.tot-hard-losses');
const wlRatio = document.querySelector('.wl-ratio');
const mgRatio = document.querySelector('.mg-ratio');
const changeDisplayName = document.querySelector('.display-name');
const error = document.querySelector('.error');
const arrow = document.querySelector('.arrow');

var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0;
var totRounds = 8;
var lives = 3;
var timeLeft = 5; 
var timerFunc; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;
var clueHoldTime = 1000; //time holding each clue light/sound
var clueHoldTimeSpeed = 20; 
const cluePauseTime = 333; //pause between clues
const nextClueWaitTime = 1000; //wait before starting clue sequence
var easyDiff = true;
var mediumDiff = false;
var hardDiff = false;

var currGamesPlayed = 0;
var currWins = 0;
var currLosses = 0;
var currMistakes = 0;
var currGuesses = 0;
var currEasyWins = 0;
var currEasyLosses = 0;
var currMediumWins = 0;
var currMediumLosses = 0;
var currHardWins = 0;
var currHardLosses = 0;

window.addEventListener('load', () => {generatePattern(totRounds)});

document.addEventListener('click', e => {
    var clickInsideDropdown = dropdown.contains(e.target);
    var clickDisplayName = displayName.contains(e.target);

    if (!clickInsideDropdown && dropdown.style.display == 'block' && !clickDisplayName) {
        dropdown.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
});

auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            totalGamesPlayedTag.innerHTML = doc.data().totalGamesPlayed;
            totalWinsTag.innerHTML = doc.data().totalWins;
            totalLossesTag.innerHTML = doc.data().totalLosses;
            totalGamesPlayed.innerHTML = doc.data().totalGamesPlayed;
            totalWins.innerHTML = doc.data().totalWins;
            totalLosses.innerHTML = doc.data().totalLosses;
            totalMistakes.innerHTML = doc.data().totalMistakes;
            totalGuesses.innerHTML = doc.data().totalGuesses;
            totalEasyWins.innerHTML = doc.data().easyWins;
            totalEasyLosses.innerHTML = doc.data().easyLosses;            
            totalMediumWins.innerHTML = doc.data().mediumWins;
            totalMediumLosses.innerHTML = doc.data().mediumLosses;
            totalHardWins.innerHTML = doc.data().hardWins;
            totalHardLosses.innerHTML = doc.data().hardLosses;

            currGamesPlayed = doc.data().totalGamesPlayed;
            currWins = doc.data().totalWins;
            currLosses = doc.data().totalLosses;
            currMistakes = doc.data().totalMistakes;
            currGuesses = doc.data().totalGuesses;
            currEasyWins = doc.data().easyWins;
            currEasyLosses = doc.data().easyLosses;
            currMediumWins =  doc.data().mediumWins;
            currMediumLosses = doc.data().mediumLosses;
            currHardWins = doc.data().hardWins;
            currHardLosses = doc.data().hardLosses;
        }).then(() => {
            if (auth.currentUser.isAnonymous) {
                drpSignUpButton.style.display = 'block';
                drpLoginButton.style.display = 'block';
                drpSignOutButton.style.display = 'none';
            }
            else {
                drpSignUpButton.style.display = 'none';
                drpLoginButton.style.display = 'none';
                drpSignOutButton.style.display = 'block';
            }

            wlRatio.innerHTML = wlRatioCalculator();
            mgRatio.innerHTML = mgRatioCalculator();
            displayName.innerHTML = auth.currentUser.displayName;            
        });
    }
    else {
        auth.signInAnonymously().then(() => {
            db.collection('users').doc(auth.currentUser.uid).set({
                totalGamesPlayed: 0,
                totalWins: 0,
                totalLosses: 0,
                totalMistakes: 0,
                totalGuesses: 0,
                easyWins: 0,
                easyLosses: 0,
                mediumWins: 0,
                mediumLosses: 0,
                hardWins: 0,
                hardLosses: 0
            }).then(() => {
                db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
                    totalGamesPlayedTag.innerHTML = doc.data().totalGamesPlayed;
                    totalWinsTag.innerHTML = doc.data().totalWins;
                    totalLossesTag.innerHTML = doc.data().totalLosses;
                    totalGamesPlayed.innerHTML = doc.data().totalGamesPlayed;
                    totalWins.innerHTML = doc.data().totalWins;
                    totalLosses.innerHTML = doc.data().totalLosses;
                    totalMistakes.innerHTML = doc.data().totalMistakes;
                    totalGuesses.innerHTML = doc.data().totalGuesses;
                    totalEasyWins.innerHTML = doc.data().easyWins;
                    totalEasyLosses.innerHTML = doc.data().easyLosses;            
                    totalMediumWins.innerHTML = doc.data().mediumWins;
                    totalMediumLosses.innerHTML = doc.data().mediumLosses;
                    totalHardWins.innerHTML = doc.data().hardWins;
                    totalHardLosses.innerHTML = doc.data().hardLosses;

                    currGamesPlayed = doc.data().totalGamesPlayed;
                    currWins = doc.data().totalWins;
                    currLosses = doc.data().totalLosses;
                    currMistakes = doc.data().totalMistakes;
                    currGuesses = doc.data().totalGuesses;
                    currEasyWins = doc.data().easyWins;
                    currEasyLosses = doc.data().easyLosses;
                    currMediumWins =  doc.data().mediumWins;
                    currMediumLosses = doc.data().mediumLosses;
                    currHardWins = doc.data().hardWins;
                    currHardLosses = doc.data().hardLosses;
                });
            });
        }).then(() => {
                var name = generateDisplayName();

                drpSignUpButton.style.display = 'block';
                drpLoginButton.style.display = 'block';
                drpSignOutButton.style.display = 'none';

                auth.currentUser.updateProfile({
                    displayName: name
                }).then(() => {
                    displayName.innerHTML = auth.currentUser.displayName;
                });
        });
    }
});

signUpButton.addEventListener('click', e => {
    e.preventDefault();
    var userEmail = email.value;
    var userPassword = password.value;

    var cred = firebase.auth.EmailAuthProvider.credential(userEmail, userPassword);
    auth.currentUser.linkWithCredential(cred).then(() => {
        formScreen.reset();
        signLogScreen.style.display = 'none';

        drpSignUpButton.style.display = 'none';
        drpLoginButton.style.display = 'none';
        drpSignOutButton.style.display = 'block';
    }).catch(e => {
        error.innerHTMl = e.message;
    });
});

loginButton.addEventListener('click', e => {
    e.preventDefault();
    var userEmail = email.value;
    var userPassword = password.value;
    var prevUser = auth.currentUser;

    auth.signInWithEmailAndPassword(userEmail, userPassword).then(() => {
        formScreen.reset();
        signLogScreen.style.display = 'none';
        if (prevUser.isAnonymous) {
            prevUser.delete().then(() => {
                db.collection('users').doc(prevUser.uid).delete();
            });
        }
        }).catch(e => {
            error.innerHTML = e.message;
        });
});

signLogScreen.addEventListener('click', e => {
    var clickInsideForm = formScreen.contains(e.target);

    if (!clickInsideForm) {
        signLogScreen.style.display = 'none';
        error.innerHTML = '';
        formScreen.reset();
    }
});

displayName.addEventListener('click', () => {
    if (dropdown.style.display == 'block') {
        dropdown.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
    else {
        dropdown.style.display = 'block';
        arrow.style.transform = 'rotate(-180deg)';
    }
});

changeDisplayName.addEventListener('keypress', e => {
    if (e.keyCode == 13) {
        e.preventDefault();
        
        auth.currentUser.updateProfile({
            displayName: changeDisplayName.value
        }).then(() => {
            changeDisplayName.value = '';
            displayName.innerHTML = auth.currentUser.displayName;
        });
    }
});

drpSignUpButton.addEventListener('click', () => {
    signLogScreen.style.display = 'block';
    signUpButton.style.display = 'block';
    loginButton.style.display = 'none';
});

drpLoginButton.addEventListener('click', () => {
    signLogScreen.style.display = 'block';
    signUpButton.style.display = 'none';
    loginButton.style.display = 'block';
});

drpSignOutButton.addEventListener('click', () => {
    auth.signOut();
});

closeButton.addEventListener('click', () => {
    signLogScreen.style.display = 'none';
    error.innerHTML = '';
    formScreen.reset();
});

startButton.addEventListener("click", () => {startGame()});
stopButton.addEventListener("click", () => {stopGame()});

easyButton.addEventListener("click", () => {
    totRounds = 8;
    clueHoldTimeSpeed = 20;
    statusScreen.style.display = "none";
    totalRounds.innerHTML = totRounds;
    currRound.innerHTML = 1;
    livesCount.innerHTML = 3;
    resetTimer();

    buttonContainer.style.gridTemplateRows = "1fr 1fr";
    buttonContainer.style.gridTemplateColumns = "1fr 1fr";
    button5.style.display = "none";
    button7.style.display = "none";
    button8.style.display = "none";
    button9.style.display = "none";

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

    easyDiff = true;
    mediumDiff = false;
    hardDiff = false;
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

    easyDiff = false;
    mediumDiff = true;
    hardDiff = false;
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

    easyDiff = false;
    mediumDiff = false;
    hardDiff = true;
});

button1.addEventListener("mousedown", () => {startTone(1)});
button1.addEventListener("mouseup", () => {stopTone()});
button1.addEventListener("click", () => {guess(1)});

button2.addEventListener("mousedown", () => {startTone(2)});
button2.addEventListener("mouseup", () => {stopTone()});
button2.addEventListener("click", () => {guess(2)});

button3.addEventListener("mousedown", () => {startTone(3)});
button3.addEventListener("mouseup", () => {stopTone()});
button3.addEventListener("click", () => {guess(3)});

button4.addEventListener("mousedown", () => {startTone(4)});
button4.addEventListener("mouseup", () => {stopTone()});
button4.addEventListener("click", () => {guess(4)});

button5.addEventListener("mousedown", () => {startTone(5)});
button5.addEventListener("mouseup", () => {stopTone()});
button5.addEventListener("click", () => {guess(5)});

button6.addEventListener("mousedown", () => {startTone(6)});
button6.addEventListener("mouseup", () => {stopTone()});
button6.addEventListener("click", () => {guess(6)});

button7.addEventListener("mousedown", () => {startTone(7)});
button7.addEventListener("mouseup", () => {stopTone()});
button7.addEventListener("click", () => {guess(7)});

button8.addEventListener("mousedown", () => {startTone(8)});
button8.addEventListener("mouseup", () => {stopTone()});
button8.addEventListener("click", () => {guess(8)});

button9.addEventListener("mousedown", () => {startTone(9)});
button9.addEventListener("mouseup", () => {stopTone()});
button9.addEventListener("click", () => {guess(9)});

function generatePattern(totRounds) {
    pattern = [];
    for (let i = 0; i < totRounds; i++) {
        pattern.push(Math.floor(Math.random() * (totRounds / 2)) + 1);
    }
}

function generateDisplayName() {
    let tail = '';
    for (let i = 0; i < 4; i++) {
        tail+=(Math.floor(Math.random() * (9)) + 1);
    }
    return `user${tail}`;
}

function wlRatioCalculator() {
    var wlRatioVar = currWins/currLosses;
    return (Math.round(100 * wlRatioVar)/100).toFixed(2);
}

function mgRatioCalculator() {
    var mgRatioVar = currMistakes/currGuesses;
    return (Math.round(100 * mgRatioVar)/100).toFixed(2);
}

function startGame() {
    lives = 3;
    livesCount.innerHTML = lives;
    currRound.innerHTML = 1;
    progress = 0;
    clueHoldTime = 1000;
    gamePlaying = true;
    generatePattern(totRounds); 
    resetTimer();
    startButton.style.display = "none";
    stopButton.style.display = "block";
    statusScreen.style.display = "none";
    easyButton.disabled = true;
    mediumButton.disabled = true;
    hardButton.disabled = true;
    playClueSequence();
}

function stopGame() {
    stopTimer();
    startButton.style.display = "block";
    stopButton.style.display = "none";
    gamePlaying = false;
    easyButton.disabled = false;
    mediumButton.disabled = false;
    hardButton.disabled = false;
}

function updateTimer() {
    timer.innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft < 0) { 
        loseGame();
    }
}

function startTimer() {
    if (gamePlaying) { 
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
        if (progress == i) { 
        setTimeout(startTimer, delay);
        }
        delay += clueHoldTime;
        delay += cluePauseTime;
        clueHoldTime -= clueHoldTimeSpeed; 
    }
}

function playWrongAnswer() {
    wrongAnswer.play();
}

function guess(btn) {
    if (!gamePlaying) {
        return;
    }

    currGuesses++;
    totalGuesses.innerHTML = currGuesses;
    mgRatio.innerHTML = mgRatioCalculator();
    //Guess was correct!
    if (pattern[guessCounter] == btn) {
        resetTimer(); 

        if (guessCounter == progress) {
            if (progress == pattern.length - 1) {
                //GAME OVER: WIN!
                winGame();
            } 
            else {
                //Pattern correct. Add next segment
                stopTimer(); 
                progress++;
                currRound.innerHTML = progress + 1; 
                playClueSequence();
            }
        } 
        else {
            //so far so good... check the next guess
            guessCounter++;
        }
    } 
    else if (lives != 1) { 
        playWrongAnswer(); 
        resetTimer(); 
        lives--;
        livesCount.innerHTML = lives;
        currMistakes++;
        totalMistakes.innerHTML = currMistakes;
        mgRatio.innerHTML = mgRatioCalculator();
    } 
    else {
        livesCount.innerHTML = 0;
        currMistakes++;
        totalMistakes.innerHTML = currMistakes;
        mgRatio.innerHTML = mgRatioCalculator();
        //Guess was incorrect
        //GAME OVER: LOSE!
        loseGame();
    }
}

function loseGame() {
    currLosses++;
    currGamesPlayed++;

    totalLosses.innerHTML = currLosses;
    totalLossesTag.innerHTML = currLosses;
    totalGamesPlayed.innerHTML = currGamesPlayed;
    totalGamesPlayedTag.innerHTML = currGamesPlayed;
    wlRatio.innerHTML = wlRatioCalculator();

    if (easyDiff) {
        currEasyLosses++;
        totalEasyLosses.innerHTML = currEasyLosses;
    }
    else if (mediumDiff) {
        currMediumLosses++;
        totalMediumLosses.innerHTML = currMediumLosses;
    }
    else if (hardDiff) {
        currHardLosses++;
        totalHardLosses.innerHTML = currHardLosses;
    }

    stopGame();
    loseSound.play(); 
    
    status.style.color = "red";
    status.innerHTML = "YOU LOST";
    statusScreen.style.display = "grid";

    startButton.style.display = "block";
    stopButton.style.display = "none";

    db.collection('users').doc(auth.currentUser.uid).set({
        totalGamesPlayed: currGamesPlayed,
        totalWins: currWins,
        totalLosses: currLosses,
        totalMistakes: currMistakes,
        totalGuesses: currGuesses,
        easyWins: currEasyWins,
        easyLosses: currEasyLosses,
        mediumWins: currMediumWins,
        mediumLosses: currMediumLosses,
        hardWins: currHardWins,
        hardLosses: currHardLosses
    });
}

function winGame() {
    currWins++;
    currGamesPlayed++;

    totalWins.innerHTML = currWins;
    totalWinsTag.innerHTML = currWins;
    totalGamesPlayed.innerHTML = currGamesPlayed;
    totalGamesPlayedTag.innerHTML = currGamesPlayed;
    wlRatio.innerHTML = wlRatioCalculator();

    if (easyDiff) {
        currEasyWins++;
        totalEasyWins.innerHTML = currEasyWins;
    }
    else if (mediumDiff) {
        currMediumWins++;
        totalMediumWins.innerHTML = currMediumWins;
    }
    else if (hardDiff) {
        currHardWins++;
        totalHardWins.innerHTML = currHardWins;
    }

    stopGame();
    winSound.play(); 
    
    status.style.color = "limegreen";
    status.innerHTML = "YOU WON!";
    statusScreen.style.display = "grid";

    startButton.style.display = "block";
    stopButton.style.display = "none";

    db.collection('users').doc(auth.currentUser.uid).set({
        totalGamesPlayed: currGamesPlayed,
        totalWins: currWins,
        totalLosses: currLosses,
        totalMistakes: currMistakes,
        totalGuesses: currGuesses,
        easyWins: currEasyWins,
        easyLosses: currEasyLosses,
        mediumWins: currMediumWins,
        mediumLosses: currMediumLosses,
        hardWins: currHardWins,
        hardLosses: currHardLosses
    });
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
    context.resume(); 
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
    setTimeout(function() {
        stopTone();
    }, len);
}

function startTone(btn) {
    if (!tonePlaying) {
        context.resume(); 
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
