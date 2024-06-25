export interface IFoodItem {
	id: number
	name: string
}

interface User {
	id: string
	name: string
	email: string
	email_verified_at: string | null
	two_factor_secret: string | null
	two_factor_recovery_codes: string | null
	created_at: string
	updated_at: string
	phone: string
	company: string
}

interface Room {
	id: number
	name: string
	max_capacity: number
	description: string
	reservation_lead_time: number
}

export interface IFood {
	id: string
	name: string
	category: 'snack' | 'lunch'
	price: number
	items: IFoodItem[]
}

export interface IBodyFood {
	name: string
	category: string
	price: number
	items: string[]
}

export interface IDetailsReservation {
	id: string
	type_name: string
	date: string
	start_time: string
	end_time: string
	price: number
	pricing_unit: string
	total_persons: number
	total_price: number
	optional_message: string
	status: string
	status_message: string | null
	proof_of_payment_url: string | null
	created_at: string
	updated_at: string
	user: {
		id: string
		name: string
		email: string
		phone: string
		company: string
	}
	room: {
		id: number
		name: string
	}
	foods: {
		id: string
		name: string
		category: string
		price: number
		items: {
			id: string
			name: string
		}[]
	}[]
	review: null
}

interface IFacility {
	id: number
	name: string
}

interface IPrice {
	id: number
	type: string
	price: number
	created_at: string
	updated_at: string
}

interface ReservationType {
	id: number
	name: string
	start_time: string
	end_time: string
}

interface IReservationOption {
	id: number
	reservation_type: ReservationType
	price: number
	pricing_unit: string
}

export interface IAllRoom {
	id: number
	name: string
	max_capacity: number
	description: string
	reservation_lead_time: number
	facilities: IFacility[]
	reservation_options: IReservationOption[]
	image_urls: string[]
	created_at: string
	updated_at: string
	reserved_dates: string[]
}

export enum PriceType {
	HALFDAY = 'halfday',
	FULLDAY = 'fullday',
	PODCAST_STREAMING = 'podcastStreaming',
	PODCAST_RECORDING = 'podcastRecording',
}

interface ICreatePrice {
	type: PriceType
	price: number
}

export interface ICreateRoom {
	name: string
	max_capacity: number
	description: string
	reservation_lead_time: number
	facilities: IFacility[]
	prices: IReservationOption[]
}

export interface IDashboardOverview {
	total_incoming_reservations: number
	total_approved_reservations: number
	total_completed_reservations: number
	total_reservations: number
	total_users_all_time: number
	total_new_users: number
	upcoming_reservations: {
		id: string
		type_name: string
		date: string
		start_time: string
		end_time: string
		price: number
		pricing_unit: string
		total_persons: number
		room_discount: number
		food_discount: number
		optional_message: string | null
		status: string
		status_message: string | null
		proof_of_payment_url: string | null
		user: {
			id: string
			name: string
			email: string
			phone: string
			company: string
		}
		room: { id: number; name: string }
		created_at: string
		updated_at: string
		expires_at: string
	}[]
	reviews: any[]
	posts: any[]
	total_posts: number
	dates_with_reservations_all_time: string[]
}

export interface IReviewReservationParams {
	rating?: string
	minDate?: string
	maxDate?: string
	sortBy?: string
}
