describe('Gameplay Test', () => {
	
	
	it('loads', () => {
		cy.visit('http://192.168.0.228:8080/')
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
		const solution = ["red", "pink", "red", "purple", "orange", "pink", "orange", "blue", "green", "purple", "green", "blue"]

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
				cy.get('#table').find('.card-front').filter('.founded').should('have.length', 2	)
				cy.get('#table').find('card-back').should('have.length', 2)
			})
			})
	})

	
})