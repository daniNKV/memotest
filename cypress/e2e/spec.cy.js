describe('Gameplay Test', () => {
	
	
	it('loads', () => {
		cy.visit('http://127.0.0.1:5500/index.html')
	})
	
	describe('UI', () => {
		it('Table exists', () => {
			cy.get('#table').as('table').children().should('have.length', 13)
		})
		it('Move counter exists', () => {
			cy.get('#counter').should('contain', 'Moves: 0')
		})
	})
	
	
	describe('Walktrough', () => {
		//const solution = [[0,2], [1,5], [3,9], [4,6], [7,11], [8,10]]
		const cards = [[1,5], [3,9], [4,6], [7,11], [8,10]]

		describe('Wrong pair', () => {
			it('Click first card', () => {
				cy.get('#table').children('.card').find('.card-front').first().click()
				cy.get('.card-back').should('have.class', 'bg-red-600')
			})
			it('Click second card', () => {
				cy.get('#table').children('.card').find('.card-front').as('$card').last().click()
				cy.get('.card-back').should('have.class', 'bg-blue-600')
			})
			it('Table doesnt change', () => {
				cy.get('#table').find('.card-front').filter('.founded').should('have.length', 0)
				cy.get('#table').find('card-back').should('have.length', 0)
			})

			})

		describe('Correct pair', () => {
			it('Click first card', () => {
				cy.get('#table').children('.card').find('.card-front').first().click()
				cy.get('.card-back').should('have.class', 'bg-red-600')
			})
			it('Click second card', () => {
				cy.get('#table').children('.card').find('.card-front').eq(2).click()
				cy.get('.card-back').should('have.class', 'bg-blue-600')
			})
			it('Table change', () => {
				cy.get('#table').find('.card-inner').filter('.win').should('have.length', 2)
			})
			it('Move counter change', () => {
				cy.get('#counter').should('contain', 'Moves: 2')
			})
			})

		describe('Finish game', () => {
			it('Second pair', () => {
				cy.get('#table').children('.card').find('.card-front').eq(cards[0][0]).click()
				cy.get('#table').children('.card').find('.card-front').eq(cards[0][1]).click()

			})
			it('Third pair', () => {
				cy.get('#table').children('.card').find('.card-front').eq(cards[1][0]).click()
				cy.get('#table').children('.card').find('.card-front').eq(cards[1][1]).click()

			})
			it('Fourth pair', () => {
				cy.get('#table').children('.card').find('.card-front').eq(cards[2][0]).click()
				cy.get('#table').children('.card').find('.card-front').eq(cards[2][1]).click()

			})
			it('Fifth pair', () => {
				cy.get('#table').children('.card').find('.card-front').eq(cards[3][0]).click()
				cy.get('#table').children('.card').find('.card-front').eq(cards[3][1]).click()

			})
			it('Sixth pair', () => {
				cy.get('#table').children('.card').find('.card-front').eq(cards[4][0]).click()
				cy.get('#table').children('.card').find('.card-front').eq(cards[4][1]).click()

			})
		})
		describe('Modal at finished game', () => {
			it ('Exists', () => {
				cy.get('#modal')
			})
			it ('Correct moves count', () => {
				cy.get('#moves-made').should('contain', 7)
			})
			it('Exists button for play again', () => {
				cy.get('#restart').should('contain', 'Play Again')
			})
		})
	})

	
})

//    solution: ["red", "pink", "red", "purple", "orange", "pink", "orange", "blue", "green", "purple", "green", "blue"],
