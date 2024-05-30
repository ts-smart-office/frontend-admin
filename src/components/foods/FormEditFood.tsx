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
import { Button } from '../ui/button'
import { IFood } from '@/utils/types'

type TFormEditFood = {
	details: IFood | null
}

const FormEditFood: FC<TFormEditFood> = ({ details }) => {
	const form = useForm<z.infer<typeof addFoodSchema>>({
		resolver: zodResolver(addFoodSchema),
		defaultValues: {
			name: details?.name,
			category: details?.category,
			price: details?.price.toString(),
			items: details?.items.map(item => ({ value: item.name })),
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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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
								<Input placeholder='0' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
												className='w-full mb-4'
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
					className='w-fit self-end mt-10 bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'
				>
					Edit food
				</Button>
			</form>
		</Form>
	)
}

export default FormEditFood
