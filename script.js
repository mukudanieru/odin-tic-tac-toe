// Player
function Player(name, marker) {
    let score = 0;

    return {
        getName() {
            return name;
        },
        getMarker() {
            return marker;
        },
        getScore() {
            return score;
        },
        incrementScore() {
            score++;
        },
    };
}

// Cell - basically each of the cell in a tic tac toe
function Cell() {
    let value = 0;

    return {
        addValue(playersMarker) {
            value = playersMarker;
        },
        getValue() {
            return value;
        },
    };
}

// Board
function Gameboard() {
    const ROW = 3,
        COLUMN = 3;

    const board = [];

    for (let i = 0; i < ROW; i++) {
        board[i] = [];

        for (let j = 0; j < COLUMN; j++) {
            board[i].push(Cell());
        }
    }

    return {
        getBoard() {
            return board;
        },
        printBoard() {
            for (let i = 0; i < 3; i++) {
                let row = "";
                for (let j = 0; j < 3; j++) {
                    row += board[i][j].getValue();
                }
                console.log(row);
            }
        },
    };
}

const board = Gameboard().printBoard();

// Game Controller
function gameController() {}

// Dom Controller
function DOMController() {}
