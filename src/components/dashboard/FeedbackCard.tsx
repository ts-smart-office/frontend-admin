'use client'
import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { StarIcon } from '@heroicons/react/24/solid'

type TFeedbackCardProps = {
	feedbacks: any[]
}

const FeedbackCard: FC<TFeedbackCardProps> = ({ feedbacks }) => {
	return (
		<Card className='h-full rounded-md border-none'>
			<CardHeader>
				<CardTitle>Customer reviews</CardTitle>
			</CardHeader>
			<CardContent>
				{feedbacks.length <= 0 ? (
					<p>There is no reviews data!</p>
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
