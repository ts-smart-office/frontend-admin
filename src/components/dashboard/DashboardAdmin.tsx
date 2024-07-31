'use client'
import { FC, useEffect, useState } from 'react'
import { apiDashboardOverview } from '@/api/reservationApi'
import CalendarDashboard from '@/components/dashboard/CalendarDashboard'
import FeedbackCard from '@/components/dashboard/FeedbackCard'
import FoodCard from '@/components/dashboard/FoodCard'
import OverviewCard from '@/components/dashboard/OverviewCard'
import ReservationCard from '@/components/dashboard/ReservationCard'
import { IDashboardOverview } from '@/utils/types'

const DashboardAdmin: FC = () => {
	const [overview, setOverview] = useState<IDashboardOverview | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	const getDashboardOverview = async () => {
		await apiDashboardOverview()
			.then(res => {
				setOverview(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		getDashboardOverview()
	}, [])

	if (overview === null) {
		return (
			<div className='px-4 font-urbanist flex flex-col gap-6'>
				Getting data...
			</div>
		)
	}

	return (
		<div className='px-4 font-urbanist flex flex-col gap-6'>
			<div className='grid grid-cols-10 gap-6'>
				<div className='h-full col-span-7'>
					<OverviewCard
						incoming={overview.total_incoming_reservations}
						approved={overview.total_approved_reservations}
						completed={overview.total_completed_reservations}
						post={overview.total_posts}
						newUser={overview.total_new_users}
						allUser={overview.total_users_all_time}
					/>
				</div>
				<div className='col-span-3'>
					<CalendarDashboard
						datesReserved={overview.dates_with_reservations_all_time}
					/>
				</div>
			</div>
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-10'>
					<ReservationCard
						upcomingReservation={overview.upcoming_reservations}
					/>
				</div>
			</div>
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-6'>
					<FoodCard />
				</div>
				<div className='col-span-4'>
					<FeedbackCard feedbacks={overview.reviews} />
				</div>
			</div>
		</div>
	)
}

export default DashboardAdmin
