describe('Tag list page', () => {
	let randomPrefix
	let dynamicId
	let randomPrefix2
	let dynamicId2
	beforeEach(() => {
		cy.unregisterServiceWorkers()
		cy.loginByApi(
			Cypress.env('adminUsername'),
			Cypress.env('adminPassword')
		)
		// create another Tag to test sort implementation
		randomPrefix2 = 'zest' + new Date().getTime()
		cy.save('api/tags', {
			name: randomPrefix2,
		}).then(res => {
			dynamicId2 = res.id
		})
		randomPrefix = 'test' + new Date().getTime()
		cy.save('api/tags', {
			name: randomPrefix,
		}).then(res => {
			dynamicId = res.id
			cy.intercept('**/api/tags*').as('getTags')
			cy.visit('/entities/tag')
			cy.wait('@getTags')
			// eslint-disable-next-line
			cy.wait(100)
		})
	})

	afterEach(() => {
		cy.delete(`api/tags/${dynamicId}`)
		cy.delete(`api/tags/${dynamicId2}`)
	})

	it('should greets with Tag page title', () => {
		cy.getBySel('tagTitle').should('be.visible').should('contain', 'Tags')
	})

	it('should display Tag table', () => {
		cy.getBySel('tagTable').should('be.visible').get('tr').eq(0).children()
	})

	it('should display Tag record in the table', () => {
		cy.getBySel('tagTable')
			.get('tbody tr')
			.eq(0)
			.within($tr => {
				cy.root()
			})
	})

	it('should validate the pagination controls', () => {
		cy.getBySel('pageCtrl')
			.eq(0)
			.contains('div', /1-\d+ of \d+/)
			.next()
			.within($div => {
				cy.root()
					.getBySel('prevPageCtrl')
					.should('be.disabled')
					.get('div')
					.should('have.text', '1')
					.getBySel('nextPageCtrl')
					.should('be.disabled')
			})
	})

	it('should sort the records by Id field', () => {
		let valueBeforeSort

		cy.getBySel('tagTable')
			.get('tbody>tr')
			.eq(0)
			.within($tr => {
				cy.root()
					.get('td')
					.eq(0)
					.invoke('text')
					.then(text => (valueBeforeSort = text))
			})

		cy.intercept('**/api/tags?*').as('getTags')

		cy.getBySel('tagTable')
			.get('tr')
			.eq(0)
			.within($tr => {
				cy.root()
					.get('th')
					.eq(0)
					.within($td => {
						cy.root().get('button').click()
					})
			})

		cy.wait('@getTags')

		// eslint-disable-next-line
		cy.wait(100)

		cy.getBySel('tagTable')
			.get('tbody>tr')
			.eq(0)
			.within($tr => {
				cy.root()
					.get('td')
					.eq(0)
					.invoke('text')
					.then(text => {
						expect(text).not.eq(valueBeforeSort)
					})
			})
	})
})
