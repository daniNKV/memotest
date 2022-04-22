let $cards = document.querySelectorAll('.card')

$cards[0].addEventListener('click', e => e.target.parentNode.classList.toggle('show'))
console.log($cards)

