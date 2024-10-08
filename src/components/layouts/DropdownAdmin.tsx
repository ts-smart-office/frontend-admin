'use client'
import { FC } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useToast } from '../ui/use-toast'
import { apiLogout } from '@/api/authApi'
import { deleteAdminSession } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import ModalSettingNumber from '../settings/ModalSettingNumber'

type TDropdownAdminProps = {
	sessionAdmin: {
		id: string
		name: string
		email: string
	}
}

const DropdownAdmin: FC<TDropdownAdminProps> = ({ sessionAdmin }) => {
	const { toast } = useToast()
	const router = useRouter()
	const adminLogout = async () => {
		const res = await apiLogout()
		if (res) {
			toast({
				description: 'Logout success',
			})
			router.push('/signin')
		}
		await deleteAdminSession()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='overflow-hidden rounded-full w-fit px-4'
				>
					{sessionAdmin.email}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Admin Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ModalSettingNumber />
				<DropdownMenuSeparator />
				<Button
					variant='ghost'
					className='w-full'
					onClick={adminLogout}
					asChild
				>
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default DropdownAdmin
