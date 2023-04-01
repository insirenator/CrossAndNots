window.addEventListener('DOMContentLoaded', () => {
	const tiles = Array.from(document.querySelectorAll('.tile'));
	let board = ["", "", "", "", "", "", "", "", "" ];

	document.querySelector('#reset-btn').addEventListener('click', () => resetBoard());
	
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

		tiles.forEach((tile) => {
			tile.textContent = "";
		});
	}

});