# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Justin Bautista

Time spent: 12 hours spent in total

Link to project: https://glitch.com/edit/#!/imminent-polite-dime

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Easy, medium, and hard difficulty (increasing total rounds and game buttons as depending on difficulty chosen)
- [x] A round counter so user can see how far they got in the game
- [x] Plays an audio file when user makes a mistake
- [x] Plays an audio file when user wins/loses

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](your-link-here)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
    - https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    - https://www.geeksforgeeks.org/javascript-cleartimeout-clearinterval-method/
    - Visual Studio Code
    - Visual Studio Code Live Sass Compiler Extension

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
 
    A challenge I encountered was adding a timer to the game. I decided to create a timer that gave the user 5 seconds to make a guess. To do this, I had to figure out where the timer started, reset, and stopped while updating it to the HTML. To make it easier for me to understand, I created functions that handled what the timer does. After initially implementing my timer functions, I kept running into issues where either the timer sped up, became negative, didn't reset, started too late or too early, or didn't stop. I had to research setInterval() and clearInterval() to understand how they work and it turned out that my reset function kept starting new timers which is the reason my timer sped up and didn't reset properly. After I fixed that, I was able to figure out how to properly stop the timer by replacing my resetTimer() function with my stopTimer() function in some places. Also, I added an if statement to execute loseGame() when the timer reached zero which fixed the negative issue. The biggest problem was finding out how to start the timer. Wherever I placed my startTimer() function it either started the timer too early or too late. I knew it had to be called by the playClueSequence() function as I wanted the timer to start once the playback sequence ended. I played around with the placement of startTimer() and wasn't getting anywhere. So I tried executing the playSequence() function on paper and found that I could use setTimeout() to call startTimer() using the same delay as the last clue in the playback sequence. The last clue in the current playback sequence would have a delay that accounted for the full length of time it took to complete the playback sequence. With this knowledge, I was able to create an if statement that delayed the startTimer() function until the playback sequence ended. Then, I patted myself on the back as I successfully created a working timer for this game. 
 
3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
[YOUR ANSWER HERE]

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
[YOUR ANSWER HERE]



## License

    Copyright [Justin Bautista]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
