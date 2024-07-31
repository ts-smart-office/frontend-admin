import { FC } from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import TableReservations from '@/components/reservations/TableReservations'
import { getAdminSession } from '@/lib/actions'
import { redirect } from 'next/navigation'

const Reservations: FC = async () => {
	const sessionAdmin = await getAdminSession()
	if (!sessionAdmin) {
		return redirect('/signin')
	}

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
			<TableReservations />
		</div>
	)
}

export default Reservations
