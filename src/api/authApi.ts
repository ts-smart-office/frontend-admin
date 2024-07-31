import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'
import { signinSchema } from '@/utils/form-schema'
import { z } from 'zod'

export const apiCsrfToken = async () => {
	await axiosInstance.get('/sanctum/csrf-cookie')
}

export const apiLoginAdmin = (data: z.infer<typeof signinSchema>) => {
	return axiosInstance.post('/api/admin/session', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiLogout = () => {
	return axiosInstance.delete('/api/admin/session', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
