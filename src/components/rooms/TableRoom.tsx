'use client'
import { FC, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import Image from 'next/image'
import { apiRooms } from '@/api/roomApi'
import { IAllRoom } from '@/utils/types'
import DialogCreateRoom from './create/DialogCreateRoom'
import DialogRoom from './DialogRoom'

const TableRoom: FC = () => {
	const [rooms, setRooms] = useState<IAllRoom[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const fetchAllRooms = async () => {
		await apiRooms()
			.then(res => {
				setRooms(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchAllRooms()
	}, [])

	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>All Rooms</CardTitle>
				<div className='flex items-center gap-5 pt-5'>
					<div className='flex-1 relative'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search...'
							className='w-full rounded-lg bg-background pl-8'
						/>
					</div>
					<DialogCreateRoom />
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : rooms.length <= 0 ? (
					<p>There is no reservation data!</p>
				) : (
					<Table>
						<TableHeader className='text-base font-semibold text-muted-foreground'>
							<TableRow>
								<TableHead className='w-[100px]'>
									<span className='sr-only'>Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead className='w-96'>Description</TableHead>
								<TableHead>Capacity</TableHead>
								<TableHead>Facilities</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>
									<span className='sr-only'>Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className='text-base'>
							{rooms.map(room => (
								<TableRow key={room.id}>
									<TableCell>
										{!room.image_urls[0] ? (
											<div className='h-16 w-16 flex items-center justify-center'>
												No images
											</div>
										) : (
											<Image
												alt='Product image'
												className='aspect-square rounded-md object-cover'
												height='64'
												src={room.image_urls[0]}
												width='64'
											/>
										)}
									</TableCell>
									<TableCell>{room.name}</TableCell>
									<TableCell className='w-[560px]'>
										{room.description}
									</TableCell>
									<TableCell>{room.max_capacity}</TableCell>
									<TableCell className='flex flex-col gap-2'>
										{room.facilities.map(item => (
											<p key={item.id}>{item.name}</p>
										))}
									</TableCell>
									<TableCell>
										{room.reservation_options.map(item => (
											<div key={item.id} className='flex flex-col'>
												{item.reservation_type.name} : {item.price}
											</div>
										))}
									</TableCell>
									<TableCell>
										<DialogRoom idRoom={room.id.toString()} />
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

export default TableRoom
