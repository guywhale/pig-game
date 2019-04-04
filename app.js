/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, previousRoll;

//triggers initialization function (see below)
init();

//function btn() {
	// Does something
//}

//.addEventListner adds events on the page. 
//Inside brackets first parameter defines event (e.g. a mouse click). 
//Second parameter defines function that will run when event is detected by the browser.
//When writing function brackets are excluded because we don't want to immediately call the function, we want the event listener to call it,  e.g. btn NOT btn().
//document.querySelector('.btn-roll').addEventListener('click', btn);
//btn is a CALLBACK FUNCTION as it is called by another function/method, in this case .addEventListener
//Alternatively, you can have an ANONYMOUS FUNCTION when the function is defined inside the function parameter .e.g.
//When ROLL DICE button is clicked
document.querySelector('.btn-roll').addEventListener('click', function () {//Function has no name and therefore cannot be called outside this context
	//gamePlaying is a STATE VARIABLE. In this case evaluates whether the game is playing -- true or false?
	if (gamePlaying) {
		//Generate random number
		var dice = Math.floor(Math.random() * 6) + 1;
		// var dice = 6;

		//Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		//If previous and current roll equal 6, 
		if (previousRoll === 6 && dice === 6) {
			//zero global score
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}	else if (dice !== 1) {//Update the round score IF the rolled number was NOT a 1
				roundScore += dice;//Add score
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
				//Stores as previous roll for next roll
			}
			else {
				//switch to next player				
				nextPlayer ();
			}
		
		
		//stores current roll as previous roll for next click of ROLL DICE button 
		previousRoll = dice;
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

			//Remove dice image
			document.querySelector('.dice').style.display = 'none';

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

	//dice = Math.floor(Math.random() * 6) + 1;	//random number between 0 and 1 multiplied by 6, rounded down to nearest whole number then 1 is added

	//.querySelector selects elements using CSS syntax.
	//Adding activePlayer variable allows for switching between players
	//.textContent changes content of element (in this case adds dice variables value)
	//document.querySelector('#current-' + activePlayer).textContent = dice;//GETTER

	//.innerHTML allows HTML elements to be added. MUST USE STRING.
	//document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>';

	//Can use .querySelector to SET variables
	//var x = document.querySelector('#score-0').textContent;//SETTER
	//console.log(x);

	//.style allows you to change CSS properties. Write the property afterwards with a . (in this case display becomes .style.display). Write an = then the property AS A STRING.
	//Removes dice image
	document.querySelector('.dice').style.display = 'none';

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
	
	roundScore = 0;
	
	//Updates HTML element to 0 so it displays on page
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	//Toggles .active CSS class to style player panels differently if they are the current player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//Removes dice image from centre
	document.querySelector('.dice').style.display = 'none';
};

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/