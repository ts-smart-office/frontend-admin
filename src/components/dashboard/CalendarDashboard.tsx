'use client'
import { FC, useState } from 'react'
import { Calendar } from '../ui/calendar'
import { isSameDay } from 'date-fns'

type TCalendarDashboardProps = {
	datesReserved: any[]
}

const CalendarDashboard: FC<TCalendarDashboardProps> = ({ datesReserved }) => {
	const [dateSelected, setDateSelected] = useState<Date | undefined>(new Date())
	console.log(datesReserved)

	return (
		<Calendar
			mode='single'
			selected={dateSelected}
			onSelect={setDateSelected}
			disabled={date =>
				date < new Date() ||
				datesReserved.some(dateReserved =>
					isSameDay(new Date(date), new Date(dateReserved))
				)
			}
			className='w-full bg-white rounded-md border-none'
		/>
	)
}

export default CalendarDashboard
