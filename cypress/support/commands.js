// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('unregisterServiceWorkers', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.getRegistrations()
			.then(registrations =>
				registrations.forEach(reg => reg.unregister())
			)
	}
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
	return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('getByName', selector => {
	return cy.get(`[name=${selector}]`)
})
Cypress.Commands.add('loginByApi', (username, password) => {
	cy.request({
		method: 'POST',
		url: `api/authenticate`,
		body: {
			username: username,
			password: password,
			'remember-me': false,
		},
	})
		.then(res => {
			expect(res.status).to.eq(200)
			localStorage.setItem('authToken', res.body.id_token)
			return cy.request({
				url: `api/account`,
				headers: {
					Authorization: `Bearer ${res.body.id_token}`,
				},
			})
		})
		.then(res => {
			expect(res.status).to.eq(200)
		})
})

Cypress.Commands.add('save', (url, body, status = 201) => {
	cy.request({
		method: 'POST',
		url: url,
		form: false,
		headers: {
			Authorization: `Bearer ${
				localStorage.getItem('authToken') ||
				sessionStorage.getItem('authToken')
			}`,
			'Content-Type': 'application/json',
		},
		body: body,
	}).then(res => {
		expect(res.status).to.eq(status)
		return cy.wrap(res.body)
	})
})

Cypress.Commands.add('delete', (url, lenient = true) => {
	cy.request({
		method: 'DELETE',
		url: url,
		headers: {
			Authorization: `Bearer ${
				localStorage.getItem('authToken') ||
				sessionStorage.getItem('authToken')
			}`,
		},
		failOnStatusCode: lenient ? false : true,
	}).then(res => {
		if (!lenient) {
			expect(res.status).to.eq(204)
		}
	})
})
