// boilerplate code for readline library
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//start guessing game
guessingGame();

// function to get a random integer in a range from min to max (inclusive)
function randomInteger(min, max) {
  let range = max - min + 1; 
  return min + Math.floor(Math.random() * range);
}

// error checking for user input, don't allow anything but N or Y
// async function guessCheck(response) {
//   while (response.toUpperCase() !== 'N' && response.toUpperCase() !== 'Y') {
//     console.log(`That's not an answer! Tell me Y or N`);
//     response = await ask(`Is it... ${currGuess}? `);
//   }
//   return response;
// }

// function holding the game logic
async function guessingGame() {

  // variables/constants
  let MAX = 100;
  let MIN = 1;
  let currHigh = MAX;
  let currLow = MIN;
  let guessCount = 0;
  let currGuess;
  let guessRange;
  let highOrLow;    // holds the answer of higher or lower
  let yesOrNo;      // holds the answer of if the guess is right or wrong

  // console.log introductory message
  console.log(`Please think of a number between 1 and 100 (inclusive).
I will try to guess it.`);

  // get a random number for the computer's guess with Math.random()
  currGuess = randomInteger(currLow, currHigh);
  guessCount++;   //increment guessCount
  //console.log(`curr comp guess: ${currGuess}`);

  // ask if the computer guess is the player's number
  yesOrNo = await ask(`Is it... ${currGuess}? `);
  console.log(`yesOrNo: ${yesOrNo}`);

  // validate user response
  //yesOrNo = guessCheck(yesOrNo);
  while (yesOrNo.toUpperCase() !== 'N' && yesOrNo.toUpperCase() !== 'Y') {
    console.log(`That's not an answer! Tell me Y or N`);
    yesOrNo = await ask(`Is it... ${currGuess}? `);
  }
  
  // need to loop through if statement so long as yesOrNo == 'N'
  while (yesOrNo.toUpperCase() == 'N') {
    // if player says No (N) guess is not right, ask if it is higher or lower
    highOrLow = await ask(`Is it higher (H), or lower (L)? `);

    while (highOrLow.toUpperCase() !== 'H' && highOrLow.toUpperCase() !== 'L') {
      console.log(`I can't tell what you're telling me!`);
      highOrLow = await ask(`Is it higher (H), or lower (L)? `);
    }

    // update currLow or currHigh based on highOrLow
    if (highOrLow.toUpperCase() == 'H') {
      currLow = currGuess + 1;  // since it is higher, add 1
    } else {
      currHigh = currGuess - 1; // since lower, subtract 1
    }

    // recalculate guess, increment guessCount
    currGuess = randomInteger(currLow, currHigh);
    guessCount++;

    // ask player about currGuess
    yesOrNo = await ask(`Is it... ${currGuess}? `);

    // yesOrNo = guessCheck(yesOrNo);
    while (yesOrNo.toUpperCase() !== 'N' && yesOrNo.toUpperCase() !== 'Y') {
      console.log(`That's not an answer! Tell me Y or N`);
      yesOrNo = await ask(`Is it... ${currGuess}? `);
    }
    
  }

  console.log(`Your number was ${currGuess}!`);
  console.log(`I guessed it in ${guessCount} times!`);
  

  // exit the game
  process.exit();
}
