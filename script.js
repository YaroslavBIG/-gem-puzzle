const sizeGame = 15;
const puzzle = document.querySelectorAll('.puz');
const buttonNewGame = document.querySelector('#new_game');
let movesCount = 0;

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
let timerStarted;
let minute;
let second;

function startTimer(timerStarted) {
    let siteTime = new Date();
    timerStarted = true
    if(!timerStarted){
        minute = siteTime.setMinutes(0); 
        second = siteTime.setSeconds(0);
    }
    else{
        minute = siteTime.getMinutes(); 
        second = siteTime.getSeconds();
        
    }

    if (minute < 10) minute  = "0" + minute;
    if (second < 10) second  = "0" + second;
    
    document.querySelector("#timer").innerHTML = minute + ":" + second; 
}

const container = document.querySelector('.contener')



buttonNewGame.addEventListener('click', (event) => {
    if(!timerStarted){
    setInterval(()=>{
        startTimer()
    }, 1000)
    }
})

function newGame() {
movesCount = 0;
movesCounter()
const randomEe = randomArr(sizeGame);
const randomOrder = randomArr(sizeGame);

const pushElement = (el) => {
const blankPuzzle = el.classList.contains('puz_blank');
if(blankPuzzle){
    el.innerHTML = `<span></span>`;
    el.setAttribute('style',`order: 16`)
}else{
    const order = randomOrder.pop();
    const elemNum = randomEe.pop()
    el.innerHTML = `<span>${elemNum}</span>`;
    el.setAttribute('style',`order: ${order}`)
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

function movesCounter() {
    const counter = document.querySelector('#moves_count');
    counter.innerText = movesCount;
}

const movePuzzle = (event) => {
    const targetElOrder = getOrder(event.target) ? getOrder(event.target) : getOrder(event.target.parentElement)

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
        elemClick.setAttribute('style', `order: ${moveToIndex}`);
        blankElement.setAttribute('style', `order: ${targetElOrder}`);
        movesCount +=1;
        movesCounter();
    }
    
    puzzle.forEach(el => {
        const elPos = getOrder(el);
        const elNum = parseInt(el.textContent)
        if(elPos === elNum) {
            el.classList.add('puz--bordered');
        }
        if(elPos !== elNum) {
            el.classList.remove('puz--bordered');
        }
    });

    
}



buttonNewGame.addEventListener('click', newGame)

puzzle.forEach(el => el.addEventListener('click', movePuzzle))

