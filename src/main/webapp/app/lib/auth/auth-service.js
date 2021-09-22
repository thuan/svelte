import { serverUrl } from '$lib/utils/env'
import { request } from '$lib/utils/request'

export default {
	fetchAuthenticatedUsername: () =>
		request(`${serverUrl}api/authenticate`, 'GET', undefined, {}, false),
	fetchAuthenticatedUserDetails: () => request(`${serverUrl}api/account`),
	login: (username, password, rememberMe) => {
		const body = JSON.stringify({ username, password, rememberMe })

		return request(`${serverUrl}api/authenticate`, 'POST', body, {
			'Content-Type': 'application/json',
		})
	},
}
