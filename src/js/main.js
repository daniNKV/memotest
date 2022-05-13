
const DOM = {
    $cardTemplate : document.getElementById('card'),
    $table : document.getElementById('table'),
    $movesCounter : document.getElementById('attempts-counter'),
    $modal : document.getElementById('modal'),
    $movesDisplay : document.getElementById('moves-made'),
    $restartBtn : document.getElementById('restart')
}   

const config = {
    colors : {
        'red' : 'bg-red-600',
        'pink' : 'bg-pink-300' ,
        'green' : 'bg-green-600',
        'blue' : 'bg-blue-600' ,
        'orange' : 'bg-orange-300', 
        'purple' : 'bg-purple-600'
    },

    cardsAmount : 12,
 
}

document.addEventListener('DOMContentLoaded', () => initGame())
 

function initGame() {
    placeCards(config.cardsAmount)

    initRound(shuffle(createColors(config)))
}

function initRound(solution){
    let cardsLeft = solution.filter(color => color !== 'founded').length

    if (cardsLeft > 0) {
        enableInput(getInput, solution)
    }
    else {
        endGame()
    }

}
function endGame() {
    setTimeout(() => {
        DOM.$modal.classList.toggle('hidden')
        DOM.$movesDisplay.textContent= document.getElementById('attempts-counter').textContent + ' '
        DOM.$restartBtn.onclick = restartGame
    }, 300);
}

function restartGame() {
    DOM.$movesCounter.textContent = '0'
    DOM.$modal.classList.toggle('hidden')
    deleteCards(DOM.$table)
    initGame()
}
function deleteCards(parent){
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function getInput(solution) {
    return e => {
        revealCard(solution[e.target.id], e.target)
        captureFirst(e.target.id, solution)} 
}

function captureFirst(firstClick, solution){
    const handleInputs = (solution) => (e) => {
        revealCard(solution[e.target.id], e.target)
        compareClicks(firstClick, e.target.id, solution)
    }
    
    enableInput(handleInputs, solution)
}



function compareClicks(first, second, solution) {
    updateCounter()

    if (solution[first] === solution[second]) {
        blockPair(first, second)
        initRound(updateSolution(solution, first))
    }
    else  {
        hidePair(first, second)
        initRound(solution)
    }


}

function updateSolution(round, actual){
    return round.map(color => color === round[actual] ? color = 'founded' : color )
}

function enableInput(fn, data) {
    document.querySelectorAll('.card-front').forEach($card => {
        $card.classList.contains('win') ? '' : $card.onclick = fn(data)
    })
}


function updateCounter() {
    const getNewCount = Number(DOM.$movesCounter.textContent) + 1
    DOM.$movesCounter.textContent = getNewCount.toString()

}

function shuffle(arrayToShuffle) {
    let array = arrayToShuffle
    let n = array.length;
    for (let i = n - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}


function createColors(config) {
    const {colors, cardsAmount} = config

    return createColorList(colors, cardsAmount)
}


function createColorList(colorsObj, amount) { 
    return Object.keys(colorsObj).slice(0, amount).concat(Object.keys(colorsObj))
}

function placeCards(amount, parent = DOM.$table) {
    for(let i = 0 ; i < amount ; i++) {
        parent.appendChild(createCard(DOM.$cardTemplate, i))
    }

    return Array.from(document.querySelectorAll('.card-inner'))
}

function createCard(template, id) {
    let $card = template.content.firstElementChild.cloneNode(true)

    $card.children[0].children[0].id = `${ id }`

    return $card
}

function revealCard(color, card){
    card.parentNode.classList.toggle('show')
    card.nextElementSibling.classList.add(config.colors[color])
}

function hidePair(card1, card2) {
    setTimeout(() => {
        document.getElementById(`${card1}`).parentNode.classList.toggle('show')
        document.getElementById(`${card2}`).parentNode.classList.toggle('show')
    }, 1000)    

}

function blockPair(card1, card2) {
    document.getElementById(`${card1}`).parentNode.classList.add('win')
    document.getElementById(`${card2}`).parentNode.classList.add('win')
}

// function getInput(solution) {
//     return e => processInput(e, solution, getNextInput(e.target.id, solution))

// }
// function getNextInput(firstClick, solution){
//     const getNextInput = (solution) => (e) => processInput(e, solution, compareClicks(firstClick, e.target.id, solution))

//     enableInput(getNextInput, solution)
// }
// function processInput(click, solution, fn){
//     revealCard(solution[click.target.id], click.target)

//     return fn
// }
