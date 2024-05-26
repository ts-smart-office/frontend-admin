import { FC } from 'react'
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

const TableFoods: FC = () => {
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
					<Button className='bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'>
						<Link href='/foods/create'>Create food</Link>
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='text-base font-semibold text-muted-foreground'>
								Category
							</TableHead>
							<TableHead className='text-base font-semibold text-muted-foreground'>
								Food name
							</TableHead>
							<TableHead className='text-base font-semibold text-muted-foreground'>
								Food price
							</TableHead>
							<TableHead className='text-base font-semibold text-muted-foreground'>
								Food items
							</TableHead>
							<TableHead className='text-base font-semibold text-muted-foreground text-center'>
								Action
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className='text-base text-darkColor'>Snack</TableCell>
							<TableCell className='text-base text-darkColor'>
								Paket 1
							</TableCell>
							<TableCell className='text-base text-darkColor'>15.215</TableCell>
							<TableCell className='text-base text-darkColor'>
								item 1, item 2, item 3
							</TableCell>
							<TableCell className='text-base text-darkColor flex justify-center'>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button aria-haspopup='true' size='icon' variant='ghost'>
											<EllipsisVerticalIcon className='h-4 w-4' />
											<span className='sr-only'>Toggle menu</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align='end'>
										<DropdownMenuLabel>Actions</DropdownMenuLabel>
										<Link href='/foods/1'>
											<DropdownMenuItem>Edit</DropdownMenuItem>
										</Link>
										<DropdownMenuItem>Delete</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}

export default TableFoods
