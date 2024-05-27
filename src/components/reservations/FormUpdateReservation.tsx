'use client'
import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { STATUS, updateReservationSchema } from '@/utils/form-schema'
import { apiUpdateStatus } from '@/api/reservationApi'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

type TFormUpdateReservationProps = {
	status: any
	idReservation: string
}

const FormUpdateReservation: FC<TFormUpdateReservationProps> = ({
	status,
	idReservation,
}) => {
	const { toast } = useToast()
	const router = useRouter()
	const form = useForm<z.infer<typeof updateReservationSchema>>({
		resolver: zodResolver(updateReservationSchema),
		defaultValues: {
			status: status,
		},
	})

	async function onSubmit(data: z.infer<typeof updateReservationSchema>) {
		const formData = new FormData()
		formData.append('_method', 'PUT')
		formData.append('status', data.status)
		await apiUpdateStatus(idReservation, formData)
			.then(res => {
				toast({
					description: res.data.message,
				})
				setTimeout(function () {
					router.push('/reservations')
				}, 1000)
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
			<form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-4'>
				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl className='w-[214px] py-3 h-fit text-lg'>
									<SelectTrigger>
										<SelectValue placeholder={field.value} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{STATUS.map(item => (
										<SelectItem key={item} value={item}>
											{item}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='bg-greenBrand px-8 h-fit py-3 text-lg hover:bg-opacity-80 hover:bg-greenBrand'
				>
					Update status
				</Button>
			</form>
		</Form>
	)
}

export default FormUpdateReservation
