describe('Tag delete dialog page', () => {
	let randomPrefix
	let dynamicId

	beforeEach(() => {
		cy.unregisterServiceWorkers()
		randomPrefix = 'test' + new Date().getTime()
		cy.loginByApi(
			Cypress.env('adminUsername'),
			Cypress.env('adminPassword')
		)

		cy.save('api/tags', {
			name: randomPrefix,
		}).then(res => {
			dynamicId = res.id
		})

		cy.visit('/entities/tag')

		cy.getBySel('tagTable')
			.contains('td', randomPrefix)
			.parent()
			.trigger('mouseenter')
			.within($tr => {
				cy.root().get('td').children().getByName('deleteTagBtn').click()
			})
	})

	afterEach(() => {
		cy.delete(`api/tags/${dynamicId}`, true)
	})

	it('should display delete Tag dialog', () => {
		cy.getBySel('svlModal').within(() => {
			cy.root()
				.get('h1')
				.should('be.visible')
				.should('contain', 'Confirm delete operation')
				.get('p')
				.should('be.visible')
				.should('contain', 'Are you sure you want to delete the Tag?')
				.getByName('deleteTagBtn')
				.should('not.be.disabled')
				.getByName('cancelBtn')
				.should('not.be.disabled')
		})
	})

	it('should close the dialog without deleting Tag', () => {
		cy.getBySel('svlModal').within(() => cy.getByName('cancelBtn').click())
		cy.getBySel('tagTitle').should('be.visible').should('contain', 'Tags')
	})

	it('should delete the Tag', () => {
		cy.getBySel('svlModal').within(() =>
			cy.getByName('deleteTagBtn').click()
		)

		cy.getBySel('toast-success').contains(
			'A tag is deleted with identifier'
		)

		cy.getBySel('tagTitle').should('be.visible').should('contain', 'Tags')
	})
})
