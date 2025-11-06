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

    function isDraw() {
        return board.every((cell) => cell !== null) && !isThereAWinner();
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
        isDraw,
    };
}

// Game Controller
function GameController(board) {
    const players = [Player("X"), Player("O")];
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
            switchPlayer();
            currentPlayer.incrementScore();
        }
    }

    function resetBoard(newBoard) {
        board = newBoard;
    }

    return { getCurrentPlayer, playRound, resetBoard };
}

// Dom Controller
function DOMController() {
    let board = Gameboard();
    let game = GameController(board);
    const mainContent = document.querySelector("#main-content");

    function renderWinner() {
        if (board.isThereAWinner()) {
            const gameWinner = game.getCurrentPlayer();
            let playerDOMScore;

            if (gameWinner.getMarker() === "X") {
                playerDOMScore = document.querySelector("#player-x");
            } else {
                playerDOMScore = document.querySelector("#player-o");
            }

            playerDOMScore.innerHTML = gameWinner.getScore();
        }
    }

    function renderMarker() {
        mainContent.addEventListener("click", (event) => {
            if (
                !event.target.classList.contains("cell") ||
                board.isThereAWinner() ||
                board.isDraw()
            ) {
                console.log("BAWAL NGA NI");
                return;
            }

            const selectedCell = parseInt(event.target.id, 10);
            game.playRound(selectedCell);

            const DOMGameboard = document.querySelector("#gameboard");
            const DOMGameboardArray = [...DOMGameboard.children];
            const scriptGameboard = board.getBoard();

            // Rendering each of the element from script gameboard to dom gameboard
            for (let i = 0; i < scriptGameboard.length; i++) {
                DOMGameboardArray[i].innerHTML = scriptGameboard[i];
            }

            renderWinner();
        });
    }

    function restartGame() {
        mainContent.addEventListener("click", (event) => {
            const resetBtn = event.target.closest("button");

            if (resetBtn === null) return;
            if (!resetBtn.classList.contains("reset-btn")) return;

            // Reseting the board from scratch
            board = Gameboard();
            game = GameController(board);

            const DOMGameboard = document.querySelector("#gameboard");
            const DOMGameboardArray = [...DOMGameboard.children];
            const scriptGameboard = board.getBoard();

            // Resetting each of the element from script gameboard to dom gameboard
            for (let i = 0; i < scriptGameboard.length; i++) {
                DOMGameboardArray[i].innerHTML = scriptGameboard[i];
            }

            const playerX = document.querySelector("#player-x");
            playerX.innerHTML = 0;

            const playerY = document.querySelector("#player-o");
            playerY.innerHTML = 0;
        });
    }

    renderMarker();
    restartGame();
}

const domController = DOMController();
