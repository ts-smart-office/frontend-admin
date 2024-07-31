'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
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
import { apiDeleteFood, apiDetailsFood } from '@/api/foodApi'
import { IFood } from '@/utils/types'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useToast } from '../ui/use-toast'

type TDialogEditFood = {
	idFood: string
}

const DialogEditFood: FC<TDialogEditFood> = ({ idFood }) => {
	const { toast } = useToast()
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

	const deleteFood = async () => {
		await apiDeleteFood(idFood!)
			.then(res => {
				toast({
					description: res.data.message,
				})
				location.reload()
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
							Update food
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogContent className='w-full h-full max-w-full flex flex-col gap-6 rounded-none sm:rounded-none'>
						<div className='w-full flex flex-col gap-3 justify-center items-center'>
							<DialogTitle className='text-4xl'>Update food</DialogTitle>
							<DialogDescription>
								Update our food menu. Click save when done.
							</DialogDescription>
						</div>
						<FormEditFood details={details} />
					</DialogContent>
				</Dialog>
				<DropdownMenuSeparator />
				<Dialog>
					<DialogTrigger className='w-full'>
						<DropdownMenuItem onSelect={e => e.preventDefault()}>
							Delete food
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Delete confirmation</DialogTitle>
							<DialogDescription>
								Are you sure t delete this menu?
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className='flex gap-4'>
							<DialogClose asChild>
								<Button type='button' variant='secondary'>
									Cancel
								</Button>
							</DialogClose>
							<Button
								onClick={deleteFood}
								type='button'
								className='bg-rose-400 text-lg hover:bg-opacity-80 hover:bg-rose-400'
							>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default DialogEditFood
