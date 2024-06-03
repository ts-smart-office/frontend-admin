'use client'
import { FC, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import FormEditRoom from './FormEditRoom'
import { apiDetailsRoom } from '@/api/roomApi'
import UploadImages from './CustomUploadImageRoom'
import FormUploadImages from './FormUpload'

type TDialogRoomProps = {
	idRoom: string
}

const DialogRoom: FC<TDialogRoomProps> = ({ idRoom }) => {
	const [details, setDetails] = useState<any | null>(null)
	const fetchDetailsRoom = async () => {
		await apiDetailsRoom(idRoom)
			.then(res => {
				setDetails(res.data.data)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchDetailsRoom()
	}, [])

	console.log(details)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<EllipsisVerticalIcon className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<Dialog>
					<DialogTrigger className='w-full'>
						<DropdownMenuItem onSelect={e => e.preventDefault()}>
							Update room
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogContent className='w-full h-full max-w-full flex flex-col gap-6 rounded-none sm:rounded-none'>
						<div className='w-full flex flex-col gap-3 justify-center items-center'>
							<DialogTitle className='text-4xl'>Update room</DialogTitle>
							<DialogDescription>
								Update our room. Click save when done.
							</DialogDescription>
						</div>
						<FormEditRoom details={details} />
					</DialogContent>
				</Dialog>
				<DropdownMenuSeparator />
				<Dialog>
					<DialogTrigger className='w-full'>
						<DropdownMenuItem onSelect={e => e.preventDefault()}>
							Upload images
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Upload images</DialogTitle>
							<DialogDescription>Upload room images here</DialogDescription>
						</DialogHeader>
						<FormUploadImages details={details} />
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default DialogRoom
