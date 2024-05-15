import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const ReservationCard: FC = () => {
	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>Incoming Reservations</CardTitle>
			</CardHeader>
			<CardContent>Content</CardContent>
		</Card>
	)
}

export default ReservationCard
