'use client'
import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { apiUpdateSettings } from '@/api/userApi'
import { toast } from '../ui/use-toast'

const formSchema = z.object({
	whatsapp: z.string(),
	exp: z.string(),
})

const FormSettingNumber: FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			whatsapp: '',
			exp: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const bodyUpdateSettings = [
			{
				id: 'customer_service_phone',
				value: values.whatsapp,
			},
			{
				id: 'expiration_duration',
				value: values.exp,
			},
		]

		await apiUpdateSettings(bodyUpdateSettings)
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-4'>
				<FormField
					control={form.control}
					name='whatsapp'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Edit whatsapp</FormLabel>
							<FormControl>
								<Input placeholder='87625567552' {...field} />
							</FormControl>
							<FormDescription>*tanpa +62 atau 0</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='exp'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Expired whatsapp</FormLabel>
							<FormControl>
								<Input placeholder='12' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-fit self-center bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'
				>
					Update whatsapp
				</Button>
			</form>
		</Form>
	)
}

export default FormSettingNumber
