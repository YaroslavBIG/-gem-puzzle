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


const randomEe = randomArr(sizeGame);
const randomOrder = randomArr(sizeGame);
const pushElement = (el) => {
    console.log(randomEe, randomOrder)
    const blankPuzzle = el.classList.contains('puz_blank');
    const order = randomOrder.pop();
    if(!blankPuzzle){
        el.innerHTML = `<span>${randomEe.pop()}</span>`;
        el.setAttribute('style',`order: ${order}`)
    }
    else {
        el.innerHTML = `<span></span>`;
        el.setAttribute('style',`order: ${order}`)
    }
};

puzzle.forEach(el => {pushElement(el)});

const movePuzzle = () => {

}

puzzle.forEach(el => el.addEventListener('click', movePuzzle()))