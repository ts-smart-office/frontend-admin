import CalendarDashboard from '@/components/dashboard/CalendarDashboard'
import FeedbackCard from '@/components/dashboard/FeedbackCard'
import OverviewCard from '@/components/dashboard/OverviewCard'
import RecentPostCard from '@/components/dashboard/RecentPostCard'
import ReservationCard from '@/components/dashboard/ReservationCard'

export default function Home() {
	return (
		<div className='px-4 font-urbanist flex flex-col gap-6'>
			<OverviewCard />
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-7'>
					<ReservationCard />
				</div>
				<div className='col-span-3'>
					<FeedbackCard />
				</div>
			</div>
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-7'>
					<RecentPostCard />
				</div>
				<div className='col-span-3'>
					<CalendarDashboard />
				</div>
			</div>
		</div>
	)
}
