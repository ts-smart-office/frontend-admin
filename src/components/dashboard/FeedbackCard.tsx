import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const FeedbackCard: FC = () => {
	return (
		<Card className='h-full rounded-md border-none'>
			<CardHeader>
				<CardTitle>Customer feedbacks</CardTitle>
			</CardHeader>
			<CardContent>Content</CardContent>
		</Card>
	)
}

export default FeedbackCard
