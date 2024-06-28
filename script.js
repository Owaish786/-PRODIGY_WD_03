// Initial game state
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', '']; // Represents each cell

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle click on cell
function cellClick(cellIndex) {
    if (gameActive && gameState[cellIndex] === '') {
        gameState[cellIndex] = currentPlayer;
        document.getElementById(`cell-${cellIndex}`).innerText = currentPlayer;
        checkWin();
        checkTie();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a win
function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            document.getElementById('status').innerText = `Player ${gameState[a]} wins!`;
        }
    }
}

// Function to check for a tie
function checkTie() {
    if (!gameState.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('status').innerText = 'It\'s a tie!';
    }
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;

    // Clear the board
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).innerText = '';
    }
}

// Event listeners for cell clicks and restart button
document.querySelectorAll('td').forEach((cell, index) => {
    cell.addEventListener('click', () => cellClick(index));
});

document.getElementById('restartButton').addEventListener('click', restartGame);
