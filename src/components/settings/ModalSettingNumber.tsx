'use client'
import { FC, useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import FormSettingNumber from './FormSettingNumber'
import { apiGetSettings } from '@/api/userApi'

const ModalSettingNumber: FC = () => {
	const [setting, setSetting] = useState<any[] | null>(null)

	const fetchSettings = async () => {
		await apiGetSettings()
			.then(res => {
				setSetting(res.data.data)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchSettings()
	}, [])

	return (
		<Dialog>
			<DialogTrigger className='w-full text-sm font-semibold'>
				CS Number
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-2xl'>
						No Whatsapp Customer Service
					</DialogTitle>
					<DialogDescription>
						<div className='text-xl font-semibold text-black'>
							{setting && setting.length > 0 ? (
								<>Whatsapp: +62{setting[0].value}</>
							) : (
								<>Loading...</>
							)}
						</div>
						<FormSettingNumber />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default ModalSettingNumber
