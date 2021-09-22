import { writable } from 'svelte/store'
import authService from './auth-service'

const userStore = writable(undefined)

export default {
	subscribe: userStore.subscribe,
	storeToken: (authToken, rememberMe) => {
		if (rememberMe) {
			localStorage.setItem('authToken', authToken)
		} else {
			sessionStorage.setItem('authToken', authToken)
		}
		return Promise.resolve()
	},
	loadUser: () => {
		return authService
			.fetchAuthenticatedUserDetails()
			.then(response => {
				userStore.set(response)
				return Promise.resolve()
			})
			.catch(err => {
				// ignore error
				return Promise.resolve()
			})
	},
	loadUserIfAuthenticated: () => {
		return authService
			.fetchAuthenticatedUsername()
			.then(response => {
				if (response) {
					return authService.fetchAuthenticatedUserDetails()
				}
				return Promise.reject()
			})
			.then(response => {
				userStore.set(response)
				return Promise.resolve()
			})
			.catch(err => {
				// ignore error
				return Promise.resolve()
			})
	},
	logout: () => {
		userStore.set(undefined)
		localStorage.removeItem('authToken')
		sessionStorage.removeItem('authToken')
	},
}
