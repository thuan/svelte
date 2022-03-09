describe('Blog view details page', () => {
	let randomPrefix
	let dynamicId

	beforeEach(() => {
		cy.unregisterServiceWorkers()
		randomPrefix = 'test' + new Date().getTime()
		cy.loginByApi(
			Cypress.env('adminUsername'),
			Cypress.env('adminPassword')
		)

		cy.save('api/blogs', {
			name: randomPrefix,
			handle: randomPrefix,
		}).then(res => {
			dynamicId = res.id
			cy.visit(`/entities/blog/${dynamicId}/view`)
		})
	})

	afterEach(() => {
		cy.delete(`api/blogs/${dynamicId}`)
	})

	it('should display Blog details', () => {
		cy.getBySel('blogTitle')
			.should('be.visible')
			.and('contain', `Blog Details`)

		cy.get('div.table').within(() => {
			cy.root().get('.table-cell').should('have.length', 4)
		})
	})

	it('should navigate back to the Blog list page', () => {
		cy.getByName('backBtn').click()
		cy.getBySel('blogTitle').should('be.visible').should('contain', 'Blogs')
	})
})
