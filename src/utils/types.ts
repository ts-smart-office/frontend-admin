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

export interface IDetailsReservation {
	id: string
	date: string
	type: string
	total_persons: number
	room_price: number
	total_price: number
	optional_message: string | null
	status: string
	status_message: string | null
	proof_of_payment_url: string | null
	created_at: string
	updated_at: string
	user: User
	room: Room
	foods: IFood[]
}
