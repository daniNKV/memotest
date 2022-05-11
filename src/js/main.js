
const DOM = {
    cardTemplate : document.getElementById('card'),
    table : document.getElementById('table'),
}   


const config = {
    colors : {
        'red' : 'bg-red-600',
        'yellow' : 'bg-yellow-600' ,
        'green' : 'bg-green-600',
        'blue' : 'bg-blue-600' ,
        'orange' : 'bg-orange-600', 
        'purple' : 'bg-purple-600'
    },

    cardsAmount : 12,
 
}

document.addEventListener('DOMContentLoaded', () => initGame())
 

function initGame() {
    placeCards(config.cardsAmount)

    initRound(shuffle(createColors(config)), n = config.cardsAmount)
    

    // elements.forEach(card => card.addEventListener('click', e => verifyPair(e, solution, elements)))
    // DOM.table.addEventListener('click', e => e.target != DOM.table ? console.log(e.target.parentNode.id) : '')
}
function getInput(solution) {
    return e => {
        paintCard(solution[e.target.id], e.target)
        captureInput(e.target.id, solution)} 
}

function paintCard(color, card){
    card.nextElementSibling.classList.toggle(config.colors[color])
}

function captureInput(firstClick, solution){
    const getNextInput = (solution) => (e) => {
        paintCard(solution[e.target.id], e.target)
        compareClicks(firstClick, e.target.id, solution)
    }
    
    enableInput(getNextInput, solution)

    console.log('f', firstClick)
}

function compareClicks(first, second, solution) {
    if (solution[first] === solution[second]) {
        console.log('true')
    }
    else 
        console.log('false')
}

function initRound(solution, colorsLeft){
    if (colorsLeft > 0) {
        enableInput(getInput, solution)
    }
    // const compareClicks = (secondClick) => {

    // }

}


// const var1 = comparar(2)
// const var2 = var1(4)

// console.log(var2)

function enableInput(fn, data) {
    // elements.forEach(card => card.addEventListener('click', e => fn(e)))
   // DOM.table.addEventListener('click', e => e.target !== DOM.table ? fn(e) : '')
   DOM.table.onclick = fn(data)
}

function disableInput(fn) {
    // elements.forEach(card => card.removeEventListener('click', fn))
   // DOM.table.removeEventListener('click', fn)
    DOM.table.onclick = fn

}

function shuffle(arrayToShuffle, n) {
    let array = arrayToShuffle

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

function placeCards(amount, parent = DOM.table) {
    for(let i = 0 ; i < amount ; i++) {
        parent.appendChild(createCard(DOM.cardTemplate, i))
    }

    return Array.from(document.querySelectorAll('.card-inner'))
}

function createCard(template, id) {
    let $card = template.content.firstElementChild.cloneNode(true)

    $card.children[0].children[0].id = `${ id }`
    $card.onclick = (e) => e.target.parentNode.classList.toggle('show')

    return $card
}




