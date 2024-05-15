'use client'
import { BellAlertIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const HeaderBar: FC = () => {
	const pathname = usePathname()
	const headerTitleFunc = (str: string) => {
		var modifiedString = str.replace('/', '')
		return modifiedString.charAt(0).toUpperCase() + modifiedString.slice(1)
	}
	const headerTitle = headerTitleFunc(pathname)

	return (
		<div className='bg-white h-20 flex items-center justify-between px-4 font-urbanist'>
			<p className='font-semibold text-3xl'>{headerTitle}</p>
			<div className='flex items-center gap-4'>
				<BellAlertIcon className='w-6 h-6' />
				<UserCircleIcon className='w-12 h-12' />
			</div>
		</div>
	)
}

export default HeaderBar
