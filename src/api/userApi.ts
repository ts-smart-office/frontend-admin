import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'

export const apiUsers = () => {
	return axiosInstance.get('/api/admin/users', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiUsersAdmin = () => {
	return axiosInstance.get('/api/admin/admins', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiCreateUserAdmin = (data: any) => {
	return axiosInstance.post('/api/admin/create-admin', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiUpdateUserRole = (id: string, data: any) => {
	return axiosInstance.post(`/api/admin/change-role/${id}`, data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiGetSettings = () => {
	return axiosInstance.get('/api/admin/settings', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiUpdateSettings = (data: any) => {
	return axiosInstance.post('/api/admin/settings', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
