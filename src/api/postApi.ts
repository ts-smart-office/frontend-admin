import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'

export const apiCreatePost = (data: any) => {
	return axiosInstance.post('api/admin/posts', data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiAllPosts = () => {
	return axiosInstance.get('api/admin/posts', {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiPostById = (id: string) => {
	return axiosInstance.get(`api/admin/posts/${id}`, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiDeletePost = (id: string) => {
	return axiosInstance.delete(`/api/admin/posts/${id}`, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiUpdatePost = (data: any, id: string) => {
	return axiosInstance.post(`api/admin/posts/${id}`, data, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}
