'use client'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { addRoomSchema } from '@/utils/form-schema'
import TextareaAutosize from 'react-textarea-autosize'
import { apiEditRoom, apiReservationTypes } from '@/api/roomApi'

type TFormEditRoomProps = {
	details: any | null
}

type TTypesProps = {
	id: number
	name: string
	start_time: string
	end_time: string
}

const FormEditRoom: FC<TFormEditRoomProps> = ({ details }) => {
	const { toast } = useToast()
	const [types, setTypes] = useState<TTypesProps[]>([])

	const form = useForm<z.infer<typeof addRoomSchema>>({
		resolver: zodResolver(addRoomSchema),
		mode: 'onChange',
		defaultValues: {
			name: details?.name,
			description: details?.description,
			max_capacity: details?.max_capacity.toString(),
			reservation_lead_time: details?.reservation_lead_time.toString(),
			facilities: details?.facilities.map((item: any) => ({
				name: item.name,
				id: item.id,
			})),
			prices: details?.reservation_options.map((item: any) => ({
				reservation_type: item.reservation_type,
				price: item.price,
				id: item.id,
				pricing_unit: item.pricing_unit,
			})),
		},
	})

	const {
		fields: fieldsFacilty,
		append: appendFacility,
		remove: removeFacility,
	} = useFieldArray({
		control: form.control,
		name: 'facilities',
	})

	const {
		fields: fieldsPrice,
		append: appendPrice,
		remove: removePrice,
	} = useFieldArray({
		control: form.control,
		name: 'prices',
	})

	async function onSubmit(data: z.infer<typeof addRoomSchema>) {
		const initialFacilityIds =
			details?.facilities.map((item: any) => item.id) || []

		const updatedFacilityIds = data.facilities.map(item => item.id)

		const deletedFacilityIds = initialFacilityIds.filter(
			(id: any) => !updatedFacilityIds.includes(id)
		)

		const newFacilities = initialFacilityIds.map((id: any) => ({
			id: id,
			name: deletedFacilityIds.includes(id)
				? null
				: data.facilities.find(f => f.id === id)?.name,
		}))

		data.facilities.forEach(facility => {
			if (!initialFacilityIds.includes(facility.id)) {
				newFacilities.push({
					name: facility.name,
				})
			}
		})

		const bodyEditRoom = {
			description: data.description,
			max_capacity: data.max_capacity,
			name: data.name,
			reservation_lead_time: data.reservation_lead_time,
			facilities: newFacilities,
			reservation_options: data.prices.map((item: any) => ({
				id: item.id,
				reservation_type_id: item.reservation_type.id,
				price: item.price,
				pricing_unit: item.pricing_unit,
			})),
			_method: 'put',
		}

		await apiEditRoom(bodyEditRoom, details.id!)
			.then(res => {
				toast({
					description: res.data.message,
				})
				location.reload()
			})
			.catch(error => {
				if (error.response) {
					toast({
						description: error.response.data.message,
					})
				}
			})
	}

	const fetchReserationTypes = async () => {
		await apiReservationTypes()
			.then(res => {
				setTypes(res.data.data)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchReserationTypes()
	}, [])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='h-full flex flex-col justify-between gap-4 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
			>
				<div className='flex gap-8 rounded-none mb-20'>
					<div className='w-full flex flex-col gap-4 ml-2'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Room name</FormLabel>
									<FormControl>
										<Input
											placeholder='Ex. Meeting Room Exclusive'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex gap-4'>
							<FormField
								control={form.control}
								name='max_capacity'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Max capacity</FormLabel>
										<FormControl>
											<Input type='number' placeholder='Ex. 10' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='reservation_lead_time'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Reservation lead time</FormLabel>
										<FormControl>
											<Input type='number' placeholder='Ex. 2' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div>
							{fieldsFacilty.map((field, index) => (
								<FormField
									control={form.control}
									key={field.id}
									name={`facilities.${index}.name`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className={cn(index !== 0 && 'sr-only')}>
												Room facilities
											</FormLabel>
											<FormControl>
												<div className='flex gap-4 items-center'>
													<Input
														placeholder='Ex. LED TV'
														{...field}
														className='w-full mb-4'
													/>
													<Button
														className='mb-4'
														variant='ghost'
														onClick={() => removeFacility(index)}
													>
														Remove
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
							<Button
								type='button'
								variant='outline'
								onClick={() => appendFacility({ name: '' })}
							>
								Add facility
							</Button>
						</div>
						<div>
							{fieldsPrice.map((field, index) => (
								<FormField
									control={form.control}
									key={field.id}
									name={`prices.${index}`}
									render={({ field }) => (
										<FormItem>
											<FormLabel className={cn(index !== 0 && 'sr-only')}>
												Room prices
											</FormLabel>
											<FormControl>
												<div className='flex gap-4 items-center'>
													<div className='flex-1 flex gap-2'>
														<Select
															onValueChange={value => {
																const selectedType = types.find(
																	type => type.id === Number(value)
																)
																if (selectedType) {
																	field.onChange({
																		...field.value,
																		reservation_type: {
																			id: selectedType.id,
																			name: selectedType.name,
																			start_time: selectedType.start_time,
																			end_time: selectedType.end_time,
																		},
																	})
																}
															}}
														>
															<FormControl className='text-sm mb-4'>
																<SelectTrigger>
																	<SelectValue
																		placeholder={
																			types.find(
																				type =>
																					type.id ===
																					field.value.reservation_type.id
																			)?.name
																		}
																	/>
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																{types.map(item => (
																	<SelectItem
																		key={item.id}
																		value={item.id.toString()}
																	>
																		{item.name}
																	</SelectItem>
																))}
															</SelectContent>
														</Select>
														<Input
															type='number'
															placeholder='Price'
															name={`prices.${index}.price`}
															value={
																field.value.price !== undefined
																	? field.value.price
																	: ''
															}
															onChange={event =>
																field.onChange({
																	...field.value,
																	price: parseFloat(event.target.value),
																})
															}
														/>
														<Select
															name={`prices.${index}.pricing_unit`}
															onValueChange={value =>
																field.onChange({
																	...field.value,
																	pricing_unit: value,
																})
															}
															defaultValue={field.value.pricing_unit}
														>
															<FormControl className='text-sm mb-4'>
																<SelectTrigger>
																	<SelectValue />
																</SelectTrigger>
															</FormControl>
															<SelectContent>
																<SelectItem value={'pax'}>pax</SelectItem>
																<SelectItem value={'hour'}>hour</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<Button
														variant='ghost'
														className='mb-4'
														onClick={() => removePrice(index)}
													>
														Remove
													</Button>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
							))}
							<Button
								type='button'
								variant='outline'
								onClick={() =>
									appendPrice({
										reservation_type: {
											name: '',
										},
										price: 0,
										pricing_unit: '',
									})
								}
							>
								Add price
							</Button>
						</div>
					</div>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem className='w-full flex flex-col mr-2'>
								<FormLabel>Room description</FormLabel>
								<FormControl>
									<TextareaAutosize
										minRows={8}
										placeholder='Write description about room'
										className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type='submit'
					className='w-fit self-center bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'
				>
					Save room
				</Button>
			</form>
		</Form>
	)
}

export default FormEditRoom
