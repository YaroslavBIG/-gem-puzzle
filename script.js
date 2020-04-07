const sizeGame = 16;
const puzzle = document.querySelectorAll('.puz');

function randomInteger(min, max) {
    // случайное число от min до (max+1)
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

function newGame() {
const randomEe = randomArr(sizeGame);
const randomOrder = randomArr(sizeGame);
const pushElement = (el) => {
    const blankPuzzle = el.classList.contains('puz_blank');
    const order = randomOrder.pop();
    const elemNum = randomEe.pop()

    if(!blankPuzzle){
        el.innerHTML = `<span>${elemNum}</span>`;
        el.setAttribute('style',`order: ${order}`)
    }
    else {
        el.innerHTML = `<span></span>`;
        el.setAttribute('style',`order: ${sizeGame + 1}`)
    }
};

puzzle.forEach(el => {pushElement(el)});
};

const getOrder = (el) => {
    const orderElString = el.getAttribute('style').toString();
    const elOrder =  parseInt(orderElString.match(/\d+/))
    return elOrder;
}
newGame()


const movePuzzle = (event) => {
    
    const targetElOrder = getOrder(event.target)
    let isMoveble;
    const blankElement = document.querySelector('.puz_blank');
    const blankElOrder = getOrder(blankElement);
    let moveToIndex = blankElOrder;
    const elemClick = event.target;
    
    
    
    const leftSibling = blankElOrder - 1;
    const rightSibling = blankElOrder + 1;
    const upSibling =  blankElOrder + 4;
    const downSibling =  blankElOrder - 4;
    const siblings = [leftSibling, rightSibling, upSibling, downSibling];
    if(siblings.includes(targetElOrder)) {
        isMoveble = true;
        
    }
        
    
    if(isMoveble) {
        elemClick.setAttribute('style', `order: ${moveToIndex}`)
        blankElement.setAttribute('style', `order: ${targetElOrder}`)
    }
    //puzzle.forEach(el => blankSibling(el))
    
}

const buttonNewGame = document.querySelector('#new_game');

buttonNewGame.addEventListener('click', newGame)

puzzle.forEach(el => el.addEventListener('click', movePuzzle))