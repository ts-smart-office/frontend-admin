import { FC } from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const Reservations: FC = () => {
	return (
		<div className='px-4 font-urbanist flex flex-col gap-6'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Reservations</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Card className='rounded-md border-none'>
				<CardHeader>
					<CardTitle>Incoming Reservations</CardTitle>
				</CardHeader>
				<CardContent>
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
								<TableHead className='text-base font-semibold text-muted-foreground'>
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className='text-base text-darkColor'>Sule</TableCell>
								<TableCell className='text-base text-darkColor'>
									Meeting Room
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Full Day
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									22 June 2024
								</TableCell>
								<TableCell className='text-base text-darkColor'>
									Rp. 678000
								</TableCell>
								<TableCell className='text-base text-darkColor'>Edit</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}

export default Reservations
