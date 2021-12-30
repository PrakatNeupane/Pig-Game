'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// const currentScore0 = document.getElementById('current--0');



let scores, currentScore, activePlayer, playing;
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // this code just resets the score of first player (or player 0) to 0
    currentScore = 0; //again reset this score to 0 for the next player in the next line
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active'); // this is done just to make active player's background whitish
    player1El.classList.toggle('player--active');

}

// rolling dice functionality
btnRoll.addEventListener('click', function() {
        if (playing) {
            //1. generating a random dice roll

            const dice = Math.trunc(Math.random() * 6) + 1;

            //2. display dice
            diceEl.classList.remove('hidden');
            diceEl.src = `dice-${dice}.png`

            //3. check for rolled 1: if true, switch to next player 
            if (dice !== 1) {
                currentScore += dice;
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;

                // division of problems
                // how can the computer differentiate different players?
                // until the score is 1, the scores should continue for each players
            } else { // meaning if the dice value is 1 --
                // document.getElementById(`current--${activePlayer}`).textContent = 0;
                // // this code just resets the score of first player (or player 0) to 0
                // currentScore = 0; //again reset this score to 0 for the next player in the next line
                // activePlayer = activePlayer === 0 ? 1 : 0;
                // player0El.classList.toggle('player--active'); // this is done just to make active player's background whitish
                // player1El.classList.toggle('player--active');
                switchPlayer();

            }


        }
    })
    // console.log('outside--' + currentScore); // dont do this because this is executed regardless of clicking the buttons so the vlaue is always the globally declared value.

btnHold.addEventListener('click', function() {
    if (playing) {
        // add current score to active player's score

        scores[activePlayer] += currentScore;
        console.log(scores);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        // check if player's score is >=100
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');

            // finish the game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }

        // switch to the next player
        switchPlayer();
    }

})

btnNew.addEventListener('click', init)