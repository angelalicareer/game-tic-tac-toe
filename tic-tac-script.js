class player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
    }
}

let symbols = ['./images/circle.png', './images/cross.png'];
let playerClasses = ['o', 'x'];
let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let players = [
    new player('Player 1', symbols[0]),
    new player('Player 2', symbols[1])
]

let currentPlayer = 0;
let canPlay = true;
let hint = document.querySelector('.hint');
let boxes = document.querySelectorAll('.box');
let scores = document.querySelector('.scores');

let root = document.documentElement;

startNewGame();

let boxContainer = document.querySelector('.container')
boxContainer.addEventListener('click', function (event) {
    if (!canPlay) {
        return;
    }

    let box = event.target
    if (box.className === 'box' && box.style.backgroundImage === '') {
        box.style.backgroundImage = `url(${symbols[currentPlayer]})`;
        box.classList.add(playerClasses[currentPlayer]);
        if (checkForWinner()) {
            players[currentPlayer].score++;
            hint.textContent = players[currentPlayer].name + ' wins!';
            root.style.setProperty('--current-symbol', `url('')`);
            hint.classList.add('win');
            canPlay = false;
        } else if (checkTie()) {
            hint.textContent = 'It is a tie!';
            root.style.setProperty('--current-symbol', `url('')`);
            hint.classList.add('tie');
            canPlay = false;
        } else {
            currentPlayer = (currentPlayer + 1) % 2;
            hint.textContent = players[currentPlayer].name + "'s Turn";
            root.style.setProperty('--current-symbol', `url(${symbols[currentPlayer]})`);
        }
    }
});

document.querySelector('#reset').addEventListener('click', startNewGame)

function startNewGame() {
    currentPlayer = 0
    hint.textContent = players[currentPlayer].name + "'s Turn";
    root.style.setProperty('--current-symbol', `url(${symbols[currentPlayer]})`);
    hint.classList.remove('win', 'tie');

    canPlay = true;

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundImage = '';
        boxes[i].classList.remove('win', 'o', 'x');
    }
}

function checkForWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        let box1 = boxes[combination[0]];
        let box2 = boxes[combination[1]];
        let box3 = boxes[combination[2]];
        if (box1.style.backgroundImage !== ''
            && box1.style.backgroundImage === box2.style.backgroundImage
            && box2.style.backgroundImage === box3.style.backgroundImage) {
            box1.classList.add('win');
            box2.classList.add('win');
            box3.classList.add('win');
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].style.backgroundImage === '') {
            return false;
        }
    }
    return true;
}
