import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import {
	CalendarIcon,
	DocumentTextIcon,
	ExclamationCircleIcon,
	UserGroupIcon,
	UserIcon,
} from '@heroicons/react/24/outline'

const DetailReservationCard: FC = () => {
	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle className='flex justify-between'>
					<p>Meeting Room #ID</p>
					<div className='flex gap-4'>
						<Button>Select</Button>
						<Button>Update status</Button>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-8'>
				<div className='flex flex-col gap-5'>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<UserIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Customer</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>Sule</p>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<CalendarIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Reservation date</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>12 June 2024</p>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<DocumentTextIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Reservation type</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>
							Half-Day (08.00 AM - 12.00 PM)
						</p>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<UserGroupIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Total persons</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>20 Persons</p>
					</div>
				</div>
				<div className='w-full flex flex-col gap-11'>
					<div className='flex flex-col gap-10'>
						<div className='flex flex-col'>
							<div className='flex justify-between'>
								<div className='flex flex-col'>
									<p className='text-xl font-semibold'>
										Reservation per person
									</p>
									<p className='text-greyMuted flex gap-2'>
										This price for a person
										<ExclamationCircleIcon className='w-6 h-6' />
									</p>
								</div>
								<p className='text-xl font-semibold'>Rp. 0</p>
							</div>
							<div className='flex justify-between mb-8'>
								<p className='text-xl font-semibold'>Reservation subtotal</p>
								<p className='text-xl font-semibold'>Rp. 0</p>
							</div>
							<div className='flex justify-between'>
								<div className='flex flex-col'>
									<p className='text-xl font-semibold'>Additional Food</p>
									<p className='text-greyMuted flex gap-2'>
										This price for a person
										<ExclamationCircleIcon className='w-6 h-6' />
									</p>
								</div>
								<p className='text-xl font-semibold'>Rp. 0</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-xl font-semibold'>
									Additional food subtotal
								</p>
								<p className='text-xl font-semibold'>Rp. 0</p>
							</div>
						</div>
						<div className='flex justify-between'>
							<p className='text-3xl font-semibold'>Total payment</p>
							<p className='text-3xl font-semibold'>Rp. 0</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default DetailReservationCard
