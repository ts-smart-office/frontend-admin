import DashboardAdmin from '@/components/dashboard/DashboardAdmin'
import { getAdminSession } from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function Home() {
	const sessionAdmin = await getAdminSession()
	if (!sessionAdmin) {
		return redirect('/signin')
	}

	return <DashboardAdmin />
}
