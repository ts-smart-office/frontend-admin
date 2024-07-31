'use client'
import { FC } from 'react'
import { useToast } from '../ui/use-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAdminSchema } from '@/utils/form-schema'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { apiCreateUserAdmin } from '@/api/userApi'

const FormCreateAdmin: FC = () => {
	const { toast } = useToast()
	const form = useForm<z.infer<typeof createAdminSchema>>({
		resolver: zodResolver(createAdminSchema),
		mode: 'onChange',
	})

	async function onSubmit(data: z.infer<typeof createAdminSchema>) {
		const bodyCreateAdmin = {
			name: data.name,
			role_id: Number(data.role_id),
			email: data.email,
			phone: Number(data.phone),
			company: data.company,
			password: data.password,
		}

		await apiCreateUserAdmin(bodyCreateAdmin)
			.then(res => {
				toast({
					title: 'Berhasil membuat akun admin baru',
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Admin name</FormLabel>
							<FormControl>
								<Input placeholder='Please input admin name' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Admin email</FormLabel>
							<FormControl>
								<Input placeholder='Please input admin email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Admin password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='Please input password account'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='company'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Admin division</FormLabel>
							<FormControl>
								<Input placeholder='Please input admin division' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Admin phone</FormLabel>
							<FormControl>
								<Input
									placeholder='Please input admin phone number'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='role_id'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel>Admin role</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a admin role' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='1'>Super Admin</SelectItem>
										<SelectItem value='2'>Admin</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-fit self-end mt-10 bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'
				>
					Create admin
				</Button>
			</form>
		</Form>
	)
}

export default FormCreateAdmin
