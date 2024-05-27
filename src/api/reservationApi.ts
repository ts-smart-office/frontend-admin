import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'

export const apiReservations = (params?: string) => {
	if (params) {
		return axiosInstance.get(`/api/admin/reservations?filter=${params}`, {
			headers: {
				accept: 'application/json',
			},
		})
	}

	return axiosInstance.get('/api/admin/reservations', {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiDetailsReservation = (id: string) => {
	return axiosInstance.get(`/api/admin/reservations/${id}`, {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiUpdateStatus = (id: string, data: any) => {
	return axiosInstance.post(`/api/admin/reservations/${id}`, data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
