// Player
function createPlayer(name, marker) {
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

const mukudanieru = createPlayer("mukudanieru", "X");
const lone = createPlayer("lone", "O");
