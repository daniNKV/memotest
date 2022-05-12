
const DOM = {
    $cardTemplate : document.getElementById('card'),
    $table : document.getElementById('table'),
    $movesCounter : document.getElementById('attempts-counter')
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

    initRound(shuffle(createColors(config)), colorsAvailable = config.cardsAmount / 2)
}

function updateCounter() {
    const getCount = Number(DOM.$movesCounter.textContent) + 1
    DOM.$movesCounter.textContent = getCount.toString()


}


function initRound(solution){
    let cardsLeft = solution.filter(color => color !== 'founded').length

    if (cardsLeft > 0) {
        enableInput(getFirstInput, solution)
    }
    else {
        alert('You win!')
    }

}

function getFirstInput(solution) {
    return e => {
        revealCard(solution[e.target.id], e.target)
        captureInput(e.target.id, solution)} 
}


function captureInput(firstClick, solution){
    const getNextInput = (solution) => (e) => {
        revealCard(solution[e.target.id], e.target)
        compareClicks(firstClick, e.target.id, solution)
    }
    
    enableInput(getNextInput, solution)
}



function compareClicks(first, second, solution) {
    updateCounter()

    if (solution[first] === solution[second]) {
        const newSolution = solution.map(color => color === solution[first] ? color = 'founded' : color )
        blockPair(first, second)
        initRound(newSolution)
    }
    else  {
        hidePair(first, second)
        initRound(solution)
    }
}

function enableInput(fn, data) {
    document.querySelectorAll('.card-front').forEach($card => {
        $card.classList.contains('win') ? '' : $card.onclick = fn(data)
    })
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

