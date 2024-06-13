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
