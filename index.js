window.addEventListener('DOMContentLoaded', () => {
	const tiles = Array.from(document.querySelectorAll('.tile'));
	let board = ["", "", "", "", "", "", "", "", "" ];

	// Reset Button
	document.querySelector('#reset-btn').addEventListener('click', () => resetBoard());
	
	//History
	const history = document.querySelector('#moves-history');

	let isGameOn = true;
	let currentPlayer = 'X';

	/*Winning Conditions
		[0, 1, 2]
		[3, 4, 5]
		[6, 7, 8]
	*/

	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	// Announer to announce winner
	const announcer = document.querySelector('#announcer');
	// Hide it when the page loads
	announcer.style.display = "none";


	tiles.forEach((tile, idx) => {
		tile.addEventListener('click', () => userClicked(idx));
	});

	function userClicked(idx) {
		if(isGameOn && isValidMove(idx)) {
			updateBoard(idx);
			updateHistory(idx);
			checkForWin();
			console.log(board);
		}
	}

	function isValidMove(idx) {
		if (board[idx] === "")
			return true;
		return false;
	}

	function updateBoard(idx) {
		board[idx] = currentPlayer;
		tiles[idx].innerHTML = currentPlayer;
	}

	function updateHistory(idx) {
		//Create new entry
		const newEntry = document.createElement("p");
		//Add the class list
		newEntry.classList.add('history-entry');
		//Change inner text
		newEntry.textContent = `Player ${currentPlayer} moved at ${idx+1}`
		//Add event listeners
		newEntry.addEventListener('mouseover', () => {
			tiles[idx].style.color = "red";
		});
		newEntry.addEventListener('mouseout', () => {
			tiles[idx].style.color = "black";
		});
		//Append to the history
		history.append(newEntry);
	}

	function checkForWin() {
		for (const winCombo of winningConditions) {
			const [a, b, c] = winCombo;
			if (board[a] === currentPlayer &&
				board[b] === currentPlayer &&
				board[c] === currentPlayer) {

				isGameOn = false;
				// Announce Winner
				announcer.style.display = "block";
				announcer.textContent = `PLAYER ${currentPlayer} WON!!`;
				console.log(`PLAYER ${currentPlayer} WON!!`);
			}
		}
		//Change Player
		currentPlayer = (currentPlayer === 'X')?'O':'X';
	}

	function resetBoard() {
		board = ["", "", "", "", "", "", "", "", "" ];
		isGameOn = true;
		currentPlayer = 'X';
		announcer.style.display = "none";
		history.innerHTML = '';

		tiles.forEach((tile) => {
			tile.textContent = "";
		});
	}

});