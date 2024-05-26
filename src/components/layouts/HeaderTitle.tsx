'use client'
import { FC } from 'react'
import { usePathname } from 'next/navigation'

const HeaderTitle: FC = () => {
	const pathname = usePathname()
	const headerTitleFunc = (str: string) => {
		var modifiedString = str.replace('/', '')
		return modifiedString.charAt(0).toUpperCase() + modifiedString.slice(1)
	}
	const headerTitle = headerTitleFunc(pathname)

	return <p className='font-semibold text-3xl'>{headerTitle}</p>
}

export default HeaderTitle
