import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'
import { IBodyFood } from '@/utils/types'

export const apiFoods = () => {
	return axiosInstance.get('/api/admin/foods', {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiDetailsFood = (id: string) => {
	return axiosInstance.get(`/api/admin/foods/${id}`, {
		headers: {
			accept: 'application/json',
		},
	})
}

export const apiCreateFood = (data: IBodyFood) => {
	return axiosInstance.post('/api/admin/foods', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
