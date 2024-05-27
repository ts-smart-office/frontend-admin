import { axiosInstance } from '@/lib/axios'

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
