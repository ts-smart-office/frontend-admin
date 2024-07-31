import { axiosInstance } from '@/lib/axios'
import { getCookie } from '@/lib/utils'
import { IReviewReservationParams } from '@/utils/types'

export const apiReservations = ({
	status = [],
	role,
}: {
	status?: string[]
	role?: string
}) => {
	const params: Record<string, string | string[]> = {}

	if (status.length > 0) {
		params.status = status.join(',')
	}

	if (role) {
		params.role = role
	}

	return axiosInstance.get('/api/admin/reservations', {
		headers: {
			accept: 'application/json',
		},
		params: params,
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

export const apiDashboardOverview = () => {
	return axiosInstance.get(`/api/admin/dashboard-overview`, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
	})
}

export const apiReviews = ({
	rating,
	minDate,
	maxDate,
	sortBy,
}: IReviewReservationParams) => {
	const params: IReviewReservationParams = {}

	if (rating) {
		params.rating = rating
	}

	if (minDate) {
		params.minDate = minDate
	}

	if (maxDate) {
		params.maxDate = maxDate
	}

	if (sortBy) {
		params.sortBy = sortBy
	}

	return axiosInstance.get(`/api/admin/reviews`, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
		params: params,
	})
}

export const apiReviewOverview = ({
	minDate,
	maxDate,
}: {
	minDate?: string
	maxDate?: string
} = {}) => {
	const params = {} as Record<string, string>

	if (minDate) {
		params.minDate = minDate
	}

	if (maxDate) {
		params.maxDate = maxDate
	}

	return axiosInstance.get(`/api/admin/reviews/overview`, {
		headers: {
			accept: 'application/json',
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		},
		params: params,
	})
}
