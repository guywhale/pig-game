var scores, roundScore, activePlayer, gamePlaying, previousRoll0, previousRoll1;

//triggers initialization function (see bottom)
init();

//When ROLL DICE button is clicked
document.querySelector('.btn-roll').addEventListener('click', function () {
	//Checks whether the game is playing
	if (gamePlaying) {
		//Generates random numbers for dice
		var dice0 = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		//Displays the relevant dice.png image file
		var diceDOM = document.querySelector('#dice-0');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice0 + '.png';

		var diceDOM = document.querySelector('#dice-1');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice1 + '.png';

		//If previous and current rolls on either top dice or bottom dice equal 6, 
		if ((previousRoll0 === 6 && dice0 === 6) || (previousRoll1 === 6 && dice1 === 6)) {
			//zero global score
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}	else if (dice0 !== 1) {//Update the round score IF the top dice number was NOT a 1
				roundScore += (dice0 + dice1);//Add score
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
				//Stores as previous roll for next roll
			}
			else {
				//switch to next player				
				nextPlayer ();
			}

		//stores current roll as previous roll for next click of ROLL DICE button 
		previousRoll0 = dice0;
		previousRoll1 = dice1;
	}
});

//when HOLD button is clicked
document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		//Add current score to global score
		scores[activePlayer] += roundScore;

		//Update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//Checks if there is a target score. Sets to 100 id undefined
		var input = document.getElementById('target-score').value;
		var winningScore;
		if (input) {
			winningScore = input;
		}	else {
				winningScore = 100;
		}
		
		//Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			//Changes player name to 'Winner!'
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

			//Remove dice images
			document.querySelector('#dice-0').style.display = 'none';
			document.querySelector('#dice-1').style.display = 'none';

			//Removes .active CSS class
			document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');

			//Adds .winner CSS class
			document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');

			//Changes state of game to false
			gamePlaying = false;
			
		} else {
			//Switch to next player
			nextPlayer();
		}	
	}
});
	
//when NEW GAME button is clicked
document.querySelector('.btn-new').addEventListener('click', init);//Calls back init() function


//Game initialisation function
function init () {
	scores = [0, 0];//scores for each player stored in an array
	roundScore = 0;//score for the current round
	activePlayer = 0;//active player - [0] = Player 1 [1] = Player 2
	gamePlaying = true;//sets state of game to true i.e. a game is being played
	
	//Removes dice image
	document.querySelector('#dice-0').style.display = 'none';
	document.querySelector('#dice-1').style.display = 'none';

	//.getElementById allows you to directly select HTML elements using their ID. NO NEED FOR #. 
	//Resets global scores to 0
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	//Resets current scores to zeros
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	//Resets player names
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	//Resets panel styles by removing .active and .winner classes
	document.querySelector('.player-0-panel').classList.remove('winner', 'active');
	document.querySelector('.player-1-panel').classList.remove('winner', 'active');
	//Sets up Player 1 as the first active player in a new game
	document.querySelector('.player-0-panel').classList.add('active');
}

//Carries out all necessary changes when the player needs to be switched
function nextPlayer () {
	//Next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	
	//Resets current score to 0
	roundScore = 0;

	//Updates HTML element to 0 so it displays on page
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	//Toggles .active CSS class to style player panels differently if they are the current player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//Removes dice images from centre
	document.querySelector('#dice-0').style.display = 'none';
	document.querySelector('#dice-1').style.display = 'none';
};
