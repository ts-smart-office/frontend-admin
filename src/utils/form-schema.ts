import { z } from 'zod'

export const createAdminSchema = z.object({
	name: z.string({ required_error: 'Please enter admin name' }),
	role_id: z.string({ required_error: 'Please select admin role' }),
	email: z
		.string({ required_error: 'Please enter admin name' })
		.email({ message: 'Email not valid' }),
	phone: z
		.string()
		.min(12, { message: 'Phone number must be at least 12 numbers' })
		.optional(),
	company: z.string(),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 charters' }),
})

export const signinSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 charters' }),
})

export const STATUS = [
	'waitingForPayment',
	'paid',
	'approved',
	'expired',
	'canceledByUser',
	'declined',
	'completed',
] as const

export const updateReservationSchema = z.object({
	status: z.enum(STATUS),
})

export const addFoodSchema = z.object({
	name: z.string({ required_error: 'Please enter food name' }),
	category: z.enum(['snack', 'lunch']),
	price: z.string().refine(val => !Number.isNaN(parseInt(val, 10))),
	items: z.array(
		z.object({
			id: z.number().optional(),
			name: z.string({ required_error: 'Please add item of food' }),
		}),
		{ required_error: 'Please add item of food' }
	),
})

const priceType = z.enum([
	'fullday',
	'halfday',
	'podcastStreaming',
	'podcastRecording',
])

export const addRoomSchema = z.object({
	name: z.string(),
	max_capacity: z.string().refine(val => !Number.isNaN(parseInt(val, 10))),
	description: z.string(),
	reservation_lead_time: z
		.string()
		.refine(val => !Number.isNaN(parseInt(val, 10))),
	facilities: z.array(
		z.object({
			id: z.number().optional(),
			name: z.string({ required_error: 'Please add facilities of room' }),
		}),
		{ required_error: 'Please add facilities of food' }
	),
	prices: z.array(
		z.object({
			id: z.number().optional(),
			reservation_type: z.object({
				id: z.number().optional(),
				name: z.string(),
				start_time: z.string().optional(),
				end_time: z.string().optional(),
			}),
			price: z
				.number()
				.min(4, { message: 'Price must be minimum 4 characters' }),
			pricing_unit: z.string(),
		})
	),
})

export const uploadImagesRoom = z.object({
	attachment: z.any(),
})
