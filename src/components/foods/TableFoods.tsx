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
import { IFood } from '@/utils/types'
import { apiFoods } from '@/api/foodApi'
import { rupiahCurrency } from '@/lib/utils'
import DialogEditFood from './DialogEditFood'
import DialogCreateFood from './DialogCreateFood'

const TableFoods: FC = () => {
	const [foods, setFoods] = useState<IFood[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const fetchAllFoods = async () => {
		await apiFoods()
			.then(res => {
				setFoods(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchAllFoods()
	}, [])

	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>All Foods</CardTitle>
				<div className='flex items-center gap-5 pt-5'>
					<div className='flex-1 relative'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search...'
							className='w-full rounded-lg bg-background pl-8'
						/>
					</div>
					<DialogCreateFood />
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : foods.length <= 0 ? (
					<p>There is no reservation data!</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Food Name
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Food Category
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Food Price
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Food Items
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground text-center'>
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{foods.map(item => (
								<TableRow key={item.id}>
									<TableCell className='text-base text-darkColor'>
										{item.name}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.category}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{rupiahCurrency.format(item.price)}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.items.map(item => item.name).join(', ')}
									</TableCell>
									<TableCell className='text-base text-darkColor flex justify-center'>
										<DialogEditFood idFood={item.id} />
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

export default TableFoods
