import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const RecentPostCard: FC = () => {
	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>Recent posts</CardTitle>
			</CardHeader>
			<CardContent>Content</CardContent>
		</Card>
	)
}

export default RecentPostCard
