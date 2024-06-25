import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FC } from 'react'

type TOverviewCardProps = {
	incoming: number
	approved: number
	completed: number
	post: number
	newUser: number
	allUser: number
}

const OverviewCard: FC<TOverviewCardProps> = ({
	incoming,
	approved,
	completed,
	allUser,
	newUser,
	post,
}) => {
	return (
		<Card className='w-full h-full bg-white rounded-md border-none'>
			<CardHeader>
				<CardTitle>Overview</CardTitle>
			</CardHeader>
			<CardContent className='pt-8 grid grid-cols-12 gap-x-12 gap-y-14'>
				<div className='flex items-end gap-4 col-span-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Incoming</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>{incoming}</p>
				</div>
				<div className='flex items-end gap-4 col-span-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Approved</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>{approved}</p>
				</div>
				<div className='flex items-end gap-4 col-span-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Completed</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>{completed}</p>
				</div>
				<div className='flex items-end gap-4 col-span-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Total</p>
						<p className='text-darkColor text-lg font-semibold'>Posts</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>{post}</p>
				</div>
				<div className='flex items-end gap-4 col-span-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>All time</p>
						<p className='text-darkColor text-lg font-semibold'>Users</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>{allUser}</p>
				</div>
				<div className='flex items-end gap-4 col-span-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>New</p>
						<p className='text-darkColor text-lg font-semibold'>Users</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>{newUser}</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default OverviewCard
