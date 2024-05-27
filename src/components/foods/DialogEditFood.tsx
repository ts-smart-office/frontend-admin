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
import { FC, useEffect, useState } from 'react'
import FormEditFood from './FormEditFood'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '../ui/context-menu'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { apiDetailsFood } from '@/api/foodApi'
import { IFood } from '@/utils/types'

type TDialogEditFood = {
	idFood: string
}

const DialogEditFood: FC<TDialogEditFood> = ({ idFood }) => {
	const [details, setDetails] = useState<IFood | null>(null)
	const fetchDetailsFood = async () => {
		await apiDetailsFood(idFood!)
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
		fetchDetailsFood()
	}, [])

	return (
		<Dialog>
			<ContextMenu>
				<ContextMenuTrigger>
					<Button aria-haspopup='true' size='icon' variant='ghost'>
						<EllipsisVerticalIcon className='h-4 w-4' />
						<span className='sr-only'>Toggle menu</span>
					</Button>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<DialogTrigger asChild>
						<ContextMenuItem>
							<span>Edit</span>
						</ContextMenuItem>
					</DialogTrigger>
				</ContextMenuContent>
			</ContextMenu>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit food</DialogTitle>
					<DialogDescription>
						Make changes to our food here. Click save when edit done.
					</DialogDescription>
				</DialogHeader>
				<FormEditFood details={details} />
			</DialogContent>
		</Dialog>
	)
}

export default DialogEditFood
