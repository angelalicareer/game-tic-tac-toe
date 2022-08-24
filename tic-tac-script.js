// let X_CLASS = 'x'
// let O_CLASS = 'o'
let root = document.documentElement;



let boxesElements = document.querySelectorAll('.box');
let circleTurn = true;

boxesElements.forEach(box => {
    box.addEventListener('click', handleclick, { once: true })
});

function handleclick(event) {
    let box = event.target
    let currentClass = ''
    if (circleTurn) {
        currentClass = 'o'
    } else {
        currentClass = 'x'
    }

    box.classList.add(currentClass)
    if (checkWins(currentClass)) {
        document.querySelector('#winningMessage').textContent = currentClass.toUpperCase() + ' Wins!'
    } else if (checkTie()) {
        document.querySelector('#winningMessage').textContent = "It's a tie!"

    }

    swapTurns()
}

// function playSound() {

// }

// function placeMark(box, currentClass) {
//     box.classList.add(currentClass)
// }

function swapTurns() {
    circleTurn = !circleTurn
    if (circleTurn) {
        root.style.setProperty('--current-mark', "url('./images/circle.png')")
    } else {
        root.style.setProperty('--current-mark', "url('./images/cross.png')")
    }
}

let COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWins(currentClass) {
    return COMBINATIONS.some(combination => {
        return combination.every(i => {
            return boxesElements[i].classList.contains(currentClass);
        })
    })
}

function checkTie() {
    for (let i = 0; i < 9; i++) {
        if (boxesElements[i].classList.length === 1) {
            return false;
        }
    }
    return true
}