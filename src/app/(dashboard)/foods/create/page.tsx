'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { addFoodSchema } from '@/utils/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const CreateFood: FC = () => {
	const form = useForm<z.infer<typeof addFoodSchema>>({
		resolver: zodResolver(addFoodSchema),
		defaultValues: {
			items: [],
		},
		mode: 'onChange',
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	})

	function onSubmit(data: z.infer<typeof addFoodSchema>) {
		const bodyAddFood = {
			name: data.name,
			category: data.category,
			price: parseInt(data.price),
			items: data.items.map(item => item.value),
		}

		console.log(bodyAddFood)
	}

	return (
		<div className='px-4 font-urbanist flex flex-col gap-6'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/foods'>Foods</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Create</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Card className='rounded-md border-none'>
				<CardHeader>
					<CardTitle>Create new food</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='flex flex-col gap-4'
						>
							<div className='flex justify-between gap-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Food name</FormLabel>
											<FormControl>
												<Input placeholder='Ex. Paket 1' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='category'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Food category</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select a category food' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='snack'>Snack</SelectItem>
													<SelectItem value='lunch'>Lunch</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='price'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Food price</FormLabel>
											<FormControl>
												<Input placeholder='shadcn' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div>
								{fields.map((field, index) => (
									<FormField
										control={form.control}
										key={field.id}
										name={`items.${index}.value`}
										render={({ field }) => (
											<FormItem>
												<FormLabel className={cn(index !== 0 && 'sr-only')}>
													Food items
												</FormLabel>
												<FormControl>
													<div className='flex gap-4 items-center'>
														<Input
															placeholder='Add new food item'
															{...field}
															className='w-1/3 mb-4'
														/>
														<Button
															className='mb-4'
															variant='ghost'
															onClick={() => remove(index)}
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
									onClick={() => append({ value: '' })}
								>
									Add food item
								</Button>
							</div>
							<Button
								type='submit'
								className='w-fit mt-10 bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'
							>
								Create food
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default CreateFood
