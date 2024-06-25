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
import { apiUpdateUserRole, apiUsers } from '@/api/userApi'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useToast } from '../ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

const TableUsers: FC = () => {
	const [users, setUsers] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const { toast } = useToast()

	const fetchAllUsers = async () => {
		await apiUsers()
			.then(res => {
				setUsers(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	const updateUserRole = (id: string, updatedRole: number) => {
		apiUpdateUserRole(id, { _method: 'PATCH', role_id: updatedRole })
			.then(res => {
				toast({
					title: 'Berhasil update role user',
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
		fetchAllUsers()
	}, [])

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const filteredUsers = users.filter(user =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<Tabs defaultValue='all'>
			<Card className='rounded-md border-none'>
				<CardHeader>
					<CardTitle>Data Users</CardTitle>
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
						<TabsList className='h-11 px-1'>
							<TabsTrigger value='all'>All user</TabsTrigger>
							<TabsTrigger value='internal'>Internal user</TabsTrigger>
							<TabsTrigger value='external'>External user</TabsTrigger>
						</TabsList>
					</div>
				</CardHeader>
				<TabsContent value='all'>
					<CardContent>
						{loading ? (
							<p>Loading...</p>
						) : filteredUsers.length <= 0 ? (
							<p>There is no users admin data!</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Name
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Email
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Phone
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Company
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground text-center'>
											Action
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredUsers.map(item => (
										<TableRow key={item.id}>
											<TableCell className='text-base flex items-center gap-2 text-darkColor w-full'>
												{item.name}{' '}
												{item.role.name === 'Internal User' && (
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger>
																<CheckBadgeIcon className='w-6 h-6 text-greenBrand' />
															</TooltipTrigger>
															<TooltipContent>
																<p>{item.role.name}</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												)}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.email}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.phone}
											</TableCell>
											<TableCell className='text-base text-darkColor'>
												{item.company}
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
														<DropdownMenuItem
															disabled={item.role.name.includes(
																'Internal User'
															)}
															onClick={() => updateUserRole(item.id!, 11)}
															className='mt-2 font-semibold bg-greenBrand text-white flex justify-center focus:bg-greenBrand focus:bg-opacity-80 focus:text-white'
														>
															Make user as internal
														</DropdownMenuItem>
														<DropdownMenuItem
															disabled={item.role.name.includes(
																'External User'
															)}
															onClick={() => updateUserRole(item.id!, 12)}
															className='mt-2 font-semibold bg-[#00b4d8] text-white flex justify-center focus:bg-[#00b4d8] focus:bg-opacity-80 focus:text-white'
														>
															Make user as external
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
				</TabsContent>
				<TabsContent value='internal'>
					<CardContent>
						{loading ? (
							<p>Loading...</p>
						) : filteredUsers.length <= 0 ? (
							<p>There is no users admin data!</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Name
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Email
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Phone
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Company
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground text-center'>
											Action
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredUsers
										.filter(user => user.role.name === 'Internal User')
										.map(item => (
											<TableRow key={item.id}>
												<TableCell className='text-base flex items-center gap-2 text-darkColor w-full'>
													{item.name}{' '}
													{item.role.name === 'Internal User' && (
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger>
																	<CheckBadgeIcon className='w-6 h-6 text-greenBrand' />
																</TooltipTrigger>
																<TooltipContent>
																	<p>{item.role.name}</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													)}
												</TableCell>
												<TableCell className='text-base text-darkColor'>
													{item.email}
												</TableCell>
												<TableCell className='text-base text-darkColor'>
													{item.phone}
												</TableCell>
												<TableCell className='text-base text-darkColor'>
													{item.company}
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
															<DropdownMenuItem
																disabled={item.role.name.includes(
																	'Internal User'
																)}
																onClick={() => updateUserRole(item.id!, 11)}
																className='mt-2 font-semibold bg-greenBrand text-white flex justify-center focus:bg-greenBrand focus:bg-opacity-80 focus:text-white'
															>
																Make user as internal
															</DropdownMenuItem>
															<DropdownMenuItem
																disabled={item.role.name.includes(
																	'External User'
																)}
																onClick={() => updateUserRole(item.id!, 12)}
																className='mt-2 font-semibold bg-[#00b4d8] text-white flex justify-center focus:bg-[#00b4d8] focus:bg-opacity-80 focus:text-white'
															>
																Make user as external
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
				</TabsContent>
				<TabsContent value='external'>
					<CardContent>
						{loading ? (
							<p>Loading...</p>
						) : filteredUsers.length <= 0 ? (
							<p>There is no users admin data!</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Name
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Email
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Phone
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground'>
											User Company
										</TableHead>
										<TableHead className='text-base font-semibold text-muted-foreground text-center'>
											Action
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredUsers
										.filter(user => user.role.name === 'External User')
										.map(item => (
											<TableRow key={item.id}>
												<TableCell className='text-base flex items-center gap-2 text-darkColor w-full'>
													{item.name}{' '}
													{item.role.name === 'Internal User' && (
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger>
																	<CheckBadgeIcon className='w-6 h-6 text-greenBrand' />
																</TooltipTrigger>
																<TooltipContent>
																	<p>{item.role.name}</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													)}
												</TableCell>
												<TableCell className='text-base text-darkColor'>
													{item.email}
												</TableCell>
												<TableCell className='text-base text-darkColor'>
													{item.phone}
												</TableCell>
												<TableCell className='text-base text-darkColor'>
													{item.company}
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
															<DropdownMenuItem
																disabled={item.role.name.includes(
																	'Internal User'
																)}
																onClick={() => updateUserRole(item.id!, 11)}
																className='mt-2 font-semibold bg-greenBrand text-white flex justify-center focus:bg-greenBrand focus:bg-opacity-80 focus:text-white'
															>
																Make user as internal
															</DropdownMenuItem>
															<DropdownMenuItem
																disabled={item.role.name.includes(
																	'External User'
																)}
																onClick={() => updateUserRole(item.id!, 12)}
																className='mt-2 font-semibold bg-[#00b4d8] text-white flex justify-center focus:bg-[#00b4d8] focus:bg-opacity-80 focus:text-white'
															>
																Make user as external
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
				</TabsContent>
			</Card>
		</Tabs>
	)
}

export default TableUsers
