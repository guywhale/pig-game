/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer;

scores = [0, 0];//scores for each player stored in an array
roundScore = 0;//score for the current round
activePlayer = 1;//active player - [0] = Player 1 [1] = Player 2

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
document.querySelector('.dice').style.display = 'none';

//.getElementById allows you to directly select HTML elements using their ID. NO NEED FOR #. 
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';




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
document.querySelector('.btn-roll').addEventListener('click', function () {//Function has no name and therefore cannot be called outside this context
	//1. Generate random number
	var dice = Math.floor(Math.random() * 6) + 1;
	
	//2. Display the result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';
	//3. Update the round score IF the rolled number was NOT a 1

});

