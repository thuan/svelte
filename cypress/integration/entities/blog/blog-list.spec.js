describe('Blog list page', () => {
	let randomPrefix
	let dynamicId
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(
			Cypress.env('adminUsername'),
			Cypress.env('adminPassword')
		)
		randomPrefix = 'test' + new Date().getTime()
		cy.save('api/blogs', {
			name: randomPrefix,
			handle: randomPrefix,
		}).then(res => {
			dynamicId = res.id
			cy.intercept('**/api/blogs*').as('getBlogs')
			cy.visit('/entities/blog')
			cy.wait('@getBlogs')
			// eslint-disable-next-line
			cy.wait(100)
		})
	})

	afterEach(() => {
		cy.delete(`api/blogs/${dynamicId}`)
	})

	it('should greets with Blog page title', () => {
		cy.getBySel('blogTitle').should('be.visible').should('contain', 'Blogs')
	})

	it('should display Blog table', () => {
		cy.getBySel('blogTable').should('be.visible').get('tr').eq(0).children()
	})

	it('should display Blog record in the table', () => {
		cy.getBySel('blogTable')
			.get('tbody tr')
			.eq(0)
			.within($tr => {
				cy.root()
			})
	})
})
