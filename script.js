const sizeGame = 15;
const puzzle = document.querySelectorAll('.puz');
const buttonNewGame = document.querySelector('#new_game');
let youWin = 0;
let movesCount = 0;

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const randomArr = (sizeGame) => {
    const result = [];
    while (result.length < sizeGame) {
        const num = randomInteger(1, sizeGame);
        if (!result.includes(num)) result.push(num);
    }
    return result;
};

let timerStarted;
let totalSeconds = 0;

function timer() {
    ++totalSeconds;
    const second = pad(totalSeconds % 60);
    const minute = pad(parseInt(totalSeconds / 60));


    function pad(num) {
        const numToString = num + "";
        if (numToString.length < 2) {
            return "0" + numToString;
        } else {
            return numToString;
        }
    }

    document.querySelector("#timer").innerHTML = minute + ":" + second;
}

const container = document.querySelector('.contener')

const startTimer = () => {
    setInterval(timer, 1000);
    timerStarted = true;
};

function newGame() {
    movesCount = 0;
    movesCounter()
    timerStarted = false;
    totalSeconds = 0;
    const randomEe = randomArr(sizeGame);
    const randomOrder = randomArr(sizeGame);
    buttonNewGame.removeEventListener('click', startTimer);
    buttonNewGame.addEventListener('click', startTimer);
    const pushElement = (el) => {
        const blankPuzzle = el.classList.contains('puz_blank');
        if (blankPuzzle) {
            el.innerHTML = `<span></span>`;
            el.setAttribute('style', `order: 16`)
        } else {
            const order = randomOrder.pop();
            const elemNum = randomEe.pop()
            el.innerHTML = `<span>${elemNum}</span>`;
            el.setAttribute('style', `order: ${order}`)
        }
    };

    puzzle.forEach(el => {
        pushElement(el)
    });
};

function fastGame() {
    movesCount = 0;
    movesCounter()
    timerStarted = false;
    totalSeconds = 0;
    const randomEe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const randomOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    buttonNewGame.removeEventListener('click', startTimer);
    buttonNewGame.addEventListener('click', startTimer);
    const pushElement = (el) => {
        const blankPuzzle = el.classList.contains('puz_blank');
        if (blankPuzzle) {
            el.innerHTML = `<span></span>`;
            el.setAttribute('style', `order: 16`)
        } else {
            const order = randomOrder.pop();
            const elemNum = randomEe.pop()
            el.innerHTML = `<span>${elemNum}</span>`;
            el.setAttribute('style', `order: ${order}`)
        }
    };

    puzzle.forEach(el => {
        pushElement(el)
    });
};

const getOrder = (el) => {
    const orderElString = el.getAttribute('style').toString();
    const elOrder = parseInt(orderElString.match(/\d+/));
    return elOrder;
}
newGame()


function movesCounter() {
    const counter = document.querySelector('#moves_count');
    counter.innerText = movesCount;
}

const movePuzzle = (event) => {
    const elem = event.target;
    const testPuz = elem.childElementCount > 0;
    const targetElOrder = testPuz ? getOrder(elem) : getOrder(elem.parentElement);

    let isMoveble;
    const blankElement = document.querySelector('.puz_blank');
    const blankElOrder = getOrder(blankElement);
    const moveToIndex = blankElOrder;
    const elemClick = testPuz ? elem : elem.parentElement;



    const leftSibling = blankElOrder - 1;
    const rightSibling = blankElOrder + 1;
    const upSibling = blankElOrder + 4;
    const downSibling = blankElOrder - 4;
    const siblings = [leftSibling, rightSibling, upSibling, downSibling];
    if (siblings.includes(targetElOrder)) {
        isMoveble = true;

    }


    if (isMoveble) {
        elemClick.setAttribute('style', `order: ${moveToIndex}`);
        blankElement.setAttribute('style', `order: ${targetElOrder}`);
        movesCount += 1;
        movesCounter();
    }

    puzzle.forEach(el => {
        const elPos = getOrder(el);
        const elNum = parseInt(el.textContent);
        if (elPos === elNum) {
            el.classList.add('puz--bordered');
        }
        if (elPos !== elNum) {
            el.classList.remove('puz--bordered');
        }
    });
    youWin = 0;
    puzzle.forEach(el => {
        youWin += el.classList.contains('puz--bordered') ? 1 : 0;
    });

    if(youWin === 15) {
        alert(`Ура! Вы решили головоломку за ${document.querySelector('#timer').innerText} и ${movesCount} ходов»`)
        newGame()
    }
}



buttonNewGame.addEventListener('click', newGame)

puzzle.forEach(el => el.addEventListener('click', movePuzzle))