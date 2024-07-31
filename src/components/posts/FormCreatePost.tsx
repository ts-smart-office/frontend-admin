'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { MinimalTiptapEditor } from './minimal-tiptap'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { apiCreatePost } from '@/api/postApi'
import { useToast } from '../ui/use-toast'
import CustomUpload from './CustomUpload'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { useRouter } from 'next/navigation'

const FormCreatePost: FC = () => {
	const { toast } = useToast()
	const router = useRouter()
	const formSchema = z.object({
		title: z.string({ required_error: 'Title is required' }),
		image: z.any(),
		category: z.string(),
		description: z
			.string({ required_error: 'Description is required' })
			.min(1, 'Description is required'),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData()
		formData.append('title', values.title)
		formData.append('category', values.category)
		formData.append('image', values.image)
		formData.append('description', values.description)

		await apiCreatePost(formData)
			.then(res => {
				toast({
					description: res.data.message,
				})
				router.push('/posts')
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
		<Card>
			<CardHeader>
				<CardTitle>Create new post</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-full space-y-6'
					>
						<CustomUpload form={form} name='image' />
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Title post</FormLabel>
									<FormControl>
										<Input placeholder='Please input post title' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category post</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='artikel'>Artikel</SelectItem>
											<SelectItem value='aktivitas'>Aktivitas</SelectItem>
											<SelectItem value='berita'>Berita</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='sr-only'>Description</FormLabel>
									<FormControl>
										<MinimalTiptapEditor
											{...field}
											onValueChange={field.onChange}
											className={cn('w-full bg-white', {
												'border-red-500 focus-within:border-red-500':
													form.formState.errors.description,
											})}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							className='bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'
						>
							Create post
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default FormCreatePost
