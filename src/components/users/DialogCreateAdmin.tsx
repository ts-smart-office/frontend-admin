import { FC } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import FormCreateAdmin from './FormCreateAdmin'

const DialogCreateAdmin: FC = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'>
					Create new admin
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Create new admin</DialogTitle>
					<DialogDescription>
						Add new admin to our admin dashboard. Click save when done.
					</DialogDescription>
				</DialogHeader>
				<FormCreateAdmin />
			</DialogContent>
		</Dialog>
	)
}

export default DialogCreateAdmin
