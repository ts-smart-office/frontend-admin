import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FC } from 'react'

const OverviewCard: FC = () => {
	return (
		<Card className='w-full h-full bg-white rounded-md border-none'>
			<CardHeader>
				<CardTitle>Overview</CardTitle>
			</CardHeader>
			<CardContent className='flex gap-x-32 gap-y-20 flex-wrap'>
				<div className='flex items-end gap-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Incoming</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>17</p>
				</div>
				<div className='flex items-end gap-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Incoming</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>17</p>
				</div>
				<div className='flex items-end gap-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Incoming</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>17</p>
				</div>
				<div className='flex items-end gap-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Incoming</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>17</p>
				</div>
				<div className='flex items-end gap-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Incoming</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>17</p>
				</div>
				<div className='flex items-end gap-4'>
					<div className='flex flex-col'>
						<p className='text-greyMuted text-base'>Incoming</p>
						<p className='text-darkColor text-lg font-semibold'>Reservations</p>
					</div>
					<p className='text-4xl font-semibold text-greenBrand'>17</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default OverviewCard
