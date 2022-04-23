
const DOM = {
    cardTemplate : document.getElementById('card'),
    table : document.getElementById('table')


}
const config = {
    colors : {
        'red' : '',
        'yellow' : '' ,
        'green' : '',
        'blue' : '' ,
        'orange' : '', 
        'pink' : ''
    },

    cardsAmount : 12,
 
}

function initRound(config) {
    const colorsLocation = shuffle(createColors(config))
}

initRound(config)



function shuffle(arrayToShuffle, n) {
    let array = arrayToShuffle

    for (let i = n - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return arrayToShuffle
    
}


function createColors(config) {
    const {colors, cardsAmount} = config

    return createColorList(colors, cardsAmount)
}


function createColorList(colorsObj, amount) { 
    const colors =  Object.keys(colorsObj)
    return colors.slice(0, amount).concat(colors)
}




document.addEventListener('DOMContentLoaded', () => placeCards(config.cardsAmount))

function placeCards(acc, parent = DOM.table) {
    for(let i = 0 ; i <= acc ; i++) {
        parent.appendChild(createCard(DOM.cardTemplate, i))
    }

}

function createCard(template, id) {
    let $card = template.content.firstElementChild.cloneNode(true)

    $card.id = `${ id }`

    return $card
}



