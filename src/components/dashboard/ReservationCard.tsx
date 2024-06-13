'use client'
import { FC, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { apiReservations } from '@/api/reservationApi'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Badge } from '../ui/badge'

const ReservationCard: FC = () => {
	const [reservations, setReservations] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const getIncomingReservations = async () => {
		await apiReservations('incoming')
			.then(res => {
				console.log(res.data.data)
				setReservations(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		getIncomingReservations()
	}, [])

	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>Incoming Reservations</CardTitle>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : reservations.length <= 0 ? (
					<p>There is no incoming reservation</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Customer
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Reservation Room
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Reservation Type
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Reservation Date
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Reservation Status
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground text-center'>
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{reservations.map(item => (
								<TableRow key={item.id}>
									<TableCell className='text-base text-darkColor'>
										{item.user.name}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.room.name}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.type_name} - {item.start_time}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.date}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										<Badge variant='outline'>{item.status}</Badge>
									</TableCell>
									<TableCell className='text-base text-darkColor flex justify-center'>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													aria-haspopup='true'
													size='icon'
													variant='ghost'
												>
													<EllipsisVerticalIcon className='h-4 w-4' />
													<span className='sr-only'>Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<Link href={`/reservations/${item.id}`}>
													<DropdownMenuItem>Edit</DropdownMenuItem>
												</Link>
											</DropdownMenuContent>
										</DropdownMenu>
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

export default ReservationCard
