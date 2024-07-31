'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useState } from 'react'
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
import { apiPostById, apiUpdatePost } from '@/api/postApi'
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

type TFormEditProps = {
	idPost: string
}

interface IDetailPost {
	title: string
	category: string
	created_at: string
	description: string
	image: string
}

const FormEditPost: FC<TFormEditProps> = ({ idPost }) => {
	const formSchema = z.object({
		title: z.string({ required_error: 'Title is required' }),
		image: z.any(),
		category: z.string(),
		description: z
			.string({ required_error: 'Description is required' })
			.min(1, 'Description is required'),
	})

	const { toast } = useToast()
	const router = useRouter()
	const [detailPost, setDetailPost] = useState<IDetailPost | null>(null)
	const fetchDetailsPost = async () => {
		await apiPostById(idPost)
			.then(res => {
				setDetailPost(res.data.data)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchDetailsPost()
	}, [])

	useEffect(() => {
		if (detailPost) {
			form.reset({
				title: detailPost.title,
				category: detailPost.category,
				description: detailPost.description,
				image: detailPost.image,
			})
		}
	}, [detailPost])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: detailPost?.title,
			category: detailPost?.category,
			description: detailPost?.description,
			image: detailPost?.image,
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData()
		formData.append('title', values.title)
		formData.append('category', values.category)
		formData.append('image', values.image)
		formData.append('description', values.description)
		formData.append('_method', 'PUT')

		await apiUpdatePost(formData, idPost)
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
						<CustomUpload
							urlImage={detailPost?.image}
							form={form}
							name='image'
						/>
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
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder={detailPost?.category} />
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
											value={detailPost?.description}
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
							Update post
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default FormEditPost
