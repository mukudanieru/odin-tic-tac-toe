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

        if (board.isPlaceEmpty(position)) {
            board.placeMarker(position, currentPlayer.getMarker());
            switchPlayer();
        }

        board.printBoard();
    }

    return { playRound };
}

const game = GameController();

// Dom Controller
function DOMController() {}
