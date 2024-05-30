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
import { Button } from '../ui/button'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { apiRooms } from '@/api/roomApi'
import { IAllRoom } from '@/utils/types'

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
					<Button className='bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'>
						<Link href='/foods/create'>Create room</Link>
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : rooms.length <= 0 ? (
					<p>There is no reservation data!</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='hidden w-[100px] sm:table-cell'>
									<span className='sr-only'>Image</span>
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead className='w-96'>Description</TableHead>
								<TableHead className='hidden md:table-cell'>Capacity</TableHead>
								<TableHead className='hidden md:table-cell'>
									Facilities
								</TableHead>
								<TableHead className='hidden md:table-cell'>Price</TableHead>
								<TableHead>
									<span className='sr-only'>Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rooms.map(room => (
								<TableRow key={room.id}>
									<TableCell className='hidden sm:table-cell'>
										<Image
											alt='Product image'
											className='aspect-square rounded-md object-cover'
											height='64'
											src={room.image_urls[0]}
											width='64'
										/>
									</TableCell>
									<TableCell className='font-medium'>{room.name}</TableCell>
									<TableCell className='w-[560px]'>
										{room.description}
									</TableCell>
									<TableCell>{room.max_capacity}</TableCell>
									<TableCell className='w-[400px]'>
										{room.facilities.map(item => item.name).join(', ')}
									</TableCell>
									<TableCell>
										{room.prices.map(item => (
											<div key={item.id} className='flex flex-col'>
												{item.type} : {item.price}
											</div>
										))}
									</TableCell>
									<TableCell>
										<Button aria-haspopup='true' size='icon' variant='ghost'>
											<EllipsisVerticalIcon className='h-4 w-4' />
											<span className='sr-only'>Toggle menu</span>
										</Button>
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
