'use client'
import { FC, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { StarIcon } from '@heroicons/react/24/solid'
import { apiReviews } from '@/api/reservationApi'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { saveAs } from 'file-saver'
import { Button } from '../ui/button'

const TableReview: FC = () => {
	const [reviews, setReviews] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [rating, setRating] = useState<string>('')

	const handleRatingFilter = (value: string) => {
		if (value === 'all') {
			return setRating('')
		}
		setRating(value)
	}
	// const [minDate, setMinDate] = useState<string>('')
	// const [maxDate, setMaxDate] = useState<string>('')
	// const [sortBy, setSortBy] = useState<string>('')

	const fetchAllReview = async () => {
		await apiReviews({ rating })
			.then(res => {
				setReviews(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	const downloadReview = async () => {
		await apiReviews({ export: true })
			.then(res => {
				const blob = new Blob([res.data], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				})
				saveAs(blob, 'review.xlsx')
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchAllReview()
	}, [rating])

	return (
		<Card className='h-full rounded-md border-none'>
			<CardHeader className='flex flex-col'>
				<CardTitle>Customer reviews</CardTitle>
				<div className='self-end flex gap-5'>
					<Select onValueChange={handleRatingFilter}>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Select a rating' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Rating</SelectLabel>
								<SelectItem value='all'>All ratings</SelectItem>
								<SelectItem value='1'>1 star</SelectItem>
								<SelectItem value='2'>2 star</SelectItem>
								<SelectItem value='3'>3 star</SelectItem>
								<SelectItem value='4'>4 star</SelectItem>
								<SelectItem value='5'>5 star</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Button
						onClick={downloadReview}
						className='w-fit bg-greenBrand px-8 h-10 hover:bg-opacity-80 hover:bg-greenBrand'
					>
						Download excel
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					'Loading...'
				) : reviews.length <= 0 ? (
					<p>There is no feedback data!</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Customer
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Rating
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Room
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Tags
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Comment
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{reviews.map(item => (
								<TableRow key={item.id}>
									<TableCell className='text-base text-darkColor'>
										{item.user.email}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										<div className='flex gap-1 items-center '>
											{item.rating}{' '}
											<StarIcon className='w-4 h-4 text-greenBrand' />
										</div>
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.room.name}
									</TableCell>
									<TableCell className='text-base text-darkColor w-1/3'>
										{item.tags.map((item: any) => `${item}, `)}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.comment}
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

export default TableReview
