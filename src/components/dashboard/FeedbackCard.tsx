'use client'
import { FC, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { apiReviewReservation } from '@/api/reservationApi'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { StarIcon } from '@heroicons/react/24/solid'

const FeedbackCard: FC = () => {
	const [feedbacks, setFeedbacks] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const fetchAllReviews = async () => {
		await apiReviewReservation()
			.then(res => {
				setFeedbacks(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchAllReviews()
	}, [])

	return (
		<Card className='h-full rounded-md border-none'>
			<CardHeader>
				<CardTitle>Customer feedbacks</CardTitle>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : feedbacks.length <= 0 ? (
					<p>There is no feedback data!</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Customer
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Rating
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Room
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{feedbacks.map(item => (
								<TableRow key={item.id}>
									<TableCell className='text-base text-darkColor'>
										{item.user.email}
									</TableCell>
									<TableCell className='flex gap-1 items-center text-base text-darkColor'>
										{item.rating}{' '}
										<StarIcon className='w-4 h-4 text-greenBrand' />
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.room.name}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	)
}

export default FeedbackCard
