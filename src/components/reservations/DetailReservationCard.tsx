import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
	CalendarIcon,
	DocumentTextIcon,
	ExclamationCircleIcon,
	UserGroupIcon,
	UserIcon,
} from '@heroicons/react/24/outline'
import FormUpdateReservation from './FormUpdateReservation'
import { rupiahCurrency } from '@/lib/utils'
import { IDetailsReservation } from '@/utils/types'

type TDetailReservationCardProps = {
	details: IDetailsReservation | null
}

const DetailReservationCard: FC<TDetailReservationCardProps> = ({
	details,
}) => {
	if (!details) {
		return (
			<Card className='rounded-md border-none'>
				<CardHeader>
					<CardTitle className='flex justify-between'>
						<p>Meeting Room</p>
					</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col gap-8'>Loading...</CardContent>
			</Card>
		)
	}

	const lunchFoods = details.foods.find(food => food.category === 'lunch')
	const snackFoods = details.foods.find(food => food.category === 'snack')
	const lunchPrice = lunchFoods ? rupiahCurrency.format(lunchFoods.price) : '0'
	const snackPrice = snackFoods ? rupiahCurrency.format(snackFoods.price) : '0'
	const reservationPrice = rupiahCurrency.format(details.price)

	const reservationTotal = rupiahCurrency.format(
		details.price * details.total_persons
	)
	const foodTotal = rupiahCurrency.format(
		(lunchFoods ? lunchFoods.price * details.total_persons : 0) +
			(snackFoods ? snackFoods.price * details.total_persons : 0)
	)
	const totalPayment = rupiahCurrency.format(
		details.price * details.total_persons +
			(lunchFoods ? lunchFoods.price * details.total_persons : 0) +
			(snackFoods ? snackFoods.price * details.total_persons : 0)
	)

	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle className='flex justify-between'>
					<p>
						{details.room.name} {details.id}
					</p>
					<FormUpdateReservation
						status={details.status}
						idReservation={details.id}
					/>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-8'>
				<div className='flex flex-col gap-5'>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<UserIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Customer</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>
							{details.user.name}
						</p>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<CalendarIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Reservation date</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>
							{details.date}
						</p>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<DocumentTextIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Reservation type</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>
							{details.type_name} ({details.start_time} - {details.end_time})
						</p>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-3'>
							<UserGroupIcon className='w-8 h-8 stroke-1' />
							<p className='text-base lg:text-xl'>Total persons</p>
						</div>
						<p className='text-base lg:text-xl text-greyMuted'>
							{details.total_persons} Persons
						</p>
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
								<p className='text-xl font-semibold'>{reservationPrice}</p>
							</div>
							<div className='flex justify-between mb-8'>
								<p className='text-xl font-semibold'>Reservation subtotal</p>
								<p className='text-xl font-semibold'>{reservationTotal}</p>
							</div>
							<div className='flex justify-between'>
								<div className='flex flex-col'>
									<p className='text-xl font-semibold'>Additional Food Snack</p>
									<p className='text-greyMuted flex gap-2'>
										This price for a person
										<ExclamationCircleIcon className='w-6 h-6' />
									</p>
								</div>
								<p className='text-xl font-semibold'>{snackPrice}</p>
							</div>
							<div className='flex justify-between'>
								<div className='flex flex-col'>
									<p className='text-xl font-semibold'>Additional Food Lunch</p>
									<p className='text-greyMuted flex gap-2'>
										This price for a person
										<ExclamationCircleIcon className='w-6 h-6' />
									</p>
								</div>
								<p className='text-xl font-semibold'>{lunchPrice}</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-xl font-semibold'>
									Additional food subtotal
								</p>
								<p className='text-xl font-semibold'>{foodTotal}</p>
							</div>
						</div>
						<div className='flex justify-between'>
							<p className='text-3xl font-semibold'>Total payment</p>
							<p className='text-3xl font-semibold'>{totalPayment}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default DetailReservationCard
