'use client'
import { FC, useEffect, useState } from 'react'
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
import { apiDetailsReservation } from '@/api/reservationApi'
import { IDetailsReservation } from '@/utils/types'
import Image from 'next/image'
type TDetailReservationProps = {
	params: { id: string }
}

const DetailReservation: FC<TDetailReservationProps> = ({ params }) => {
	const [details, setDetails] = useState<IDetailsReservation | null>(null)
	const getDetails = async () => {
		await apiDetailsReservation(params.id.toString())
			.then(res => {
				setDetails(res.data.data)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		getDetails()
	}, [])

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
			<DetailReservationCard details={details} />
			<div className='grid grid-cols-10 gap-6'>
				<div className='col-span-4'>
					<Card className='rounded-md border-none'>
						<CardHeader>
							<CardTitle>Proof of payment</CardTitle>
						</CardHeader>
						<CardContent>
							{!details?.proof_of_payment_url ? (
								<p>User not yet upload!</p>
							) : (
								<div className='flex gap-7'>
									<Image
										width={220}
										height={220}
										src={details?.proof_of_payment_url!}
										alt={details?.proof_of_payment_url!}
									/>
									<p>Uploaded by user</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
				<div className='col-span-6'>
					<Card className='rounded-md border-none'>
						<CardHeader>
							<CardTitle>Customer feedback</CardTitle>
						</CardHeader>
						<CardContent>Coming soon!</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default DetailReservation
