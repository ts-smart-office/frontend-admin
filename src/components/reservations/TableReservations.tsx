'use client'
import { FC, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Button } from '../ui/button'
import { apiReservations } from '@/api/reservationApi'

const TableReservations: FC = () => {
	const [reservations, setReservations] = useState<any[]>([])
	const [incomingReservations, setIncomingReservations] = useState<any[]>([])
	const [successReservations, setSuccessReservations] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const fetchAllReservations = async () => {
		await apiReservations()
			.then(res => {
				setReservations(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	const fetchIncomingReservations = async () => {
		await apiReservations('incoming')
			.then(res => {
				setIncomingReservations(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	const fetchSuccessReservations = async () => {
		await apiReservations('successful')
			.then(res => {
				setSuccessReservations(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchAllReservations()
		fetchIncomingReservations()
		fetchSuccessReservations()
	}, [])

	return (
		<Card className='rounded-md border-none'>
			<Tabs defaultValue='all'>
				<CardHeader>
					<CardTitle>All Reservations</CardTitle>
					<div className='flex items-center gap-5 pt-5'>
						<div className='flex-1 relative'>
							<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
							<Input
								type='search'
								placeholder='Search...'
								className='w-full rounded-lg bg-background pl-8'
							/>
						</div>
						<TabsList>
							<TabsTrigger value='all'>All</TabsTrigger>
							<TabsTrigger value='incoming'>Incoming</TabsTrigger>
							<TabsTrigger value='success'>Successfully</TabsTrigger>
						</TabsList>
					</div>
				</CardHeader>
				<CardContent>
					<TabsContent value='all'>
						{loading ? (
							<p>Loading...</p>
						) : reservations.length <= 0 ? (
							<p>There is no reservation data!</p>
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
											Total Price
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
												Sule
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.room.name}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.type}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.date}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.total_price}
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
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</TabsContent>
					<TabsContent value='incoming'>
						{loading ? (
							<p>Loading...</p>
						) : incomingReservations.length <= 0 ? (
							<p>There is no reservation data!</p>
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
											Total Price
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
												Sule
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.room.name}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.type}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.date}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.total_price}
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
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</TabsContent>
					<TabsContent value='success'>
						{loading ? (
							<p>Loading...</p>
						) : successReservations.length <= 0 ? (
							<p>There is no reservation data!</p>
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
											Total Price
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
												Sule
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.room.name}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.type}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.date}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.total_price}
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
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</TabsContent>
				</CardContent>
			</Tabs>
		</Card>
	)
}

export default TableReservations
