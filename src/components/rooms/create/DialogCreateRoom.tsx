'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { FC } from 'react'
import FormCreateRoom from './FormCreateRoom'

const DialogCreateRoom: FC = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'>
					Create room
				</Button>
			</DialogTrigger>
			<DialogContent className='w-full h-full max-w-full flex flex-col gap-6 rounded-none sm:rounded-none'>
				<div className='w-full flex flex-col gap-3 justify-center items-center'>
					<DialogTitle className='text-4xl'>Create new room</DialogTitle>
					<DialogDescription>
						Add our new room. Click save when done.
					</DialogDescription>
				</div>
				<FormCreateRoom />
			</DialogContent>
		</Dialog>
	)
}

export default DialogCreateRoom
