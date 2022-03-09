import { serverUrl } from '$lib/utils/env'
import { request } from '$lib/utils/request'
export default {
	create: entity =>
		request(`${serverUrl}api/blogs`, 'POST', JSON.stringify(entity), {
			'Content-Type': 'application/json',
		}),
	findAll: () => {
		return request(`${serverUrl}api/blogs`)
	},
	findById: id => request(`${serverUrl}api/blogs/${id}`),
	search: criteria => {
		return request(`${serverUrl}api/_search/blogs?query=${criteria}`)
	},
	update: entity =>
		request(`${serverUrl}api/blogs`, 'PUT', JSON.stringify(entity), {
			'Content-Type': 'application/json',
		}),
	delete: id => request(`${serverUrl}api/blogs/${id}`, 'DELETE'),
}
