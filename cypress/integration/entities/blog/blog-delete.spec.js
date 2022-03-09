describe('Blog delete dialog page', () => {
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
		})

		cy.visit('/entities/blog')

		cy.getBySel('blogTable')
			.contains('td', randomPrefix)
			.parent()
			.trigger('mouseenter')
			.within($tr => {
				cy.root()
					.get('td')
					.children()
					.getByName('deleteBlogBtn')
					.click()
			})
	})

	afterEach(() => {
		cy.delete(`api/blogs/${dynamicId}`, true)
	})

	it('should display delete Blog dialog', () => {
		cy.getBySel('svlModal').within(() => {
			cy.root()
				.get('h1')
				.should('be.visible')
				.should('contain', 'Confirm delete operation')
				.get('p')
				.should('be.visible')
				.should('contain', 'Are you sure you want to delete the Blog?')
				.getByName('deleteBlogBtn')
				.should('not.be.disabled')
				.getByName('cancelBtn')
				.should('not.be.disabled')
		})
	})

	it('should close the dialog without deleting Blog', () => {
		cy.getBySel('svlModal').within(() => cy.getByName('cancelBtn').click())
		cy.getBySel('blogTitle').should('be.visible').should('contain', 'Blogs')
	})

	it('should delete the Blog', () => {
		cy.getBySel('svlModal').within(() =>
			cy.getByName('deleteBlogBtn').click()
		)

		cy.getBySel('toast-success').contains(
			'A blog is deleted with identifier'
		)

		cy.getBySel('blogTitle').should('be.visible').should('contain', 'Blogs')
	})
})
