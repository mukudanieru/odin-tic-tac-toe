// Player
function Player(marker) {
    let score = 0;

    function getMarker() {
        return marker;
    }

    function getScore() {
        return score;
    }

    function incrementScore() {
        score++;
    }

    return { getMarker, getScore, incrementScore };
}

// Board
function Gameboard() {
    const GRID_LENGTH = 3;
    const board = Array(GRID_LENGTH * GRID_LENGTH).fill(null);

    const winningCombos = [
        [0, 1, 2], // row 1
        [3, 4, 5], // row 2
        [6, 7, 8], // row 3
        [0, 3, 6], // col 1
        [1, 4, 7], // col 2
        [2, 5, 8], // col 3
        [0, 4, 8], // diagonal 1
        [2, 4, 6], // diagonal 2
    ];

    function isThereAWinner() {
        for (const winningCombo of winningCombos) {
            const [a, b, c] = winningCombo.map((i) => board[i]);

            if (a !== null && b !== null && c !== null && a === b && b === c) {
                return true;
            }
        }

        return false;
    }

    function getBoard() {
        return board;
    }

    function isPlaceEmpty(idx) {
        return !board[idx];
    }

    function placeMarker(idx, marker) {
        board[idx] = marker;
    }

    function printBoard() {
        for (let row = 0; row < GRID_LENGTH; row++) {
            const start = row * GRID_LENGTH;
            const end = start + GRID_LENGTH;
            const rowValues = board.slice(start, end);
            console.log(rowValues);
        }
    }

    return {
        getBoard,
        isPlaceEmpty,
        placeMarker,
        printBoard,
        isThereAWinner,
    };
}

// Game Controller
function GameController() {
    const players = [Player("X"), Player("O")];
    const board = Gameboard();
    let currentPlayerIndex = 0;

    function getCurrentPlayer() {
        return players[currentPlayerIndex];
    }

    function switchPlayer() {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    function playRound(position) {
        const currentPlayer = getCurrentPlayer();

        if (board.isPlaceEmpty(position) && !board.isThereAWinner()) {
            board.placeMarker(position, currentPlayer.getMarker());
            switchPlayer();
        }

        if (board.isThereAWinner()) {
            console.log(`${currentPlayer.getMarker()} WON!`);
        }

        board.printBoard();
    }

    return { playRound };
}

const game = GameController();
console.log("----------------");
game.playRound(0);

console.log("----------------");
game.playRound(3);

console.log("----------------");
game.playRound(1);

console.log("----------------");
game.playRound(4);

console.log("----------------");
game.playRound(2);

// Dom Controller
function DOMController() {}
