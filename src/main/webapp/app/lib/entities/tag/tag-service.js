import { serverUrl } from '$lib/utils/env'
import { request } from '$lib/utils/request'
export default {
	create: entity =>
		request(`${serverUrl}api/tags`, 'POST', JSON.stringify(entity), {
			'Content-Type': 'application/json',
		}),
	findAll: (page, size, sortPredicate, sortOrder) => {
		const defaultSort = sortPredicate !== 'id' ? '&sort=id,asc' : ''
		const queryString = `page=${
			page - 1
		}&size=${size}&sort=${sortPredicate},${sortOrder}${defaultSort}`
		return request(`${serverUrl}api/tags?${queryString}`)
	},
	findById: id => request(`${serverUrl}api/tags/${id}`),
	search: (criteria, page, size, sortPredicate, sortOrder) => {
		const defaultSort = sortPredicate !== 'id' ? '&sort=id,asc' : ''
		const queryString = `page=${
			page - 1
		}&size=${size}&sort=${sortPredicate},${sortOrder}${defaultSort}`
		return request(
			`${serverUrl}api/_search/tags?query=${criteria}&${queryString}`
		)
	},
	update: entity =>
		request(`${serverUrl}api/tags`, 'PUT', JSON.stringify(entity), {
			'Content-Type': 'application/json',
		}),
	delete: id => request(`${serverUrl}api/tags/${id}`, 'DELETE'),
}
