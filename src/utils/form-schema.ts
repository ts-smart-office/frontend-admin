import { z } from 'zod'

export const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
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
			type: priceType,
			price: z.number(),
		})
	),
})

export const uploadImagesRoom = z.object({
	attachment: z.any(),
})
