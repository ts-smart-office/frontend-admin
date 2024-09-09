import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ArrowTrendingUpIcon,
	ChatBubbleLeftEllipsisIcon,
	ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import { DatePickerWithRange } from './DateRangePicker'

const segmentsGood = [
	{ name: 'Peralatan modern' },
	{ name: 'Fasilitas lengkap' },
	{ name: 'Wi-Fi cepat' },
	{ name: 'Ruangan bersih' },
	{ name: 'Makanan enak' },
	{ name: 'Pelayanan profesional' },
]

const segmentsMid = [
	{ name: 'Fasilitas kurang lengkap' },
	{ name: 'Wi-Fi kurang stabil' },
	{ name: 'Ruangan kurang rapi' },
	{ name: 'Staff kurang ramah' },
	{ name: 'Makanan kurang menarik' },
	{ name: 'Porsi makanan kurang' },
]

const segmentsLow = [
	{ name: 'Fasilitas tidak lengkap' },
	{ name: 'Peralatan rusak' },
	{ name: 'Wi-Fi sangat lambat' },
	{ name: 'Ruangan kotor' },
	{ name: 'Staff tidak responsif' },
	{ name: 'Makanan tidak menarik' },
]

type TReviewOverviewProps = {
	averageRating: number
	totalReview: number
	totalReviewComment: number
	goodReviews: any[] | null
	midReviews: any[] | null
	lowReviews: any[] | null
	setMinDate: any
	setMaxDate: any
}

const ReviewOverview: FC<TReviewOverviewProps> = ({
	averageRating,
	totalReview,
	totalReviewComment,
	goodReviews = [],
	lowReviews = [],
	midReviews = [],
	setMinDate,
	setMaxDate,
}) => {
	return (
		<Card className='w-full h-full bg-white rounded-md border-none'>
			<CardHeader className='flex flex-row justify-between items-center'>
				<CardTitle>Overview Review</CardTitle>
				<DatePickerWithRange setMinDate={setMinDate} setMaxDate={setMaxDate} />
			</CardHeader>
			<CardContent className='w-full grid grid-cols-10'>
				<div className='col-span-3 flex flex-col gap-4'>
					<div className='w-full flex justify-between gap-1'>
						<div className='flex items-center justify-between gap-2'>
							<ArrowTrendingUpIcon className='w-6 h-6' />
							<h2 className='text-lg font-semibold'>Average Rating</h2>
						</div>
						<p className='text-greenBrand text-3xl font-semibold'>
							{averageRating}
						</p>
					</div>
					<div className='w-full justify-between flex gap-1'>
						<div className='flex items-center justify-between gap-2'>
							<ChatBubbleLeftIcon className='w-6 h-6' />
							<h2 className='text-lg font-semibold'>Total reviews</h2>
						</div>
						<p className='text-greenBrand text-3xl font-semibold'>
							{totalReview}
						</p>
					</div>
					<div className='w-full flex justify-between gap-1'>
						<div className='flex items-center justify-between gap-2'>
							<ChatBubbleLeftEllipsisIcon className='w-6 h-6' />
							<h2 className='text-lg font-semibold'>
								Total reviews with comments
							</h2>
						</div>
						<p className='text-greenBrand text-3xl font-semibold'>
							{totalReviewComment}
						</p>
					</div>
				</div>
				<div className='col-start-5 col-span-5 flex justify-between'>
					<div className='w-fit flex flex-col gap-2'>
						<h2 className='text-lg font-semibold'>5 star reviews</h2>
						{!goodReviews || goodReviews.length <= 0 ? (
							<p className='font-semibold text-xl text-greyMuted'>No data!</p>
						) : (
							goodReviews.map(item => (
								<div key={item.name} className='flex gap-2 items-end'>
									<p className='font-semibold text-greenBrand text-2xl'>
										{item.total}
									</p>
									<p>{item.name}</p>
								</div>
							))
						)}
					</div>
					<div className='w-fit flex flex-col gap-2'>
						<h2 className='text-lg font-semibold'>3-4 star reviews</h2>
						{!midReviews || midReviews.length <= 0 ? (
							<p className='font-semibold text-xl text-greyMuted'>No data!</p>
						) : (
							midReviews.map(item => (
								<div key={item.name} className='flex gap-2 items-end'>
									<p className='font-semibold text-greenBrand text-2xl'>
										{item.total}
									</p>
									<p>{item.name}</p>
								</div>
							))
						)}
					</div>
					<div className='w-fit flex flex-col gap-2'>
						<h2 className='text-lg font-semibold'>1-2 star reviews</h2>
						{!lowReviews || lowReviews.length <= 0 ? (
							<p className='font-semibold text-xl text-greyMuted'>No data!</p>
						) : (
							lowReviews.map(item => (
								<div key={item.name} className='flex gap-2 items-end'>
									<p className='font-semibold text-greenBrand text-2xl'>
										{item.total}
									</p>
									<p>{item.name}</p>
								</div>
							))
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default ReviewOverview
