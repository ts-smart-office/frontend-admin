'use client'
import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { signinSchema } from '@/utils/form-schema'
import { apiCsrfToken, apiLoginAdmin } from '@/api/authApi'
import { handleAdminSession } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

const FormSignin: FC = () => {
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
	})

	const onSubmit = async (values: z.infer<typeof signinSchema>) => {
		await apiCsrfToken().catch(error => {
			if (error.response) {
				toast({
					description: error.response.data.message,
				})
			}
		})
		await apiLoginAdmin(values)
			.then(res => {
				const { id, name, email, role } = res.data.user
				handleAdminSession({ id, name, email, role })
				toast({
					description: res.data.message,
				})
				setTimeout(function () {
					router.push('/')
				}, 500)
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
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg'>
								Email address
							</FormLabel>
							<FormControl>
								<Input
									placeholder='Fill your email address'
									{...field}
									className='border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-base lg:text-lg'>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Fill your password'
									type='password'
									{...field}
									className='border-2 rounded-full border-darkColor focus-visible:ring-0 focus-visible:border-greenBrand text-base lg:text-lg lg:py-6 px-4'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-center pt-4'>
					<Button
						type='submit'
						className='bg-greenBrand rounded-full w-2/3 lg:w-1/2 py-6 text-lg hover:bg-opacity-80 hover:bg-greenBrand'
					>
						Sign in
					</Button>
				</div>
			</form>
		</Form>
	)
}

export default FormSignin
