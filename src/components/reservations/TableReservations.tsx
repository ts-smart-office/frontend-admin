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
import { apiReservations, apiUpdateStatus } from '@/api/reservationApi'
import { rupiahCurrency } from '@/lib/utils'
import { Badge } from '../ui/badge'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { useToast } from '../ui/use-toast'
import SelectStatus from './SelectStatus'

const statusReservation = [
	{ key: 'Waiting Payment', value: 'waitingForPayment' },
	{ key: 'Paid', value: 'paid' },
	{ key: 'Approved', value: 'approved' },
	{ key: 'Completed', value: 'completed' },
]

const TableReservations: FC = () => {
	const [reservations, setReservations] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [filterStatus, setFilterStatus] = useState<string[]>([])
	const [filterRole, setFilterRole] = useState<string>('')
	const [searchQuery, setSearchQuery] = useState<string>('')
	const { toast } = useToast()

	const handleRoleFilter = (value: string) => {
		if (value === 'all') {
			return setFilterRole('')
		}
		setFilterRole(value)
	}

	const fetchAllReservations = async () => {
		await apiReservations({ status: filterStatus, role: filterRole })
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

	const updateReservation = (id: string, updatedStatus: string) => {
		apiUpdateStatus(id, { _method: 'PUT', status: updatedStatus })
			.then(res => {
				toast({
					description: res.data.message,
				})
				setTimeout(function () {
					location.reload()
				}, 1000)
			})
			.catch(error => {
				if (error.response) {
					toast({
						description: error.response.data.message,
					})
				}
			})
	}

	useEffect(() => {
		fetchAllReservations()
	}, [filterRole, filterStatus])

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const filteredReservations = reservations.filter(reservation =>
		reservation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>All Reservations</CardTitle>
				<div className='flex items-center gap-5 pt-5'>
					<div className='flex-1 relative'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search by name'
							className='w-full rounded-lg bg-background pl-8'
							value={searchQuery}
							onChange={handleSearchChange}
						/>
					</div>
					<Select onValueChange={handleRoleFilter}>
						<SelectTrigger className='w-[140px] focus:ring-0 focus:ring-transparent'>
							<SelectValue placeholder='Select role' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Role</SelectLabel>
								<SelectItem value='all'>All users</SelectItem>
								<SelectItem value='11'>Internal users</SelectItem>
								<SelectItem value='12'>External users</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<SelectStatus
						values={statusReservation}
						filterStatus={filterStatus}
						setFilterStatus={setFilterStatus}
					/>
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : filteredReservations.length === 0 ? (
					<p>No reservations found matching the search criteria.</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-base font-semibold text-muted-foreground w-80'>
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
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Total Price
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground text-center'>
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredReservations.map(item => (
								<TableRow key={item.id}>
									<TableCell className='text-base flex items-center gap-2 text-darkColor w-80'>
										{item.user.name}{' '}
										{item.user.role.name === 'Internal User' && (
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<CheckBadgeIcon className='w-6 h-6 text-greenBrand' />
													</TooltipTrigger>
													<TooltipContent>
														<p>{item.user.role.name}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										)}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.room.name}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.type_name} ({item.start_time} - {item.end_time})
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.date}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.status === 'completed' ||
										item.status === 'approved' ? (
											<Badge
												variant='default'
												className='bg-greenBrand hover:bg-greenBrand'
											>
												{item.status}
											</Badge>
										) : (
											<Badge variant='outline'>{item.status}</Badge>
										)}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{rupiahCurrency.format(item.total_price)}
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
													<DropdownMenuItem>Lihat detail</DropdownMenuItem>
												</Link>
												<DropdownMenuItem
													disabled={
														item.status === 'approved' ||
														item.status === 'decline'
													}
													onClick={() =>
														updateReservation(item.id!, 'approved')
													}
													className='mt-2 font-semibold bg-greenBrand text-white flex justify-center focus:bg-greenBrand focus:bg-opacity-80 focus:text-white'
												>
													Approve
												</DropdownMenuItem>
												<DropdownMenuItem
													disabled={
														item.status === 'approved' ||
														item.status === 'decline'
													}
													onClick={() =>
														updateReservation(item.id!, 'declined')
													}
													className='mt-2 font-semibold bg-rose-500 text-white flex justify-center focus:bg-rose-500 focus:bg-opacity-80 focus:text-white'
												>
													Decline
												</DropdownMenuItem>
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

export default TableReservations
