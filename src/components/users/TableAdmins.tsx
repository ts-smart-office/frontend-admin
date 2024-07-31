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
import { apiUsersAdmin } from '@/api/userApi'
import { Badge } from '../ui/badge'
import DialogCreateAdmin from './DialogCreateAdmin'

const TableAdmins: FC = () => {
	const [usersAdmin, setUsersAdmin] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [searchQuery, setSearchQuery] = useState<string>('')

	const fetchAllUsers = async () => {
		await apiUsersAdmin()
			.then(res => {
				setUsersAdmin(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchAllUsers()
	}, [])

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const filteredUsersAdmin = usersAdmin.filter(admin =>
		admin.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>Data Admins</CardTitle>
				<div className='flex items-center gap-5 pt-5'>
					<div className='flex-1 relative'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search...'
							className='w-full rounded-lg bg-background pl-8'
							value={searchQuery}
							onChange={handleSearchChange}
						/>
					</div>
					<DialogCreateAdmin />
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : filteredUsersAdmin.length <= 0 ? (
					<p>There is no users admin data!</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Admin Name
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Admin Role
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Admin Email
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Admin Company/Division
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Admin Phone
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsersAdmin.map(item => (
								<TableRow key={item.id}>
									<TableCell className='text-base text-darkColor'>
										{item.name}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										<Badge
											className={`${
												item.role.id === 1
													? 'bg-[#00b4d8] hover:bg-[#00b4d8]'
													: 'bg-greenBrand hover:bg-greenBrand'
											}`}
										>
											{item.role.name}
										</Badge>
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.email}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.company}
									</TableCell>
									<TableCell className='text-base text-darkColor'>
										{item.phone ? item.phone : 'Phone number not available'}
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

export default TableAdmins
