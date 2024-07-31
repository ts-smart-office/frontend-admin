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
import FormCreateFood from './FormCreateFood'

const DialogCreateFood: FC = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'>
					Create food
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Create new food</DialogTitle>
					<DialogDescription>
						Add new menu to our food here. Click save when done.
					</DialogDescription>
				</DialogHeader>
				<FormCreateFood />
			</DialogContent>
		</Dialog>
	)
}

export default DialogCreateFood
