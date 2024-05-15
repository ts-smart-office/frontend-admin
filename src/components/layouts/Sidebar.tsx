import { FC } from 'react'
import SidebarMenu from './SidebarMenu'
import {
	BuildingOfficeIcon,
	ClipboardDocumentIcon,
	NewspaperIcon,
	RectangleGroupIcon,
	UserGroupIcon,
} from '@heroicons/react/24/outline'

const Sidebar: FC = () => {
	const menuItems = [
		{
			text: 'Dashboard',
			link: '/',
			icon: <RectangleGroupIcon className='w-6 h-6' />,
		},
		{
			text: 'Reservations',
			link: '/reservations',
			icon: <ClipboardDocumentIcon className='w-6 h-6' />,
		},
		{
			text: 'Rooms',
			link: '/rooms',
			icon: <BuildingOfficeIcon className='w-6 h-6' />,
		},
		{
			text: 'Posts',
			link: '/posts',
			icon: <NewspaperIcon className='w-6 h-6' />,
		},
		{
			text: 'Users',
			link: '/users',
			icon: <UserGroupIcon className='w-6 h-6' />,
		},
	]
	return (
		<div className='fixed flex flex-col gap-3 w-60 min-h-screen bg-white px-8 font-urbanist'>
			<div className='py-7'>
				<h1 className='text-xl font-semibold'>SmartOffice</h1>
			</div>
			<div className='grow flex flex-col gap-3'>
				{menuItems.map(item => (
					<SidebarMenu
						key={item.text}
						text={item.text}
						link={item.link}
						icon={item.icon}
					/>
				))}
			</div>
		</div>
	)
}

export default Sidebar
