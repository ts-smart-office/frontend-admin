'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { uploadImagesRoom } from '@/utils/form-schema'
import UploadImages from './CustomUploadImageRoom'
import { apiUploadImagesRoom } from '@/api/roomApi'

type TFormUploadImagesProps = {
	details: any
}

const FormUploadImages: FC<TFormUploadImagesProps> = ({ details }) => {
	const { toast } = useToast()
	const form = useForm<z.infer<typeof uploadImagesRoom>>({
		resolver: zodResolver(uploadImagesRoom),
		defaultValues: {
			attachment: null,
		},
	})

	const onSubmit = async (values: z.infer<typeof uploadImagesRoom>) => {
		const formData = new FormData()
		const attachmentsArray: File[] = Array.isArray(values.attachment)
			? values.attachment
			: [values.attachment]

		attachmentsArray.forEach((file, index) => {
			formData.append('attachments[]', file)
		})

		await apiUploadImagesRoom(formData, details.id.toString())
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
		<div className='w-full flex flex-col'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<UploadImages form={form} name='attachment' />
					<div className='flex gap-6'>
						<Button
							type='submit'
							className='w-full bg-greenBrand rounded-full hover:bg-opacity-80 py-6 sm:text-lg hover:bg-greenBrand'
						>
							Upload images
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default FormUploadImages
