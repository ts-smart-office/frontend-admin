import CalendarDashboard from '@/components/dashboard/CalendarDashboard'
import FeedbackCard from '@/components/dashboard/FeedbackCard'
import FoodCard from '@/components/dashboard/FoodCard'
import OverviewCard from '@/components/dashboard/OverviewCard'
import ReservationCard from '@/components/dashboard/ReservationCard'
import { getAdminSession } from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function Home() {
	const sessionAdmin = await getAdminSession()
	if (!sessionAdmin) {
		return redirect('/signin')
	}

	return (
		<div className='px-4 font-urbanist flex flex-col gap-6'>
			<OverviewCard />
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-7'>
					<ReservationCard />
				</div>
				<div className='col-span-3'>
					<CalendarDashboard />
				</div>
			</div>
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-7'>
					<FoodCard />
				</div>
				<div className='col-span-3'>
					<FeedbackCard />
				</div>
			</div>
		</div>
	)
}
