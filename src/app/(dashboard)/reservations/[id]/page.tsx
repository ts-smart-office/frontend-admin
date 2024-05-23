import { FC } from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import DetailReservationCard from '@/components/reservations/DetailReservationCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
type TDetailReservationProps = {
	params: { id: string }
}

const DetailReservation: FC<TDetailReservationProps> = ({ params }) => {
	return (
		<div className='px-4 font-urbanist flex flex-col gap-6'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/reservations'>Reservations</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{params.id}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<DetailReservationCard />
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-4'>
					<Card className='rounded-md border-none'>
						<CardHeader>
							<CardTitle>Proof of payment</CardTitle>
						</CardHeader>
						<CardContent>Content</CardContent>
					</Card>
				</div>
				<div className='col-span-6'>
					<Card className='rounded-md border-none'>
						<CardHeader>
							<CardTitle>Customer feedback</CardTitle>
						</CardHeader>
						<CardContent>Content</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default DetailReservation
