
const DOM = {
    cardTemplate : document.getElementById('card'),
    table : document.getElementById('table')


}
const config = {
    colors : ['rojo', 'amarillo', 'verde', 'azul', 'magenta', 'violenta'],

    cardsAmount : 12

}


document.addEventListener('DOMContentLoaded', () => placeCards(config.cardsAmount))

function placeCards(acc, parent = DOM.table) {
    for(let i = acc ; i > 0 ; i--) {
        parent.appendChild(createCard(DOM.cardTemplate, i))
    }

}

function createCard(template, id) {
    let $card = template.content.firstElementChild.cloneNode(true)

    $card.id = `${ id }`

    return $card
}



