import { axiosInstance } from '@/lib/axios'

export const apiRooms = () => {
	return axiosInstance.get('/api/admin/rooms', {
		headers: {
			accept: 'application/json',
		},
	})
}
