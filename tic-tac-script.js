var symbols = ['./images/circle.png', './images/cross.png'];

class player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
    }
}

var players = [
    new player('Player 1', symbols[0]),
    new player('Player 2', symbols[1])
]

var boxContainer = document.querySelector('.container')
boxContainer.addEventListener('click', function (event) {
    var box = event.target
    if (box.className === 'box') {
        box.style.backgroundImage = `url(${symbols[0]})`;
    }
})

document.querySelector('#reset').addEventListener('click', startNewGame)

function startNewGame() {
    var boxes = document.querySelectorAll('.box');
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundImage = '';
    }
}