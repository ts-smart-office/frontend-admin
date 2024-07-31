import { BellAlertIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import HeaderTitle from './HeaderTitle'
import DropdownAdmin from './DropdownAdmin'
import { getAdminSession } from '@/lib/actions'

const HeaderBar: FC = async () => {
	const sessionAdmin = await getAdminSession()

	return (
		<div className='bg-white h-20 flex items-center justify-between px-4 font-urbanist'>
			<HeaderTitle />
			<div className='flex items-center gap-4'>
				<BellAlertIcon className='w-6 h-6' />
				{sessionAdmin && <DropdownAdmin sessionAdmin={sessionAdmin} />}
			</div>
		</div>
	)
}

export default HeaderBar
