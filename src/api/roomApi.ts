import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'

export const apiRooms = () => {
	return axiosInstance.get('/api/admin/rooms', {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiCreateRoom = (data: any) => {
	return axiosInstance.post('/api/admin/rooms', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiEditRoom = (data: any, id: string) => {
	return axiosInstance.post(`/api/admin/rooms/${id}`, data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiUploadImagesRoom = (data: any, id: string) => {
	return axiosInstance.post(`/api/admin/rooms/${id}/images`, data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiDetailsRoom = (id: string) => {
	return axiosInstance.get(`/api/admin/rooms/${id}`, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
