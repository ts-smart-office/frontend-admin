import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const FoodCard: FC = () => {
	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>Recent food available</CardTitle>
			</CardHeader>
			<CardContent>Content</CardContent>
		</Card>
	)
}

export default FoodCard
