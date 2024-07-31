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
import { apiAllPosts, apiDeletePost } from '@/api/postApi'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
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
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { apiDeleteRoom } from '@/api/roomApi'
import { useToast } from '../ui/use-toast'

const TablePost: FC = () => {
	const { toast } = useToast()
	const [posts, setPosts] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [searchQuery, setSearchQuery] = useState<string>('')

	const fetchAllPosts = async () => {
		await apiAllPosts()
			.then(res => {
				setPosts(res.data.data)
				setLoading(false)
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	const deletePost = async (idRoom: string) => {
		await apiDeletePost(idRoom)
			.then(res => {
				toast({
					description: res.data.message,
				})
				location.reload()
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}

	useEffect(() => {
		fetchAllPosts()
	}, [])

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const filteredPosts = posts.filter(post =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<Card className='rounded-md border-none'>
			<CardHeader>
				<CardTitle>Data Posts</CardTitle>
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
					<Button
						asChild
						className='bg-greenBrand px-8 h-fit text-lg hover:bg-opacity-80 hover:bg-greenBrand'
					>
						<Link href={'/posts/create'}>Create new post</Link>
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p>Loading...</p>
				) : filteredPosts.length <= 0 ? (
					<p>There is no posts data!</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Title post
								</TableHead>
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Category post
								</TableHead>
								<TableHead className='w-fit text-base font-semibold text-muted-foreground text-center'>
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredPosts.map(item => (
								<TableRow key={item.id}>
									<TableCell className='text-base text-darkColor'>
										{item.title}
									</TableCell>
									<TableCell className='text-base text-darkColor capitalize'>
										{item.category}
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
												<DropdownMenuItem>
													<Link href={`posts/edit/${item.id}`}>Update</Link>
												</DropdownMenuItem>
												<Dialog>
													<DialogTrigger className='w-full'>
														<DropdownMenuItem
															className='mt-2 font-semibold bg-rose-500 text-white flex justify-center focus:bg-rose-500 focus:bg-opacity-80 focus:text-white'
															onSelect={e => e.preventDefault()}
														>
															Delete post
														</DropdownMenuItem>
													</DialogTrigger>
													<DialogContent>
														<DialogHeader>
															<DialogTitle>Delete confirmation</DialogTitle>
															<DialogDescription>
																Are you sure t delete this post?
															</DialogDescription>
														</DialogHeader>
														<DialogFooter className='flex gap-4'>
															<DialogClose asChild>
																<Button type='button' variant='secondary'>
																	Cancel
																</Button>
															</DialogClose>
															<Button
																onClick={() => deletePost(item.id)}
																className='bg-rose-400 text-lg hover:bg-opacity-80 hover:bg-rose-400'
															>
																Delete
															</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
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

export default TablePost
