import { FC } from 'react'
import Link from 'next/link'

type TSidebarMenuProps = {
	text: string
	link: string
	icon: any
}

const SidebarMenu: FC<TSidebarMenuProps> = ({ text, link, icon }) => {
	return (
		<Link href={link} className='text-base font-semibold tracking-wider'>
			<div className='flex items-center gap-2 bg-transparent text-darkColor hover:bg-greenBrand hover:text-white transition-colors duration-300 rounded-md py-3 px-4'>
				{icon}
				{text}
			</div>
		</Link>
	)
}

export default SidebarMenu
