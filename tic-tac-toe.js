const board = document.getElementById('game-board');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

function createBoard() {
    gameState.fill('');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (gameState[index] === '') {
        gameState[index] = currentPlayer;
        renderBoard();
        if (checkWinner(currentPlayer)) { // Check winner for the current player
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
            setTimeout(createBoard, 1000);
        } else if (gameState.every(cell => cell !== '')) {
            setTimeout(() => alert("It's a draw!"), 100);
            setTimeout(createBoard, 1000);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alternate player only if no winner
        }
    }
}

function renderBoard() {
    const cells = board.children;
    for (let i = 0; i < gameState.length; i++) {
        cells[i].textContent = gameState[i];
    }
}

function checkWinner(player) { // Check if the given player has won
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] === player && gameState[b] === player && gameState[c] === player; // Check if the current player has the winning combination
    });
}

// Initialize the game board
createBoard();
