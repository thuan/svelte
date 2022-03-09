describe('Tag view details page', () => {
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
			cy.visit(`/entities/tag/${dynamicId}/view`)
		})
	})

	afterEach(() => {
		cy.delete(`api/tags/${dynamicId}`)
	})

	it('should display Tag details', () => {
		cy.getBySel('tagTitle')
			.should('be.visible')
			.and('contain', `Tag Details`)

		cy.get('div.table').within(() => {
			cy.root().get('.table-cell').should('have.length', 2)
		})
	})

	it('should navigate back to the Tag list page', () => {
		cy.getByName('backBtn').click()
		cy.getBySel('tagTitle').should('be.visible').should('contain', 'Tags')
	})
})
